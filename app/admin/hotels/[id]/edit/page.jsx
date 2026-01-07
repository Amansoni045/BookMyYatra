"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditHotelPage() {
    const router = useRouter();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        location: "",
        price: "",
        rating: "",
        image: "",
        tag: "",
        description: "",
        services: "",
        maxGuests: "",
    });

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001";

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const res = await fetch(`${backendUrl}/api/hotels/${id}`);
                if (!res.ok) throw new Error("Failed to fetch hotel");
                const data = await res.json();

                setFormData({
                    name: data.name,
                    location: data.location,
                    price: data.price,
                    rating: data.rating,
                    image: data.image,
                    tag: data.tag || "",
                    description: data.description,
                    services: data.services || "",
                    maxGuests: data.maxGuests,
                });
            } catch (error) {
                console.error("Error fetching hotel:", error);
                alert("Failed to load hotel details");
                router.push("/admin/hotels");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchHotel();
    }, [id, backendUrl, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch(`${backendUrl}/api/admin/hotels/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    rating: Number(formData.rating),
                    maxGuests: Number(formData.maxGuests),
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "Failed to update hotel");
            }

            alert("Hotel updated successfully!");
            router.push("/admin/hotels");
        } catch (error) {
            console.error("Error updating hotel:", error);
            alert(error.message || "Error updating hotel. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return <div className="p-8">Loading hotel details...</div>;

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Hotel</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Hotel Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Location</label>
                        <input
                            type="text"
                            name="location"
                            required
                            value={formData.location}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price (per night)</label>
                        <input
                            type="number"
                            name="price"
                            required
                            min="0"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
                        <input
                            type="number"
                            name="rating"
                            step="0.1"
                            min="0"
                            max="5"
                            required
                            value={formData.rating}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            required
                            value={formData.image}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tag (Optional)</label>
                        <input
                            type="text"
                            name="tag"
                            value={formData.tag}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Max Guests</label>
                        <input
                            type="number"
                            name="maxGuests"
                            required
                            min="1"
                            value={formData.maxGuests}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Services (comma separated)</label>
                        <input
                            type="text"
                            name="services"
                            value={formData.services}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            rows={4}
                            required
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-3 border"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`px-8 py-3 rounded-full text-white font-medium shadow-lg transition-all ${submitting ? "bg-gray-400" : "bg-black hover:bg-gray-800"
                            }`}
                    >
                        {submitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
