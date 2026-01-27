"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { BACKEND_URL } from "../lib/config";

const Payment = () => {
  const { id } = useParams();
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentDone, setPaymentDone] = useState(false);

  // Card details
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveCard, setSaveCard] = useState(false);

  // UPI details
  const [upiId, setUpiId] = useState("");

  // Net banking
  const [selectedBank, setSelectedBank] = useState("");

  const [errors, setErrors] = useState({});
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchRoom = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/hotels`);
        const data = await res.json();
        const foundRoom = data.find(
          (hotel) => hotel.id.toString() === id
        );
        setRoom(foundRoom);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoom();
  }, [id]);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + "/" + v.slice(2, 4);
    }
    return v;
  };

  const getCardType = (number) => {
    const num = number.replace(/\s/g, "");
    if (/^4/.test(num)) return "visa";
    if (/^5[1-5]/.test(num)) return "mastercard";
    if (/^3[47]/.test(num)) return "amex";
    return null;
  };

  const validatePayment = () => {
    const newErrors = {};

    if (paymentMethod === "card") {
      if (!cardNumber || cardNumber.replace(/\s/g, "").length < 13) {
        newErrors.cardNumber = "Please enter a valid card number";
      }
      if (!cardName || cardName.trim().length < 3) {
        newErrors.cardName = "Please enter cardholder name";
      }
      if (!expiryDate || expiryDate.length !== 5) {
        newErrors.expiryDate = "Please enter valid expiry date (MM/YY)";
      }
      if (!cvv || cvv.length < 3) {
        newErrors.cvv = "Please enter valid CVV";
      }
    } else if (paymentMethod === "upi") {
      if (!upiId || !upiId.includes("@")) {
        newErrors.upiId = "Please enter a valid UPI ID";
      }
    } else if (paymentMethod === "netbanking") {
      if (!selectedBank) {
        newErrors.selectedBank = "Please select a bank";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = async () => {
    if (!validatePayment()) return;

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setPaymentDone(true);
    }, 2000);
  };

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-lg font-medium text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  const nights = 1;
  const basePrice = room.price * nights;
  const taxesAndFees = Math.round(basePrice * 0.12);
  const serviceFee = Math.round(basePrice * 0.05);
  const totalPrice = basePrice + taxesAndFees + serviceFee;

  const popularBanks = [
    { name: "HDFC Bank", logo: "🏦" },
    { name: "ICICI Bank", logo: "🏦" },
    { name: "SBI", logo: "🏦" },
    { name: "Axis Bank", logo: "🏦" },
    { name: "Kotak Bank", logo: "🏦" },
    { name: "PNB", logo: "🏦" },
  ];

  if (paymentDone) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Payment Successful!</h1>
            <p className="text-lg text-gray-600 mb-8">Your booking has been confirmed</p>

            <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
              <h3 className="font-bold text-gray-900 mb-4">Booking Details</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Hotel:</span>
                  <span className="font-semibold text-gray-900">{room.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold text-gray-900">{room.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Paid:</span>
                  <span className="font-semibold text-green-600">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking ID:</span>
                  <span className="font-semibold text-gray-900">BMY{Date.now().toString().slice(-8)}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-4 mb-8 text-left">
              <p className="text-sm text-blue-900">
                ✉️ A confirmation email has been sent to your registered email address with all booking details.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/")}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Go to Home
              </button>
              <button
                onClick={() => window.print()}
                className="flex-1 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-300"
              >
                Download Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Secure Payment</h1>
          <p className="text-gray-600">Complete your booking with our secure payment gateway</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Methods */}
          <div className="lg:col-span-2 space-y-6">
            {/* Security Badge */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
              <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div>
                <p className="font-semibold text-green-900">100% Secure Payment</p>
                <p className="text-sm text-green-700">Your payment information is encrypted and secure</p>
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`flex-1 py-4 px-6 font-semibold transition-colors ${paymentMethod === "card"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    💳 Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod("upi")}
                    className={`flex-1 py-4 px-6 font-semibold transition-colors ${paymentMethod === "upi"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    📱 UPI
                  </button>
                  <button
                    onClick={() => setPaymentMethod("netbanking")}
                    className={`flex-1 py-4 px-6 font-semibold transition-colors ${paymentMethod === "netbanking"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    🏦 Net Banking
                  </button>
                </div>
              </div>

              <div className="p-6 md:p-8">
                {/* Card Payment */}
                {paymentMethod === "card" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.cardNumber ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                            }`}
                        />
                        {getCardType(cardNumber) && (
                          <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {getCardType(cardNumber) === "visa" && <span className="text-blue-600 font-bold">VISA</span>}
                            {getCardType(cardNumber) === "mastercard" && <span className="text-red-600 font-bold">MC</span>}
                            {getCardType(cardNumber) === "amex" && <span className="text-blue-800 font-bold">AMEX</span>}
                          </div>
                        )}
                      </div>
                      {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Cardholder Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        placeholder="JOHN DOE"
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.cardName ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                          }`}
                      />
                      {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                          placeholder="MM/YY"
                          maxLength="5"
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.expiryDate ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                            }`}
                        />
                        {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-1">
                          CVV <span className="text-red-500">*</span>
                          <span className="text-gray-400 cursor-help" title="3 or 4 digit security code on the back of your card">ⓘ</span>
                        </label>
                        <input
                          type="password"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                          placeholder="123"
                          maxLength="4"
                          className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.cvv ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                            }`}
                        />
                        {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                      </div>
                    </div>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveCard}
                        onChange={(e) => setSaveCard(e.target.checked)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Save card for future payments</span>
                    </label>
                  </div>
                )}

                {/* UPI Payment */}
                {paymentMethod === "upi" && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Enter UPI ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none transition-colors ${errors.upiId ? "border-red-500" : "border-gray-200 focus:border-blue-500"
                          }`}
                      />
                      {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-3">Or choose UPI app</p>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {["Google Pay", "PhonePe", "Paytm", "Amazon Pay"].map((app) => (
                          <button
                            key={app}
                            onClick={() => setUpiId(`${app.toLowerCase().replace(/\s/g, "")}@upi`)}
                            className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
                          >
                            <div className="text-2xl mb-1">📱</div>
                            <div className="text-xs font-medium text-gray-700">{app}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Net Banking */}
                {paymentMethod === "netbanking" && (
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm font-semibold text-gray-700 mb-3">Select Your Bank</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {popularBanks.map((bank) => (
                          <button
                            key={bank.name}
                            onClick={() => setSelectedBank(bank.name)}
                            className={`p-4 border-2 rounded-xl transition-all ${selectedBank === bank.name
                                ? "border-blue-600 bg-blue-50"
                                : "border-gray-200 hover:border-blue-300"
                              }`}
                          >
                            <div className="text-3xl mb-2">{bank.logo}</div>
                            <div className="text-sm font-medium text-gray-700">{bank.name}</div>
                          </button>
                        ))}
                      </div>
                      {errors.selectedBank && <p className="text-red-500 text-sm mt-2">{errors.selectedBank}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Other Banks
                      </label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
                      >
                        <option value="">Select a bank</option>
                        <option value="Bank of Baroda">Bank of Baroda</option>
                        <option value="Canara Bank">Canara Bank</option>
                        <option value="Union Bank">Union Bank</option>
                        <option value="Yes Bank">Yes Bank</option>
                        <option value="IndusInd Bank">IndusInd Bank</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Payment Partners */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center gap-6 flex-wrap">
              <span className="text-sm text-gray-600">Secured by:</span>
              <div className="flex items-center gap-4">
                <span className="px-4 py-2 bg-white rounded-lg shadow-sm font-semibold text-gray-700">🔒 SSL</span>
                <span className="px-4 py-2 bg-white rounded-lg shadow-sm font-semibold text-blue-600">Razorpay</span>
                <span className="px-4 py-2 bg-white rounded-lg shadow-sm font-semibold text-purple-600">Stripe</span>
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-28">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>

              <div className="mb-6">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                <h4 className="font-bold text-gray-900 mb-1">{room.name}</h4>
                <p className="text-sm text-gray-600">{room.location}</p>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Room price × {nights} night</span>
                  <span className="font-semibold">₹{basePrice}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Taxes & Fees</span>
                  <span className="font-semibold">₹{taxesAndFees}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-700">
                  <span>Service Fee</span>
                  <span className="font-semibold">₹{serviceFee}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-green-600">₹{totalPrice}</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold text-lg py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none transition-all duration-300 flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Pay ₹{totalPrice}
                  </>
                )}
              </button>

              <div className="mt-6 space-y-2">
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Your payment is 100% secure</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Instant booking confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
