import { auth } from "@/lib/auth";
import { addToProgram, getUserProgram, removeFromProgram } from "@/lib/services/program";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) {
            return NextResponse.json({ data: [] });
        }

        const result = await getUserProgram(session.user.id);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { conferenceId } = body;

        if (!conferenceId) {
            return NextResponse.json({ success: false, error: "Missing conferenceId" }, { status: 400 });
        }

        const result = await addToProgram(session.user.id, conferenceId);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });
        if (!session?.user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { conferenceId } = body;

        if (!conferenceId) {
            return NextResponse.json({ success: false, error: "Missing conferenceId" }, { status: 400 });
        }

        const result = await removeFromProgram(session.user.id, conferenceId);
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}