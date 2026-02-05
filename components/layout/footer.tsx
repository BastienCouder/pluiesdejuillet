import Link from "next/link";
import { link } from "@/constants/link";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-accent/20 bg-primary py-8 text-foreground">
            <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-sm font-medium">
                    © {currentYear} Les Pluies de Juillet. Tous droits réservés.
                </div>

                <nav className="flex items-center gap-6 text-sm">
                    <Link
                        href={link.mentionsLegales}
                        className="hover:text-accent transition-colors underline-offset-4 hover:underline"
                    >
                        Mentions Légales
                    </Link>
                    <Link
                        href={link.politiqueConfidentialite}
                        className="hover:text-accent transition-colors underline-offset-4 hover:underline"
                    >
                        Politique de Confidentialité
                    </Link>
                </nav>
            </div>
        </footer>
    );
}