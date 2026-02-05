import { headers } from "next/headers";

export async function fetchClient(path: string, options: RequestInit = {}) {
    // Check if we are on the server
    const isServer = typeof window === "undefined";

    let url = path;
    const reqHeaders = new Headers(options.headers);

    if (isServer) {
        const headersList = await headers();
        const host = headersList.get("host") || "localhost:3000";
        const protocol = headersList.get("x-forwarded-proto") || "http";

        // Construct absolute URL
        if (path.startsWith("/")) {
            url = `${protocol}://${host}${path}`;
        }

        // Forward cookies
        const cookie = headersList.get("cookie");
        if (cookie) {
            reqHeaders.set("Cookie", cookie);
        }
    }

    const res = await fetch(url, {
        ...options,
        headers: reqHeaders,
    });

    if (!res.ok) {
        throw new Error(`API request failed: ${res.statusText}`);
    }

    return res.json();
}
