"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { BACKEND_URL } from "../lib/config";

const AllRooms = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/hotels`);
        if (!res.ok) throw new Error("Failed to fetch hotels");

        const data = await res.json();
        setHotels(data);
        setFilteredHotels(data);
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      }
    };

    fetchHotels();
  }, []);

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
    <div className="bg-white text-black min-h-screen px-4 md:px-16 lg:px-24 xl:px-32 pt-28 pb-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-playfair font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          Hotel Rooms
        </h1>

        <div className="relative">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {showFilters && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-10 animate-fadeIn">
              <div className="mb-3">
                <p className="text-sm font-semibold text-gray-700 mb-3">Sort & Filter</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => applyFilter("rating")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedFilter === "rating"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    ⭐ By Rating
                  </button>
                  <button
                    onClick={() => applyFilter("price")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedFilter === "price"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    💰 By Price
                  </button>
                  <button
                    onClick={() => applyFilter("tag")}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedFilter === "tag"
                      ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                  >
                    🏷️ Tagged Only
                  </button>
                </div>
              </div>

              {selectedFilter && (
                <button
                  onClick={() => {
                    setFilteredHotels(hotels);
                    setSelectedFilter("");
                    setShowFilters(false);
                  }}
                  className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-colors duration-300 mt-2"
                >
                  Clear Filter
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredHotels.map((hotel) => (
          <div
            key={hotel.id}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition"
          >
            <Image
              src={hotel.image}
              alt={hotel.name}
              width={400}
              height={300}
              className="h-48 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold text-lg">{hotel.name}</h3>
              <p className="text-sm text-gray-500">{hotel.location}</p>
              <p className="mt-2 font-medium">₹{hotel.price}/night</p>

              <Link href={`/RoomDetails/${hotel.id}`}>
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
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
