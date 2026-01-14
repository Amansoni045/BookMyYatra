"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const BACKEND_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL
    : process.env.NEXT_PUBLIC_BACKEND_PROD_URL;

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/hotels`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then(setHotels);
  }, []);

  const del = async (id) => {
    await fetch(`${BACKEND_URL}/api/admin/hotels/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    setHotels((prev) => prev.filter((h) => h.id !== id));
  };

  return (
    <div>
      <Link href="/admin/hotels/add">Add Hotel</Link>

      {hotels.map((h) => (
        <div key={h.id}>
          {h.name}{" "}
          <Link href={`/admin/hotels/${h.id}/edit`}>Edit</Link>{" "}
          <button onClick={() => del(h.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
