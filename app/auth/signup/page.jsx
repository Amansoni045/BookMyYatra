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
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="flex flex-col gap-4 w-80">
        <h2 className="text-2xl font-bold">Signup</h2>
        <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
        <button className="bg-black text-white py-2 rounded">Signup</button>
      </form>
    </div>
  );
}
