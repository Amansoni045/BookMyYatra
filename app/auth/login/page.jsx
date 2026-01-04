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
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="flex flex-col gap-4 w-80">
        <h2 className="text-2xl font-bold">Login</h2>
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-black text-white py-2 rounded">Login</button>
      </form>
    </div>
  );
}
