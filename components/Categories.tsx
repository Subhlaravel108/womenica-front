"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import CategoryCard from "./CategoryCard";
import { 
  Shirt, 
  Palette, 
  Sparkles, 
  Home, 
  ChefHat, 
  PaintBucket,
  Gem,
  LucideIcon
} from "lucide-react";
import { getProductCategories, Category } from "@/lib/api";
import { stripHtmlTags } from "@/lib/utils";

// Icon mapping for categories
const iconMap: Record<string, LucideIcon> = {
  "sarees": Shirt,
  "fashion": Gem,
  "makeup": Palette,
  "beauty": Sparkles,
  "home-decor": Home,
  "home_decor": Home,
  "kitchen": ChefHat,
  "arts-crafts": PaintBucket,
  "arts_crafts": PaintBucket,
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getProductCategories();
        // Ensure data is an array
        if (Array.isArray(data)) {
          setCategories(data);
          setError(null);
        } else {
          console.error("Categories data is not an array:", data);
          setError("Invalid data format received from server.");
          setCategories([]);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setError("Failed to load categories. Please try again later.");
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section id="categories" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 md:mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto px-4">
            Explore our carefully curated categories featuring the best products 
            handpicked for modern women.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-64 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No categories available.</p>
          </div>
        ) : Array.isArray(categories) && categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category) => {
              const Icon = iconMap[category.slug] || Gem;
              // Strip HTML tags from description
              const cleanDescription = stripHtmlTags(category.description || "");
              return (
                <Link key={category.slug || category.id} href={`/category/${category.slug}`}>
                  <CategoryCard
                    title={category.title}
                    description={cleanDescription}
                    icon={Icon}
                    image={category.image || ""}
                  />
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No categories available.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
