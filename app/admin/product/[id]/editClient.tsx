/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { MultiCategorySelect } from "@/components/multiCategorySelect";
import GallerySection from "../GallerySection";
import AttributeSection from "../AttributeSection";
import { updateProduct } from "@/helper/product/action";
import { validateImage } from "@/lib/validateImage";
import { useFileUpload } from "@/helper";
import {
  productAttributeType,
  productMediaType,
  productType,
  productVarientType,
} from "@/types/productTypes";
import ProductFilters from "../productFilter";
import { PRODUCT_FILTER } from "@/const/filters";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ProductSpecificationSection from "../ProductSpecificationSection";

type ImageItem = {
  key: string;
  preview: string;
};

type AttributeValue = {
  id?: string;
  value: string;
};

type Variant = {
  id: string;
  isExisting: boolean; // Track if variant is old or new
  name: string;
  sku: string;
  price: number;
  strikethroughPrice: number;
  description: string;
  banner: ImageItem | null;
  gallery: ImageItem[];
  highlights: string[];
  attributes: Record<string, AttributeValue>;
  isInStock: boolean;
  isReturnable: boolean;
  isCancelable: boolean;
  isReplacement: boolean;
  returnDays: number;
  replacementDays: number;
};

type ProductDetailsType = {
  prodcutVarientBoxRes: productVarientType[];
  categoryRes: any;
  productAttributeRes: productAttributeType[];
  productMediaRes: productMediaType[];
} & productType;

export default function EditProduct({ productDetails }: any) {
  const router = useRouter();
  const { upload, uploading } = useFileUpload();
  const bannerRef = useRef<HTMLInputElement>(null);

  const [productType, setProductType] = useState<any[]>([]);
  const [size, setSize] = useState<any[]>([]);
  const [flowType, setFlowType] = useState<any[]>([]);
  const [material, setMaterial] = useState<any[]>([]);
  const [cramps, setCramps] = useState<any[]>([]);
  const [sensitive, setSensitive]=useState<any[]>([]);

  const[brand,setBrand] = useState<any>(productDetails.brand);

  const [varientBox, setVarientBox] = useState(productDetails.hasVarientBox);

  const [variantBoxes, setVariantBoxes] = useState<any[]>([]);

  const fileRefs = useRef<any>([]);

  useEffect(() => {
    if (productDetails?.prodcutVarientBoxRes?.length) {
      setVariantBoxes(
        productDetails.prodcutVarientBoxRes.map((v: any) => ({
          id: v.id,
          name: v.name || "",
          description: v.description || "",
          image: v.image || "",
        })),
      );
    }
  }, [productDetails]);


  const extractSlugs = (filters: any[]) => filters.map((f) => f.filter);

  const mapSlugsToObjects = (slugs: string[], source: any[]) =>
    source.filter((item) => slugs.includes(item.slug));

  useEffect(() => {
    if (!productDetails?.filters) return;

    const slugs = extractSlugs(productDetails.filters);

    setProductType(mapSlugsToObjects(slugs, PRODUCT_FILTER.product_type));

    setSize(mapSlugsToObjects(slugs, PRODUCT_FILTER.size));

    setFlowType(mapSlugsToObjects(slugs, PRODUCT_FILTER.flow_or_usage_type));

    setMaterial(mapSlugsToObjects(slugs, PRODUCT_FILTER.material));

    setCramps(mapSlugsToObjects(slugs, PRODUCT_FILTER.cramps_or_discomfort));

    setSensitive(mapSlugsToObjects(slugs, PRODUCT_FILTER.allergies_or_sensitivities));
  }, [productDetails]);

  const {
    prodcutVarientBoxRes,
    categoryRes,
    productAttributeRes,
    productMediaRes,
    ...product
  }: ProductDetailsType = productDetails;

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryRes.map((c: any) => c?.categories?.id),
  );

  // Mapping Initial Data to Variant State
  const [variants, setVariants] = useState<any>({
    id: product?.id || "",
    isExisting: true,
    name: product.name || "",
    sku: product.sku || "",
    price: product.basePrice || 0,
    strikethroughPrice: product.strikethroughPrice || 0,
    description: product.description || "",
    banner: product.bannerImage
      ? { key: product.bannerImage, preview: product.bannerImage }
      : null,
    gallery: (productMediaRes || []).map((m: any) => ({
      key: m.mediaURL,
      preview: m.mediaURL,
    })),
    attributes: Object.fromEntries(
      (productAttributeRes || []).map((a: any) => [
        a.attribute,
        { id: a.id, value: a.value },
      ]),
    ),
    isInStock: product.isInStock ?? true,
    highlights: product.highlights || [],
  });

  // const initialActiveIndex = initialVariants.findIndex(
  //   (v) => v.id === targetVariantId,
  // );
  // const [activeIndex, setActiveIndex] = useState(
  //   initialActiveIndex !== -1 ? initialActiveIndex : 0,
  // );
  const galleryRef = useRef<HTMLInputElement>(null);

  // Helper to update state
  // const updateVariant = (index: number, updates: Partial<Variant>) => {
  //   const newVariants = [...variants];
  //   newVariants[index] = { ...newVariants[index], ...updates };
  //   setVariants(newVariants);
  // };

  const updateVariantBox = (index: number, key: string, value: any) => {
    const updated = [...variantBoxes];
    updated[index] = { ...updated[index], [key]: value };
    setVariantBoxes(updated);
  };

  const addVariantBox = () => {
    setVariantBoxes([
      ...variantBoxes,
      { name: "", description: "", image: "" },
    ]);
  };

  const removeVariantBox = (index: number) => {
    setVariantBoxes(variantBoxes.filter((_, i) => i !== index));
  };

  const handleBanner = async (file?: File) => {
    if (!file) return;

    try {
      await validateImage(file, {
        maxSizeMB: 2,
        maxWidth: 2000,
        maxHeight: 2000,
        ratio: 1,
      });

      const { fileKey, fileUrl } = await upload(file, "product");

      // updateVariant(activeIndex, {
      //   banner: {
      //     key: fileKey,
      //     preview: fileUrl as any, // ✅ S3 URL
      //   },
      // });

      setVariants((prev: any) => ({
        ...prev,
        banner: {
          key: fileKey,
          preview: fileUrl as any,
        },
      }));

      toast.success("Banner uploaded");
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Multi-select Logic (Toggle)
  const toggleSpecAttribute = (key: string, val: string) => {
    const currentAttrValue = variants.attributes[key]?.value || "";
    let selectedArray = currentAttrValue ? currentAttrValue.split(",") : [];

    if (selectedArray.includes(val)) {
      selectedArray = selectedArray.filter((item: string) => item !== val);
    } else {
      selectedArray.push(val);
    }

    const newValue = selectedArray.join(",");
    setVariants((prev: any) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [key]: {
          ...prev.attributes[key],
          value: newValue,
        },
      },
    }));
  };

  const handleGallery = async (files: FileList | null) => {
    if (!files) return;

    for (const file of Array.from(files)) {
      try {
        await validateImage(file, {
          maxSizeMB: 2,
          maxWidth: 2000,
          maxHeight: 2000,
          ratio: 2000 / 2000,
        });
        const { preview, fileKey, fileUrl } = await upload(file, "product");
        const currentGallery = variants.gallery;
        // updateVariant(activeIndex, {
        //   gallery: [
        //     ...currentGallery,
        //     { key: fileKey, preview: fileUrl as any },
        //   ],
        // });
        setVariants((prev: any) => ({
          ...prev,
          gallery: [...prev.gallery, { key: fileKey, preview: fileUrl as any }],
        }));
        toast.success("Image uploaded");
      } catch (err: any) {
        toast.info(err.message);
      }
    }
  };

  const handleVariantImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const { fileKey, fileUrl } = await upload(file, "product"); // tera existing upload fn

      const updated = [...variantBoxes];
      updated[index].image = fileUrl;
      setVariantBoxes(updated);
    } catch (err) {
      console.error(err);
    }
  };

  const setGalleryForActive = (action: React.SetStateAction<ImageItem[]>) => {
    const currentGallery = variants.gallery;
    const nextGallery =
      typeof action === "function" ? (action as any)(currentGallery) : action;
    // updateVariant(activeIndex, {
    //   gallery: nextGallery,
    // });
    setVariants((prev: any) => ({ ...prev, gallery: nextGallery }));
  };

  const handleUpdateProduct = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedCategories.length === 0)
      return toast.error("Select a category");

    const formData = new FormData();
    formData.append("id", variants.id);
    selectedCategories.forEach((catId) => formData.append("category[]", catId));

    const payload = {
      ...variants,
      id: variants.isExisting ? variants.id : undefined, // Old variants keep ID, new ones don't
      brand: brand,
      bannerImage: variants.banner?.preview,
      media: variants.gallery.map((g: any) => g.preview),
      highlights: variants.highlights.filter(
        (h: string) => h.trim().length > 0,
      ),
      attributes: Object.entries(variants.attributes)
        .map(([attr, val]: [string, any]) => ({
          attribute: attr,
          value: val.value,
        }))
        .filter((a: any) => a.value.trim().length > 0),
      filters: [
        ...(productType || []),
        ...(size || []),
        ...(flowType || []),
        ...(material || []),
        ...(cramps || []),
        ...(sensitive || []),
      ],
      VarientBoxes: varientBox ? variantBoxes : [],
      hasVarientBox:varientBox
    };

    formData.append("variants", JSON.stringify(payload));


    try {
      await updateProduct(formData);
      toast.success("Product updated successfully!");
      router.push("/admin/product");
    } catch (err) {
      toast.error("Failed to update product");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <form onSubmit={handleUpdateProduct}>
        <div className="flex justify-between items-center sticky top-0 z-10 py-4 bg-white border-b">
          <div>
            <h1 className="text-2xl font-bold">Edit Product</h1>
            <p className="text-sm text-gray-500"> {product.slug}</p>
          </div>
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/product")}
            >
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <MultiCategorySelect
                  selectedCategories={selectedCategories}
                  onCategoriesChange={setSelectedCategories}
                />
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Product Name</Label>
                    <Input
                      required
                      value={variants.name}
                      onChange={(e) =>
                        setVariants({ ...variants, name: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>SKU</Label>
                    <Input
                      required
                      value={variants.sku}
                      onChange={(e) =>
                        setVariants({ ...variants, sku: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Price</Label>
                    <Input
                      type="number"
                      value={variants.price}
                      onChange={(e) =>
                        setVariants({
                          ...variants,
                          price: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Strike Price</Label>
                    <Input
                      type="number"
                      value={variants.strikethroughPrice}
                      onChange={(e) =>
                        setVariants({
                          ...variants,
                          strikethroughPrice: Number(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <Switch
                      checked={variants.isInStock}
                      onCheckedChange={(c) =>
                        setVariants({ ...variants, isInStock: c })
                      }
                    />
                    <Label>In Stock</Label>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea
                    value={variants.description}
                    onChange={(e) =>
                      setVariants({ ...variants, description: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Highlights</Label>

                  <div className="flex flex-col gap-2">
                    {variants.highlights.map((h: string, i: number) => (
                      <div key={i} className="flex gap-2">
                        <Input
                          value={h}
                          onChange={(e) => {
                            const newHighlights = [...variants.highlights];
                            newHighlights[i] = e.target.value;
                            setVariants({
                              ...variants,
                              highlights: newHighlights,
                            });
                          }}
                          placeholder="Enter highlight"
                        />

                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => {
                            const newHighlights = variants.highlights.filter(
                              (_: string, idx: number) => idx !== i,
                            );
                            setVariants({
                              ...variants,
                              highlights: newHighlights,
                            });
                          }}
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    ))}

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setVariants({
                          ...variants,
                          highlights: [...variants.highlights, ""],
                        });
                      }}
                    >
                      + Add Highlight
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Banner Image</Label>
                  {/* <ImageUpload onUploadSuccess={handleBannerSuccess} /> */}
                  <div
                    onClick={() => bannerRef.current?.click()}
                    className="border-2 border-dashed rounded-xl h-48 flex items-center justify-center cursor-pointer relative overflow-hidden"
                  >
                    {!variants.banner ? (
                      <p>Click to upload banner</p>
                    ) : (
                      <img
                        src={variants.banner.preview}
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  <input
                    ref={bannerRef}
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => handleBanner(e.target.files?.[0])}
                  />
                  {variants.banner && (
                    <img
                      src={variants.banner.preview}
                      className="h-32 w-24 object-cover rounded-md border mt-2"
                      alt="Preview"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            {/* --- SPECIFICATIONS SECTION --- */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">
                  Product Specifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Select Size (Multi-select)</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Small (240mm)",
                      "Medium (280mm)",
                      "Large (320mm)",
                      "Extra Large (360mm)",
                    ].map((s) => {
                      const isSelected = variants.attributes["size"]?.value
                        .split(",")
                        .includes(s);
                      return (
                        <Button
                          key={s}
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          className="rounded-full"
                          onClick={() => toggleSpecAttribute("size", s)}
                        >
                          {s} {isSelected && <X size={12} className="ml-1" />}
                        </Button>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label>Flow Type (Multi-select)</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Light Flow",
                      "Regular Flow",
                      "Heavy Flow",
                      "Overnight",
                    ].map((f) => {
                      const isSelected = variants.attributes["flow"]?.value
                        .split(",")
                        .includes(f);
                      return (
                        <Button
                          key={f}
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          className="rounded-full"
                          onClick={() => toggleSpecAttribute("flow", f)}
                        >
                          {f} {isSelected && <X size={12} className="ml-1" />}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>Brand Name</CardHeader>
              <CardContent>
                <RadioGroup
                  value={brand}
                  onValueChange={(value) => {
                    setBrand(value);
                   
                  }}
                  className="w-fit"
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="ovy" id="r1" />
                    <Label htmlFor="r1">Ovy</Label>
                  </div>

                  <div className="flex items-center gap-3">
                    <RadioGroupItem value="loway" id="r2" />
                    <Label htmlFor="r2">Loway</Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* filter section */}
            <ProductFilters
              productType={productType}
              setProductType={setProductType}
              size={size}
              setSize={setSize}
              flowType={flowType}
              setFlowType={setFlowType}
              material={material}
              setMaterial={setMaterial}
              cramps={cramps}
              setCramps={setCramps}
              sensitive={sensitive}
              setSensitive={setSensitive}
            />

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">Variant Sizes</span>

                  <Checkbox
                    checked={varientBox}
                    onCheckedChange={(val) => setVarientBox(!!val)}
                  />
                </CardTitle>
              </CardHeader>

              {varientBox && (
                <CardContent className="space-y-4">
                  {/* LIST */}
                  {variantBoxes.map((item, index) => (
                    <div
                      key={index}
                      className="border rounded-xl p-4 grid md:grid-cols-6 gap-4 items-center"
                    >
                      
                      <div className="col-span-1">
                        <div
                          onClick={() => fileRefs.current[index]?.click()}
                          className="h-20 w-20 border rounded-md overflow-hidden flex items-center justify-center bg-gray-100 cursor-pointer hover:opacity-80"
                        >
                          {item.image ? (
                            <img
                              src={item.image}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <span className="text-xs text-gray-400">
                              Upload
                            </span>
                          )}
                        </div>

                        {/* Hidden Input */}
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          ref={(el:any) => (fileRefs.current[index] = el)} 
                          onChange={(e) => handleVariantImage(e, index)}
                        />
                      </div>

                      {/* Name */}
                      <div className="col-span-2">
                        <Input
                          placeholder="Size Name (e.g. Small)"
                          value={item.name}
                          onChange={(e) =>
                            updateVariantBox(index, "name", e.target.value)
                          }
                        />
                      </div>

                      {/* Description */}
                      <div className="col-span-2">
                        <Input
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) =>
                            updateVariantBox(
                              index,
                              "description",
                              e.target.value,
                            )
                          }
                        />
                      </div>

                      {/* Delete */}
                      <div className="col-span-1 flex justify-end">
                        <Button
                        type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => removeVariantBox(index)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}

                  {/* ADD BUTTON */}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addVariantBox}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Variant
                  </Button>
                </CardContent>
              )}
            </Card>

            <GallerySection
              gallery={variants.gallery}
              galleryRef={galleryRef}
              handleGallery={handleGallery}
              setGallery={setGalleryForActive}
            />

            <>
  <AttributeSection
    productAttributes={variants.attributes}
    handleValueChange={(k, v) => {
      const current = variants.attributes;

      setVariants({
        ...variants,
        attributes: {
          ...current,
          [k]: {
            ...current[k],
            value: v,
          },
        },
      });
    }}
  />

  <ProductSpecificationSection
    productSpecifications={variants.attributes}
    handleSpecificationChange={(k, v) => {
      const current = variants.attributes;

      setVariants({
        ...variants,
        attributes: {
          ...current,
          [k]: {
            ...current[k],
            value: v,
          },
        },
      });
    }}
  />
</>
 

          </div>
        </div>
      </form>
    </div>
  );
}
