'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const Payment = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [paymentDone, setPaymentDone] = useState(false); 

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch('/api/hotels', { cache: 'no-store' });
        const data = await res.json();
        const foundRoom = data.find(hotel => hotel.id.toString() === id);
        setRoom(foundRoom);
      } catch (err) {
        console.error("Error fetching hotel data:", err);
      }
    };

    if (id) fetchRoom();
  }, [id]);

  const handlePayment = () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    alert(`✅ Payment successful!`);
    setPaymentDone(true);
  };

  if (!room) {
    return <div className="pt-32 px-6 text-center text-lg font-medium">Loading payment info...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">Payment Details</h2>

        <div className="bg-gray-50 p-4 rounded-md shadow-inner">
          <p className="text-lg font-semibold text-gray-700">{room.name}</p>
          <p className="text-gray-600">Location: {room.location}</p>
          <p className="text-gray-700 mt-2">Total Amount: <span className="text-green-600 font-bold">₹{room.price}</span></p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Your Email <span className="text-red-500">*</span></h3>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Choose Payment Method</h3>
          <div className="space-y-2">
            {['card', 'upi', 'netbanking'].map((method) => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={() => setPaymentMethod(method)}
                />
                <span className="capitalize">{method === 'card' ? 'Credit / Debit Card' : method}</span>
              </label>
            ))}
          </div>
        </div>

        {!paymentDone ? (
          <button
            onClick={handlePayment}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
          >
            Confirm & Pay ₹{room.price}
          </button>
        ) : (
          <Link
            href="/"
            className="block text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full transition duration-300"
          >
            Go to Home
          </Link>
        )}
      </div>
    </div>
  );
};

export default Payment;







