"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { link } from "@/constants/link";

interface ConferenceCardProps {
    conference: {
        id: string;
        title: string;
        description: string;
        theme: string;
        startAt: Date;
        endAt: Date;
        location: string | null;
        speakerName: string | null;
    };
    isInProgram?: boolean;
    isLoggedIn?: boolean;
    allowedRanges?: { start: number, end: number }[];
    hasUnlimitedAccess?: boolean;
}

export function ConferenceCard({
    conference,
    isInProgram = false,
    isLoggedIn = false,
    allowedRanges = [],
    hasUnlimitedAccess = false
}: ConferenceCardProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [added, setAdded] = useState(isInProgram);

    const confTime = new Date(conference.startAt).getTime();
    const hasAccess = isLoggedIn && (
        hasUnlimitedAccess ||
        (allowedRanges.length > 0 && allowedRanges.some(r => confTime >= r.start && confTime <= r.end))
    );

    const handleToggle = async () => {
        if (!isLoggedIn) {
            toast.error("Veuillez vous connecter pour gérer votre programme");
            router.push(link.login);
            return;
        }

        setLoading(true);
        if (added) {
            const res = await fetch(`/api/program`, {
                method: "DELETE",
                body: JSON.stringify({ conferenceId: conference.id }),
            });
            const data = await res.json();
            if (data.success) {
                setAdded(false);
                toast.success("Retiré du programme");
            } else {
                toast.error(data.error || "Erreur");
            }
        } else {
            const res = await fetch(`/api/program`, {
                method: "POST",
                body: JSON.stringify({ conferenceId: conference.id }),
            });
            const data = await res.json();
            if (data.success) {
                setAdded(true);
                toast.success("Ajouté au programme !");
            } else {
                toast.error(data.error || "Impossible d'ajouter");
            }
        }
        setLoading(false);
        router.refresh();
    };

    return (
        <Card className={cn("flex flex-col border-3 border-accent h-full transition-colors bg-primary relative overflow-hidden")}>
            <CardHeader>
                <div className="flex justify-between items-start gap-2">
                    <div className="bg-secondary text-foreground text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {conference.theme}
                    </div>
                </div>
                <CardTitle className="mt-2 text-xl font-display uppercase tracking-tight text-foreground">
                    {conference.title}
                </CardTitle>
                <CardDescription className="flex items-center text-foreground gap-4 mt-2">
                    <div className="flex items-center gap-1">
                        <Calendar size={14} className="text-accent" />
                        <span>
                            {new Date(conference.startAt).toLocaleDateString("fr-FR", { weekday: 'short', day: 'numeric', month: 'short' })}
                            {" - "}
                            {new Date(conference.startAt).toLocaleTimeString("fr-FR", { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    {conference.location && (
                        <div className="flex items-center gap-1">
                            <MapPin size={14} className="text-accent" />
                            <span>{conference.location}</span>
                        </div>
                    )}
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-sm text-foreground line-clamp-3 mb-4">
                    {conference.description}
                </p>
                {conference.speakerName && (
                    <p className="text-sm font-semibold text-foreground mb-4">
                        Intervenant : {conference.speakerName}
                    </p>
                )}
            </CardContent>

            <CardFooter className="w-full flex flex-col gap-2">
                <Link href={`/conferences/${conference.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                        Voir la fiche
                    </Button>
                </Link>
                {isLoggedIn && hasAccess && (
                    <Button
                        onClick={handleToggle}
                        disabled={loading}
                        variant={added ? "outline" : "default"}
                        className={cn(
                            "w-full",
                            added ? "bg-accent" : ""
                        )}
                    >
                        {loading ? "..." : added ? "Retirer " : "Ajouter au programme"}
                    </Button>
                )}
            </CardFooter>

        </Card>
    );
}