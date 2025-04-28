"use client";

import React from 'react';
import Image from 'next/image'; 

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
      
      <p className="bg-[#49B9FF]/50 z-40 px-3.5 py-1 rounded-full">Book Your Dream Stay Today!</p> 
      <h1 className="font-playfair z-40 text-2xl md:text-5xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-2"> 
        Your Gateway to Comfort and Luxury!
      </h1>
      <p className="max-w-130 z-40 mt-2 mb-25 text-sm md:text-base">
        Find the perfect hotel at the best prices with BookMyYatra. Easy booking, 24/7 support, and great deals—start your journey now!
      </p>
      
    </div>
  );
};

export default Hero;
