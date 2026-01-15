"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { BACKEND_URL } from "../lib/config";

const ReviewYourBooking = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchRoom = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/hotels`);
        const data = await res.json();
        const foundRoom = data.find(
          (hotel) => hotel.id.toString() === id
        );
        setRoom(foundRoom);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoom();
  }, [id]);

  if (!room) {
    return (
      <div className="pt-32 px-6 text-center text-lg font-medium">
        Booking not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
        <div className="w-full h-64 overflow-hidden">
          <img
            src={room.image}
            alt={room.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6 space-y-4">
          <h2 className="text-3xl font-bold text-gray-800">
            {room.name}
          </h2>
          <p className="text-gray-600 text-lg">{room.location}</p>

          <div className="flex flex-wrap gap-4 text-gray-700 font-medium">
            <p>
              Price / night:{" "}
              <span className="text-green-600 font-semibold">
                ₹{room.price}
              </span>
            </p>
            <p>Rating: ⭐ {room.rating}</p>
            <p>Max Guests: {room.maxGuests}</p>
          </div>

          <div className="text-gray-700 mt-4">
            <p className="font-semibold">Description:</p>
            <p>{room.description}</p>
          </div>

          <div className="text-gray-700">
            <p className="font-semibold">Services:</p>
            <p>{room.services}</p>
          </div>

          <div className="mt-6 flex justify-center sm:justify-end">
            <Link href={`/Payment/${id}`}>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-full shadow-md transition">
                Proceed to Payment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewYourBooking;
