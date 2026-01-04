import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const data = await req.json();
        // Simulate user creation
        return NextResponse.json({ message: "User created", user: { id: "2", ...data } });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Error creating user" }, { status: 500 });
    }
}
