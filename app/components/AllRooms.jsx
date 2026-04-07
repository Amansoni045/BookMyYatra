"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useSearchParams, useRouter } from "next/navigation";
import Fuse from "fuse.js";

import { BACKEND_URL } from "../lib/config";

const AllRooms = () => {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isApplying, setIsApplying] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const locationQuery = searchParams.get("location") || "";

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

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data: hotelsData, error, isLoading } = useSWR(`${BACKEND_URL}/api/hotels`, fetcher, {
    revalidateOnFocus: false,
  });

  useEffect(() => {
    if (hotelsData) {
      setHotels(hotelsData);
      let updatedList = [...hotelsData];
      if (locationQuery) {
        const fuse = new Fuse(hotelsData, {
          keys: ['location'],
          threshold: 0.5,
          distance: 100,
          ignoreLocation: true,
        });
        const results = fuse.search(locationQuery);
        updatedList = results.map(result => result.item);
      }
      setFilteredHotels(updatedList);
    }
  }, [hotelsData, locationQuery]);

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

      if (locationQuery) {
        const fuse = new Fuse(hotels, {
          keys: ['location'],
          threshold: 0.6,
          distance: 100,
          ignoreLocation: true,
        });
        const results = fuse.search(locationQuery);
        updatedList = results.map(result => result.item);
      }

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

    let updatedList = [...hotels];
    if (locationQuery) {
      const fuse = new Fuse(hotels, {
        keys: ['location'],
        threshold: 0.6,
        distance: 100,
        ignoreLocation: true,
      });
      const results = fuse.search(locationQuery);
      updatedList = results.map(result => result.item);
    }
    setFilteredHotels(updatedList);
    setShowFilters(false);
  };

  const hasActiveFilters = activeFilters.sortByRating || activeFilters.sortByPrice || activeFilters.showTaggedOnly;
  const hasChanges = JSON.stringify(tempFilters) !== JSON.stringify(activeFilters);

  return (
    <div className="bg-white text-black min-h-screen px-4 md:px-16 lg:px-24 xl:px-32 pt-28 pb-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-playfair font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {locationQuery ? `Hotels in ${locationQuery}` : "Hotel Rooms"}
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
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm bg-white flex flex-col relative animate-pulse">
              <div className="h-56 bg-gray-200 w-full"></div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="flex-grow"></div>
                <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-auto">
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-16 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                  </div>
                  <div className="h-10 bg-gray-200 rounded-xl w-28"></div>
                </div>
              </div>
            </div>
          ))
        ) : filteredHotels.length === 0 ? (
          <div className="col-span-full py-16 flex flex-col items-center justify-center text-center bg-gray-50 rounded-3xl border border-gray-200">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.88 9.88l4.24 4.24"></path></svg>
            </div>
            <h3 className="text-3xl font-black text-gray-900 mb-3">We couldn't find any stays in "{locationQuery}"</h3>
            <p className="text-gray-500 font-medium max-w-lg mb-8 text-lg">Try checking your spelling, or exploring our other popular destinations.</p>
            <button onClick={() => router.push('/hotels')} className="bg-[#006CE4] hover:bg-[#0057B8] text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-md">
              Clear Search & View All Hotels
            </button>
          </div>
        ) : (
          filteredHotels.map((hotel, index) => (
            <div
              key={hotel.id}
              className="border border-gray-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 animate-fadeInUp bg-white flex flex-col group relative"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {hotel.tag && (
                  <span className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {hotel.tag.toUpperCase()}
                  </span>
                )}
                <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md text-white text-sm font-bold px-3 py-1.5 rounded-xl shadow-lg flex items-center gap-1 border border-white/20">
                  ⭐ {hotel.rating}
                </div>
              </div>

              {/* Details Container */}
              <div className="p-5 flex flex-col flex-grow">
                <h3 className="font-extrabold text-xl text-gray-900 group-hover:text-blue-600 transition-colors mb-1 truncate">{hotel.name}</h3>
                <p className="text-sm text-gray-500 font-semibold flex items-center gap-1 mb-4 truncate">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {hotel.location}
                </p>

                <div className="flex-grow"></div>

                <div className="flex justify-between items-end border-t border-gray-100 pt-4 mt-auto">
                  <div>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wide">Starting from</p>
                    <p className="text-2xl font-black text-gray-900 leading-none mt-1">₹{hotel.price}<span className="text-sm font-medium text-gray-500"> / night</span></p>
                  </div>

                  <Link href={`/RoomDetails/${hotel.id}`}>
                    <button className="bg-gradient-to-r from-blue-600 to-[#003B95] hover:opacity-90 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-blue-500/40 whitespace-nowrap">
                      View Room
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AllRooms;
