"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import api, { getProducts, Product, mapApiProductToProduct } from "@/lib/api";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


   const loadProducts = async () => {
  try {
    // 1️⃣ Try loading from local JSON file
    const res = await fetch("/data/featuredProducts_homepage.json");

    if (res.ok) {
      const data = await res.json();
      console.log("Loaded from file:", data);

      // Map JSON data to Product interface format using the shared mapping function
      const mappedProducts = data.data.map((item: any) => mapApiProductToProduct(item));
      setProducts(mappedProducts);
      setError(null);
      setLoading(false);
      return; 
    }

    throw new Error("Local JSON not found");
  } 
  catch (err) {
    console.warn("Local file load failed, calling API...", err);

    // 2️⃣ Fallback → API with Axios
    try {
      const apiRes = await getProducts();

      console.log("Loaded from API:", apiRes);

      setProducts(apiRes);  // axios → response.data
      setError(null);
    } 
    catch (apiErr) {
      console.error(apiErr);
      setError("Failed to load destinations from both file and API.");
    }
    finally {
      setLoading(false);
    }
  }
};


  useEffect(() => {
    loadProducts();
  }, []);


 const randomProducts = products
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);

  // const featuredProducts = products.slice(0, 8);

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
        ) : randomProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No featured products available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {randomProducts.map((product) => (
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
                amazon_link={product.amazon_link}
              />
            ))}
          </div>
        )}

        {/* <div className="text-center mt-12">
          <Button variant="soft" size="lg" asChild>
            <Link href="/category/sarees">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default FeaturedProducts;
