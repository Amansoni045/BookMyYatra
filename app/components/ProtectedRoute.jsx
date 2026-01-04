"use client";

import { useEffect, useState } from "react";
import { getMe } from "@/app/lib/auth";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMe().then((user) => {
      if (!user) router.push("/auth/login");
      else setLoading(false);
    });
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;

  return children;
}
