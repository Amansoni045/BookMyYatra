"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

const BACKEND_URL =
    process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_BACKEND_LOCAL_URL
        : process.env.NEXT_PUBLIC_BACKEND_PROD_URL;

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

    useEffect(() => {
        if (!id) return;

        const fetchHotel = async () => {
            try {
                const res = await fetch(`${BACKEND_URL}/api/hotels/${id}`, {
                    credentials: "include",
                });

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
            } catch (err) {
                console.error(err);
                alert("Failed to load hotel details");
                router.push("/admin/hotels");
            } finally {
                setLoading(false);
            }
        };

        fetchHotel();
    }, [id, router]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch(`${BACKEND_URL}/api/admin/hotels/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    rating: Number(formData.rating),
                    maxGuests: Number(formData.maxGuests),
                }),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to update hotel");
            }

            alert("Hotel updated successfully!");
            router.push("/admin/hotels");
        } catch (err) {
            console.error(err);
            alert(err.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center">Loading hotel details...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Edit Hotel</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium">Hotel Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 w-full border p-3 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Location</label>
                        <input
                            type="text"
                            name="location"
                            required
                            value={formData.location}
                            onChange={handleChange}
                            className="mt-1 w-full border p-3 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Price / Night</label>
                        <input
                            type="number"
                            name="price"
                            min="0"
                            required
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 w-full border p-3 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Rating (0–5)</label>
                        <input
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            name="rating"
                            required
                            value={formData.rating}
                            onChange={handleChange}
                            className="mt-1 w-full border p-3 rounded-md"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium">Image URL</label>
                        <input
                            type="url"
                            name="image"
                            required
                            value={formData.image}
                            onChange={handleChange}
                            className="mt-1 w-full border p-3 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Tag</label>
                        <input
                            type="text"
                            name="tag"
                            value={formData.tag}
                            onChange={handleChange}
                            className="mt-1 w-full border p-3 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Max Guests</label>
                        <input
                            type="number"
                            name="maxGuests"
                            min="1"
                            required
                            value={formData.maxGuests}
                            onChange={handleChange}
                            className="mt-1 w-full border p-3 rounded-md"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium">
                            Services (comma separated)
                        </label>
                        <input
                            type="text"
                            name="services"
                            value={formData.services}
                            onChange={handleChange}
                            className="mt-1 w-full border p-3 rounded-md"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            rows={4}
                            name="description"
                            required
                            value={formData.description}
                            onChange={handleChange}
                            className="mt-1 w-full border p-3 rounded-md"
                        />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={submitting}
                        className={`px-8 py-3 rounded-full text-white ${submitting ? "bg-gray-400" : "bg-black hover:bg-gray-800"
                            }`}
                    >
                        {submitting ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
