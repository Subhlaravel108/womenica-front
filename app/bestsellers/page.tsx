import { Metadata } from "next";
import { Suspense } from "react";
import BestSellersClient from "./client";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Best Sellers - ${contactInfo.websiteName}`,
  description: "Shop our best-selling products at Womenica. Discover the most popular fashion, beauty, and lifestyle products loved by customers.",
};

export default function BestSellersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Loading bestseller products...</p>
          </div>
        </div>
      </div>
    }>
      <BestSellersClient />
    </Suspense>
  );
}

