import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { email, password } = await req.json();

        // Mock validation
        if (!email || !password) {
            return NextResponse.json({ message: "Invalid credentials" }, { status: 400 });
        }

        // Mock user
        const user = {
            id: "1",
            name: "Test User",
            email: email,
        };

        // Set a mock session cookie
        const response = NextResponse.json(user);
        response.cookies.set("auth_token", "mock_token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
