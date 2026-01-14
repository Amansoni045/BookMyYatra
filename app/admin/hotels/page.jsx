"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hotels`, {
      credentials: "include",
    })
      .then((r) => r.json())
      .then(setHotels);
  }, []);

  const del = async (id) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin/hotels/${id}`,
      { method: "DELETE", credentials: "include" }
    );
    setHotels(hotels.filter((h) => h.id !== id));
  };

  return (
    <div>
      <Link href="/admin/hotels/add">Add Hotel</Link>
      {hotels.map((h) => (
        <div key={h.id}>
          {h.name}
          <Link href={`/admin/hotels/${h.id}/edit`}>Edit</Link>
          <button onClick={() => del(h.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
