'use client'

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ZoomIn } from 'lucide-react'
import Image from 'next/image'

export function TicketQRZoom({ qrCodeUrl }: { qrCodeUrl: string }) {
  return (
    <Dialog>
      <DialogTitle className="hidden"></DialogTitle>
      <DialogTrigger asChild>
        <div className="group relative cursor-pointer">
          <div className="rounded-lg bg-white p-2 shadow-inner transition-transform group-hover:scale-105">
            <Image
              src={qrCodeUrl}
              alt="Ticket QR Code"
              className="h-32 w-32 object-contain mix-blend-multiply"
              width={128}
              height={128}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-lg bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
            <ZoomIn className="text-black/50" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="flex items-center justify-center border-none bg-white p-10 sm:max-w-md">
        <Image
          src={qrCodeUrl}
          alt="Ticket QR Code Large"
          className="h-80 w-80 object-contain mix-blend-multiply"
          width={320}
          height={320}
        />
      </DialogContent>
    </Dialog>
  )
}
