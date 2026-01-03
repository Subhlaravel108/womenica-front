export interface Product {
  id: string;
  title: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  category: string;
  categorySlug: string;
  description: string;
  features: string[];
  asin: string;
}

export const AFFILIATE_TAG = "womanica-21";

export const getAmazonLink = (asin: string) => 
  `https://www.amazon.in/dp/${asin}?tag=${AFFILIATE_TAG}`;
