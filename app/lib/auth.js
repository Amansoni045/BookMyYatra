
const API_URL =
        process.env.NODE_ENV === "development"
            ? process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL
            : process.env.NEXT_PUBLIC_BACKEND_SERVER_URL ||
            process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL;


export const signup = async (data) => {
    try {
        const res = await fetch(`${API_URL}/api/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
        });
        return res.json();
    } catch (error) {
        console.error("Signup fetch error:", error);
        throw new Error("Unable to connect to the server. Please check if the backend is running.");
    }
};

export const login = async (data) => {
    try {
        const res = await fetch(`${API_URL}/api/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(data),
        });
        return res.json();
    } catch (error) {
        console.error("Login fetch error:", error);
        throw new Error("Unable to connect to the server. Please check if the backend is running.");
    }
};

export const getMe = async () => {
    try {
        const res = await fetch(`${API_URL}/api/me`, {
            credentials: "include",
        });

        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error("GetMe fetch error:", error);
        return null;
    }
};

export const logout = async () => {
    await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
    });
};
