const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
console.log("Auth API_URL:", API_URL);


export const signup = async (data) => {
    const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });
    return res.json();
};

export const login = async (data) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
    });
    return res.json();
};

export const getMe = async () => {
    const res = await fetch(`${API_URL}/api/auth/me`, {
        credentials: "include",
    });
    if (!res.ok) {
        return null
    };
    return res.json();
};

export const logout = async () => {
    await fetch(`${API_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
    });
};
