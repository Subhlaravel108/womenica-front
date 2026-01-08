"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { getBestSellers, Product, Pagination, mapApiProductToProduct } from "@/lib/api";
import { ChevronRight, Home, ChevronLeft, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const BestSellersClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);

  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBestSellers();
  }, [currentPage]);

  const fetchBestSellers = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1️⃣ Try loading from JSON file first
      try {
        const jsonRes = await fetch('/data/all_bestSeller_products.json');
        if (jsonRes.ok) {
          const jsonData = await jsonRes.json();
          // Filter bestseller products (isBestSeller: true)
          const bestSellerProducts = (jsonData.data || []).filter(
            (product: any) => product.isBestSeller === true
          );

          if (bestSellerProducts.length > 0) {
            // Map products to Product format
            const mappedProducts = bestSellerProducts.map(mapApiProductToProduct);

            // Calculate pagination
            const ITEMS_PER_PAGE = 12;
            const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
            const endIndex = startIndex + ITEMS_PER_PAGE;
            const paginatedProducts = mappedProducts.slice(startIndex, endIndex);
            const totalPages = Math.ceil(mappedProducts.length / ITEMS_PER_PAGE);

            setProducts(paginatedProducts);
            setPagination({
              total: mappedProducts.length,
              page: currentPage,
              limit: ITEMS_PER_PAGE,
              totalPages: totalPages,
            });
            
            console.log("✅ Loaded bestseller products from JSON");
            setLoading(false);
            return; // Successfully loaded from JSON
          }
        }
      } catch (jsonError) {
        console.warn("Failed to load from JSON, trying API...", jsonError);
      }

      // 2️⃣ Fallback to API if JSON fails
      const response = await getBestSellers(currentPage, 12);

      setProducts(response.products);
      setPagination(response.pagination);
      console.log("📡 Loaded bestseller products from API");
    } catch (err) {
      console.error("Failed to fetch bestseller products:", err);
      setError("Failed to load bestseller products. Please try again later.");
      setProducts([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/bestsellers?page=${newPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 pt-20">
        {/* Breadcrumb */}
        <div className="bg-secondary/30 py-4">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link
                href="/"
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Home className="h-4 w-4" />
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Best Sellers</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <section className="py-12 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Award className="h-5 w-5" />
                <span className="text-sm font-medium">Top Rated</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Best Sellers
              </h1>
              <p className="text-lg text-muted-foreground">
                Shop our most popular and best-selling products loved by customers
              </p>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
            {/* Results Info */}
            {!loading && pagination && (
              <div className="mb-8 text-center">
                <p className="text-sm text-muted-foreground">
                  {pagination.total > 0 ? (
                    <>
                      Showing {((currentPage - 1) * pagination.limit) + 1} - {Math.min(currentPage * pagination.limit, pagination.total)} of {pagination.total} bestseller products
                    </>
                  ) : (
                    "No bestseller products found"
                  )}
                </p>
              </div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-destructive" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                    Failed to Load Products
                  </h2>
                  <p className="text-muted-foreground mb-6">{error}</p>
                  <Button onClick={fetchBestSellers} variant="default">
                    Try Again
                  </Button>
                </div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <Award className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                    No Best Seller Products
                  </h2>
                  <p className="text-muted-foreground">
                    Check back soon for bestseller products.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
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
                    <div className="flex flex-wrap flex-row items-center justify-center gap-3 sm:gap-2 px-4">
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
                      <div className="flex items-center gap-1 flex-wrap justify-center max-w-full overflow-x-auto pb-0">
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
                                  className="min-w-[32px] sm:min-w-[40px] h-8 sm:h-8 text-xs sm:text-sm px-2 sm:px-3"
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
      </main>

      <Footer />
    </div>
  );
};

export default BestSellersClient;

