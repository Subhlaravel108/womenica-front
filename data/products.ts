export interface Product {
  id: string;
  title: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  category: string;
  categorySlug: string;
  description: string;
  features: string[];
  asin: string;
}

export const AFFILIATE_TAG = "womanica-21";

export const getAmazonLink = (asin: string) => 
  `https://www.amazon.in/dp/${asin}?tag=${AFFILIATE_TAG}`;

export const products: Product[] = [
  // Sarees
  {
    id: "saree-1",
    title: "MANOHARI Jacquard Work Woven Banarasi Saree with Blouse Piece",
    image: "https://m.media-amazon.com/images/I/81SMaQoCBpL._AC_UL320_.jpg",
    price: "₹1,599",
    originalPrice: "₹9,999",
    rating: 4,
    category: "Sarees",
    categorySlug: "sarees",
    description: "Elegant Banarasi pattern jacquard saree perfect for weddings and festivals. Comes with unstitched blouse piece.",
    features: ["Soft Silk Fabric", "Jacquard Weaving", "Unstitched Blouse", "Rich Pallu Design", "Easy to Drape"],
    asin: "B0BZV847ZX"
  },
  {
    id: "saree-2",
    title: "SWORNOF Silk Kanjivaram Kanchipuram Saree With Blouse Piece",
    image: "https://m.media-amazon.com/images/I/81Sbh8m0wnL._AC_UL320_.jpg",
    price: "₹999",
    originalPrice: "₹3,999",
    rating: 4,
    category: "Sarees",
    categorySlug: "sarees",
    description: "Beautiful Kanjivaram silk saree with intricate sequence work. Ideal for weddings and special occasions.",
    features: ["Pure Silk", "Kanchipuram Style", "Sequence Work", "With Blouse Piece", "Traditional Design"],
    asin: "B0C3VHMRPH"
  },
  {
    id: "saree-3",
    title: "AMIRAT Banarasi Pattu Saree Cotton Party Wear Collection",
    image: "https://m.media-amazon.com/images/I/81NzCZvlAgL._AC_UL320_.jpg",
    price: "₹999",
    originalPrice: "₹3,299",
    rating: 4,
    category: "Sarees",
    categorySlug: "sarees",
    description: "Latest 2024 design Banarasi saree perfect for parties and weddings. Soft cotton blend for comfort.",
    features: ["Banarasi Design", "Cotton Blend", "Party Wear", "With Blouse Piece", "Modern Look"],
    asin: "B0D2L37KPY"
  },
  {
    id: "saree-4",
    title: "SWORNOF Kanjivaram Banarasi Silk Patola Saree",
    image: "https://m.media-amazon.com/images/I/71GXJozPXNL._AC_UL320_.jpg",
    price: "₹999",
    originalPrice: "₹4,999",
    rating: 4,
    category: "Sarees",
    categorySlug: "sarees",
    description: "Premium Patola design Banarasi silk saree with unstitched blouse piece. Perfect for festive occasions.",
    features: ["Patola Design", "Banarasi Silk", "Unstitched Blouse", "Premium Quality", "Festive Wear"],
    asin: "B0C62DX2G9"
  },
  {
    id: "saree-5",
    title: "SIRIL Soft Banarasi Silk Jacquard Saree with Blouse",
    image: "https://m.media-amazon.com/images/I/71H14jo-awL._AC_UL320_.jpg",
    price: "₹749",
    originalPrice: "₹2,999",
    rating: 4,
    category: "Sarees",
    categorySlug: "sarees",
    description: "Soft Banarasi silk saree with beautiful jacquard weaving. Elegant dark color perfect for any occasion.",
    features: ["Soft Banarasi Silk", "Jacquard Weaving", "With Blouse", "Elegant Design", "All Occasion Wear"],
    asin: "B0FHWLBXYZ"
  },

  // Fashion
  {
    id: "fashion-1",
    title: "SIRIL Women's Georgette Printed Saree with Blouse Piece",
    image: "https://m.media-amazon.com/images/I/71BrTYXuLLL._AC_UL320_.jpg",
    price: "₹499",
    originalPrice: "₹1,999",
    rating: 4,
    category: "Fashion",
    categorySlug: "fashion",
    description: "Trendy georgette printed saree perfect for casual and semi-formal occasions. Light and comfortable.",
    features: ["Georgette Fabric", "Printed Design", "Light Weight", "With Blouse Piece", "Easy Draping"],
    asin: "B0DRHB7K2S"
  },
  {
    id: "fashion-2",
    title: "Wedani Cotton Blend Printed Kurta Set for Women",
    image: "https://m.media-amazon.com/images/I/71yq8jP7SSL._AC_UL320_.jpg",
    price: "₹599",
    originalPrice: "₹1,499",
    rating: 4,
    category: "Fashion",
    categorySlug: "fashion",
    description: "Comfortable cotton blend kurta set with beautiful print. Perfect for daily wear and casual outings.",
    features: ["Cotton Blend", "Printed Design", "Comfortable Fit", "Kurta with Pant", "Daily Wear"],
    asin: "B0D5L7HNPK"
  },
  {
    id: "fashion-3",
    title: "Amazon Brand - Myx Women's A-Line Midi Dress",
    image: "https://m.media-amazon.com/images/I/61LJXq-Z1JL._AC_UL320_.jpg",
    price: "₹449",
    originalPrice: "₹1,199",
    rating: 4,
    category: "Fashion",
    categorySlug: "fashion",
    description: "Stylish A-line midi dress perfect for office and casual wear. Comfortable and elegant design.",
    features: ["A-Line Fit", "Midi Length", "Office Wear", "Comfortable", "Machine Washable"],
    asin: "B08R7HKQWM"
  },
  {
    id: "fashion-4",
    title: "Janasya Women's Rayon Anarkali Kurta",
    image: "https://m.media-amazon.com/images/I/71QzTT4KXKL._AC_UL320_.jpg",
    price: "₹699",
    originalPrice: "₹1,799",
    rating: 4,
    category: "Fashion",
    categorySlug: "fashion",
    description: "Elegant Anarkali kurta in premium rayon fabric. Beautiful embroidery and flare design.",
    features: ["Rayon Fabric", "Anarkali Style", "Embroidered", "Flared Design", "Party Wear"],
    asin: "B07XQVZWMH"
  },

  // Makeup
  {
    id: "makeup-1",
    title: "RENEE Fab Face Diva - 3 in 1 Makeup Stick",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80",
    price: "₹399",
    originalPrice: "₹699",
    rating: 4,
    category: "Makeup",
    categorySlug: "makeup",
    description: "3 in 1 makeup stick with eyeshadow, blush and lipstick. Long lasting and easy to apply.",
    features: ["3-in-1 Product", "Long Lasting", "Easy Application", "Travel Friendly", "Vibrant Colors"],
    asin: "B09QHYB7XW"
  },
  {
    id: "makeup-2",
    title: "Maybelline New York Sensational Liquid Matte Lipstick",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=80",
    price: "₹289",
    originalPrice: "₹399",
    rating: 4,
    category: "Makeup",
    categorySlug: "makeup",
    description: "Liquid matte lipstick with 16-hour stay power. Comfortable and non-drying formula.",
    features: ["Matte Finish", "16 Hour Stay", "Non-Drying", "Vibrant Color", "Easy Application"],
    asin: "B07PLLJNFR"
  },
  {
    id: "makeup-3",
    title: "MARS All In One Face Makeup Palette",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
    price: "₹449",
    originalPrice: "₹899",
    rating: 4,
    category: "Makeup",
    categorySlug: "makeup",
    description: "Complete face makeup palette with eyeshadows, blush, contour and highlighter. Perfect for beginners.",
    features: ["All-in-One Palette", "Multiple Shades", "Beginner Friendly", "High Pigmentation", "Portable"],
    asin: "B08G1NQKWR"
  },
  {
    id: "makeup-4",
    title: "Lakme Absolute Skin Dew Serum Foundation",
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=400&q=80",
    price: "₹599",
    originalPrice: "₹899",
    rating: 4,
    category: "Makeup",
    categorySlug: "makeup",
    description: "Lightweight serum foundation with dewy finish. Provides medium coverage with skincare benefits.",
    features: ["Serum Formula", "Dewy Finish", "Medium Coverage", "Lightweight", "SPF 20"],
    asin: "B08LKQJH7R"
  },

  // Beauty
  {
    id: "beauty-1",
    title: "Mamaearth Vitamin C Face Wash with Vitamin C & Turmeric",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
    price: "₹249",
    originalPrice: "₹349",
    rating: 4,
    category: "Beauty",
    categorySlug: "beauty",
    description: "Gentle face wash with Vitamin C and Turmeric for bright and glowing skin. Suitable for all skin types.",
    features: ["Vitamin C Formula", "With Turmeric", "Gentle Cleansing", "For All Skin Types", "Natural Ingredients"],
    asin: "B07Y3L5Z7K"
  },
  {
    id: "beauty-2",
    title: "Biotique Bio Morning Nectar Nourishing Face Lotion",
    image: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&q=80",
    price: "₹199",
    originalPrice: "₹299",
    rating: 4,
    category: "Beauty",
    categorySlug: "beauty",
    description: "Nourishing face lotion with morning nectar for soft and supple skin. Light and fast absorbing.",
    features: ["Morning Nectar", "Nourishing Formula", "Light Texture", "Fast Absorbing", "Daily Use"],
    asin: "B00DYE56HU"
  },
  {
    id: "beauty-3",
    title: "Plum Green Tea Clear Face Mask",
    image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80",
    price: "₹385",
    originalPrice: "₹490",
    rating: 4,
    category: "Beauty",
    categorySlug: "beauty",
    description: "Clay face mask with green tea for clear and acne-free skin. Removes excess oil and unclogs pores.",
    features: ["Green Tea Extract", "Clay Mask", "Oil Control", "Acne Fighting", "Pore Cleansing"],
    asin: "B07B61RDHJ"
  },
  {
    id: "beauty-4",
    title: "WOW Skin Science Vitamin C Serum",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
    price: "₹449",
    originalPrice: "₹699",
    rating: 4,
    category: "Beauty",
    categorySlug: "beauty",
    description: "Brightening vitamin C serum with hyaluronic acid. Reduces dark spots and fine lines.",
    features: ["Vitamin C Formula", "Hyaluronic Acid", "Brightening", "Anti-Aging", "Lightweight"],
    asin: "B08BKQQ8NP"
  },

  // Home Decor
  {
    id: "home-1",
    title: "Indianara Set of 3 Home Decorative Wall Paintings",
    image: "https://images.unsplash.com/photo-1582053433976-25c00369fc93?w=400&q=80",
    price: "₹379",
    originalPrice: "₹999",
    rating: 4,
    category: "Home Decor",
    categorySlug: "home-decor",
    description: "Beautiful set of 3 wall paintings for living room and bedroom. Modern abstract design.",
    features: ["Set of 3 Pieces", "Modern Design", "Ready to Hang", "High Quality Print", "Living Room Decor"],
    asin: "B0CGHVY8YR"
  },
  {
    id: "home-2",
    title: "Divine Icons Handmade Brass Diya Lamp for Pooja",
    image: "https://images.unsplash.com/photo-1603204077779-bed963ea7d0e?w=400&q=80",
    price: "₹299",
    originalPrice: "₹599",
    rating: 4,
    category: "Home Decor",
    categorySlug: "home-decor",
    description: "Traditional brass diya lamp for pooja and festivals. Handcrafted with intricate design.",
    features: ["Pure Brass", "Handcrafted", "Traditional Design", "Pooja Item", "Diwali Special"],
    asin: "B0BN7TQJVN"
  },
  {
    id: "home-3",
    title: "Solimo Cotton Cushion Covers Set of 5",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80",
    price: "₹449",
    originalPrice: "₹799",
    rating: 4,
    category: "Home Decor",
    categorySlug: "home-decor",
    description: "Soft cotton cushion covers in vibrant colors. Set of 5 with zipper closure.",
    features: ["100% Cotton", "Set of 5", "Zipper Closure", "Vibrant Colors", "Machine Washable"],
    asin: "B07N2LNPVR"
  },
  {
    id: "home-4",
    title: "TIED RIBBONS Decorative Buddha Statue for Home",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
    price: "₹399",
    originalPrice: "₹899",
    rating: 4,
    category: "Home Decor",
    categorySlug: "home-decor",
    description: "Beautiful Buddha statue for home decor and meditation. Peaceful and calming design.",
    features: ["Decorative Piece", "Meditation Corner", "Premium Quality", "Gift Item", "Indoor Decor"],
    asin: "B07DXGFVQP"
  },

  // Kitchen
  {
    id: "kitchen-1",
    title: "Prestige Omega Deluxe Non-Stick Cookware Set",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
    price: "₹2,499",
    originalPrice: "₹4,999",
    rating: 4,
    category: "Kitchen",
    categorySlug: "kitchen",
    description: "Premium non-stick cookware set with 3 pieces. Durable coating for healthy cooking.",
    features: ["Non-Stick Coating", "3 Piece Set", "Induction Compatible", "Durable", "Easy Cleaning"],
    asin: "B0B2LVK5QN"
  },
  {
    id: "kitchen-2",
    title: "Milton Thermosteel Flask 1 Litre",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80",
    price: "₹649",
    originalPrice: "₹1,195",
    rating: 4,
    category: "Kitchen",
    categorySlug: "kitchen",
    description: "Double wall vacuum insulated flask keeps beverages hot for 24 hours. Leakproof design.",
    features: ["24 Hour Hot", "1 Litre Capacity", "Leakproof", "Stainless Steel", "Easy Pour"],
    asin: "B08H8Q7SNM"
  },
  {
    id: "kitchen-3",
    title: "Cello Opalware Dazzle Dinner Set 19 Pieces",
    image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=400&q=80",
    price: "₹1,199",
    originalPrice: "₹2,500",
    rating: 4,
    category: "Kitchen",
    categorySlug: "kitchen",
    description: "Beautiful opalware dinner set with 19 pieces. Microwave safe and break resistant.",
    features: ["19 Pieces", "Opalware", "Microwave Safe", "Break Resistant", "Elegant Design"],
    asin: "B07Q3LPNHZ"
  },
  {
    id: "kitchen-4",
    title: "Borosil Klip N Store Glass Container Set",
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=400&q=80",
    price: "₹899",
    originalPrice: "₹1,499",
    rating: 4,
    category: "Kitchen",
    categorySlug: "kitchen",
    description: "Airtight glass containers for food storage. Set of 4 with microwave safe lids.",
    features: ["Glass Containers", "Airtight Seal", "Set of 4", "Microwave Safe", "BPA Free Lids"],
    asin: "B08KH8JMWL"
  },

  // Arts & Crafts
  {
    id: "arts-1",
    title: "Faber-Castell Colour Pencils Set of 48",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",
    price: "₹349",
    originalPrice: "₹545",
    rating: 5,
    category: "Arts & Crafts",
    categorySlug: "arts-crafts",
    description: "Premium quality colour pencils set with 48 vibrant colors. Perfect for artists and students.",
    features: ["48 Colors", "Premium Quality", "Break Resistant", "Vibrant Colors", "For All Ages"],
    asin: "B0019181UG"
  },
  {
    id: "arts-2",
    title: "Pidilite Fevicryl Acrylic Colors Set of 12",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&q=80",
    price: "₹199",
    originalPrice: "₹350",
    rating: 4,
    category: "Arts & Crafts",
    categorySlug: "arts-crafts",
    description: "High quality acrylic paints in 12 vibrant colors. Suitable for canvas, wood, and fabric painting.",
    features: ["12 Colors", "Acrylic Formula", "Multi-Surface", "Fast Drying", "Vibrant Finish"],
    asin: "B00AF9J2Y4"
  },
  {
    id: "arts-3",
    title: "Asian Hobby Crafts DIY Jewelry Making Kit",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80",
    price: "₹399",
    originalPrice: "₹699",
    rating: 4,
    category: "Arts & Crafts",
    categorySlug: "arts-crafts",
    description: "Complete jewelry making kit with beads, wires, and tools. Perfect for beginners.",
    features: ["Complete Kit", "Beads Included", "Tools Included", "Beginner Friendly", "DIY Project"],
    asin: "B07N2KQJN7"
  },
  {
    id: "arts-4",
    title: "Camel Oil Pastels Set of 50",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",
    price: "₹299",
    originalPrice: "₹460",
    rating: 4,
    category: "Arts & Crafts",
    categorySlug: "arts-crafts",
    description: "Smooth oil pastels set with 50 rich colors. Ideal for blending and creating art.",
    features: ["50 Colors", "Smooth Texture", "Rich Pigmentation", "Easy Blending", "For All Ages"],
    asin: "B00AFECWZ4"
  }
];

export const categories = [
  { name: "Sarees", slug: "sarees", count: products.filter(p => p.categorySlug === "sarees").length },
  { name: "Fashion", slug: "fashion", count: products.filter(p => p.categorySlug === "fashion").length },
  { name: "Makeup", slug: "makeup", count: products.filter(p => p.categorySlug === "makeup").length },
  { name: "Beauty", slug: "beauty", count: products.filter(p => p.categorySlug === "beauty").length },
  { name: "Home Decor", slug: "home-decor", count: products.filter(p => p.categorySlug === "home-decor").length },
  { name: "Kitchen", slug: "kitchen", count: products.filter(p => p.categorySlug === "kitchen").length },
  { name: "Arts & Crafts", slug: "arts-crafts", count: products.filter(p => p.categorySlug === "arts-crafts").length },
];

export const getProductsByCategory = (slug: string) => 
  products.filter(p => p.categorySlug === slug);

export const getProductById = (id: string) => 
  products.find(p => p.id === id);
