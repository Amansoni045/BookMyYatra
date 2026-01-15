"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getMe, login as loginApi, signup as signupApi, logout as logoutApi } from "./auth";

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        console.log("🔍 Fetching user data...");
        setLoading(true);
        const userData = await getMe();
        console.log("👤 User data received:", userData);
        setUser(userData);
        setLoading(false);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const login = async (credentials) => {
        console.log("🔐 Login attempt with:", { email: credentials.email });
        try {
            const response = await loginApi(credentials);
            console.log("✅ Login response:", response);

            if (response.token) {
                console.log("🎫 Token received, fetching user data...");
                await fetchUser();
            } else {
                console.error("❌ No token in login response:", response);
            }
            return response;
        } catch (error) {
            console.error("❌ Login error:", error);
            throw error;
        }
    };

    const signup = async (data) => {
        console.log("📝 Signup attempt with:", { email: data.email, name: data.name });
        try {
            const response = await signupApi(data);
            console.log("✅ Signup response:", response);

            if (response.token) {
                console.log("🎫 Token received, fetching user data...");
                await fetchUser();
            } else {
                console.error("❌ No token in signup response:", response);
            }
            return response;
        } catch (error) {
            console.error("❌ Signup error:", error);
            throw error;
        }
    };

    const logout = async () => {
        console.log("🚪 Logout initiated");
        await logoutApi();
        setUser(null);
        console.log("✅ Logout complete");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout, refreshUser: fetchUser }}>
            {children}
        </AuthContext.Provider>
    );
};
