"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { getProductsByCategorySlug, Product, Category, Pagination, mapApiProductToProduct } from "@/lib/api";
import { AFFILIATE_TAG } from "@/data/products";
import { ChevronRight, Home, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { stripHtmlTags } from "@/lib/utils";

const CategoryClient = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  
  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);

        // 1️⃣ Try loading from JSON file first
        try {
          const jsonRes = await fetch("/data/all_products.json");
          if (jsonRes.ok) {
            const jsonData = await jsonRes.json();
            
            // Get category info from categories JSON
            const categoriesRes = await fetch("/data/categories_homepage.json");
            let categoryData: Category | null = null;
            
            if (categoriesRes.ok) {
              const categoriesData = await categoriesRes.json();
              const foundCategory = categoriesData.data?.find((cat: any) => cat.slug === slug);
              
              if (foundCategory) {
                categoryData = {
                  id: foundCategory._id,
                  title: foundCategory.title,
                  slug: foundCategory.slug,
                  description: foundCategory.description,
                  image: foundCategory.image,
                };
              }
            }

            if (categoryData && jsonData.data) {
              // Get category _id from the fetched category data
              const categoryId = (categoryData as any)._id || categoryData.id;
              
              // Filter products by category (match productCategoryId with category _id)
              const categoryProducts = jsonData.data.filter((product: any) => {
                // Try to match by productCategoryId
                if (product.productCategoryId === categoryId) {
                  return true;
                }
                // Or if we have category info in product
                if (product.category?.slug === slug || product.productCategory?.slug === slug) {
                  return true;
                }
                return false;
              });

              // Map products to Product format
              const mappedProducts = categoryProducts.map(mapApiProductToProduct);

              // Calculate pagination
              const itemsPerPage = 12;
              const startIndex = (currentPage - 1) * itemsPerPage;
              const endIndex = startIndex + itemsPerPage;
              const paginatedProducts = mappedProducts.slice(startIndex, endIndex);
              const totalPages = Math.ceil(mappedProducts.length / itemsPerPage);

              setCategory(categoryData);
              setCategoryProducts(paginatedProducts);
              setPagination({
                total: mappedProducts.length,
                page: currentPage,
                limit: itemsPerPage,
                totalPages: totalPages,
              });
              setLoading(false);
              console.log("Loaded category data from JSON");
              return; // Successfully loaded from JSON
            }
          }
        } catch (jsonError) {
          console.warn("Failed to load from JSON, trying API...", jsonError);
        }

        // 2️⃣ Fallback to API if JSON fails
        const response = await getProductsByCategorySlug(slug || "", currentPage, 12);
        
        setCategory(response.category);
        setCategoryProducts(response.products);
        setPagination(response.pagination);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch category data:", err);
        setError("Failed to load category. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCategoryData();
    }
  }, [slug, currentPage]);

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/category/${slug}?${params.toString()}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Skeleton loader for initial load
  if (loading && !category) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1">
          {/* Breadcrumb Skeleton */}
          <div className="bg-secondary/30 py-4">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
              <div className="h-5 bg-muted animate-pulse rounded w-48" />
            </div>
          </div>

          {/* Header Skeleton */}
          <section className="py-12 bg-gradient-to-b from-secondary/20 to-background">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 text-center">
              <div className="h-10 bg-muted animate-pulse rounded w-64 mx-auto mb-4" />
              <div className="h-6 bg-muted animate-pulse rounded w-96 mx-auto mb-2" />
              <div className="h-4 bg-muted animate-pulse rounded w-32 mx-auto" />
            </div>
          </section>

          {/* Products Grid Skeleton */}
          <section className="py-12">
            <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !category) {
    return (
      <>
        <Navbar />
      <div className="min-h-screen bg-background flex flex-col">
        <main className="h-[50vh]  flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold text-foreground mb-4">
              {error || "Category Not Found"}
            </h1>
            <Link href="/" className="text-primary hover:underline">Go back home</Link>
          </div>
        </main>
        <Footer />
      </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-secondary/30 py-4">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Home className="h-4 w-4" />
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">{category.title}</span>
            </nav>
          </div>
        </div>

        {/* Category Header */}
        <section className="py-12 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 text-center">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              {category.title}
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {(stripHtmlTags(category.description || "") || `Discover our handpicked collection of ${category.title.toLowerCase()} products. Quality items at the best prices from Amazon India.`)}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {pagination ? (
                <>
                  Showing {((currentPage - 1) * pagination.limit) + 1} - {Math.min(currentPage * pagination.limit, pagination.total)} of {pagination.total} products
                </>
              ) : (
                `Showing ${categoryProducts.length} products`
              )}
            </p>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : categoryProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No products found in this category.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {categoryProducts.map((product) => (
                    <ProductCard
                      key={product.slug}
                      slug={product.slug}
                      title={product.title}
                      image={product.image}
                      price={product.price}
                      originalPrice={product.originalPrice}
                      rating={product.rating}
                      category={product.category}
                      description={product.description}
                      amazon_link={product.amazon_link}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <div className="mt-12">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-2 px-4">
                      {/* Previous Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || loading}
                        className="min-w-[32px] sm:min-w-auto h-8 sm:h-9 text-xs sm:text-sm px-2 sm:px-3 flex items-center justify-center"
                      >
                        <ChevronLeft className="h-4 w-4 sm:mr-1" />
                        <span className="hidden sm:inline">Previous</span>
                      </Button>

                      {/* Page Numbers */}
                      <div className="flex items-center gap-1 flex-wrap justify-center max-w-full overflow-x-auto pb-2 sm:pb-0">
                        {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                          .filter((page) => {
                            return (
                              page === 1 ||
                              page === pagination.totalPages ||
                              (page >= currentPage - 1 && page <= currentPage + 1)
                            );
                          })
                          .map((page, index, array) => {
                            const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1;
                            return (
                              <div key={page} className="flex items-center gap-1">
                                {showEllipsisBefore && (
                                  <span className="px-1 sm:px-2 text-muted-foreground text-xs sm:text-sm">...</span>
                                )}
                                <Button
                                  variant={currentPage === page ? "default" : "outline"}
                                  size="sm"
                                  onClick={() => handlePageChange(page)}
                                  disabled={loading}
                                  className="min-w-[32px] sm:min-w-[40px] h-8 sm:h-9 text-xs sm:text-sm px-2 sm:px-3"
                                >
                                  {page}
                                </Button>
                              </div>
                            );
                          })}
                      </div>

                      {/* Next Button */}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === pagination.totalPages || loading}
                        className="min-w-[32px] sm:min-w-auto h-8 sm:h-9 text-xs sm:text-sm px-2 sm:px-3 flex items-center justify-center"
                      >
                        <span className="hidden sm:inline">Next</span>
                        <ChevronRight className="h-4 w-4 sm:ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* View More on Amazon */}
        <section className="pb-16">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12 text-center">
            <a
              href={`https://www.amazon.in/s?k=${encodeURIComponent(category.title + " women")}&tag=${AFFILIATE_TAG}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:bg-primary/90 transition-colors"
            >
              View More {category.title} on Amazon
              <ChevronRight className="h-5 w-5" />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryClient;


