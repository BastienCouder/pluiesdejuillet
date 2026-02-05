import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TicketQRZoom } from "@/app/(protected)/compte/_components/ticketing/ticket-qr-zoom";
import { link } from "@/constants/link";
import AccountForm from "./_components/account-form";
import LogoutButton from "./_components/logout-button";
import DeleteAccountButton from "./_components/delete-account-button";
import { fetchClient } from "@/lib/fetch-client";

export default async function AccountPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        redirect(link.login);
    }

    const [userProfile, tickets] = await Promise.all([
        fetchClient("/api/profile"),
        fetchClient("/api/tickets/user")
    ]);

    const activeTicket = tickets.find((t: any) => t.status === "VALID");

    return (
        <div className="container py-12 max-w-5xl">
            <div className="mb-8 flex items-center gap-4">
                <h1 className="text-3xl font-bold font-display uppercase tracking-widest text-accent">Mon Compte</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <Card className="border-accent border-3 bg-primary">
                        <CardHeader>
                            <CardTitle className="uppercase font-display tracking-wider">Informations Personnelles</CardTitle>
                            <CardDescription className="text-foreground">Gérez vos informations de connexion et de profil.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <AccountForm
                                initialFirstName={userProfile?.firstName || ""}
                                initialLastName={userProfile?.lastName || ""}
                                initialEmail={session.user.email}
                            />
                        </CardContent>
                    </Card>

                    <Card className="border-accent border-3 bg-primary">
                        <CardContent>
                            <LogoutButton />
                        </CardContent>
                    </Card>

                    <Card className="border-accent border-3 bg-primary">
                        <CardContent>
                            <DeleteAccountButton />
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-1">
                    <h2 className="text-xl font-bold font-display uppercase tracking-wider mb-4 flex items-center gap-2 text-accent">
                        Mon Billet
                    </h2>

                    {activeTicket ? (
                        <Card className="border-accent  border-2 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground overflow-hidden shadow-xl relative">
                            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-background rounded-full z-10" />
                            <div className="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-background rounded-full z-10" />

                            <CardHeader className="pb-2 text-center border-b border-white/10 border-dashed">
                                <CardTitle className="text-lg font-display uppercase tracking-widest text-accent-foreground/90">
                                    {activeTicket.type.name}
                                </CardTitle>
                                <div className="text-4xl font-bold font-display my-2">
                                    {`${userProfile?.firstName} ${userProfile?.lastName}`}
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6 flex flex-col items-center justify-center gap-4">
                                <div className="bg-white p-2 rounded-lg shadow-inner">
                                    <TicketQRZoom qrCodeUrl={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${activeTicket.qrCode}`} />
                                </div>
                            </CardContent>
                        </Card>
                    ) : (
                        null
                    )}
                </div>
            </div>
        </div>
    );
}