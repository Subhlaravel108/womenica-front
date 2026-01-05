"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { searchProducts, Product, Pagination } from "@/lib/api";
import { ChevronRight, Home, ChevronLeft, Search as SearchIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  useEffect(() => {
    fetchSearchResults();
  }, [query, currentPage]);

  const fetchSearchResults = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Use empty string to fetch all products when query is empty
      const searchQuery = query || "";
      const response = await searchProducts(searchQuery, currentPage, 12);
            
      setProducts(response.products);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Failed to fetch search results:", err);
      setError("Failed to load search results. Please try again later.");
      setProducts([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}&page=1`);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    router.push("/search");
  };

  const handlePageChange = (newPage: number) => {
    if (query) {
      router.push(`/search?q=${encodeURIComponent(query)}&page=${newPage}`);
    } else {
      router.push(`/search?page=${newPage}`);
    }
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
              <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Home className="h-4 w-4" />
                Home
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-foreground font-medium">Search</span>
            </nav>
          </div>
        </div>

        {/* Search Header */}
        <section className="py-12 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="max-w-2xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6 text-center">
                Search Products
              </h1>
              
              {/* Search Box */}
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
                  <Input
                    type="text"
                    placeholder="Search for products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-10 h-12 text-base"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={handleClearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                      aria-label="Clear search"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <Button type="submit" size="lg" className="h-12 px-8">
                  Search
                </Button>
              </form>

              {/* Search Results Info */}
              <div className="mt-6 text-center">
                {loading ? (
                  <p className="text-muted-foreground">{query ? "Searching..." : "Loading products..."}</p>
                ) : pagination ? (
                  <p className="text-muted-foreground">
                    {pagination.total > 0 ? (
                      <>
                        Showing {((currentPage - 1) * pagination.limit) + 1} - {Math.min(currentPage * pagination.limit, pagination.total)} of {pagination.total} {query ? <>results for <span className="font-semibold text-foreground">"{query}"</span></> : "products"}
                      </>
                    ) : (
                      <span>{query ? <>No results found for <span className="font-semibold text-foreground">"{query}"</span></> : "No products found"}</span>
                    )}
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* Search Results */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-destructive mb-4">{error}</p>
                <Button onClick={fetchSearchResults} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                    No products found
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    {query ? (
                      <>We couldn't find any products matching "{query}". Try different keywords or browse our categories.</>
                    ) : (
                      <>No products available at the moment. Please try again later.</>
                    )}
                  </p>
                  {query && (
                    <div className="flex flex-wrap gap-2 justify-center">
                      <Button variant="outline" asChild>
                        <Link href="/category/saree">Sarees</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/category/fashion">Fashion</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/category/beauty">Beauty</Link>
                      </Button>
                      <Button variant="outline" asChild>
                        <Link href="/category/kitchen">Kitchen</Link>
                      </Button>
                    </div>
                  )}
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
                    <div className="flex flex-wrap  flex-row items-center justify-center gap-3 sm:gap-2 px-4">
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
                            // Show first, last, current, and adjacent pages
                            // On mobile, this will naturally show fewer due to space constraints
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

export default SearchClient;

