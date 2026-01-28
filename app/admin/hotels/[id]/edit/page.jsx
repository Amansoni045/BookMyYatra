"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { BACKEND_URL } from "@/app/lib/config";

export default function EditHotelPage() {
    const { id } = useParams();
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetch(`${BACKEND_URL}/api/hotels/${id}`)
            .then((res) => res.json())
            .then((hotel) => {
                setData(hotel);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Hotel Not Found</h3>
                <p className="text-gray-600">The hotel you're looking for doesn't exist.</p>
            </div>
        );
    }

    const submit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const payload = {
                ...data,
                price: Number(data.price),
                rating: Number(data.rating),
                maxGuests: Number(data.maxGuests),
            };

            await fetch(`${BACKEND_URL}/api/admin/hotels/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            router.push("/admin/hotels");
        } catch (error) {
            console.error("Error updating hotel:", error);
            alert("Failed to update hotel. Please try again.");
            setSaving(false);
        }
    };

    const fieldLabels = {
        name: "Hotel Name",
        location: "Location",
        price: "Price per Night (₹)",
        description: "Description",
        image: "Image URL",
        amenities: "Amenities",
        rating: "Rating",
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Edit Hotel
                </h1>
                <p className="text-gray-600 mt-2">Update hotel information</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
                <form onSubmit={submit} className="space-y-6">
                    {Object.keys(data)
                        .filter((key) => key !== "id" && key !== "createdAt" && key !== "updatedAt")
                        .map((key) => (
                            <div key={key} className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-700">
                                    {fieldLabels[key] || key.charAt(0).toUpperCase() + key.slice(1)}
                                </label>
                                {key === "description" ? (
                                    <textarea
                                        value={data[key] || ""}
                                        onChange={(e) => setData({ ...data, [key]: e.target.value })}
                                        className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none text-gray-900"
                                        rows={4}
                                        placeholder={`Enter ${fieldLabels[key] || key}`}
                                    />
                                ) : (
                                    <input
                                        type={key === "price" || key === "rating" ? "number" : "text"}
                                        value={data[key] || ""}
                                        onChange={(e) => setData({ ...data, [key]: e.target.value })}
                                        className="w-full border-2 border-gray-200 p-4 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none text-gray-900"
                                        placeholder={`Enter ${fieldLabels[key] || key}`}
                                        step={key === "price" ? "0.01" : key === "rating" ? "0.1" : undefined}
                                    />
                                )}
                            </div>
                        ))}

                    <div className="flex gap-4 pt-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:shadow-blue-300 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {saving ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    Updating...
                                </span>
                            ) : (
                                "Update Hotel"
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
