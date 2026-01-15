"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { BACKEND_URL } from "../../lib/config";

export default function AdminHotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    fetch(`${BACKEND_URL}/api/hotels`, { headers })
      .then((r) => r.json())
      .then(setHotels)
      .catch((err) => console.error("Failed to fetch hotels:", err));
  }, []);

  const del = async (id) => {
    await fetch(`${BACKEND_URL}/api/admin/hotels/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
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
