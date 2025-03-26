
export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  colors: string[];
  material: string;
  inStock: boolean;
  featured: boolean;
  reviews: Review[];
}

export interface Review {
  id: number;
  name: string;
  rating: number;
  date: string;
  comment: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Shadow Runner",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "Running",
    description: "Sleek, minimalist running shoes designed for urban explorers. The Shadow Runner combines advanced cushioning technology with a breathable upper for maximum comfort during your daily run.",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    colors: ["Black", "White", "Gray"],
    material: "Synthetic mesh with rubber outsole",
    inStock: true,
    featured: true,
    reviews: [
      {
        id: 1,
        name: "Alex Johnson",
        rating: 5,
        date: "2023-06-15",
        comment: "These shoes are incredibly comfortable. I've been running 5 miles daily with them and feel no discomfort."
      },
      {
        id: 2,
        name: "Taylor Smith",
        rating: 4,
        date: "2023-07-23",
        comment: "Great shoes but I wish they had more color options. The cushioning is perfect for long runs."
      }
    ]
  },
  {
    id: 2,
    name: "Elite Strider",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1605408499391-6368c628ef42?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "Running",
    description: "Professional-grade running shoes for serious athletes. The Elite Strider features our patented energy-return system that propels you forward with each step.",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["Blue", "Red", "Black"],
    material: "Performance knit with carbon fiber plate",
    inStock: true,
    featured: true,
    reviews: [
      {
        id: 1,
        name: "Chris Martinez",
        rating: 5,
        date: "2023-05-30",
        comment: "Used these for my marathon and they performed exceptionally well. Highly recommend for serious runners."
      }
    ]
  },
  {
    id: 3,
    name: "Urban Classic",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "Casual",
    description: "Timeless casual shoes that blend comfort with style. Perfect for everyday wear, the Urban Classic features premium materials and craftsmanship.",
    sizes: ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["White", "Black", "Tan"],
    material: "Genuine leather with rubber outsole",
    inStock: true,
    featured: false,
    reviews: [
      {
        id: 1,
        name: "Jamie Wilson",
        rating: 4,
        date: "2023-08-12",
        comment: "Very comfortable and stylish. The leather quality is excellent, but they took some time to break in."
      },
      {
        id: 2,
        name: "Morgan Lee",
        rating: 5,
        date: "2023-09-05",
        comment: "These have become my go-to shoes. They match with everything and are incredibly comfortable."
      },
      {
        id: 3,
        name: "Casey Brown",
        rating: 3,
        date: "2023-07-28",
        comment: "Decent shoes but the sizing runs a bit small. I had to exchange for a larger size."
      }
    ]
  },
  {
    id: 4,
    name: "Luxury Loafer",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1614253429340-98120bd6d753?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "Formal",
    description: "Handcrafted luxury loafers made from the finest materials. The epitome of sophistication, these shoes are perfect for formal occasions or making a statement.",
    sizes: ["US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["Brown", "Black", "Burgundy"],
    material: "Premium Italian leather with leather sole",
    inStock: true,
    featured: true,
    reviews: [
      {
        id: 1,
        name: "Jordan Rivera",
        rating: 5,
        date: "2023-06-20",
        comment: "Exceptional quality and craftsmanship. Worth every penny for a luxury shoe that will last years."
      }
    ]
  },
  {
    id: 5,
    name: "Trail Blazer",
    price: 179.99,
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "Hiking",
    description: "Rugged hiking shoes built for the toughest terrains. With superior grip and ankle support, the Trail Blazer keeps you safe and comfortable on any adventure.",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"],
    colors: ["Green", "Brown", "Gray"],
    material: "Waterproof leather with Vibram outsole",
    inStock: true,
    featured: false,
    reviews: [
      {
        id: 1,
        name: "Riley Thompson",
        rating: 5,
        date: "2023-08-05",
        comment: "Tackled several mountain trails with these, and they're phenomenal. Great grip and support."
      },
      {
        id: 2,
        name: "Avery Clark",
        rating: 4,
        date: "2023-07-15",
        comment: "Excellent hiking shoes. They kept my feet dry during a rainy hike, but they're a bit heavy."
      }
    ]
  },
  {
    id: 6,
    name: "Street Wave",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80",
    category: "Skateboarding",
    description: "Designed by skaters for skaters, the Street Wave offers durability and superior board feel. With reinforced high-wear areas, these shoes are built to last.",
    sizes: ["US 7", "US 8", "US 9", "US 10", "US 11"],
    colors: ["Black", "Navy", "Red"],
    material: "Suede and canvas with vulcanized rubber sole",
    inStock: false,
    featured: false,
    reviews: [
      {
        id: 1,
        name: "Quinn Moore",
        rating: 5,
        date: "2023-09-10",
        comment: "Best skate shoes I've owned. Great board feel and they're holding up well to daily skating."
      }
    ]
  }
];

export function getProductById(id: number): Product | undefined {
  return products.find(product => product.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter(product => product.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter(product => product.category === category);
}
