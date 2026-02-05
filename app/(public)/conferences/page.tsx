import { fetchClient } from "@/lib/fetch-client";
import { ConferenceCard } from "@/app/(public)/conferences/_components/conference-card";
import { ConferenceFilters } from "@/app/(public)/conferences/_components/conference-filters";
import { ConferencePagination } from "@/app/(public)/conferences/_components/conference-pagination";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function ConferencesPage(props: {
    searchParams: SearchParams
}) {
    const searchParams = await props.searchParams;
    const session = await auth.api.getSession({ headers: await headers() });

    const page = Number(searchParams.page || 1);
    const limit = 6;
    const theme = typeof searchParams.theme === 'string' ? searchParams.theme : undefined;
    const date = typeof searchParams.date === 'string' ? searchParams.date : undefined;
    const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;

    const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(theme ? { theme } : {}),
        ...(date ? { date } : {}),
        ...(search ? { search } : {}),
    });

    try {
        const [allConferencesRes, userProgramRes, userTickets] = await Promise.all([
            fetchClient(`/api/conferences?${queryParams.toString()}`),
            fetchClient(`/api/program`),
            fetchClient(`/api/tickets/user`)
        ]);

        const conferences = allConferencesRes.data || [];
        const pagination = allConferencesRes.pagination || { totalPages: 1, page: 1, limit: 10, total: 0 };
        const userProgramIds = new Set(userProgramRes.data?.map((c: any) => c.conferenceId) || []);

        const allowedRanges = userTickets.map((t: any) => ({
            start: t.type.validFrom ? new Date(t.type.validFrom).getTime() : null,
            end: t.type.validUntil ? new Date(t.type.validUntil).getTime() : null
        })).filter((r: any) => r.start && r.end);

        const hasUnlimitedAccess = userTickets.some((t: any) => !t.type.validFrom && !t.type.validUntil);

        return (
            <div className="container py-10">
                <div className="mb-10 text-center">
                    <h1 className="lg:text-4xl text-2xl font-display font-bold uppercase tracking-widest text-foreground mb-4">
                        Conférences <span className="text-accent">2026</span>
                    </h1>
                    <p className="max-w-2xl mx-auto mb-8">
                        Découvrez les conférences disponibles.<br />
                        Ajoutez-les à votre programme personnel pour ne rien rater.
                    </p>
                    <ConferenceFilters />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {conferences.map((conf: any) => (
                        <ConferenceCard
                            key={conf.id}
                            conference={conf}
                            isInProgram={userProgramIds.has(conf.id)}
                            isLoggedIn={!!session?.user}
                            allowedRanges={allowedRanges}
                            hasUnlimitedAccess={hasUnlimitedAccess}
                        />
                    ))}
                </div>

                {conferences.length === 0 && (
                    <div className="text-center py-20 text-foreground">
                        Aucune conférence ne correspond à vos critères.
                    </div>
                )}

                <ConferencePagination totalPages={pagination.totalPages} currentPage={pagination.page} />
            </div>
        );
    } catch (error) {
        console.error("Error loading conferences:", error);
        return (
            <div className="container py-10 text-center text-red-500">
                Une erreur est survenue lors du chargement des conférences.
            </div>
        );
    }
}