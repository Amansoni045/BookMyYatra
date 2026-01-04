"use client";

import { useState } from "react";
import { signup } from "@/app/lib/auth";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    const res = await signup(form);

    if (res?.id) router.push("/");
    else alert(res?.message || "Signup failed");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#020b2d]/70 backdrop-blur-xl" />

      <div className="relative w-full max-w-md rounded-2xl bg-white/10 border border-white/20 shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-semibold text-center">
          Create Account
        </h2>
        <p className="text-center text-white/70 mt-2">
          Start booking luxury stays
        </p>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <input
            placeholder="Full name"
            className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            required
          />

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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
