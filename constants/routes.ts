// src/constants/routes.ts

export const PUBLIC_ROUTES = {
  HOME: "/",
  PRODUCTS: "/products",
  SEARCH_RESULTS: "/search-results",
  TERMS: "/terms",
  PRIVACY: "/privacy",
  ABOUT: "/about",
  ORDER_TRACKING: (orderId: string) => `/orders/${orderId}`,
  PRODUCT_DETAIL: (slug: string) => `/products/${slug}`,
} as const;

export const PROTECTED_ROUTES = {
  CHECKOUT: "/checkout",
  ORDERS: "/account/orders",
  ACCOUNT_REVIEWS: "/account/reviews",
  ACCOUNT_ADDRESSES: "/account/addresses",
  WISHLIST: "/account/wishlist",
  ACCOUNT_PROFILE: "/account/profile",

  ADMIN_DASHBOARD: "/admin",
  ADMIN_ORDERS: "/admin/orders",
  ADMIN_PRODUCTS: "/admin/products",
  ADMIN_PRODUCTS_NEW: "/admin/products/new",

  ADMIN_COUPONS: "/admin/coupons",

  ADMIN_CUSTOMERS: "/admin/customers",

  ADMIN_CATEGORIES: "/admin/categories",

  ADMIN_SUB_CATEGORIES: "/admin/sub-categories",

  ADMIN_CATEGORY_DETAIL: (id: string) => `/admin/categories/${id}`,
  ADMIN_SUB_CATEGORY_DETAIL: (id: string) => `/admin/sub-categories/${id}`,
  ADMIN_CUSTOMER_DETAIL: (id: string) => `/admin/customers/${id}`,
  ADMIN_CUSTOMER_STATUS: (id: string) => `/admin/customers/${id}/status`,
  ADMIN_PRODUCTS_EDIT: (id: string) => `/admin/products/${id}/edit`,
} as const;
