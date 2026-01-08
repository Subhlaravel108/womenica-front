"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import { getProductCategories, Category } from "@/lib/api";
import { ChevronRight, Home, ChevronLeft, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { stripHtmlTags } from "@/lib/utils";
import {
  Shirt,
  Palette,
  Sparkles,
  Home as HomeIcon,
  ChefHat,
  PaintBucket,
  Gem,
  LucideIcon,
} from "lucide-react";

// Icon mapping for categories
const iconMap: Record<string, LucideIcon> = {
  "sarees": Shirt,
  "fashion": Gem,
  "makeup": Palette,
  "beauty": Sparkles,
  "home-decor": HomeIcon,
  "home_decor": HomeIcon,
  "kitchen": ChefHat,
  "arts-crafts": PaintBucket,
  "arts_crafts": PaintBucket,
  "womens-clothing": Shirt,
  "womens-shoes": Package,
  "accessories": Gem,
  "western-wear": Shirt,
  "stores": Package,
};

// Helper function to map JSON category to Category interface
const mapJsonCategoryToCategory = (jsonCategory: any): Category => {
  return {
    id: jsonCategory._id,
    title: jsonCategory.title,
    description: jsonCategory.description,
    slug: jsonCategory.slug,
    image: jsonCategory.image,
    icon: undefined,
  };
};

const CollectionsClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1", 10);
  const itemsPerPage = 12; // Categories per page

  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1️⃣ Try loading from local JSON file
      const res = await fetch("/data/categories_homepage.json");

      if (res.ok) {
        const data = await res.json();
        
        // Map JSON data to Category interface format
        const mappedCategories = data.data?.map(mapJsonCategoryToCategory) || [];
        
        setTotalItems(mappedCategories.length);
        setCategories(mappedCategories);
        setError(null);
        setLoading(false);
        return;
      }

      throw new Error("Local JSON not found");
    } catch (err) {
      console.warn("Local file load failed, calling API...", err);

      // 2️⃣ Fallback → API with Axios
      try {
        const apiRes = await getProductCategories();

        setTotalItems(apiRes.length);
        setCategories(apiRes);
        setError(null);
      } catch (apiErr) {
        console.error(apiErr);
        setError("Failed to load categories from both file and API.");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // Calculate pagination
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCategories = categories.slice(startIndex, endIndex);

  const handlePageChange = (newPage: number) => {
    router.push(`/collections?page=${newPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Pagination range helper
  const getPaginationRange = (current: number, total: number, delta = 2) => {
    const range: (number | string)[] = [];

    if (total <= 1) return [1];

    const left = Math.max(2, current - delta);
    const right = Math.min(total - 1, current + delta);

    range.push(1);

    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < total - 1) range.push("...");
    if (total > 1) range.push(total);

    return range;
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
              <span className="text-foreground font-medium">Collections</span>
            </nav>
          </div>
        </div>

        {/* Header */}
        <section className="py-12 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                All Collections
              </h1>
              <p className="text-lg text-muted-foreground">
                Explore our complete range of product categories and collections
              </p>
            </div>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="border border-border rounded-2xl overflow-hidden">
                    <Skeleton className="w-full h-48" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-destructive" />
                  </div>
                  <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                    Failed to Load Collections
                  </h2>
                  <p className="text-muted-foreground mb-6">{error}</p>
                  <Button onClick={loadCategories} variant="default">
                    Try Again
                  </Button>
                </div>
              </div>
            ) : categories.length === 0 ? (
              <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h2 className="text-2xl font-display font-bold text-foreground mb-3">
                    No Collections Available
                  </h2>
                  <p className="text-muted-foreground">
                    Check back soon for new collections.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {/* Results Info */}
                <div className="mb-8 text-center">
                  <p className="text-sm text-muted-foreground">
                    Showing {startIndex + 1} - {Math.min(endIndex, totalItems)} of{" "}
                    {totalItems} collection{totalItems !== 1 ? "s" : ""}
                  </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                  {paginatedCategories.map((category) => {
                    const Icon = iconMap[category.slug] || Gem;
                    const cleanDescription = stripHtmlTags(
                      category.description || ""
                    );
                    return (
                      <Link
                        key={category.slug || category.id}
                        href={`/category/${category.slug}`}
                      >
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

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Page {currentPage} of {totalPages} • {totalItems} total
                      collection{totalItems !== 1 ? "s" : ""}
                    </p>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1 || loading}
                        className="flex items-center gap-1"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>

                      {getPaginationRange(currentPage, totalPages).map((p, i) => (
                        <Button
                          key={i}
                          variant={p === currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() =>
                            typeof p === "number" && handlePageChange(p)
                          }
                          disabled={p === "..." || loading}
                          className={`min-w-[40px] ${
                            p === currentPage
                              ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                              : ""
                          }`}
                        >
                          {p}
                        </Button>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages || loading}
                        className="flex items-center gap-1"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
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

export default CollectionsClient;




