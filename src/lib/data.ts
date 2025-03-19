
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  collections: string[];
  colors: string[];
  sizes: string[];
  isFeatured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Pulse Wave Hoodie",
    description: "Ultra-comfortable oversized hoodie with vibrant gradient print. Made from premium cotton blend for maximum comfort and durability.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    category: "hoodies",
    collections: ["summer", "essentials"],
    colors: ["#9b87f5", "#f472b6", "#000000"],
    sizes: ["S", "M", "L", "XL"],
    isFeatured: true,
    isNew: true
  },
  {
    id: "p2",
    name: "Digital Pulse Tee",
    description: "Minimalist design with digital artwork print. Made from 100% organic cotton for breathability and softness.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    category: "t-shirts",
    collections: ["essentials", "graphic"],
    colors: ["#ffffff", "#000000", "#7dd3fc"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    isBestSeller: true
  },
  {
    id: "p3",
    name: "Horizon Oversized Jacket",
    description: "Lightweight technical jacket with futuristic design. Water-resistant and perfect for layering in all seasons.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=836&q=80",
    category: "jackets",
    collections: ["outerwear", "premium"],
    colors: ["#000000", "#7dd3fc", "#9b87f5"],
    sizes: ["S", "M", "L", "XL"],
    isFeatured: true,
    isNew: true
  },
  {
    id: "p4",
    name: "Nebula Cargo Pants",
    description: "Utility-inspired design with multiple pockets and comfortable fit. Made from durable cotton twill with slight stretch for mobility.",
    price: 84.99,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    category: "pants",
    collections: ["essentials", "streetwear"],
    colors: ["#000000", "#94a3b8", "#d8b4fe"],
    sizes: ["28", "30", "32", "34", "36"],
    isBestSeller: true
  },
  {
    id: "p5",
    name: "Synth Beanie",
    description: "Ribbed knit beanie with embroidered logo. Perfect for adding a finishing touch to any outfit.",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    category: "accessories",
    collections: ["essentials", "winter"],
    colors: ["#000000", "#9b87f5", "#f472b6"],
    sizes: ["One Size"],
    isBestSeller: true
  },
  {
    id: "p6",
    name: "Echo Platform Sneakers",
    description: "Chunky platform sneakers with gradient sole. Combines comfort with bold style for a statement look.",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    category: "shoes",
    collections: ["footwear", "premium"],
    colors: ["#ffffff", "#000000", "#d8b4fe"],
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    isFeatured: true
  },
  {
    id: "p7",
    name: "Matrix Crossbody Bag",
    description: "Compact utility bag with multiple compartments. Waterproof and perfect for carrying essentials on the go.",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1600857062241-98c0cc523c11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=798&q=80",
    category: "accessories",
    collections: ["accessories", "streetwear"],
    colors: ["#000000", "#9b87f5"],
    sizes: ["One Size"],
    isNew: true
  },
  {
    id: "p8",
    name: "Prism Oversized Sweater",
    description: "Luxurious knit sweater with unique texture and relaxed fit. Perfect for comfort without sacrificing style.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1624623278313-a930126a11c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    category: "sweaters",
    collections: ["winter", "essentials"],
    colors: ["#d8b4fe", "#7dd3fc", "#94a3b8"],
    sizes: ["S", "M", "L", "XL"],
    isBestSeller: true
  }
];

export const categories = [
  { id: "cat1", name: "Hoodies & Sweatshirts", slug: "hoodies", image: "https://images.unsplash.com/photo-1572495641004-28421ae29ed4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" },
  { id: "cat2", name: "T-Shirts", slug: "t-shirts", image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" },
  { id: "cat3", name: "Jackets", slug: "jackets", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" },
  { id: "cat4", name: "Pants", slug: "pants", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" },
  { id: "cat5", name: "Accessories", slug: "accessories", image: "https://images.unsplash.com/photo-1563903530908-afdd155d057a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" },
  { id: "cat6", name: "Shoes", slug: "shoes", image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" },
];

export const collections = [
  { id: "col1", name: "Summer Essentials", slug: "summer" },
  { id: "col2", name: "Winter Warmers", slug: "winter" },
  { id: "col3", name: "Streetwear", slug: "streetwear" },
  { id: "col4", name: "Premium Collection", slug: "premium" },
];

export const getProductsByCategory = (categorySlug: string): Product[] => {
  return products.filter(product => product.category === categorySlug);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getBestSellers = (): Product[] => {
  return products.filter(product => product.isBestSeller);
};

export const getRelatedProducts = (productId: string, count = 4): Product[] => {
  const product = getProductById(productId);
  if (!product) return [];
  
  const relatedProducts = products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, count);
    
  return relatedProducts;
};
