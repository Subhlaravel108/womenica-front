import { Metadata } from "next";
import { Suspense } from "react";
import CollectionsClient from "./client";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Collections - ${contactInfo.websiteName}`,
  description: "Browse all product categories and collections at Womenica. Discover sarees, fashion, beauty, kitchen essentials and more.",
};

export default function CollectionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Loading collections...</p>
          </div>
        </div>
      </div>
    }>
      <CollectionsClient />
    </Suspense>
  );
}

