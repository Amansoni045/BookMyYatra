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
        window.dispatchEvent(new Event("auth-change"));
        router.push("/");
      } else {
        setError(res?.message || "Login failed.");
      }
    } catch (err) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#020b2d]/70 backdrop-blur-xl" />

      <div className="relative w-full max-w-md rounded-2xl bg-white/10 p-8 text-white">
        <h2 className="text-3xl font-semibold text-center">Welcome Back</h2>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-lg bg-white/20"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-white/20 pr-12"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button className="w-full py-3 rounded-full bg-cyan-500 text-black">
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm">
          New user?{" "}
          <Link href="/auth/signup" className="text-cyan-400">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
