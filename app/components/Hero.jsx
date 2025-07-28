"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

      <p className="bg-[#49B9FF]/50 backdrop-blur-sm z-40 px-3.5 py-1 rounded-full text-sm shadow-md">
        Book Your Dream Stay Today!
      </p> 

      <h1 className="font-playfair z-40 text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-5 shadow-lg"> 
        Your Gateway to Comfort and Luxury!
      </h1>

      <p className="max-w-130 z-40 mt-5 text-sm md:text-base backdrop-blur-sm">
        Find the perfect hotel at the best prices with BookMyYatra. Easy booking, 24/7 support, and great deals—start your journey now!
      </p>

      <Link href="/hotels">
        <button className="z-40 mt-6 bg-gradient-to-r from-[#007cf0] to-[#00dfd8] text-white px-6 py-3 rounded-full shadow-xl font-semibold text-sm md:text-base transition-all duration-300 transform hover:scale-105 hover:shadow-2xl backdrop-blur-sm">
          Explore Now
        </button>
      </Link>


    </div>
  );
};

export default Hero;
