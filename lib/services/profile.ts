import { db } from "@/lib/db";
import { profile } from "@/lib/db/schema/profile";
import { eq } from "drizzle-orm";
import { user } from "@/lib/db/schema/auth";

export async function updateProfileService(userId: string, firstName: string, lastName: string, email?: string) {
    try {
        await db.transaction(async (tx) => {
            await tx
                .update(profile)
                .set({
                    firstName,
                    lastName,
                    updatedAt: new Date(),
                })
                .where(eq(profile.userId, userId));

            if (email) {
                await tx
                    .update(user)
                    .set({
                        email,
                        updatedAt: new Date(),
                    })
                    .where(eq(user.id, userId));
            }
        });

        return { success: true };
    } catch (error: any) {
        if (error.code === '23505') {
            return {
                success: false,
                error: "Impossible de mettre à jour le profil.",
            };
        }

        return {
            success: false,
            error: "Une erreur est survenue lors de la mise à jour.",
        };
    }
}