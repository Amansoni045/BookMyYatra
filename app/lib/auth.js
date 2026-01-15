import { BACKEND_URL } from "./config";

const BASE_URL = `${BACKEND_URL}/api`;

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const signup = async (data) => {
  console.log("🌐 API: Signup request to:", `${BASE_URL}/signup`);
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  console.log("🌐 API: Signup response status:", res.status, "data:", json);

  if (res.ok && json.token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", json.token);
      console.log("💾 Token saved to localStorage");
    }
  }

  return json;
};

export const login = async (data) => {
  console.log("🌐 API: Login request to:", `${BASE_URL}/login`);
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();
  console.log("🌐 API: Login response status:", res.status, "data:", json);

  if (res.ok && json.token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", json.token);
      console.log("💾 Token saved to localStorage");
    }
  }

  return json;
};

export const getMe = async () => {
  try {
    const token = getToken();
    console.log("🌐 API: getMe request, token exists:", !!token);

    if (!token) {
      console.log("⚠️ No token found in localStorage");
      return null;
    }

    const res = await fetch(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("🌐 API: getMe response status:", res.status);

    if (!res.ok) {
      console.log("❌ getMe failed with status:", res.status);
      return null;
    }

    const data = await res.json();
    console.log("✅ User data fetched:", data);
    return data;
  } catch (error) {
    console.error("❌ getMe error:", error);
    return null;
  }
};

export const logout = async () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }

  try {
    await fetch(`${BASE_URL}/logout`, {
      method: "POST",
    });
  } catch (err) {
    console.error("Logout error", err);
  }
};
