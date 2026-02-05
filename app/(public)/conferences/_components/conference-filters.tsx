'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { X, Search } from 'lucide-react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export function ConferenceFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      const currentSearch = searchParams.get('search') || ''
      if (inputRef.current.value !== currentSearch) {
        inputRef.current.value = currentSearch
      }
    }
  }, [searchParams])

  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== 'all') {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      if (name !== 'page') {
        params.set('page', '1')
      }
      return params.toString()
    },
    [searchParams]
  )

  const handleThemeChange = (value: string) => {
    router.push(pathname + '?' + createQueryString('theme', value))
  }

  const handleDateChange = (dates: string[]) => {
    const value = dates.length > 0 ? dates.join(',') : null
    router.push(pathname + '?' + createQueryString('date', value))
  }

  const debouncedSearch = useDebouncedCallback((value: string) => {
    router.push(pathname + '?' + createQueryString('search', value))
  }, 300)

  const resetFilters = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('search')
    params.delete('theme')
    params.delete('date')
    if (inputRef.current) inputRef.current.value = ''
    router.push(pathname)
  }

  const currentTheme = searchParams.get('theme') || 'all'
  const currentDateParam = searchParams.get('date')
  const currentDates = currentDateParam ? currentDateParam.split(',') : []
  const currentSearch = searchParams.get('search')

  const themes = [
    'Écologie & Habitat',
    'Biodiversité',
    'Numérique Responsable',
    'Engagement',
    'Musique',
    'Atelier',
  ]

  const dates = [
    { label: 'VEN 17', value: '2026-07-17' },
    { label: 'SAM 18', value: '2026-07-18' },
    { label: 'DIM 19', value: '2026-07-19' },
  ]

  return (
    <div className="mx-auto mb-12 flex w-full max-w-5xl flex-col gap-8">
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-end">
        <div className="relative">
          <Search
            className="text-muted-foreground absolute top-1/2 left-4 -translate-y-1/2 transform"
            size={20}
          />
          <Input
            ref={inputRef}
            placeholder="RECHERCHER UNE CONFÉRENCE..."
            defaultValue={currentSearch || ''}
            onChange={(e) => debouncedSearch(e.target.value)}
            className="border-accent w-full min-w-[300px] border-2 py-5 pr-4 pl-12 text-lg"
          />
        </div>
        <div className="flex w-full flex-col items-center gap-3 md:w-auto md:items-start">
          <span className="text-foreground text-xs font-bold tracking-widest uppercase">
            Filtrer par date
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {/* <Button
                            variant={currentDates.length === 0 ? "default" : "outline"}
                            onClick={() => handleDateChange([])}
                            className={cn(currentDates.length === 0 ? "rounded-none bg-accent border-2 cursor-pointer border-secondary" : "")}
                        >
                            Tous
                        </Button> */}

            <ToggleGroup
              type="multiple"
              value={currentDates}
              onValueChange={handleDateChange}
            >
              {dates.map((d) => (
                <ToggleGroupItem
                  key={d.value}
                  value={d.value}
                  aria-label={d.label}
                  className="bg-secondary border-accent data-[state=on]:bg-accent data-[state=on]:text-foreground data-[state=on]:border-accent hover:bg-secondary/5 hover:border-accent hover:text-accent h-auto cursor-pointer rounded-none border-2 px-5 py-2 text-sm font-bold tracking-wide whitespace-nowrap uppercase"
                >
                  {d.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 md:w-[300px]">
          <span className="text-foreground text-center text-xs font-bold tracking-widest uppercase md:text-left">
            Filtrer par thème
          </span>
          <Select value={currentTheme} onValueChange={handleThemeChange}>
            <SelectTrigger
              aria-label="Choisir un thème"
              className="bg-secondary border-accent font-display hover:bg-accent hover:border-secondary w-full cursor-pointer rounded-none border-3 px-4 py-1.5 text-sm font-bold tracking-wider text-black uppercase transition-all duration-300 hover:opacity-90"
            >
              <SelectValue placeholder="TOUS LES THÈMES" />
            </SelectTrigger>
            <SelectContent className="bg-secondary border-accent max-h-[300px] rounded-none border-3">
              <SelectItem
                value="all"
                className="text-xs font-bold tracking-wider uppercase"
              >
                Tous les thèmes
              </SelectItem>
              {themes.map((theme) => (
                <SelectItem
                  key={theme}
                  value={theme}
                  className="text-xs font-medium tracking-wide uppercase"
                >
                  {theme}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {(currentTheme !== 'all' || currentDates.length > 0 || currentSearch) && (
        <div className="-mt-4 flex justify-center">
          <Button
            variant="ghost"
            onClick={resetFilters}
            className="border-accent text-foreground hover:bg-destructive/10 cursor-pointer gap-2 rounded-none border-2 px-6 text-xs font-bold tracking-widest uppercase transition-colors"
          >
            <X size={14} /> Effacer les filtres
          </Button>
        </div>
      )}
    </div>
  )
}
