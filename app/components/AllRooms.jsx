"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const AllRooms = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/hotels`);
        if (!res.ok) throw new Error("Failed to fetch hotels");

        const data = await res.json();
        setHotels(data);
        setFilteredHotels(data);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };

    fetchHotels();
  }, [backendUrl]);

  const applyFilter = (filter) => {
    let updatedList = [...hotels];

    if (filter === "rating") {
      updatedList.sort((a, b) => b.rating - a.rating);
    } else if (filter === "price") {
      updatedList.sort((a, b) => a.price - b.price);
    } else if (filter === "tag") {
      updatedList = updatedList.filter((hotel) => hotel.tag);
    }

    setSelectedFilter(filter);
    setFilteredHotels(updatedList);
    setShowFilters(false);
  };

  return (
    <div className="bg-white text-black min-h-screen px-4 md:px-16 lg:px-24 xl:px-32 pt-28">
      {/* HEADER */}
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl font-playfair">Hotel Rooms</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Filter
        </button>
      </div>

      {/* FILTER MENU */}
      {showFilters && (
        <div className="mb-6 space-x-4">
          <button onClick={() => applyFilter("rating")}>Rating</button>
          <button onClick={() => applyFilter("price")}>Price</button>
          <button onClick={() => applyFilter("tag")}>Tagged</button>
          <button onClick={() => setFilteredHotels(hotels)}>Clear</button>
        </div>
      )}

      {/* HOTEL GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredHotels.map((hotel) => (
          <div key={hotel.id} className="border rounded-xl overflow-hidden">
            <Image
              src={hotel.image}
              alt={hotel.name}
              width={400}
              height={300}
              className="h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold">{hotel.name}</h3>
              <p className="text-sm text-gray-500">{hotel.location}</p>
              <p className="mt-2">₹{hotel.price}/night</p>

              <Link href={`/RoomDetails/${hotel.id}`}>
                <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded">
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRooms;
