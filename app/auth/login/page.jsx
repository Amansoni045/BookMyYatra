"use client";

import { useState } from "react";
import { login } from "@/app/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    const res = await login(form);

    if (res?.id) router.push("/");
    else alert(res?.message || "Login failed");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#020b2d]/70 backdrop-blur-xl" />

      <div className="relative w-full max-w-md rounded-2xl bg-white/10 border border-white/20 shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-semibold text-center">
          Welcome Back
        </h2>
        <p className="text-center text-white/70 mt-2">
          Sign in to continue your journey
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email address"
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />

          <button className="w-full py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 transition font-semibold text-black">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
