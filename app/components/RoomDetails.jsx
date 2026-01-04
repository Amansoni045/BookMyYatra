"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    (process.env.NODE_ENV === "production"
      ? process.env.NEXT_PUBLIC_BACKEND_DEPLOYED_URL
      : process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL) ||
    "http://localhost:5000";

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/hotels`);
        if (!res.ok) throw new Error("Failed to fetch hotels");
        const data = await res.json();
        const foundRoom = data.find((hotel) => hotel.id.toString() === id);
        setRoom(foundRoom);
      } catch (err) {
        console.error("Error fetching room details:", err);
      }
    };

    if (id) fetchRoom();
  }, [id]);

  if (!room) {
    return (
      <div className="pt-32 px-6 text-center text-lg font-medium">
        Loading room details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="w-full h-[300px] sm:h-[450px] md:h-[500px] overflow-hidden">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
          {room.name}
        </h1>
        <p className="text-lg text-gray-600 mt-1">{room.location}</p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 gap-4">
          <div className="space-y-2">
            <p className="text-xl font-semibold text-green-600">
              ₹{room.price} / night
            </p>
            <p className="text-sm text-gray-500">Incl. taxes and fees</p>
          </div>

          <div className="text-sm text-gray-600">
            ⭐ <span className="font-medium">{room.rating}</span> rating
            {room.tag && (
              <span className="ml-3 inline-block px-3 py-1 text-xs bg-blue-600 text-white rounded-full">
                {room.tag}
              </span>
            )}
          </div>

          <div className="text-sm text-gray-700 font-medium">
            Max Guests: {room.maxGuests}
          </div>
        </div>

        <div className="mt-10 space-y-4 text-gray-700 leading-relaxed">
          <p>{room.description}</p>
          <p className="font-medium">{room.services}</p>
        </div>

        <div className="mt-12 flex justify-center sm:justify-start">
          <Link href={`/ReviewYourBooking/${id}`}>
            <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-lg py-3 px-6 rounded-full shadow-lg transition duration-300">
              Book Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
