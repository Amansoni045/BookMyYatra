import { BACKEND_URL } from "./config";

const BASE_URL = `${BACKEND_URL}/api`;

// Helper to get token safely
const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const signup = async (data) => {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (res.ok && json.token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", json.token);
      window.dispatchEvent(new Event("auth-change"));
    }
  }

  return json;
};

export const login = async (data) => {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const json = await res.json();

  if (res.ok && json.token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", json.token);
      window.dispatchEvent(new Event("auth-change"));
    }
  }

  return json;
};

export const getMe = async () => {
  try {
    const token = getToken();
    if (!token) return null;

    const res = await fetch(`${BASE_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
};

export const logout = async () => {
  // Clear local storage first
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("auth-change"));
  }

  // Optional: Notify backend
  try {
    await fetch(`${BASE_URL}/logout`, {
      method: "POST",
    });
  } catch (err) {
    console.error("Logout error", err);
  }
};
