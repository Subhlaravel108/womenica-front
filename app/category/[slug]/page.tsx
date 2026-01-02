import type { Metadata } from "next";
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
        title: "Category Not Found - Womanica",
        description: "The requested category could not be found.",
      };
    }

    return {
      title: `${category.title} - Womanica`,
      description: stripHtmlTags(category.description || "") || `Discover our handpicked collection of ${category.title.toLowerCase()} products. Quality items at the best prices from Amazon India.`,
    };
  } catch (error) {
    return {
      title: "Category Not Found - Womanica",
      description: "The requested category could not be found.",
    };
  }
}

export default async function CategoryPage({ params }: Props) {
  return <CategoryClient />;
}






