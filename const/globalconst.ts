/* eslint-disable @typescript-eslint/no-explicit-any */
// export const COLORS = [
//   { value: "white", label: "White", hex: "#FFFFFF" },
//   { value: "off-white", label: "Off White", hex: "#FAF9F6" },
//   { value: "ivory", label: "Ivory", hex: "#FFFFF0" },
//   { value: "black", label: "Black", hex: "#000000" },
//   { value: "gray", label: "Gray", hex: "#808080" },
//   { value: "ash-gray", label: "Ash Gray", hex: "#B2BEB5" },
//   { value: "charcoal", label: "Charcoal", hex: "#36454F" },
//   { value: "beige", label: "Beige", hex: "#F5F5DC" },
//   { value: "cream", label: "Cream", hex: "#FFFDD0" },
//   { value: "taupe", label: "Taupe", hex: "#483C32" },
//   { value: "brown", label: "Brown", hex: "#8B4513" },
//   { value: "mocha", label: "Mocha", hex: "#3B2F2F" },
//   { value: "tan", label: "Tan", hex: "#D2B48C" },

import { User2 } from "lucide-react";

//   { value: "red", label: "Red", hex: "#FF0000" },
//   { value: "crimson", label: "Crimson", hex: "#DC143C" },
//   { value: "scarlet", label: "Scarlet", hex: "#FF2400" },
//   { value: "maroon", label: "Maroon", hex: "#800000" },
//   { value: "tomato", label: "Tomato", hex: "#FF6347" },
//   { value: "orange", label: "Orange", hex: "#FFA500" },
//   { value: "burnt-orange", label: "Burnt Orange", hex: "#CC5500" },
//   { value: "copper", label: "Copper", hex: "#B87333" },
//   { value: "mahogany", label: "Mahogany", hex: "#C04000" },

//   { value: "blue", label: "Blue", hex: "#0000FF" },
//   { value: "navy", label: "Navy Blue", hex: "#000080" },
//   { value: "denim", label: "Denim Blue", hex: "#1E3A5F" },
//   { value: "sky-blue", label: "Sky Blue", hex: "#87CEEB" },
//   { value: "sapphire", label: "Sapphire", hex: "#0F52BA" },
//   { value: "cobalt", label: "Cobalt Blue", hex: "#0047AB" },
//   { value: "indigo", label: "Indigo", hex: "#4B0082" },

//   { value: "green", label: "Green", hex: "#008000" },
//   { value: "olive", label: "Olive", hex: "#808000" },
//   { value: "forest-green", label: "Forest Green", hex: "#228B22" },
//   { value: "moss-green", label: "Moss Green", hex: "#8A9A5B" },
//   { value: "sage", label: "Sage Green", hex: "#9CAF88" },
//   { value: "emerald", label: "Emerald", hex: "#50C878" },
//   { value: "jade", label: "Jade", hex: "#00A86B" },
//   { value: "seafoam", label: "Seafoam", hex: "#9FE2BF" },
//   { value: "teal", label: "Teal", hex: "#008080" },
//   { value: "turquoise", label: "Turquoise", hex: "#40E0D0" },

//   { value: "yellow", label: "Yellow", hex: "#FFFF00" },
//   { value: "mustard", label: "Mustard", hex: "#FFDB58" },
//   { value: "lemon", label: "Lemon", hex: "#FFFACD" },
//   { value: "gold", label: "Gold", hex: "#FFD700" },

//   { value: "pink", label: "Pink", hex: "#FFC0CB" },
//   { value: "light-pink", label: "Light Pink", hex: "#FFB6C1" },
//   { value: "hot-pink", label: "Hot Pink", hex: "#FF69B4" },
//   { value: "fuchsia", label: "Fuchsia", hex: "#FF00FF" },
//   { value: "magenta", label: "Magenta", hex: "#FF0090" },
//   { value: "rose-gold", label: "Rose Gold", hex: "#B76E79" },

//   { value: "purple", label: "Purple", hex: "#800080" },
//   { value: "lavender", label: "Lavender", hex: "#E6E6FA" },
//   { value: "violet", label: "Violet", hex: "#8A2BE2" },
//   { value: "amethyst", label: "Amethyst", hex: "#9966CC" },
//   { value: "plum", label: "Plum", hex: "#8E4585" },
//   { value: "wine", label: "Wine", hex: "#722F37" },
//   { value: "burgundy", label: "Burgundy", hex: "#800020" },

//   { value: "rust", label: "Rust", hex: "#B7410E" },
//   { value: "terracotta", label: "Terracotta", hex: "#E2725B" },
//   { value: "clay", label: "Clay", hex: "#B66A50" },
//   { value: "coffee", label: "Coffee", hex: "#6F4E37" },
//   { value: "chestnut", label: "Chestnut", hex: "#954535" },

//   { value: "silver", label: "Silver", hex: "#C0C0C0" },
//   { value: "bronze", label: "Bronze", hex: "#CD7F32" },
//   { value: "champagne", label: "Champagne", hex: "#F7E7CE" },
// ];
export const COLORS = [
  { value: "green", label: "Green", hex: "#008000" },
  { value: "red", label: "Red", hex: "#FF0000" },
  { value: "purple", label: "Purple", hex: "#800080" },
  { value: "gold", label: "Gold", hex: "#FFD700" },
  { value: "lavender", label: "Lavender", hex: "#E6E6FA" },
  { value: "yellow", label: "Yellow", hex: "#FFFF00" },
  { value: "sky-blue", label: "Sky Blue", hex: "#87CEEB" },
  { value: "violet", label: "Violet", hex: "#8A2BE2" }, // interpreted as light purple
  { value: "amethyst", label: "Amethyst", hex: "#9966CC" }, // also light purple-ish
  { value: "gray", label: "Gray", hex: "#808080" },
  { value: "ash-gray", label: "Ash Gray", hex: "#B2BEB5" },
  { value: "champagne", label: "Champagne", hex: "#F7E7CE" }, // golden-gray tone
  { value: "green", label: "Green", hex: "#008000" },
  { value: "red", label: "Red", hex: "#FF0000" },
  { value: "purple", label: "Purple", hex: "#800080" },
  { value: "gold", label: "Gold", hex: "#FFD700" },
  { value: "lavender", label: "Lavender", hex: "#E6E6FA" },
  { value: "yellow", label: "Yellow", hex: "#FFFF00" },
  { value: "sky-blue", label: "Sky Blue", hex: "#87CEEB" },
  { value: "violet", label: "Violet", hex: "#8A2BE2" }, // interpreted as light purple
  { value: "amethyst", label: "Amethyst", hex: "#9966CC" }, // also light purple-ish
  { value: "gray", label: "Gray", hex: "#808080" },
  { value: "ash-gray", label: "Ash Gray", hex: "#B2BEB5" },
  { value: "champagne", label: "Champagne", hex: "#F7E7CE" }, // golden-gray tone
];

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "semi-stitched"];
export const MATERIALS = ["Cotton", "Wool", "Silk", "Leather", "Linen"];

export const CATEGORY_1 = [
  {
    id: "c1a1e1b1-1234-4d3a-9f0a-abc111def001",
    name: "Sarees",
    slug: "sarees",
    image: "/category/sarees.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b2-1234-4d3a-9f0a-abc111def002",
    name: "Occasion Wear",
    slug: "occasion-wear",
    image: "/category/occasion-wear.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b3-1234-4d3a-9f0a-abc111def003",
    name: "Kurtas",
    slug: "kurtas",
    image: "/category/kurtas.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b4-1234-4d3a-9f0a-abc111def004",
    name: "Kurta Sets",
    slug: "kurta-sets",
    image: "/category/kurta-sets.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b5-1234-4d3a-9f0a-abc111def005",
    name: "Loungewear",
    slug: "loungewear",
    image: "/category/loungewear.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b6-1234-4d3a-9f0a-abc111def006",
    name: "Ethnic Dresses",
    slug: "ethnic-dresses",
    image: "/category/ethnic-dresses.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b7-1234-4d3a-9f0a-abc111def007",
    name: "Co-ord Sets",
    slug: "co-ord-sets",
    image: "/category/co-ord-sets.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b8-1234-4d3a-9f0a-abc111def008",
    name: "Dupattas",
    slug: "dupattas",
    image: "/category/dupattas.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b9-1234-4d3a-9f0a-abc111def009",
    name: "Ready To Wear",
    slug: "ready-to-wear",
    image: "/category/ready-to-wear.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b10-1234-4d3a-9f0a-abc111def010",
    name: "Bottom Wear",
    slug: "bottom-wear",
    image: "/category/bottom-wear.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b11-1234-4d3a-9f0a-abc111def011",
    name: "Festive Collection",
    slug: "festive-collection",
    image: "/category/festive-collection.jpg?w=300&h=300",
  },
  {
    id: "c1a1e1b12-1234-4d3a-9f0a-abc111def012",
    name: "Winter Wear",
    slug: "winter-wear",
    image: "/category/winter-wear.jpg?w=300&h=300",
  },
];

export const moreSidebarCategories = [
  {
    id: 11,
    name: "Clearance",
    slug: "clearance",
  },
];

export const CATEGORY_2 = [
  {
    id: "7f5a8f99-fbdc-472b-b43a-cc9dc12e1ddd",
    name: "Summer Vibes",
    slug: "summer-vibes",
    image: "/categoryimage.png",
  },
  {
    id: "cbaf4d2b-9fd2-465b-b55e-9c8734ae2eee",
    name: "Trendy",
    slug: "trendy",
    image: "/categoryimage.png",
  },
  {
    id: "52b3df7c-e8b5-4f4a-b2c7-8423dd0f4fff",
    name: "Festival Season",
    slug: "festival-season",
    image: "/categoryimage.png",
  },
  {
    id: "9f2ce7f1-43aa-4a0d-8cfa-b7dc12ab1aaa",
    name: "Casual",
    slug: "casual",
    image: "/categoryimage.png",
  },
];

export const ORDER_STATUS = [
  {
    id: "91ef9b1e-1cb6-4f0f-aee4-77dfbe227a87",
    status: "pending",
    color: "#facc15", // yellow
  },
  {
    id: "f2b50957-93ae-4c49-91ea-5b52d3c89743",
    status: "processing",
    color: "#60a5fa", // blue
  },
  {
    id: "1c9c5038-94b0-4607-8203-f6ea72b5617d",
    status: "shipped",
    color: "#38bdf8", // light blue
  },
  {
    id: "ae0d91c0-736b-4b4c-8e90-2275cd14c47b",
    status: "delivered",
    color: "#10b981", // Teal / Success
  },
];

export const quizQuestions = [
  {
    id: 1,
    question: "What describe your flow ?",
    options: [
      { icon: User2, label: "light flow", slug:"ligth_flow" },
      { icon: User2, label: "medium flow",slug:"medium_flow" },
      { icon: User2, label: "heavy flow", slug:"heavy_flow" },
      { icon: User2, label: "Unsure", slug:"unsure" },
    ],
  },
  {
    id: 2,
    question: "Do you experience cramps or discomfort?",
    options: [
      { icon: User2, label: "No Discomfort", slug:"no_discomfort" },
      { icon: User2, label: "Mild Discomfort", slug:"mild_discomfort" },
      { icon: User2, label: "Severe Cramps", slug:"severe_cramps" },
      { icon: User2, label: "Varies", slug:"varies" },
    ],
  },
  {
    id: 3,
    question: "What is your preferred material for period products?",
    options: [
      { icon: User2, label: "Cotton", slug:"organic_cotton" },
      { icon: User2, label: "Synthetic Blend", slug:"synthetic_blend" },
      { icon: User2, label: "Medical Grade Silicon", slug:"medical_grade_silicon" },
      { icon: User2, label: "Unsure" , slug:"unsure"},
    ],
  },
  {
    id: 4,
    question:
      "Do you have any allergies or sensitivities to certain materials?",
    options: [
      { icon: User2, label: "No Allergies", slug:"no_allergies" },
      { icon: User2, label: "Sensitive Skin", slug:"sensitive_skin" },
      { icon: User2, label: "Allergic Reactions", slug:"allergic_reactions" },
      { icon: User2, label: "Not Sure", slug:"not_sure" },
    ],
  },
];

export const pageSize = 10;
// export const tempUserId = "c263327b-3958-4fe8-b0b9-1ca3711f7c9c"
// export const tempUserId = userId
export const canResendOTPInterval = 10; // in seconds
export const isUUID = (identifier: string) =>
  /^[0-9a-fA-F-]{36}$/.test(identifier);

export const tempUserId = "63089f34-5276-481f-bc92-f75ff1ad24a5";
export const bestSellingSlug = "best-selling-products";
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CategorySection = {
  type: "categories";
  props: {
    title: string;
    description: string;
    limit: number;
  };
};

type StorySection = {
  type: "story";
  props: {
    badgeText: string;
    title: string;
    highlight: string;
    image: string;
    primaryColor: string;
    gradientFrom: string;
    gradientTo: string;
    bgAccent: string;
    paragraphs: string[];
  };
};

type Props = {
  title?: string;
  bgColor?: string;
  buttonVariant?: "default" | "outline";
  buttonColor?: string;
};

type ProductSection = {
  type: "products" | "newArrivals";
  props: Props;
};

type StatsSection = {
  type: "stats";
  props:
    | {
        variant?: "stats";
        stats: { value: string; label: string }[];
        bullets: string[];
        image: string;
        gradientFrom: string;
        gradientTo: string;
      }
    | {
        variant: "banner";
        title: string;
        highlight: string;
        subtitle: string;
        image: string;
        bgColor: string;
      };
};

type BrandWhySection = {
  type: "brandWhy";
  props: {
    title: string;
    primaryColor: string;
  };
};

type ourStory = {
  badgeText: string;
  title: string;
  highlight: string;
  paragraphs: string[];
  image: string;
  primaryColor: string;
  gradientFrom: string;
  gradientTo: string;
  bgAccent: string;
  tickerText: string;
  tickerColor?: string;
};

type OurStorySection = {
  type: "ourStory";
  props: ourStory;
};

type InstagramSectionProps = {
  title: string;
  username: string;
  gradientFrom: string;
  gradientTo: string;
  textColor: string;
  buttonColor: string;
};

type InstagramSection = {
  type: "instagram";
  props: InstagramSectionProps;
};

type TestimonialsSection = {
  type: "testimonials";
  props: {
    primaryColor: string;
    bgColor: string;
  };
};

type NewsletterSection = {
  type: "newsletter";
  props: {
    buttonColor: string;
    overlayColor: string;
  };
};

type ProductCategoriesSection = {
  type: "productCategories";
};

type BlogSection = {
  type: "blog";
};

type Section =
  | CategorySection
  | StorySection
  | ProductSection
  | OurStorySection
  | StatsSection
  | BrandWhySection
  | InstagramSection
  | TestimonialsSection
  | NewsletterSection
  | ProductCategoriesSection
  | BlogSection;

export const brandDataMap: Record<
  string,
  {
    "bg-color": string;
    hero: any;
    sections: Section[];
  }
> = {
  ovy: {
    "bg-color": "#FFF4F9",
    hero: {
      logo: "/ovy-main.png",
      title: "Gentle Care, Beautiful You",
      subtitle:
        "Premium, dermatologically-tested products with soothing lavender essence for sensitive skin",
      description: "Soothing lavender essence",
      bgImage: "/ovy-bg.png",
      primaryColor: "#AF71A7",
      secondaryColor: "#FFFFFF4F",
      opacity: 0.3,
    },

    sections: [
      {
        type: "categories",
        props: {
          title: "Shop Ovy Categories",
          description: "Explore Ovy hygiene range",
          limit: 4,
        },
      },
      {
        type: "story",
        props: {
          badgeText: "Own Your Cycle",
          title: "The",
          highlight: "Nakd",
          image: "/thestory.png",
          primaryColor: "#AF71A7",
          gradientFrom: "#C08497",
          gradientTo: "#F9A8D4",
          bgAccent: "#FCE7F3",
          paragraphs: [
            `Good hygiene is not just about routine — it’s about feeling comfortable, confident, and cared for every single day. At Potent Hygiene, we believe personal care should be simple, honest, and empowering.

Our goal is to make hygiene conversations normal and accessible by providing products and information that support everyday well-being. Whether it’s daily freshness, intimate care, or overall hygiene, we focus on solutions that respect your body and your lifestyle.

We encourage awareness, informed choices, and self-care without hesitation or stigma. Because when hygiene becomes effortless, confidence follows naturally.`,
          ],
        },
      },
      {
        type: "products",
        props: {
          title: "Best Selling Products",
          bgColor: "#AF71A7",
          buttonColor: "#AF71A7",
        },
      },
      {
        type: "ourStory",
        props: {
          badgeText: "Our Story",
          tickerColor: "",
          title: "Built for Women,",
          highlight: "By Women",
          image: "/our-story-ovy.png",
          primaryColor: "#AF71A7",
          gradientFrom: "#C08497",
          gradientTo: "#F9A8D4",
          bgAccent: "#FCE7F3",
          tickerText: "Ovy - Where Your Wellness Comes First",
          paragraphs: [
            `Ovy was created for women who seek gentle, premium care. Infused with natural lavender essence and crafted with the softest materials, every product is designed to pamper and protect.`,
            `Our mission is to deliver dermatologically-tested, premium hygiene products that combine gentle care with elegant comfort for sensitive skin.`,
          ],
        },
      },
      {
        type: "newArrivals",
        props: {
          title: "New Arriving Products",
          bgColor: "#AF71A7",
          buttonColor: "#AF71A7",
        },
      },
      {
        type: "stats",
        props: {
          variant: "stats",
          stats: [
            {
              value: "98%",
              label:
                "of users expressed a preference for OVY our pads & liners",
            },
            {
              value: "96%",
              label:
                "of users observed a ehnace osnhances comfort and discietien",
            },
            {
              value: "3.9/5",
              label: "was the average rating received by OVY product portfolio",
            },
            {
              value: "91%",
              label:
                "of user noted enhanced hydration and suppleness of skin after using our products",
            },
          ],
          bullets: [
            "Dermatologist Approved",
            "Hypoallergenic",
            "Eco Friendly",
            "Cruelty Free",
          ],
          image: "/stats-ovy.png",
          gradientFrom: "#C08497",
          gradientTo: "#A78BFA",
        },
      },
      {
        type: "brandWhy",
        props: {
          title: "Why Choose Ovy?",
          primaryColor: "#AF71A7",
        },
      },
      {
        type: "instagram",
        props: {
          title: "Join Our Community",
          username: "@potenthygiene",
          gradientFrom: "#C08497",
          gradientTo: "#A78BFA",
          textColor: "#FFFFFF",
          buttonColor: "#AF71A7",
        },
      },
      {
        type: "testimonials",
        props: {
          primaryColor: "#AF71A7",
          bgColor: "#FCE7F3",
        },
      },
      { type: "productCategories" },
      {
        type: "newsletter",
        props: {
          buttonColor: "#AF71A7",
          overlayColor: "rgba(0,0,0,0.5)",
        },
      },
      {
        type: "blog",
      },
    ],
  },

  loway: {
    "bg-color": "#F8F6F1",
    hero: {
      logo: "/loway-main.png",
      title: "Bright Comfort, Every Day",
      subtitle:
        "Vibrant, eco-friendly hygiene solutions designed for active lifestyles and everyday comfort",
      description: "Designed for active lifestyles",
      bgImage: "/loway-bg.png",
      primaryColor: "#016271",
      secondaryColor: "#F6DC52",
    },

    sections: [
      {
        type: "categories",
        props: {
          title: "Shop Loway Categories",
          description:
            "Discover our range of premium feminine hygiene products, thoughtfully crafted for your comfort and wellness.",
          limit: 4,
        },
      },
      {
        type: "story",
        props: {
          badgeText: "Own Your Cycle",
          title: "The",
          highlight: "Nakd",
          image: "/loway-story.png",
          primaryColor: "#FACC15",
          gradientFrom: "#016171",
          gradientTo: "#B1D7DE",
          bgAccent: "#FEF9C3",
          paragraphs: [
            `Good hygiene is not just about routine — it’s about feeling comfortable, confident, and cared for every single day. At Potent Hygiene, we believe personal care should be simple, honest, and empowering.

Our goal is to make hygiene conversations normal and accessible by providing products and information that support everyday well-being. Whether it’s daily freshness, intimate care, or overall hygiene, we focus on solutions that respect your body and your lifestyle.

We encourage awareness, informed choices, and self-care without hesitation or stigma. Because when hygiene becomes effortless, confidence follows naturally.`,
          ],
        },
      },
      {
        type: "products",
        props: {
          title: "Best Selling Products",
          bgColor: "",
          buttonColor: "",
        },
      },
      {
        type: "ourStory",
        props: {
          badgeText: "Our Story",
          title: "Built for Women,",
          highlight: "By Women",
          image: "/our-story-loway.png",
          primaryColor: "#FACC15",
          gradientFrom: "#016171",
          gradientTo: "#B1D7DE",
          bgAccent: "#FEF9C3",
          tickerText: "Loway - Where Your Wellness Comes First",
          tickerColor: "#016271",
          paragraphs: [
            `Looway was created for women who seek gentle, premium care. Infused with natural lavender essence and crafted with the softest materials, every product is designed to pamper and protect.`,
            `Our mission is to deliver dermatologically-tested, premium hygiene products that combine gentle care with elegant comfort for sensitive skin.`,
          ],
        },
      },
      {
        type: "newArrivals",
        props: {
          title: "New Arriving Products",
          bgColor: "#AF71A7",
          buttonColor: "#AF71A7",
        },
      },
      {
        type: "stats",
        props: {
          variant: "banner",
          title: "Pure Comfort",
          highlight: "Naturally Protected",
          subtitle: "For Modern Feminine Wellness",
          image: "/stats-loway.png",
          bgColor: "#016271",
        },
      },
      {
        type: "brandWhy",
        props: {
          title: "Why Choose Loway?",
          primaryColor: "#3B82F6",
        },
      },
      {
        type: "instagram",
        props: {
          title: "Join Our Community",
          username: "@potenthygiene",
          gradientFrom: "#F6DC52",
          gradientTo: "#FFF7CB",
          textColor: "#1F2937",
          buttonColor: "#1F2937",
        },
      },
      {
        type: "testimonials",
        props: {
          primaryColor: "#3B82F6",
          bgColor: "#EFF6FF",
        },
      },
      {
        type: "productCategories",
      },
      {
        type: "newsletter",
        props: {
          buttonColor: "#016271",
          overlayColor: "rgba(0,0,0,0.3)",
        },
      },
      {
        type: "blog",
      },
    ],
  },
};

export const BrandProductColors = {
  ovy: "#AF71A7",
  loway: "#F6DC52",
};

export const subscriptionPlans = [
  {
    id: "1",
    label: "Monthly Subscription",
    price: "₹239",
    period: 1,
  },
  { id: "2", label: "Every 2 Months", price: "₹229", period: 2 },
  { id: "3", label: "Every 3 Months", price: "₹219", period: 3 },
];

export const ovyProductDetailsPage = {
  lightColor: "#FBF1FB",
  darkColor: "#B076A8",
  productDescription: "#EFEDE0",
  textColor: "#374151",
  // rating:"#EFEDE0",
  // imageBg:"#DDC0DC"
};

export const lowayProductDetailsPage = {
  lightColor: "#FBF1A6",
  darkColor: "#F6DC52",
  productDescription: "#EFEDE0",
  textColor: "#374151",
  // rating:"#EFEDE0",
  // imageBg:"#F6DC52"
};
