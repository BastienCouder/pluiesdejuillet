'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { link } from '@/constants/link'

interface NavbarProps {
  user?: {
    id: string
    email: string
    name?: string
  } | null
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMenu = () => setIsMobileMenuOpen(false)

  return (
    <nav className="bg-primary text-foreground border-foreground relative z-50 w-full border-b-6">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <div className="flex items-center">
          <Link
            href="/"
            className="relative block h-12 w-48"
            onClick={closeMenu}
          >
            <Image
              src="/images/logo.png"
              alt="Les Pluies de Juillet"
              className="h-full w-auto object-contain"
              width={192}
              height={48}
            />
          </Link>

          <div className="hidden flex-col text-xs leading-tight font-bold opacity-90 md:flex">
            <span>17.18.19 JUILLET 2026</span>
            <span>CHAMPREPUS(50), NORMANDIE</span>
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <div className="font-display flex items-center gap-6 tracking-wide uppercase">
            <Link
              href={link.conferences}
              className={cn(
                'hover:text-accent transition-colors duration-300',
                pathname.startsWith(link.conferences) && 'text-accent'
              )}
            >
              Conférences
            </Link>
            {user ? (
              <Link
                href={link.myProgram}
                className={cn(
                  'hover:text-accent transition-colors duration-300',
                  pathname === link.myProgram && 'text-accent'
                )}
              >
                Mon Programme
              </Link>
            ) : null}
          </div>

          {user ? (
            <Link href={link.account}>
              <div className="bg-secondary border-accent font-display hover:bg-accent hover:border-secondary border-3 px-4 py-1.5 text-sm tracking-wider uppercase transition-all duration-300 hover:opacity-90">
                Mon Compte
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <div className="font-display tracking-wide uppercase">
                <Link
                  href={link.login}
                  className={cn(
                    'hover:text-accent transition-colors duration-300',
                    pathname === link.login && 'text-accent'
                  )}
                >
                  Connexion
                </Link>
              </div>
              <Link href={link.signup}>
                <div className="bg-secondary border-accent font-display hover:bg-accent hover:border-secondary border-3 px-4 py-1.5 text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:opacity-90">
                  Inscription
                </div>
              </Link>
            </div>
          )}
        </div>

        <button
          className="hover:text-accent p-2 text-black transition-colors md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="bg-primary border-accent animate-in slide-in-from-top-5 fade-in-0 absolute top-20 left-0 flex w-full flex-col gap-6 border-b-6 p-6 shadow-xl duration-200 md:hidden">
          <div className="font-display flex flex-col gap-4 text-center text-xl tracking-wide uppercase">
            <Link
              href={link.conferences}
              onClick={closeMenu}
              className={cn(
                'hover:text-accent py-2 transition-colors',
                pathname.startsWith(link.conferences) && 'text-accent'
              )}
            >
              Conférences
            </Link>
            {user && (
              <Link
                href={link.myProgram}
                onClick={closeMenu}
                className={cn(
                  'hover:text-accent py-2 transition-colors',
                  pathname === link.myProgram && 'text-accent'
                )}
              >
                Mon Programme
              </Link>
            )}
            <hr className="my-2 border-black/10" />
            {user ? (
              <Link href={link.account} onClick={closeMenu}>
                <div className="bg-secondary border-accent font-display hover:bg-accent hover:border-secondary w-full border-3 px-6 py-2 text-center text-base tracking-wider uppercase transition-all duration-300 hover:opacity-90">
                  Mon Compte
                </div>
              </Link>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Link
                  href={link.login}
                  onClick={closeMenu}
                  className={cn(
                    'hover:text-accent py-2 transition-colors',
                    pathname === link.login && 'text-accent'
                  )}
                >
                  Connexion
                </Link>
                <Link href={link.signup} onClick={closeMenu} className="w-full">
                  <div className="bg-secondary border-accent font-display hover:bg-accent hover:border-secondary w-full border-3 px-6 py-2 text-center text-base font-bold tracking-wider uppercase transition-all duration-300 hover:opacity-90">
                    Inscription
                  </div>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
