"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/app/lib/auth"; 

export default function PaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const user = await getMe();

      if (!user) {
        router.replace("/auth/login");
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return <p>Checking authentication...</p>;
  }

  return (
    <div>
      <Payment />
    </div>
  );
}
