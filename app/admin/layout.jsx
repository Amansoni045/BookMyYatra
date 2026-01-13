"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/app/lib/auth";
import Sidebar from "./components/Sidebar";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getMe().then((user) => {
            if (!user || user.role !== "ADMIN") {
                router.replace("/");
            } else {
                setLoading(false);
            }
        });
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Checking admin access...</div>;

    return (
        <div className="flex min-h-screen pt-20">
            <Sidebar />
            <main className="flex-1 p-8 bg-gray-50">
                {children}
            </main>
        </div>
    );
}
