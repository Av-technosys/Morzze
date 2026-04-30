export const products = [
 {
    id: 1,
    brand: "MORZZE",
    name: "Granite Kitchen Sink (V02-119LX)",
    slug: "granite-kitchen-sink-v02",
    category: "GRANITE BASIN",
    sku: "MRZ-ST001",
    price: "6,400",
    oldPrice: "8,200",
    discount: "20% OFF",
    rating: 4,
    reviews: 56,
    isNew: true,
    image: "/granite-basin.png", // Main listing image
    images: ["/detailpage-demo.png", "/detailpage-demo.png", "/detailpage-demo.png", "/detailpage-demo.png"], // Gallery images
    description: "The Morzze Luxe Single Bowl Sink combines elegant design with robust functionality. Crafted from 304 Stainless Steel with a chrome finish, this piece elevates any kitchen space.",
    finishes: ["Chrome", "Brushed Gold", "Matte Black", "Rose Gold"],
    
    // --- Detail Page Extra Fields ---
    
    // 1. Tab Content Data
    tabs: [
      { label: "DESCRIPTION", content: "Introducing our premium 37\" Inch Top Mount Double Bowl Stainless Steel Kitchen Sink..." },
      { label: "DIMENSIONS", content: "Overall Dimensions: 37\" x 18\" x 9\" | Bowl Size: 16\" x 16\"" },
      { label: "FEATURES", content: "• High-grade Stainless Steel\n• Noise-dampening pads\n• Anti-condensation coating" },
      { label: "Accessories Included", content: "• High-grade Stainless Steel\n• Noise-dampening pads\n• Anti-condensation coating" },
      { label: "Documentation", content: "• High-grade Stainless Steel\n• Noise-dampening pads\n• Anti-condensation coating" }

    ],

    // 2. Specifications Table Data
    specs: [
      { label: "Material", value: "304 Stainless Steel" },
      { label: "Finish", value: "Chrome" },
      { label: "Dimensions", value: "354 × 289 × 238 mm" },
      { label: "Weight", value: "3.7 kg" },
      { label: "Warranty", value: "12 Months" },
      { label: "SKU", value: "MRZ-ST001" }
    ],

    // 3. Comparison Table Data
    comparison: {
      headers: ["FEATURE", "V02-119LX (LUXE)", "Standard Single Bowl", "Modern Series III"],
      rows: [
        { feature: "CORE MATERIAL", v02: "Obsidian Composite", standard: "Quartz Blend", modern: "Ceramic Coated" },
        { feature: "ACOUSTIC SHIELD", v02: true, standard: "Standard Pad", modern: "Single Layer" },
        { feature: "HEAT RESISTANCE", v02: "530°F", standard: "420°F", modern: "380°F" }
      ]
    },

    // 4. Care & Maintenance Data
    maintenance: [
      { title: "Daily Radiance", description: "Simple rinse with warm water and micro-fiber cloth.", type: "text" },
      { title: "Avoid These", items: ["Steel wool", "Bleach", "Acidic foods"], type: "list" }
    ],

    // 5. Ateliers/Gallery Images
    ateliers: ["/ateliers1.png", "/ateliers2.png", "/ateliers3.png", "/ateliers4.png"],

    // 6. FAQs
    faqs: [
      { question: "is the gold finish resistant to oxidation?", answer: "yes, our proprietary gold-architectural layer..." },
      { question: "can this be installed as a top-mount?", answer: "absolutely, it supports both configurations." }
    ]
  },
  {
    id: 2,
    name: "Oval Vessel Basin",
    slug: "oval-vessel-basin-2",
    category: "GRANITE BASIN",
    price: "6,400",
    oldPrice: "8,200",
    rating: 4,
    reviews: 38,
    discount: "-30%",
    image: "/piecedemo2.png", 
    isNew: true,
  },
  {
    id: 3,
    name: "Granite Kitchen Sink ( Vo2-116LX)",
    slug: "granite-kitchen-sink-v02",
    category: "GRANITE BASIN",
    price: "6,400",
    oldPrice: "8,200",
    rating: 4,
    reviews: 56,
    discount: "-30%",
    image: "/piecedemo3.png", 
    isNew: true,
  },
  {
    id: 4,
    name: "Granite Kitchen Sink ( Vo2-116LX)",
    slug: "granite-kitchen-sink-v03",
    category: "GRANITE BASIN",
    price: "6,400",
    oldPrice: "8,200",
    rating: 4,
    reviews: 56,
    discount: "-30%",
    image: "/piecedemo3.png", 
    isNew: true,
  },
  {
    id: 5,
    name: "Oval Vessel Basin",
    slug: "oval-vessel-basin-3",
    category: "GRANITE BASIN",
    price: "6,400",
    oldPrice: "8,200",
    rating: 4,
    reviews: 38,
    discount: "-30%",
    image: "/piecedemo2.png", 
    isNew: true,
  },
  {
    id: 6,
    name: "Oval Vessel Basin",
    slug: "oval-vessel-basin-4",
    category: "GRANITE BASIN",
    price: "6,400",
    oldPrice: "8,200",
    rating: 4,
    reviews: 38,
    discount: "-30%",
    image: "/granite-basin.png", 
    isNew: true,
  },
  {
    id: 7,
    name: "Granite Kitchen Sink ( Vo2-116LX)",
    slug: "granite-kitchen-sink-v04",
    category: "GRANITE BASIN",
    price: "6,400",
    oldPrice: "8,200",
    rating: 4,
    reviews: 56,
    discount: "-30%",
    image: "/piecedemo3.png", 
    isNew: true,
  },
  {
    id: 8,
    name: "Granite Kitchen Sink ( Vo2-116LX)",
    slug: "granite-kitchen-sink-v05",
    category: "GRANITE BASIN",
    price: "6,400",
    oldPrice: "8,200",
    rating: 4,
    reviews: 56,
    discount: "-30%",
    image: "/piecedemo3.png", 
    isNew: true,
  },
];