"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { getProducts, Product } from "@/lib/api";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        // Ensure data is an array
        if (Array.isArray(data)) {
          setProducts(data);
          setError(null);
        } else {
          console.error("Products data is not an array:", data);
          setError("Invalid data format received from server.");
          setProducts([]);
        }
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Failed to load products. Please try again later.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get featured products - filter by showingOnHomePage or take first 8
  // Note: showingOnHomePage filter should be done in API, but we can also filter here if needed
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm tracking-wider uppercase">
            Handpicked for You
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2">
            Featured Products
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Discover our carefully curated selection of trending products at amazing prices
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-96 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{error}</p>
          </div>
        ) : featuredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured products available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.slug}
                slug={product.slug}
                title={product.title}
                image={product.image}
                price={product.price}
                originalPrice={product.originalPrice}
                description={product.description}
                rating={product.rating}
                category={product.category}
                asin={product.asin}
              />
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button variant="soft" size="lg" asChild>
            <Link href="/category/sarees">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
