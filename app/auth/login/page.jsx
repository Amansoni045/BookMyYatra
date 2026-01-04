"use client";

import { useState } from "react";
import { login } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await login(form);
            if (res?.id) {
                router.push("/");
            } else {
                setError(res?.message || "Login failed. Please check your credentials.");
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-[#020b2d]/70 backdrop-blur-xl" />

            <div className="relative w-full max-w-md rounded-2xl bg-white/10 border border-white/20 shadow-2xl p-8 text-white">
                <h2 className="text-3xl font-semibold text-center">Welcome Back</h2>
                <p className="text-center text-white/70 mt-2">
                    Sign in to continue your journey
                </p>

                <form onSubmit={submit} className="mt-8 space-y-5">
                    <div>
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 pr-12"
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {error && (
                        <div className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded border border-red-500/20">
                            {error}
                        </div>
                    )}

                    <button
                        disabled={loading}
                        className="w-full py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 transition font-semibold text-black disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Sign In"}
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-white/70">
                    New user?{" "}
                    <Link href="/auth/signup" className="text-cyan-400 hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}
