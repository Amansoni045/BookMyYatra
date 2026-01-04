const getBackendUrl = () => {
    if (process.env.NEXT_PUBLIC_BACKEND_URL) {
        return process.env.NEXT_PUBLIC_BACKEND_URL;
    }
    if (process.env.NODE_ENV === "production") {
        return process.env.NEXT_PUBLIC_BACKEND_DEPLOYED_URL || "http://localhost:5000";
    }
    return process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL || "http://localhost:5000";
};

const API_URL = getBackendUrl();


export const signup = async (data) => {
    const res = await fetch(`${API_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });
    return res.json();
};

export const login = async (data) => {
    const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });
    return res.json();
};

export const getMe = async () => {
    const res = await fetch(`${API_URL}/api/me`, {
        credentials: "include",
    });
    if (!res.ok) {
        return null
    };
    return res.json();
};

export const logout = async () => {
    await fetch(`${API_URL}/api/logout`, {
        method: "POST",
        credentials: "include",
    });
};
