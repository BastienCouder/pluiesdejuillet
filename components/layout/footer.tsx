import Link from 'next/link'
import { link } from '@/constants/link'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-accent/20 bg-primary text-foreground border-t py-8">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="text-sm font-medium">
          © {currentYear} Les Pluies de Juillet. Tous droits réservés.
        </div>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            href={link.mentionsLegales}
            className="hover:text-accent underline-offset-4 transition-colors hover:underline"
          >
            Mentions Légales
          </Link>
          <Link
            href={link.politiqueConfidentialite}
            className="hover:text-accent underline-offset-4 transition-colors hover:underline"
          >
            Politique de Confidentialité
          </Link>
        </nav>
      </div>
    </footer>
  )
}
