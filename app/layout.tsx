import type { Metadata, Viewport } from 'next'
import { Share_Tech_Mono, Rajdhani } from 'next/font/google'
import './globals.css'
import { CartProvider } from '@/components/CartContext'

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const rajdhani = Rajdhani({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'RoboTrick — Mindset Is Everything',
  description:
    "Egypt's premier destination for Arduino, Raspberry Pi, sensors, and cutting-edge maker technology. Build the future, one circuit at a time.",
  keywords: ['Arduino', 'Raspberry Pi', 'electronics', 'maker', 'robotics', 'Egypt', 'sensors', 'ESP32'],
  openGraph: {
    title: 'RoboTrick — Mindset Is Everything',
    description: "Egypt's premier maker tech store. Arduino, Raspberry Pi, Sensors & more.",
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#001a00',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${shareTechMono.variable} ${rajdhani.variable}`}
    >
      <body className="bg-[#001a00] text-white antialiased selection:bg-[#cccc99]/30 selection:text-[#cccc99]">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
