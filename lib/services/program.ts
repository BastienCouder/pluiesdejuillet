import { db } from "@/lib/db";
import { conference, userProgramItem } from "@/lib/db/schema/conference";
import { ticket } from "@/lib/db/schema/commerce";
import { and, eq, sql } from "drizzle-orm";

export async function getUserProgram(userId: string) {
    try {
        const programItems = await db
            .select({
                conferenceId: userProgramItem.conferenceId,
                createdAt: userProgramItem.createdAt,
                conference: {
                    id: conference.id,
                    title: conference.title,
                    description: conference.description,
                    theme: conference.theme,
                    startAt: conference.startAt,
                    endAt: conference.endAt,
                },
            })
            .from(userProgramItem)
            .innerJoin(conference, eq(userProgramItem.conferenceId, conference.id))
            .where(eq(userProgramItem.userId, userId))
            .orderBy(conference.startAt);

        return {
            success: true,
            data: programItems,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Erreur lors de la récupération du programme",
        };
    }
}

export async function addToProgram(userId: string, conferenceId: string) {
    try {
        // First check strict conference existence
        const conferenceExists = await db
            .select()
            .from(conference)
            .where(eq(conference.id, conferenceId))
            .limit(1);

        if (conferenceExists.length === 0) {
            return {
                success: false,
                error: "Conférence non trouvée",
            };
        }

        const conf = conferenceExists[0];

        // Check tickets validity
        const validTickets = await db.query.ticket.findMany({
            where: and(
                eq(ticket.userId, userId),
                eq(ticket.status, "VALID")
            ),
            with: {
                type: true
            }
        });

        const hasAccess = validTickets.some(t => {
            if (!t.type.validFrom || !t.type.validUntil) return true;
            const confDate = new Date(conf.startAt);
            return confDate >= t.type.validFrom && confDate <= t.type.validUntil;
        });

        if (!hasAccess) {
            return {
                success: false,
                error: "Aucun billet valide pour cette date."
            };
        }

        // Check if already in program
        const existing = await db
            .select()
            .from(userProgramItem)
            .where(
                and(
                    eq(userProgramItem.userId, userId),
                    eq(userProgramItem.conferenceId, conferenceId)
                )
            )
            .limit(1);

        if (existing.length > 0) {
            return {
                success: true,
                message: "Conférence déjà dans votre programme",
            };
        }

        await db.insert(userProgramItem).values({
            userId,
            conferenceId,
            createdAt: new Date(),
        });

        return {
            success: true,
            message: "Conférence ajoutée à votre programme",
        };
    } catch (error: any) {
        console.error("Error adding to program:", error);
        return {
            success: false,
            error: error.message || "Erreur lors de l'ajout au programme",
        };
    }
}

export async function removeFromProgram(userId: string, conferenceId: string) {
    try {
        await db
            .delete(userProgramItem)
            .where(
                and(
                    eq(userProgramItem.userId, userId),
                    eq(userProgramItem.conferenceId, conferenceId)
                )
            );

        return {
            success: true,
            message: "Conférence retirée de votre programme",
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Erreur lors du retrait du programme",
        };
    }
}

export async function isInProgram(userId: string, conferenceId: string) {
    try {
        const existing = await db
            .select()
            .from(userProgramItem)
            .where(
                and(
                    eq(userProgramItem.userId, userId),
                    eq(userProgramItem.conferenceId, conferenceId)
                )
            )
            .limit(1);

        return {
            success: true,
            data: existing.length > 0,
        };
    } catch (error: any) {
        return {
            success: false,
            error: error.message || "Erreur lors de la vérification",
            data: false,
        };
    }
}
