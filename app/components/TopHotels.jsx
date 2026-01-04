"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TopHotels() {
  const [hotels, setHotels] = useState([]);
  const router = useRouter();
  const backendUrl = "";

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/hotels`);
        const data = await res.json();

        const topRated = data.sort((a, b) => b.rating - a.rating).slice(0, 4);

        setHotels(topRated);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Hotels</h2>
        <p className="text-gray-600 mb-8">
          Explore our most sought-after stays that blend comfort and class at
          the best locations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl shadow p-4 text-left"
            >
              <div className="relative">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  width={400}
                  height={300}
                  className="rounded-lg w-full h-48 object-cover"
                  priority
                />
                {hotel.tag && (
                  <span className="absolute top-2 left-2 bg-white text-sm font-semibold px-2 py-1 rounded-full shadow text-gray-800">
                    {hotel.tag}
                  </span>
                )}
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-black">
                  {hotel.name}
                </h3>
                <p className="text-sm text-gray-500 flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                  {hotel.location}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center text-orange-500">
                    <Star className="w-4 h-4 mr-1" fill="currentColor" />
                    <span>{hotel.rating}</span>
                  </div>
                  <div>
                    <span className="font-bold text-gray-900">
                      ₹{hotel.price}
                    </span>
                    <span className="text-sm text-gray-400">/night</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/RoomDetails/${hotel.id}`)}
                  className="mt-4 w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg font-medium"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          className="mt-10 px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-800 hover:bg-gray-100 font-medium"
          onClick={() => router.push("/hotels")}
        >
          View All Hotels
        </button>
      </div>
    </section>
  );
}
