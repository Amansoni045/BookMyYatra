"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import { BACKEND_URL } from "../lib/config";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchRoom = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/hotels`);
        if (!res.ok) throw new Error("Failed to fetch hotels");
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
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading room details...</p>
        </div>
      </div>
    );
  }

  const amenities = [
    { icon: "📶", name: "Free WiFi" },
    { icon: "❄️", name: "Air Conditioning" },
    { icon: "📺", name: "Smart TV" },
    { icon: "🚗", name: "Free Parking" },
    { icon: "🍽️", name: "Breakfast" },
    { icon: "🏊", name: "Swimming Pool" },
    { icon: "💪", name: "Fitness Center" },
    { icon: "🧖", name: "Spa & Wellness" },
  ];

  const whyBookWithUs = [
    { icon: "💰", title: "Best Price Guarantee", desc: "Find it cheaper? We'll refund the difference" },
    { icon: "🔒", title: "Secure Booking", desc: "Your data is safe with SSL encryption" },
    { icon: "⚡", title: "Instant Confirmation", desc: "Get booking confirmation immediately" },
    { icon: "🔄", title: "Free Cancellation", desc: "Cancel up to 24 hours before check-in" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      {/* Hero Image Section */}
      <div className="w-full h-[400px] md:h-[500px] overflow-hidden relative">
        <img
          src={room.image}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        {room.tag && (
          <div className="absolute top-6 right-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-full font-semibold shadow-lg">
            {room.tag}
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 md:p-10">
            {/* Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
                  {room.name}
                </h1>
                <div className="flex items-center gap-2 text-gray-600 mb-4">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-lg">{room.location}</span>
                </div>
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <span className="text-2xl">⭐</span>
                    <span className="text-xl font-semibold text-gray-900">{room.rating}</span>
                    <span className="text-gray-500">/5</span>
                  </div>
                  <div className="h-6 w-px bg-gray-300"></div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                    <span className="font-medium">Max {room.maxGuests} Guests</span>
                  </div>
                </div>
              </div>

              {/* Price Card */}
              <div className="lg:w-80 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-1">Starting from</p>
                  <div className="flex items-baseline justify-center gap-2 mb-2">
                    <span className="text-4xl font-bold text-green-600">₹{room.price}</span>
                    <span className="text-gray-600">/ night</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">Inclusive of all taxes</p>
                  <Link href={`/ReviewYourBooking/${id}`}>
                    <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                      Book Now
                    </button>
                  </Link>
                  <p className="text-xs text-gray-500 mt-3">✓ Free cancellation available</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Property</h2>
              <p className="text-gray-700 leading-relaxed text-lg">{room.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Amenities & Facilities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <span className="text-3xl">{amenity.icon}</span>
                    <span className="font-medium text-gray-800">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Services */}
            {room.services && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Services Included</h2>
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-xl">
                  <p className="text-gray-800 text-lg">{room.services}</p>
                </div>
              </div>
            )}

            {/* Why Book With Us */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Book With Us?</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {whyBookWithUs.map((item, index) => (
                  <div key={index} className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-lg transition-shadow">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
