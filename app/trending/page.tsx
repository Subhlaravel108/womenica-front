import { Metadata } from "next";
import TrendingClient from "./client";
import { contactInfo } from "@/lib/global_variables";

export const metadata: Metadata = {
  title: `Trending Products - ${contactInfo.websiteName}`,
  description: "Discover the most trending and popular products at Womenica. Shop the latest fashion, beauty, and lifestyle products.",
};

export default function TrendingPage() {
  return <TrendingClient />;
}

