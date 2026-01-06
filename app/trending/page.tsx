import { Metadata } from "next";
import { Suspense } from "react";
import TrendingClient from "./client";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Trending Products - ${contactInfo.websiteName}`,
  description: "Discover the most trending and popular products at Womenica. Shop the latest fashion, beauty, and lifestyle products.",
};

export default function TrendingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Loading trending products...</p>
          </div>
        </div>
      </div>
    }>
      <TrendingClient />
    </Suspense>
  );
}

