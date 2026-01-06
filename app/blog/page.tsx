import { Metadata } from "next";
import BlogPage from "./BlogClient";
import { contactInfo } from "@/lib/global_variables";
export const metadata: Metadata = {
  title: `Blog - ${contactInfo.websiteName}`,
  description: "Discover beauty tips, fashion guides, lifestyle advice, and product reviews from Womenica. Expert insights on women's products, style inspiration, and wellness tips.",
};
export default function Page() {
    return <BlogPage />;
}