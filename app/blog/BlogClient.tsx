"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Search, X, Calendar, User, Tag, ArrowRight, Home } from "lucide-react";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import api from "@/lib/api";

// Skeleton Loader Component
const BlogSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl border border-border p-4 shadow-sm bg-card">
      <div className="h-48 bg-muted rounded-lg mb-4"></div>
      <div className="h-4 bg-muted rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
      <div className="flex justify-between items-center">
        <div className="h-3 bg-muted rounded w-20"></div>
        <div className="h-3 bg-muted rounded w-16"></div>
      </div>
    </div>
  );
};

// 📦 Blog Interface (based on your backend response)
interface Blog {
  _id: string;
  title: string;
  slug: string;
  author: string;
  summary: string;
  featuredImage: string;
  publishDate: string;
  categoryId: string;
  tags: string[];
  status: string;
  category?: {
    name: string;
  };
}

const BlogPage = () => {
  const { toast } = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage] = useState(9);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔁 Debounce Search Input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 800);
    return () => clearTimeout(handler);
  }, [search]);

  // 📡 Fetch Blogs
  useEffect(() => {
    fetchBlogs();
  }, [page, debouncedSearch]);

const fetchBlogs = async () => {
  setIsLoading(true);
  setError(null);

  try {
    const res = await api.get(`/frontend/blogs`, {
      params: {
        page,
        limit: perPage,
        search: debouncedSearch,
      },
      
    });

    console.log("API Response:", res.data);
    if (res.data.success) {
      setBlogs(res.data.data);
      setTotalPages(res.data.pagination?.totalPages || 1);
      setTotalCount(res.data.pagination?.total || 0);
    } else {
      setBlogs([]);
      setError("Failed to fetch blogs. Please try again.");
    }
  } catch (err: any) {
    console.error("API Error:", err);
    setBlogs([]);

    if (err.response?.status === 404) setError("No blogs found.");
    else if (err.code === "ERR_NETWORK") setError("Network error.");
    else setError("Something went wrong while fetching blogs.");
  } finally {
    setIsLoading(false);
  }
};



  // 📜 Pagination Range Helper
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

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Clear search
  const handleClearSearch = () => {
    setSearch("");
  };

  // Empty State Component with Card Design
  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-secondary to-secondary/50 rounded-full flex items-center justify-center">
        <Search className="w-12 h-12 text-primary" />
      </div>
      <h3 className="text-2xl font-display font-bold text-foreground mb-3">
        {debouncedSearch ? "No matching blogs found" : "No blogs available yet"}
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        {debouncedSearch 
          ? `We couldn't find any blogs matching "${debouncedSearch}". Try different keywords or browse our popular topics.`
          : "Check back soon for beauty tips, fashion guides, and lifestyle advice from our community."
        }
      </p>
      
      {debouncedSearch && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <Button onClick={handleClearSearch} className="bg-primary hover:bg-primary/90">
            Clear Search
          </Button>
         
        </div>
      )}

    </div>
  );

  return (
    <>
      <Navbar/>
      <div className="min-h-screen bg-background flex flex-col">
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
              <span className="text-foreground font-medium">Blog</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="py-12 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Womenica <span className="text-primary">Blog</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover beauty tips, fashion guides, lifestyle advice, and product reviews for modern women
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-8 bg-card border-b border-border">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex-1 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search blogs by title, tags, or author..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-9 pr-9 h-11"
                  />
                  {search && (
                    <X
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4 cursor-pointer hover:text-foreground transition-colors"
                      onClick={handleClearSearch}
                    />
                  )}
                </div>
              </div>
              
              {/* Results Info */}
              {!isLoading && blogs.length > 0 && (
                <div className="text-sm text-muted-foreground">
                  Showing {blogs.length} of {totalCount} blog{totalCount !== 1 ? 's' : ''}
                  {debouncedSearch && ` for "${debouncedSearch}"`}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Blog Grid Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 8 }).map((_, i) => <BlogSkeleton key={i} />)}
              </div>
            ) : blogs.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {blogs.map((blog) => (
                    <Card key={blog._id} className="overflow-hidden hover:shadow-lg transition-shadow border-border shadow-md h-full flex flex-col">
                      <div className="relative h-48 overflow-hidden">
                        <Link href={`/blog/${blog.slug || blog._id}`}>
                        
                        {blog.featuredImage ? (
                          <img
                            src={blog.featuredImage}
                            alt={blog.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center">
                            <span className="text-muted-foreground text-sm">No Image</span>
                          </div>
                        )}
                        </Link>
                        {/* Status Badge */}
                        {blog.status && (
                          <div className="absolute top-3 left-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              blog.status === 'Published' 
                                ? 'bg-green-500 text-white' 
                                : 'bg-muted-foreground text-white'
                            }`}>
                              {blog.status}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(blog.publishDate)}</span>
                          </div>
                          {blog.author && (
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              <span>{blog.author}</span>
                            </div>
                          )}
                        </div>
                        
                       <Link href={`/blog/${blog.slug || blog._id}`}>
                          <h3 className="text-xl font-display font-bold text-foreground mb-3 line-clamp-2 hover:text-primary transition-colors">
                          {blog.title}
                        </h3>
                       </Link>
                        
                        <p className="text-muted-foreground mb-4 line-clamp-3 flex-grow">
                          {(blog.summary.slice(0,80))+'...' || "Discover amazing beauty tips, fashion guides, and lifestyle advice..."}
                        </p>
                        
                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="flex items-center flex-wrap gap-1 mb-4">
                            {blog.tags.slice(0, 2).map((tag, index) => (
                              <span 
                                key={index}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground"
                              >
                                <Tag className="w-2 h-2 mr-1" />
                                {tag}
                              </span>
                            ))}
                            {blog.tags.length > 2 && (
                              <span className="text-xs text-muted-foreground">
                                +{blog.tags.length - 2} more
                              </span>
                            )}
                          </div>
                        )}
                        
                        <Link href={`/blog/${blog.slug || blog._id}`}>
                          <Button variant="ghost" className="group p-0 h-auto font-semibold hover:bg-transparent justify-start w-fit text-primary hover:text-primary/80">
                            Read More
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 pt-8 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Page {page} of {totalPages} • {totalCount} total blog{totalCount !== 1 ? 's' : ''}
                    </p>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={page === 1 || isLoading}
                        className="flex items-center gap-1"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Button>

                      {getPaginationRange(page, totalPages).map((p, i) => (
                        <Button
                          key={i}
                          variant={p === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => typeof p === "number" && setPage(p)}
                          disabled={p === "..." || isLoading}
                          className={`min-w-[40px] ${
                            p === page 
                              ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                              : ''
                          }`}
                        >
                          {p}
                        </Button>
                      ))}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={page === totalPages || isLoading}
                        className="flex items-center gap-1"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </section>
        </main>
      </div>
      <Footer/>
    </>
  );
};

export default BlogPage;