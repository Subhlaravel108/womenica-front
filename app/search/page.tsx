import type { Metadata } from "next";
import { Suspense } from "react";
import SearchClient from "./client";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Search Products - ${contactInfo.websiteName}`,
  description: "Search for products on Womanica",
};

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading search...</p>
        </div>
      </div>
    }>
      <SearchClient />
    </Suspense>
  );
}

