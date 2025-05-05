"use client";

import React from 'react';
import Image from 'next/image';
import { CalendarIcon, MapPinIcon, UsersIcon, SearchIcon } from 'lucide-react'; 

const Hero = () => {
  return (
    <div className="flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white h-screen relative">
      
      <div className="absolute top-0 left-0 w-full h-full">
        <Image
          src="/Assets/heroimage.png"
          alt="Hero Background"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>

      <p className="bg-[#49B9FF]/50 z-40 px-3.5 py-1 rounded-full">
        Book Your Dream Stay Today!
      </p> 

      <h1 className="font-playfair z-40 text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-5"> 
        Your Gateway to Comfort and Luxury!
      </h1>

      <p className="max-w-130 z-40 mt-5 text-sm md:text-base">
        Find the perfect hotel at the best prices with BookMyYatra. Easy booking, 24/7 support, and great deals—start your journey now!
      </p>

      <form className="bg-white text-gray-500 rounded-lg px-6 py-4 flex flex-col md:flex-row max-md:items-start gap-4 max-md:mx-auto z-40 mb-5 mt-6">
        
        <div>
          <div className="flex items-center gap-2">
            <MapPinIcon className="w-4 h-4 text-gray-800" />
            <label htmlFor="destinationInput">Destination</label>
          </div>
          <input
            list="destinations"
            id="destinationInput"
            type="text"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
            placeholder="Type here"
            required
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-gray-800" />
            <label htmlFor="checkIn">Check in</label>
          </div>
          <input
            id="checkIn"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-gray-800" />
            <label htmlFor="checkOut">Check out</label>
          </div>
          <input
            id="checkOut"
            type="date"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none"
          />
        </div>

        <div className="flex md:flex-col max-md:gap-2 max-md:items-center">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-4 h-4 text-gray-800" />
            <label htmlFor="guests">Guests</label>
          </div>
          <input
            min={1}
            max={4}
            id="guests"
            type="number"
            className="rounded border border-gray-200 px-3 py-1.5 mt-1.5 text-sm outline-none max-w-16"
            placeholder="0"
          />
        </div>

        <button type="submit" className="flex items-center justify-center gap-1 rounded-md bg-black py-3 px-4 text-white my-auto cursor-pointer max-md:w-full max-md:py-1">
          <SearchIcon className="w-4 h-4 text-white" />
          <span>Search</span>
        </button>

      </form>

    </div>
  );
};

export default Hero;
