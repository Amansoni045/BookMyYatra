import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token");

    if (!token) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Return mock user
    return NextResponse.json({
        id: "1",
        name: "Test User",
        email: "test@example.com",
    });
}
