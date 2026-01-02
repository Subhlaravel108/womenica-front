import axios from "axios";
// import { URLSearchParams } from "url";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
  // baseURL: "https://india-thailand-api-8.onrender.com/api/",
});

// Types
export interface Category {
  id?: string | number;
  title: string;
  description?: string;
  slug: string;
  image?: string;
  icon?: string;
}

// API Product Response Interface
export interface ApiProduct {
  _id: string;
  title: string;
  image_url: string;
  product_price: number;
  description?: string;
  slug: string;
  showingOnHomePage?: boolean;
  status?: string;
  productCategoryId?: string;
  productCategory?: {
    _id?: string;
    id?: string;
    title: string;
    slug: string;
    description?: string;
    image?: string;
  };
  category?: {
    _id?: string;
    id?: string;
    title: string;
    slug: string;
    description?: string;
    image?: string;
  };
  sku?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  createdAt?: string;
  updatedAt?: string;
}

// Mapped Product Interface for Frontend
export interface Product {
  slug: string;
  title: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  category: string;
  categorySlug?: string;
  description?: string;
  features?: string[];
  asin: string;
}

// API Functions
export const getProductCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get("/frontend/product-categories");
    const data = response.data.data;
    return data;
    
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Helper function to format price
const formatPrice = (price: number): string => {
  return `₹${price.toLocaleString('en-IN')}`;
};

// Helper function to map API product to frontend product
const mapApiProductToProduct = (apiProduct: ApiProduct): Product => {
  // Extract category information from API response
  let categoryTitle = "General";
  let categorySlug = "";
  
  if (apiProduct.productCategory) {
    categoryTitle = apiProduct.productCategory.title;
    categorySlug = apiProduct.productCategory.slug;
  } else if (apiProduct.category) {
    categoryTitle = apiProduct.category.title;
    categorySlug = apiProduct.category.slug;
  }
  
  return {
    slug: apiProduct.slug || apiProduct._id, // Use slug, fallback to _id
    title: apiProduct.title,
    image: apiProduct.image_url,
    price: formatPrice(apiProduct.product_price),
    originalPrice: undefined, // API doesn't provide original price
    rating: 4, // Default rating, can be updated if API provides it
    category: categoryTitle,
    categorySlug: categorySlug || apiProduct.slug,
    description: apiProduct.description,
    asin: apiProduct.sku || apiProduct._id, // Use SKU as ASIN, fallback to _id
  };
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get("/frontend/products");
    const responseData = response.data;
    
    // Handle response structure: { success: true, data: [...] }
    let productsData: ApiProduct[] = [];
    
    if (responseData?.success && Array.isArray(responseData.data)) {
      productsData = responseData.data;
    } else if (Array.isArray(responseData)) {
      productsData = responseData;
    } else if (responseData?.data && Array.isArray(responseData.data)) {
      productsData = responseData.data;
    } else if (responseData?.products && Array.isArray(responseData.products)) {
      productsData = responseData.products;
    } else {
      console.warn("Unexpected API response structure:", responseData);
      return [];
    }
    
    // Filter products that should show on home page
    // Only include products where showingOnHomePage is true
    const filteredProducts = productsData.filter(
      (product) => product.showingOnHomePage === true
    );
    
    // Map API products to frontend product format
    return filteredProducts.map(mapApiProductToProduct);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Product Detail Interface
export interface ProductDetail {
  _id: string;
  slug: string;
  title: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  category: string;
  categorySlug?: string;
  description?: string;
  features?: string[];
  asin: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
}

// Helper function to map API product detail to frontend product detail
const mapApiProductDetailToProductDetail = (apiProduct: ApiProduct): ProductDetail => {
  // Extract category information from API response
  let categoryTitle = "General";
  let categorySlug = "";
  
  if (apiProduct.productCategory) {
    categoryTitle = apiProduct.productCategory.title;
    categorySlug = apiProduct.productCategory.slug;
  } else if (apiProduct.category) {
    categoryTitle = apiProduct.category.title;
    categorySlug = apiProduct.category.slug;
  }
  
  return {
    _id: apiProduct._id,
    slug: apiProduct.slug,
    title: apiProduct.title,
    image: apiProduct.image_url,
    price: formatPrice(apiProduct.product_price),
    originalPrice: undefined,
    rating: 4, // Default rating
    category: categoryTitle,
    categorySlug: categorySlug || apiProduct.slug,
    description: apiProduct.description,
    features: [], // API doesn't provide features array
    asin: apiProduct.sku || apiProduct._id,
    metaTitle: apiProduct.meta_title,
    metaDescription: apiProduct.meta_description,
    metaKeywords: apiProduct.meta_keywords,
  };
};

export const getProductBySlug = async (slug: string): Promise<ProductDetail | null> => {
  try {
    const response = await api.get(`/frontend/product/${slug}`);
    const responseData = response.data;
    
    // Handle response structure: { success: true, data: {...} }
    let productData: ApiProduct | null = null;
    
    if (responseData?.success && responseData.data) {
      productData = responseData.data;
    } else if (responseData?._id) {
      // Direct product object
      productData = responseData;
    } else if (responseData?.data?._id) {
      productData = responseData.data;
    } else {
      console.warn("Unexpected API response structure:", responseData);
      return null;
    }
    
    if (!productData) {
      return null;
    }
    
    // Map API product to frontend product detail format
    return mapApiProductDetailToProductDetail(productData);
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    throw error;
  }
};

// Pagination Interface
export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Category Products Response Interface
export interface CategoryProductsResponse {
  products: Product[];
  category: Category;
  pagination: Pagination;
}

export const getProductsByCategorySlug = async (
  slug: string,
  page: number = 1,
  limit: number = 12
): Promise<CategoryProductsResponse> => {
  try {
    const response = await api.get(`/frontend/products/category/${slug}`, {
      params: { page, limit },
    });
    const responseData = response.data;
    
    // Handle response structure: { success: true, category: {...}, data: [...], pagination: {...} }
    if (!responseData?.success) {
      throw new Error("API request was not successful");
    }
    
    let productsData: ApiProduct[] = [];
    let categoryData: Category | null = null;
    let paginationData: Pagination | null = null;
    
    // Extract products
    if (Array.isArray(responseData.data)) {
      productsData = responseData.data;
    } else {
      console.warn("Unexpected products data structure:", responseData.data);
      productsData = [];
    }
    
    // Extract category
    if (responseData.category) {
      categoryData = {
        id: responseData.category.id,
        title: responseData.category.title,
        slug: responseData.category.slug,
        description: responseData.category.description || "",
        image: responseData.category.image || "",
      };
    }
    
    // Extract pagination
    if (responseData.pagination) {
      paginationData = {
        total: responseData.pagination.total || 0,
        page: responseData.pagination.page || 1,
        limit: responseData.pagination.limit || limit,
        totalPages: responseData.pagination.totalPages || 1,
      };
    } else {
      // Default pagination if not provided
      paginationData = {
        total: productsData.length,
        page: 1,
        limit: productsData.length,
        totalPages: 1,
      };
    }
    
    // Map API products to frontend product format
    // If category data is available, use it for products that don't have category info
    const products = productsData.map((product) => {
      const mappedProduct = mapApiProductToProduct(product);
      // If product doesn't have category but we have category from response, use it
      if (mappedProduct.category === "General" && categoryData) {
        mappedProduct.category = categoryData.title;
        mappedProduct.categorySlug = categoryData.slug;
      }
      return mappedProduct;
    });
    
    return {
      products,
      category: categoryData || { title: "", slug: "" },
      pagination: paginationData,
    };
  } catch (error) {
    console.error("Error fetching products by category slug:", error);
    throw error;
  }
};

export const getRelatedProducts = async (idOrSlug: string): Promise<Product[]> => {
  try {
    const response = await api.get(`/frontend/products/${idOrSlug}/related`);
    const responseData = response.data;
    
    // Log the full response to debug
    console.log("Related products API response:", responseData);
    
    // Handle response structure: { success: true, data: [...] } or direct array
    let productsData: ApiProduct[] = [];
    
    if (responseData?.success && Array.isArray(responseData.data)) {
      productsData = responseData.data;
    } else if (Array.isArray(responseData)) {
      productsData = responseData;
    } else if (responseData?.data && Array.isArray(responseData.data)) {
      productsData = responseData.data;
    } else if (responseData?.products && Array.isArray(responseData.products)) {
      productsData = responseData.products;
    } else if (responseData?.relatedProducts && Array.isArray(responseData.relatedProducts)) {
      productsData = responseData.relatedProducts;
    } else {
      console.warn("Unexpected API response structure for related products:", responseData);
      console.warn("Response keys:", Object.keys(responseData || {}));
      return [];
    }
    
    console.log("Parsed products data:", productsData);
    
    // Map API products to frontend product format
    return productsData.map(mapApiProductToProduct);
  } catch (error: any) {
    console.error("Error fetching related products:", error);
    // Log more details about the error
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
    }
    throw error;
  }
};




