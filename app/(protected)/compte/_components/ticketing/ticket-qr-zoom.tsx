'use client'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ZoomIn } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

export function TicketQRZoom({ ticketCode }: { ticketCode: string }) {
  if (!ticketCode) return null

  return (
    <Dialog>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogTrigger asChild>
        <div className="group relative cursor-pointer">
          <div className="rounded-lg bg-white p-2 shadow-inner transition-transform group-hover:scale-105">
            <QRCodeSVG
              value={ticketCode}
              size={128}
              level="M"
              className="h-32 w-32 mix-blend-multiply"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn className="text-black/50" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center border-none bg-white p-10 sm:max-w-md">
        <QRCodeSVG
          value={ticketCode}
          size={320}
          level="H"
          className="h-80 w-80 mix-blend-multiply"
        />
      </DialogContent>
    </Dialog>
  )
}
