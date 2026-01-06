import type { Metadata } from "next";
import ProductDetailClient from "./client";
import { getProductBySlug } from "@/lib/api";
import { stripHtmlTags } from "@/lib/utils";

type Props = {
  params: Promise<{ id: string }>; // id param contains slug
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id: slug } = await params;
  
  try {
    const product = await getProductBySlug(slug || "");

    if (!product) {
      return {
        title: "Product Not Found - Womenica",
        description: "The requested product could not be found.",
      };
    }

    return {
      title: product.metaTitle || `${product.title} - Womenica`,
      description: product.metaDescription || stripHtmlTags(product.description || ""),
      keywords: product.metaKeywords,
    };
  } catch (error) {
    return {
      title: "Product Not Found - Womenica",
      description: "The requested product could not be found.",
    };
  }
}

export default async function ProductDetailPage({ params }: Props) {
  return <ProductDetailClient />;
}






