import type { Metadata } from "next";
import { Suspense } from "react";
import CategoryClient from "./client";
import { getProductCategories } from "@/lib/api";
import { stripHtmlTags } from "@/lib/utils";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const categories = await getProductCategories();
    const category = categories.find(c => c.slug === slug);

    if (!category) {
      return {
        title: "Category Not Found - Womenica",
        description: "The requested category could not be found.",
      };
    }

    return {
      title: `${category.title} - Womenica`,
      description: stripHtmlTags(category.description || "") || `Discover our handpicked collection of ${category.title.toLowerCase()} products. Quality items at the best prices from Amazon India.`,
    };
  } catch (error) {
    return {
      title: "Category Not Found - Womenica",
      description: "The requested category could not be found.",
    };
  }
}

export default async function CategoryPage({ params }: Props) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Loading category...</p>
          </div>
        </div>
      </div>
    }>
      <CategoryClient />
    </Suspense>
  );
}






