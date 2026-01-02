"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { getProductBySlug, getRelatedProducts, ProductDetail, Product } from "@/lib/api";
import { getAmazonLink, AFFILIATE_TAG } from "@/data/products";
import { ChevronRight, Home, Star, ShoppingCart, ExternalLink, Check, Share2 } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useToast } from "@/hooks/use-toast";
import { stripHtmlTags } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const ProductDetailClient = () => {
  const params = useParams();
  const slug = params?.id as string; // Using id param but it will be slug
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productData = await getProductBySlug(slug || "");
        if (productData) {
          setProduct(productData);
          setError(null);
          
          // Fetch related products from API
          // Try with MongoDB _id first (most likely what API expects)
          try {
            const related = await getRelatedProducts(productData._id);
            setRelatedProducts(related);
          } catch (err) {
            console.error("Failed to fetch related products with _id:", err);
            // Fallback: try with slug
            try {
              const related = await getRelatedProducts(productData.slug);
              setRelatedProducts(related);
            } catch (err2) {
              console.error("Failed to fetch related products with slug:", err2);
              setRelatedProducts([]);
            }
          }
        } else {
          setError("Product not found");
        }
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Failed to load product. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-1">
          {/* Breadcrumb Skeleton */}
          <div className="bg-secondary/30 py-4">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-16" />
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <Skeleton className="h-4 w-24" />
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                <Skeleton className="h-4 w-48" />
              </div>
            </div>
          </div>

          {/* Product Details Skeleton */}
          <section className="py-8 md:py-12">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
              <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Product Image Skeleton */}
                <div className="relative">
                  <Skeleton className="aspect-square rounded-2xl" />
                </div>

                {/* Product Info Skeleton */}
                <div className="flex flex-col">
                  {/* Title Skeleton */}
                  <Skeleton className="h-8 w-full mb-4" />
                  <Skeleton className="h-8 w-3/4 mb-4" />

                  {/* Rating Skeleton */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Skeleton key={i} className="h-5 w-5 rounded" />
                      ))}
                    </div>
                    <Skeleton className="h-4 w-12" />
                  </div>

                  {/* Price Skeleton */}
                  <div className="flex items-baseline gap-3 mb-6">
                    <Skeleton className="h-9 w-32" />
                    <Skeleton className="h-6 w-24" />
                  </div>

                  {/* Description Skeleton */}
                  <div className="mb-6 space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-4/6" />
                  </div>

                  {/* Features Skeleton */}
                  <div className="mb-8">
                    <Skeleton className="h-6 w-32 mb-3" />
                    <div className="space-y-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4 rounded" />
                          <Skeleton className="h-4 w-64" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons Skeleton */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                    <Skeleton className="h-12 w-full sm:w-auto sm:flex-1" />
                    <Skeleton className="h-12 w-full sm:w-auto sm:flex-1" />
                  </div>

                  {/* Affiliate Notice Skeleton */}
                  <Skeleton className="h-4 w-64 mt-4" />
                </div>
              </div>
            </div>
          </section>

          {/* Related Products Skeleton */}
          <section className="py-12 bg-secondary/20">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
              <Skeleton className="h-8 w-48 mx-auto mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="border border-border/50 rounded-2xl overflow-hidden shadow-elegant">
                    <Skeleton className="w-full h-56 md:h-64" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-5 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-6 w-24" />
                      <div className="flex gap-2">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 flex-1" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-foreground mb-4">
              {error || "Product Not Found"}
            </h1>
            <Link href="/" className="text-primary hover:underline">Go back home</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleShare = async () => {
    try {
      await navigator.share({
        title: product.title,
        text: `Check out ${product.title} at ${product.price}`,
        url: window.location.href,
      });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied!",
        description: "Product link has been copied to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary/30 py-4">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Home className="h-4 w-4" />
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              {product.categorySlug && (
                <Link href={`/category/${product.categorySlug}`} className="hover:text-primary transition-colors">
                  {product.category}
                </Link>
              )}
              {!product.categorySlug && (
                <span>{product.category}</span>
              )}
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium line-clamp-1">{product.title}</span>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <section className="py-8 md:py-12 lg:py-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
              {/* Product Image */}
              <div className="relative">
                <div className="aspect-square bg-card rounded-2xl overflow-hidden border border-border/50 shadow-elegant group">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain p-6 md:p-8 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="flex flex-col space-y-6">
                {/* Title */}
                <div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 leading-tight">
                    {product.title}
                  </h1>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < product.rating
                              ? "fill-gold text-gold"
                              : "fill-muted text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">({product.rating}.0)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3 pb-4 border-b border-border">
                  <span className="text-4xl md:text-5xl font-bold text-primary">{product.price}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-muted-foreground line-through">
                        {product.originalPrice}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">
                        {Math.round((1 - parseInt(product.price.replace(/[^\d]/g, '')) / parseInt(product.originalPrice.replace(/[^\d]/g, ''))) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Description */}
                {product.description && (
                  <div className="text-muted-foreground leading-relaxed space-y-3 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:space-y-2 [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h2]:mb-2 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mb-2 [&_strong]:font-semibold [&_strong]:text-foreground [&_a]:text-primary [&_a]:hover:underline">
                    <div 
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                )}

                {/* Features - Only show if features exist */}
                {product.features && product.features.length > 0 && (
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border/50">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4">Key Features:</h3>
                    <ul className="space-y-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 text-muted-foreground">
                          <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button
                    variant="default"
                    size="lg"
                    className="flex-1 text-base font-semibold shadow-lg hover:shadow-xl transition-shadow"
                    asChild
                  >
                    <a href={getAmazonLink(product.asin)} target="_blank" rel="noopener noreferrer">
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Buy on Amazon
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleShare}
                    className="flex-1 text-base font-semibold border-2 hover:bg-secondary hover:text-foreground transition-colors"
                  >
                    <Share2 className="mr-2 h-5 w-5" />
                    Share
                  </Button>
                </div>

                {/* Affiliate Notice */}
                <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    * As an Amazon Associate, we earn from qualifying purchases. Prices may vary.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-12 md:py-16 bg-secondary/20">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
              <div className="text-center mb-10">
                <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
                  Related Products
                </h2>
                <p className="text-muted-foreground">You might also like these products</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <ProductCard
                    key={relatedProduct.slug}
                    slug={relatedProduct.slug}
                    title={relatedProduct.title}
                    image={relatedProduct.image}
                    price={relatedProduct.price}
                    originalPrice={relatedProduct.originalPrice}
                    rating={relatedProduct.rating}
                    category={relatedProduct.category}
                    description={relatedProduct.description}
                    asin={relatedProduct.asin}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailClient;


