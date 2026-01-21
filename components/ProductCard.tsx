"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Eye } from "lucide-react";
import { stripHtmlTags, limitWords } from "@/lib/utils";

interface ProductCardProps {
  slug: string;
  title: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  description?: string;
  category: string;
  amazon_link: string;
}

const ProductCard = ({
  slug,
  title,
  image,
  price,
  originalPrice,
  rating,
  category,
  description,
  amazon_link,
}: ProductCardProps) => {
  return (
    <Card variant="elevated" className="overflow-hidden group flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      {/* Image Container */}
      <div className="relative overflow-hidden bg-card">
        <Link href={`/product/${slug}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-64 object-contain p-3 sm:p-4 md:p-6 transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              // Fallback to a local asset to avoid repeated 404s.
              // Guard against infinite loops if the placeholder itself fails.
              const placeholderSrc = "/placeholder-image.svg";
              if (!e.currentTarget.src.endsWith(placeholderSrc)) {
                e.currentTarget.src = placeholderSrc;
              }
            }}
          />
        </Link>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-5 flex flex-col flex-1">
        {/* Title */}
        <Link href={`/product/${slug}`}>
          <h3 className="font-display text-base sm:text-lg md:text-xl font-semibold text-foreground line-clamp-2 mb-2 sm:mb-3 group-hover:text-primary transition-colors cursor-pointer min-h-[3rem] sm:min-h-[3.5rem]">
            {title}
          </h3>
        </Link>

        {/* Description */}
        {/* {description && (
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 line-clamp-2 sm:line-clamp-3 hidden sm:block">
            {limitWords(stripHtmlTags(description), 80)}
          </p>
        )} */}
         {description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
            {limitWords(stripHtmlTags(description), 100)}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3 sm:mb-4 flex-wrap">
          <span className="text-lg sm:text-xl md:text-2xl font-bold text-primary">{price}</span>
          {originalPrice && (
            <span className="text-xs sm:text-sm text-muted-foreground line-through">
              {originalPrice}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row gap-2 mt-auto">
          <Button 
            variant="outline" 
            size="sm"
            className="w-full text-xs sm:text-sm h-9 sm:h-10" 
            asChild
          >
            <Link href={`/product/${slug}`}>
              <Eye className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">View</span>
              <span className="xs:hidden">View</span>
            </Link>
          </Button>
          <Button 
            variant="default" 
            size="sm"
            className="w-full text-xs sm:text-sm h-9 sm:h-10" 
            asChild
          >
            <a href={amazon_link} target="_blank" rel="noopener noreferrer">
              <span className="hidden sm:inline">Buy Now</span>
              <span className="sm:hidden">Buy</span>
              <ExternalLink className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
