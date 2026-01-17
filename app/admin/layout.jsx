"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/AuthContext";
import Sidebar from "./components/Sidebar";

export default function AdminLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== "ADMIN") {
                router.replace("/");
            } else {
                setReady(true);
            }
        }
    }, [user, loading, router]);

    if (!ready) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-600">
                Checking admin access...
            </div>
        );
    }

    return (
        <div className="flex min-h-screen pt-20 bg-white">
            <Sidebar />
            <main className="flex-1 bg-gray-50 p-10">
                {children}
            </main>
        </div>
    );
}
