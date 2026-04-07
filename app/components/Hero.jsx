"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Search, Plane, Train, Bus, CarFront, Hotel, X, Minus, Plus } from "lucide-react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

const popularCities = ["Mumbai", "Delhi", "Bengaluru", "Goa", "Pune", "Jaipur", "Udaipur"];

const Hero = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Hotels");
  
  // Search state
  const [location, setLocation] = useState("");
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const locationRef = useRef(null);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const dateRef = useRef(null);

  const [guests, setGuests] = useState({ adults: 1, children: 0, rooms: 1 });
  const [showGuestPicker, setShowGuestPicker] = useState(false);
  const guestRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setShowLocationDropdown(false);
      }
      if (dateRef.current && !dateRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
      if (guestRef.current && !guestRef.current.contains(event.target)) {
        setShowGuestPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!location) {
      // It's mandatory
      alert("Please enter a destination to start your search.");
      // optionally focus the input
      return;
    }
    if (activeTab === "Hotels") {
      router.push(`/hotels?location=${location}`);
    }
  };

  const handleGuestChange = (type, operation) => {
    setGuests(prev => {
      const newGuests = { ...prev };
      if (operation === 'i') {
        newGuests[type] += 1;
      } else if (operation === 'd') {
        if (type === 'adults' && newGuests[type] > 1) newGuests[type] -= 1;
        if (type === 'children' && newGuests[type] > 0) newGuests[type] -= 1;
        if (type === 'rooms' && newGuests[type] > 1) newGuests[type] -= 1;
      }
      return newGuests;
    });
  };

  const tabs = [
    { name: "Hotels", icon: <Hotel className="w-5 h-5 mb-1" /> },
    { name: "Flights", icon: <Plane className="w-5 h-5 mb-1" /> },
    { name: "Trains", icon: <Train className="w-5 h-5 mb-1" /> },
    { name: "Buses", icon: <Bus className="w-5 h-5 mb-1" /> },
    { name: "Cabs", icon: <CarFront className="w-5 h-5 mb-1" /> },
  ];

  return (
    <div
      className="flex flex-col items-center justify-center px-4 md:px-16 text-white min-h-[100vh] relative bg-cover bg-center pt-24 pb-12"
      style={{ backgroundImage: "url('/Assets/heroimage.png')" }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-6xl text-center flex flex-col items-center animate-fadeInUp mt-10">
        <p className="bg-white/20 backdrop-blur-md px-5 py-1.5 rounded-full text-sm font-semibold tracking-wide shadow-xl border border-white/30 text-white mb-6 uppercase">
          Welcome to Premium Travel
        </p>

        <h1 className="font-playfair text-4xl md:text-5xl lg:text-[64px] font-bold leading-tight drop-shadow-2xl mb-6">
          Experience Extraordinary <br className="hidden md:block"/> Travel Destinations
        </h1>

        <p className="text-sm md:text-lg text-gray-200 max-w-2xl mb-10 drop-shadow-md">
          Discover handpicked luxury hotels, book exclusive flights, and manage seamless transportation for your perfect getaway.
        </p>

        {/* Tab Navigation */}
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-t-3xl border-b border-white/20 px-2 pt-2 flex justify-start md:justify-center gap-2 md:gap-8 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
               type="button"
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex flex-col items-center px-4 py-3 rounded-t-2xl font-bold transition-all whitespace-nowrap min-w-[80px]
                ${activeTab === tab.name 
                  ? "bg-white text-blue-600 shadow-lg scale-105" 
                  : "text-white/80 hover:text-white hover:bg-white/10"}
              `}
            >
              {tab.icon}
              <span className="text-sm">{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Widget Content */}
        <div className="w-full max-w-6xl bg-white rounded-b-3xl rounded-tl-3xl rounded-tr-3xl md:rounded-tr-none shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-3 md:p-6 text-black flex flex-col transition-all duration-300 min-h-[120px] justify-center items-center relative z-20">
          
          {activeTab === "Hotels" ? (
             <form onSubmit={handleSearch} className="w-full flex flex-col md:flex-row items-center gap-2 md:gap-0 bg-yellow-400 p-2 md:p-1.5 rounded-3xl md:rounded-full">
               
               {/* Location Input */}
               <div ref={locationRef} className="relative flex-1 w-full bg-white rounded-2xl md:rounded-l-full md:rounded-r-none border-2 border-transparent focus-within:border-blue-600 transition-colors h-16 flex items-center px-4 md:px-6 cursor-text group">
                 <MapPin className={`w-6 h-6 mr-3 ${location ? 'text-gray-800' : 'text-gray-400'} group-focus-within:text-blue-600 transition-colors duration-200`} />
                 <div className="flex flex-col w-full h-full justify-center">
                    <input 
                      type="text" 
                      required
                      placeholder="Where are you going?" 
                      className="w-full bg-transparent outline-none font-bold text-gray-900 text-base md:text-lg placeholder-gray-500 truncate"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      onFocus={() => setShowLocationDropdown(true)}
                    />
                 </div>
                 {location && (
                    <button type="button" onClick={() => setLocation("")} className="absolute right-4 p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <X className="w-4 h-4" />
                    </button>
                 )}

                 {/* Popular Destinations Dropdown */}
                 {showLocationDropdown && (
                   <div className="absolute top-full left-0 mt-3 w-full md:w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 py-2 animate-fadeIn text-left">
                      <div className="px-5 py-3 text-xs font-bold text-gray-400 uppercase tracking-widest bg-gray-50 border-b border-gray-100">Popular Destinations</div>
                      {popularCities.map(city => (
                        <div 
                          key={city} 
                          className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => {
                            setLocation(city);
                            setShowLocationDropdown(false);
                          }}
                        >
                            <div className="bg-gray-100 p-2 rounded-lg text-gray-500"><MapPin className="w-4 h-4" /></div>
                            <span className="font-semibold text-gray-800 text-lg">{city}</span>
                        </div>
                      ))}
                   </div>
                 )}
               </div>

               {/* Divider */}
               <div className="hidden md:block w-[2px] h-10 bg-yellow-400 z-10"></div>
     
               {/* Date Picker */}
               <div ref={dateRef} className="relative flex-[1.2] w-full bg-white rounded-2xl md:rounded-none focus-within:border-blue-600 border-2 border-transparent transition-colors h-16 flex items-center px-4 md:px-6 cursor-pointer group hover:bg-gray-50" onClick={() => setShowDatePicker(!showDatePicker)}>
                 <Calendar className={`w-6 h-6 mr-3 ${dates[0].startDate.getTime() !== dates[0].endDate.getTime() ? 'text-gray-800' : 'text-gray-400'} group-hover:text-blue-600 transition-colors duration-200 hidden md:block`} />
                 <div className="flex flex-1 justify-between items-center text-left">
                   <div className="flex flex-col justify-center">
                     <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Check-in</span>
                     <span className="font-bold text-gray-900 text-sm md:text-base whitespace-nowrap">{format(dates[0].startDate, "EEE, MMM d")}</span>
                   </div>
                   <Minus className="w-4 h-4 text-gray-300 mx-2" />
                   <div className="flex flex-col justify-center">
                     <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Check-out</span>
                     <span className="font-bold text-gray-900 text-sm md:text-base whitespace-nowrap">{format(dates[0].endDate, "EEE, MMM d")}</span>
                   </div>
                 </div>

                 {/* Date Range Dropdown */}
                 {showDatePicker && (
                   <div className="absolute top-full left-1/2 -translate-x-1/2 md:translate-x-0 md:left-0 mt-3 bg-white rounded-3xl shadow-2xl border border-gray-100 p-2 z-50 animate-fadeIn" onClick={e => e.stopPropagation()}>
                     <div className="overflow-x-auto date-range-custom-wrapper">
                        <DateRange
                            editableDateInputs={true}
                            onChange={item => setDates([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            minDate={new Date()}
                            months={typeof window !== 'undefined' && window.innerWidth > 768 ? 2 : 1}
                            direction="horizontal"
                            className="date-range-custom"
                            rangeColors={['#006CE4']}
                        />
                     </div>
                     <div className="flex justify-end p-3 border-t border-gray-100 bg-gray-50 rounded-b-2xl mt-2">
                        <button type="button" onClick={(e) => { e.stopPropagation(); setShowDatePicker(false); }} className="bg-[#006CE4] hover:bg-[#0057B8] text-white font-bold py-2 px-8 rounded-xl transition-colors shadow-md">Done</button>
                     </div>
                   </div>
                 )}
               </div>

               {/* Divider */}
               <div className="hidden md:block w-[2px] h-10 bg-yellow-400 z-10"></div>
     
               {/* Guests Popover */}
               <div ref={guestRef} className="relative flex-1 w-full bg-white rounded-2xl md:rounded-none focus-within:border-blue-600 border-2 border-transparent transition-colors h-16 flex items-center px-4 md:px-6 cursor-pointer group hover:bg-gray-50" onClick={() => setShowGuestPicker(!showGuestPicker)}>
                 <Users className={`w-6 h-6 mr-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-200 hidden md:block`} />
                 <div className="flex flex-col w-full h-full justify-center text-left">
                     <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block md:hidden">Guests</span>
                   <span className="font-bold text-gray-900 text-sm md:text-base truncate">
                     {guests.adults} Adults · {guests.children} Children
                   </span>
                   <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider hidden md:block">{guests.rooms} Room{guests.rooms > 1 ? 's' : ''}</span>
                 </div>

                 {/* Guests Dropdown */}
                 {showGuestPicker && (
                    <div className="absolute top-full right-0 mt-3 w-full md:w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 p-6 z-50 animate-fadeIn text-left" onClick={e => e.stopPropagation()}>
                        <div className="space-y-6">
                            {/* Adults */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Adults</h4>
                                    <p className="text-sm text-gray-500 font-medium">Age 18+</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button type="button" onClick={() => handleGuestChange('adults', 'd')} disabled={guests.adults <= 1} className="w-10 h-10 rounded-full border border-[#006CE4] flex items-center justify-center text-[#006CE4] hover:bg-blue-50 disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"><Minus className="w-4 h-4"/></button>
                                    <span className="font-bold w-4 text-center text-lg">{guests.adults}</span>
                                    <button type="button" onClick={() => handleGuestChange('adults', 'i')} className="w-10 h-10 rounded-full border border-[#006CE4] flex items-center justify-center text-[#006CE4] hover:bg-blue-50 transition-colors"><Plus className="w-4 h-4"/></button>
                                </div>
                            </div>
                            {/* Children */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Children</h4>
                                    <p className="text-sm text-gray-500 font-medium">Age 0-17</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button type="button" onClick={() => handleGuestChange('children', 'd')} disabled={guests.children <= 0} className="w-10 h-10 rounded-full border border-[#006CE4] flex items-center justify-center text-[#006CE4] hover:bg-blue-50 disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"><Minus className="w-4 h-4"/></button>
                                    <span className="font-bold w-4 text-center text-lg">{guests.children}</span>
                                    <button type="button" onClick={() => handleGuestChange('children', 'i')} className="w-10 h-10 rounded-full border border-[#006CE4] flex items-center justify-center text-[#006CE4] hover:bg-blue-50 transition-colors"><Plus className="w-4 h-4"/></button>
                                </div>
                            </div>
                            {/* Rooms */}
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">Rooms</h4>
                                    <p className="text-sm text-gray-500 font-medium">Min 1 room</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button type="button" onClick={() => handleGuestChange('rooms', 'd')} disabled={guests.rooms <= 1} className="w-10 h-10 rounded-full border border-[#006CE4] flex items-center justify-center text-[#006CE4] hover:bg-blue-50 disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-colors"><Minus className="w-4 h-4"/></button>
                                    <span className="font-bold w-4 text-center text-lg">{guests.rooms}</span>
                                    <button type="button" onClick={() => handleGuestChange('rooms', 'i')} className="w-10 h-10 rounded-full border border-[#006CE4] flex items-center justify-center text-[#006CE4] hover:bg-blue-50 transition-colors"><Plus className="w-4 h-4"/></button>
                                </div>
                            </div>
                        </div>
                        <button type="button" onClick={(e) => { e.stopPropagation(); setShowGuestPicker(false); }} className="mt-8 w-full py-3.5 border-2 border-[#006CE4] text-[#006CE4] font-black tracking-wide rounded-xl hover:bg-blue-50 transition-colors">DONE</button>
                    </div>
                 )}
               </div>
     
               <button type="submit" className="w-full md:w-auto h-16 px-8 md:px-12 bg-[#006CE4] hover:bg-[#0057B8] text-white rounded-2xl md:rounded-r-full md:rounded-l-none font-bold text-xl shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group whitespace-nowrap ml-0 md:ml-1 mt-2 md:mt-0 outline-none focus:ring-4 focus:ring-blue-300">
                 Search
               </button>
             </form>
          ) : (
            <div className="w-full py-12 flex flex-col items-center justify-center text-center animate-fadeIn">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 mb-6 shadow-inner">
                  {activeTab === "Flights" && <Plane className="w-10 h-10" />}
                  {activeTab === "Trains" && <Train className="w-10 h-10" />}
                  {activeTab === "Buses" && <Bus className="w-10 h-10" />}
                  {activeTab === "Cabs" && <CarFront className="w-10 h-10" />}
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-3">{activeTab} Booking Coming Soon!</h3>
                <p className="text-gray-500 font-medium max-w-lg text-lg">We are currently integrating top-tier providers for {activeTab.toLowerCase()}. Check back soon for seamless multi-modal bookings.</p>
                
                <div className="mt-8 flex gap-3">
                   <span className="w-3 h-3 rounded-full bg-blue-600 animate-bounce" style={{animationDelay: "0ms"}}></span>
                   <span className="w-3 h-3 rounded-full bg-blue-600 animate-bounce" style={{animationDelay: "150ms"}}></span>
                   <span className="w-3 h-3 rounded-full bg-blue-600 animate-bounce" style={{animationDelay: "300ms"}}></span>
                </div>
            </div>
          )}
          
        </div>

      </div>
    </div>
  );
};

export default Hero;
