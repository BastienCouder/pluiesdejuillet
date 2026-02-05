import { auth } from "@/lib/auth";
import { isInProgram } from "@/lib/services/program";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const conferenceId = searchParams.get('conferenceId');

        if (!conferenceId) {
            return NextResponse.json({ success: false, error: "Missing conferenceId" }, { status: 400 });
        }

        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) {
            // If not logged in, they can't have it in program
            return NextResponse.json({ success: true, data: false });
        }

        const result = await isInProgram(session.user.id, conferenceId);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}