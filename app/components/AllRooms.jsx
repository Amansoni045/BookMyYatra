"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { BACKEND_URL } from "../lib/config";

const AllRooms = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const [tempFilters, setTempFilters] = useState({
    sortByRating: false,
    sortByPrice: false,
    showTaggedOnly: false,
  });

  const [activeFilters, setActiveFilters] = useState({
    sortByRating: false,
    sortByPrice: false,
    showTaggedOnly: false,
  });

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

  const handleFilterChange = (filterName) => {
    setTempFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const applyFilters = () => {
    setIsApplying(true);

    setTimeout(() => {
      let updatedList = [...hotels];

      if (tempFilters.showTaggedOnly) {
        updatedList = updatedList.filter((hotel) => hotel.tag);
      }

      if (tempFilters.sortByRating) {
        updatedList.sort((a, b) => b.rating - a.rating);
      } else if (tempFilters.sortByPrice) {
        updatedList.sort((a, b) => a.price - b.price);
      }

      setActiveFilters(tempFilters);
      setFilteredHotels(updatedList);
      setShowFilters(false);
      setIsApplying(false);
    }, 300);
  };

  const clearFilters = () => {
    setTempFilters({
      sortByRating: false,
      sortByPrice: false,
      showTaggedOnly: false,
    });
    setActiveFilters({
      sortByRating: false,
      sortByPrice: false,
      showTaggedOnly: false,
    });
    setFilteredHotels(hotels);
    setShowFilters(false);
  };

  const hasActiveFilters = activeFilters.sortByRating || activeFilters.sortByPrice || activeFilters.showTaggedOnly;
  const hasChanges = JSON.stringify(tempFilters) !== JSON.stringify(activeFilters);

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
            Filter {hasActiveFilters && <span className="ml-1 px-2 py-0.5 bg-white text-blue-600 rounded-full text-xs font-bold">•</span>}
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
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 z-10 animate-slideDown origin-top-right">
              <div className="mb-4">
                <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
                  </svg>
                  Sort & Filter Options
                </h3>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                    <input
                      type="checkbox"
                      checked={tempFilters.sortByRating}
                      onChange={() => handleFilterChange('sortByRating')}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">⭐</span>
                        <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Sort by Rating</span>
                      </div>
                      <p className="text-xs text-gray-500 ml-7">Highest rated first</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                    <input
                      type="checkbox"
                      checked={tempFilters.sortByPrice}
                      onChange={() => handleFilterChange('sortByPrice')}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">💰</span>
                        <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Sort by Price</span>
                      </div>
                      <p className="text-xs text-gray-500 ml-7">Lowest price first</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors group">
                    <input
                      type="checkbox"
                      checked={tempFilters.showTaggedOnly}
                      onChange={() => handleFilterChange('showTaggedOnly')}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🏷️</span>
                        <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">Featured Only</span>
                      </div>
                      <p className="text-xs text-gray-500 ml-7">Show tagged hotels</p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t border-gray-200">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-200 transition-colors duration-200"
                  >
                    Clear All
                  </button>
                )}
                <button
                  onClick={applyFilters}
                  disabled={!hasChanges}
                  className={`flex-1 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${hasChanges
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:scale-105'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                >
                  {isApplying ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Applying...
                    </span>
                  ) : (
                    'Apply Filters'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${isApplying ? 'opacity-50' : 'opacity-100'}`}>
        {filteredHotels.map((hotel, index) => (
          <div
            key={hotel.id}
            className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 animate-fadeInUp"
            style={{ animationDelay: `${index * 50}ms` }}
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
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition-colors">
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
