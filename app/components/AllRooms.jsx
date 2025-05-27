'use client';
import React, { useEffect, useState } from 'react';

const AllRooms = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch('/api/hotels');
        const data = await res.json();
        setHotels(data);
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  return (
    <div className='bg-white text-black min-h-screen px-4 md:px-16 lg:px-24 xl:px-32 pt-28 md:pt-35'>
      {/* Header */}
      <div className='flex flex-col md:flex-row items-start md:items-center justify-between mb-8'>
        <div>
          <h1 className='font-playfair text-4xl md:text-[40px]'>Hotel Rooms</h1>
          <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-w174'>
            Explore all the rooms available for your trip! From budget-friendly stays to premium comfort, find the perfect match for your next adventure.
          </p>
        </div>
      </div>

      {/* Rooms Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className='bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all'
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className='w-full h-48 object-cover rounded-t-xl'
            />
            <div className='p-4 flex flex-col justify-between h-[210px]'>
              <div>
                <h3 className='text-lg font-semibold'>{hotel.name}</h3>
                <p className='text-sm text-gray-500'>{hotel.location}</p>
                <div className='flex items-center justify-between mt-2'>
                  <span className='text-yellow-500 font-semibold'>{hotel.rating} ★</span>
                  <span className='text-base font-semibold text-gray-800'>
                    ₹{hotel.price}/night
                  </span>
                </div>
                {hotel.tag && (
                  <span className='inline-block mt-2 text-xs text-white bg-blue-600 px-2 py-1 rounded'>
                    {hotel.tag}
                  </span>
                )}
              </div>

              {/* Book Now Button */}
              <button className='mt-4 bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition-all w-full'>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllRooms;
