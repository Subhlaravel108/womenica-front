"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Menu, Search, ShoppingBag, X } from "lucide-react";

interface Category {
  _id: string;
  title: string;
  slug: string;
}

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Check if a link is active
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  // Load categories from JSON file
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch("/data/categories_homepage.json");
        if (res.ok) {
          const data = await res.json();
          setCategories(data.data || []);
        }
      } catch (err) {
        console.warn("Failed to load categories:", err);
      }
    };
    loadCategories();
  }, []);

  // Build nav links with Home + Categories from JSON + Trending + Best Sellers
  const navLinks = [
    { name: "Home", href: "/" },
    ...categories.slice(0,4).map((cat) => ({
      name: cat.title,
      href: `/category/${cat.slug}`,
    })),
    { name: "Trending", href: "/trending" },
    { name: "Best Sellers", href: "/bestsellers" },
  ];

  // Handle search box open/close
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSearchOpen && searchInputRef.current) {
        const target = event.target as Node;
        if (!searchInputRef.current.contains(target)) {
          // Check if click is on search button or form
          const searchButton = (event.target as HTMLElement).closest('button[aria-label="Search"]');
          if (!searchButton) {
            setIsSearchOpen(false);
            setSearchQuery("");
          }
        }
      }
    };

    if (isSearchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isSearchOpen]);

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  // Handle search icon click
  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 xl:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 md:h-8 md:w-8 text-primary fill-primary" />
            <span className="font-display text-xl md:text-2xl font-bold text-foreground">
              Womenica
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "transition-colors duration-200 font-medium",
                    active
                      ? "text-primary font-semibold"
                      : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search Box */}
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64"
                />
                {!isSearchOpen && (
                  <Button type="submit" size="sm" variant="default">
                    <Search className="h-4 w-4" />
                  </Button>
                )}
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                aria-label="Search"
                onClick={handleSearchClick}
              >
                <Search className="h-5 w-5" />
              </Button>
            )}
            <Button variant="ghost" size="icon" aria-label="Wishlist">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border animate-fade-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "transition-colors duration-200 font-medium py-2",
                      active
                        ? "text-primary font-semibold"
                        : "text-foreground hover:text-primary"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              <div className="flex flex-col gap-4 pt-4 border-t border-border">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                  />
                  <Button type="submit" size="sm" variant="default">
                    <Search className="h-4 w-4" />
                  </Button>
                </form>
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="icon" aria-label="Wishlist">
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Cart">
                    <ShoppingBag className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
