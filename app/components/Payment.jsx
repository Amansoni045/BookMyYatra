"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Script from "next/script";
import { BACKEND_URL } from "../lib/config";
import { useAuth } from "@/app/lib/AuthContext";

const Payment = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth(); // Assuming login check

  const [room, setRoom] = useState(null);
  const [paymentDone, setPaymentDone] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchRoom = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/hotels`);
        const data = await res.json();
        const foundRoom = data.find((hotel) => hotel.id.toString() === id);
        setRoom(foundRoom);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRoom();
  }, [id]);

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24 bg-gray-50">
         <div className="animate-spin h-12 w-12 border-b-4 border-blue-600 rounded-full mx-auto"></div>
      </div>
    );
  }

  const nights = 1;
  const basePrice = room.price * nights;
  const taxesAndFees = Math.round(basePrice * 0.12);
  const serviceFee = Math.round(basePrice * 0.05);
  const totalPrice = basePrice + taxesAndFees + serviceFee;

  const handleRazorpay = async () => {
    if (!user) {
        alert("Please login first to book.");
        router.push("/auth/login");
        return;
    }
    setProcessing(true);

    try {
      const token = localStorage.getItem("token") || "";

      // 1. Create order
      const res = await fetch(`${BACKEND_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify({
          amount: totalPrice,
          hotelId: room.id,
          checkIn: new Date().toISOString(), 
          checkOut: new Date(Date.now() + 86400000).toISOString(),
          guests: 2
        }),
      });
      const data = await res.json();

      if (!data.order) {
         alert("Failed to initialize payment: " + (data.error || "Unknown"));
         setProcessing(false);
         return;
      }

      // 2. Open Razorpay Modal or Simulate if using dummy keys
      if (data.order.id.startsWith("order_sim_")) {
        // Immediate local simulation because Razorpay will crash on a dummy order ID
        console.log("Mocking Razorpay Success...");
        const mockResponse = {
          razorpay_order_id: data.order.id,
          razorpay_payment_id: `pay_sim_${Math.floor(Math.random() * 1000000)}`,
          razorpay_signature: "mocked_signature" 
        };
        
        const verifyRes = await fetch(`${BACKEND_URL}/api/payment/verify-payment`, {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(mockResponse),
        });

        if (verifyRes.ok) {
          setPaymentDone(true);
          setBookingId(data.booking.id);
        } else {
          alert("Payment Mock Verification Failed!");
        }
        setProcessing(false);
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_YourKeyID", // fallback test key
        amount: data.order.amount,
        currency: "INR",
        name: "BookMyYatra Premium",
        description: `Booking for ${room.name}`,
        order_id: data.order.id,
        handler: async function (response) {
          // 3. Verify Payment
          const verifyRes = await fetch(`${BACKEND_URL}/api/payment/verify-payment`, {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(response),
          });

          if (verifyRes.ok) {
            setPaymentDone(true);
            setBookingId(data.booking.id);
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: {
          color: "#003B95",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response){
        alert("Payment failed: " + response.error.description);
        setProcessing(false);
      });
      rzp1.open();
    } catch (err) {
      console.error(err);
      alert("Error initiating payment. Make sure backend is running.");
      setProcessing(false);
    }
  };

  if (paymentDone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-6">
        <div className="max-w-lg w-full bg-white rounded-3xl shadow-xl p-10 text-center animate-slideDown border border-green-100">
           <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
             <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
           </div>
           <h1 className="text-3xl font-black text-gray-900 mb-2">Booking Confirmed!</h1>
           <p className="text-gray-500 font-medium mb-8">Your payment was successful and your room is reserved.</p>
           
           <div className="bg-gray-50 rounded-2xl p-6 text-left mb-8 border border-gray-100">
              <p className="text-sm text-gray-400 font-bold uppercase mb-1">Booking Reference</p>
              <p className="font-black text-xl text-gray-900 mb-4">#{bookingId}</p>
              <div className="w-full h-px bg-gray-200 mb-4"></div>
              <p className="font-bold text-gray-900">{room.name}</p>
              <p className="text-sm text-gray-500">{room.location}</p>
           </div>

           <button onClick={() => router.push("/")} className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/30 transition-all hover:-translate-y-0.5">
             Return to Home
           </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center p-4 md:p-6 pt-24">
         <div className="bg-white max-w-4xl w-full rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 relative">
            
            <div className="w-full md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50 flex flex-col justify-center">
               <span className="text-blue-600 font-black text-sm uppercase tracking-widest mb-4 inline-block">Checkout Summary</span>
               <h2 className="text-3xl font-black text-gray-900 mb-8 leading-tight">Review Your <br/> Reservation</h2>
               
               <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg mb-6 group">
                 <img src={room.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={room.name} />
                 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="font-bold text-white text-xl truncate">{room.name}</h3>
                    <p className="text-gray-300 text-sm flex items-center gap-1">📍 {room.location}</p>
                 </div>
               </div>
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white relative">
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center text-gray-600 font-medium">
                    <span>Base Price (1 Night)</span>
                    <span>₹{basePrice}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600 font-medium">
                    <span>Taxes & Fees (12%)</span>
                    <span>₹{taxesAndFees}</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-600 font-medium pb-6 border-b border-gray-100">
                    <span>Service Fee (5%)</span>
                    <span>₹{serviceFee}</span>
                  </div>
                  <div className="flex justify-between items-center text-2xl">
                    <span className="font-black text-gray-900 text-xl">Total Amount</span>
                    <span className="font-black text-green-600 bg-green-50 px-3 py-1 rounded-lg">₹{totalPrice}</span>
                  </div>
                </div>

                <button 
                  onClick={handleRazorpay}
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-blue-700 to-[#003B95] text-white font-bold py-5 rounded-2xl shadow-xl hover:shadow-blue-500/20 transition-all hover:scale-[1.02] disabled:opacity-75 disabled:scale-100 uppercase tracking-widest text-sm flex items-center justify-center gap-3 relative overflow-hidden"
                >
                  <span className="relative z-10">{processing ? "Initializing Gateway..." : "Pay Securely with Razorpay"}</span>
                  {!processing && <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>}
                </button>
                <div className="mt-6 flex items-center justify-center gap-2 text-xs font-semibold text-gray-400">
                   <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001z" clipRule="evenodd"></path></svg>
                   Secured by SSL End-to-End Encryption
                </div>
            </div>

         </div>
      </div>
    </>
  );
};
export default Payment;
