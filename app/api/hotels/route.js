import { NextResponse } from "next/server";

export async function GET() {
    const hotels = [
        {
            id: "1",
            name: "The Oberoi Udaivilas",
            location: "Udaipur, Rajasthan",
            rating: 4.9,
            price: 25000,
            image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
            tag: "Luxury",
        },
        {
            id: "2",
            name: "Taj Lake Palace",
            location: "Udaipur, Rajasthan",
            rating: 4.8,
            price: 30000,
            image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
            tag: "Heritage",
        },
        {
            id: "3",
            name: "Rambagh Palace",
            location: "Jaipur, Rajasthan",
            rating: 4.9,
            price: 28000,
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
            tag: "Royal",
        },
        {
            id: "4",
            name: "The Leela Palace",
            location: "New Delhi",
            rating: 4.7,
            price: 18000,
            image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
            tag: "Business",
        },
        {
            id: "5",
            name: "Goa Marriott Resort",
            location: "Panaji, Goa",
            rating: 4.6,
            price: 15000,
            image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1024&q=80",
            tag: "Beach",
        },
    ];

    return NextResponse.json(hotels);
}
