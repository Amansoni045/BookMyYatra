export const BACKEND_URL =
    process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL
        : process.env.NEXT_PUBLIC_BACKEND_PROD_URL;
