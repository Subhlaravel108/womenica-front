import { Metadata } from "next";
import CollectionsClient from "./client";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Collections - ${contactInfo.websiteName}`,
  description: "Browse all product categories and collections at Womenica. Discover sarees, fashion, beauty, kitchen essentials and more.",
};

export default function CollectionsPage() {
  return <CollectionsClient />;
}

