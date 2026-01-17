"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BACKEND_URL } from "@/app/lib/config";

export default function AddHotelPage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState({
        name: "",
        location: "",
        price: "",
        rating: "",
        image: "",
        description: "",
        maxGuests: "",
        services: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validate rating to be between 0 and 5
        if (name === "rating") {
            const numValue = parseFloat(value);
            if (value !== "" && (numValue < 0 || numValue > 5)) {
                return; // Don't update if out of range
            }
        }

        setData({ ...data, [name]: value });
    };

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            await fetch(`${BACKEND_URL}/api/admin/hotels`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    ...data,
                    price: Number(data.price),
                    rating: Number(data.rating),
                    maxGuests: Number(data.maxGuests),
                }),
            });

            router.push("/admin/hotels");
        } catch (error) {
            console.error("Error adding hotel:", error);
            setSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Add New Hotel
                </h1>
                <p className="text-gray-600 mt-2">Create a new hotel listing</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Hotel Name *
                            </label>
                            <input
                                name="name"
                                placeholder="Enter hotel name"
                                value={data.name}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Location *
                            </label>
                            <input
                                name="location"
                                placeholder="Enter location"
                                value={data.location}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                required
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Price per Night (₹) *
                            </label>
                            <input
                                name="price"
                                type="number"
                                placeholder="Enter price"
                                value={data.price}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                required
                                min="0"
                                step="0.01"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Rating (0-5)
                            </label>
                            <input
                                name="rating"
                                type="number"
                                step="0.1"
                                placeholder="Enter rating"
                                value={data.rating}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                min="0"
                                max="5"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">
                                Max Guests *
                            </label>
                            <input
                                name="maxGuests"
                                type="number"
                                placeholder="Enter maximum guests"
                                value={data.maxGuests}
                                onChange={handleChange}
                                className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                required
                                min="1"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Image URL *
                        </label>
                        <input
                            name="image"
                            placeholder="Enter image URL"
                            value={data.image}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Enter hotel description"
                            value={data.description}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none text-gray-900"
                            rows={4}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-semibold text-gray-700">
                            Services
                        </label>
                        <textarea
                            name="services"
                            placeholder="Enter hotel services (e.g., WiFi, Pool, Gym, etc.)"
                            value={data.services}
                            onChange={handleChange}
                            className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none text-gray-900"
                            rows={3}
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {saving ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    Saving...
                                </span>
                            ) : (
                                "Save Hotel"
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/admin/hotels")}
                            className="px-8 py-4 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
