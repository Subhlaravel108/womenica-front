"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Star, Eye } from "lucide-react";
import { getAmazonLink } from "@/data/products";
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
  asin: string;
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
  asin,
}: ProductCardProps) => {
  return (
    <Card variant="elevated" className="overflow-hidden group flex flex-col h-full">
      <div className="relative overflow-hidden">
        <Link href={`/productDetail/${slug}`}>
          <img
            src={image}
            alt={title}
            className="w-full h-56 md:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
      </div>

      <div className="p-4 flex flex-col flex-1">
        {/* <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating
                  ? "fill-gold text-gold"
                  : "fill-muted text-muted"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({rating}.0)</span>
        </div> */}

        <Link href={`/productDetail/${slug}`}>
          <h3 className="font-display text-lg font-semibold text-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors cursor-pointer hover:underline">
            {title}
          </h3>
        </Link>

        {description && (
          <p className="text-sm text-muted-foreground mb-3 line-clamp-3">
            {limitWords(stripHtmlTags(description), 100)}
          </p>
        )}

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-xl font-bold text-primary">{price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice}
            </span>
          )}
        </div>

        <div className="flex gap-2 mt-auto">
          <Button variant="outline" className="flex-1" asChild>
            <Link href={`/productDetail/${slug}`}>
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Link>
          </Button>
          <Button variant="default" className="flex-1" asChild>
            <a href={getAmazonLink(asin)} target="_blank" rel="noopener noreferrer">
              Buy Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
