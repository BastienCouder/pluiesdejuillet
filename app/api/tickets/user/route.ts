import { auth } from "@/lib/auth";
import { getUserTickets } from "@/lib/services/commerce";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) {
            return NextResponse.json([]);
        }

        const tickets = await getUserTickets(session.user.id);
        return NextResponse.json(tickets);
    } catch (error) {
        console.error("Error in GET /api/tickets/user:", error);
        return NextResponse.json([], { status: 500 });
    }
}