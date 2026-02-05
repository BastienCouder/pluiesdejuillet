"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { link } from "@/constants/link";

interface NavbarProps {
    user?: {
        id: string;
        email: string;
        name?: string;
    } | null;
}

export function Navbar({ user }: NavbarProps) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <nav className="w-full bg-primary text-foreground border-b-6 border-foreground relative z-50">
            <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                <div className="flex items-center">
                    <Link href="/" className="relative h-12 w-48 block" onClick={closeMenu}>
                        <Image
                            src="/images/logo.png"
                            alt="Les Pluies de Juillet"
                            className="h-full w-auto object-contain"
                            width={192}
                            height={48}
                        />
                    </Link>

                    <div className="hidden md:flex flex-col text-xs font-bold leading-tight opacity-90">
                        <span>17.18.19 JUILLET 2026</span>
                        <span>CHAMPREPUS(50), NORMANDIE</span>
                    </div>
                </div>

                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6 font-display tracking-wide uppercase">
                        <Link href={link.conferences} className={cn("hover:text-accent transition-colors duration-300", pathname.startsWith(link.conferences) && "text-accent")}>
                            Conférences
                        </Link>
                        {user ? (
                            <Link href={link.myProgram} className={cn("hover:text-accent transition-colors duration-300", pathname === link.myProgram && "text-accent")}>
                                Mon Programme
                            </Link>
                        ) : null}
                    </div>

                    {user ? (
                        <Link href={link.account}>
                            <div className="bg-secondary border-3 text-sm border-accent px-4 py-1.5 uppercase font-display tracking-wider hover:opacity-90 transition-all duration-300 hover:bg-accent hover:border-secondary">
                                Mon Compte
                            </div>
                        </Link>
                    ) : (
                        <div className="flex items-center gap-4">
                            <div className="font-display tracking-wide uppercase">
                                <Link href={link.login} className={cn("hover:text-accent transition-colors duration-300", pathname === link.login && "text-accent")}>
                                    Connexion
                                </Link>
                            </div>
                            <Link href={link.signup}>
                                <div className="bg-secondary border-3 text-sm border-accent px-4 py-1.5 uppercase font-display font-bold tracking-wider hover:opacity-90 transition-all duration-300 hover:bg-accent hover:border-secondary">
                                    Inscription
                                </div>
                            </Link>
                        </div>
                    )}
                </div>

                <button
                    className="md:hidden p-2 text-black hover:text-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
                </button>
            </div>

            {isMobileMenuOpen && (
                <div className="absolute top-20 left-0 w-full bg-primary border-b-6 border-accent p-6 flex flex-col gap-6 md:hidden shadow-xl animate-in slide-in-from-top-5 fade-in-0 duration-200">
                    <div className="flex flex-col gap-4 font-display text-xl tracking-wide uppercase text-center">
                        <Link href={link.conferences} onClick={closeMenu} className={cn("py-2 hover:text-accent transition-colors", pathname.startsWith(link.conferences) && "text-accent")}>
                            Conférences
                        </Link>
                        {user && (
                            <Link href={link.myProgram} onClick={closeMenu} className={cn("py-2 hover:text-accent transition-colors", pathname === link.myProgram && "text-accent")}>
                                Mon Programme
                            </Link>
                        )}
                        <hr className="border-black/10 my-2" />
                        {user ? (
                            <Link href={link.account} onClick={closeMenu}>
                                <div className="bg-secondary border-3 text-base border-accent px-6 py-2 uppercase font-display tracking-wider hover:opacity-90 transition-all duration-300 hover:bg-accent hover:border-secondary w-full text-center">
                                    Mon Compte
                                </div>
                            </Link>
                        ) : (
                            <div className="flex flex-col gap-4 items-center">
                                <Link href={link.login} onClick={closeMenu} className={cn("py-2 hover:text-accent transition-colors", pathname === link.login && "text-accent")}>
                                    Connexion
                                </Link>
                                <Link href={link.signup} onClick={closeMenu} className="w-full">
                                    <div className="bg-secondary border-3 text-base border-accent px-6 py-2 uppercase font-display font-bold tracking-wider hover:opacity-90 transition-all duration-300 hover:bg-accent hover:border-secondary w-full text-center">
                                        Inscription
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}