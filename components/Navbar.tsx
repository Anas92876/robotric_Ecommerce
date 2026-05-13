'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Image from 'next/image'
import gsap from 'gsap'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from './CartContext'

const NAV_LINKS = [
  { label: 'Home',       href: '/' },
  { label: 'Products',   href: '/#products' },
  { label: 'Categories', href: '/#categories' },
  { label: 'About',      href: '#' },
  { label: 'Contact',    href: '#' },
]

export default function Navbar() {
  const router   = useRouter()
  const pathname = usePathname()
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const { totalItems } = useCart()

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
    )
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#001200]/95 backdrop-blur-lg border-b border-[#cccc99]/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* ── Logo ── */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center group"
            aria-label="RoboTrick Home"
          >
            <Image
              src="/logo.png"
              alt="RoboTrick"
              width={160}
              height={80}
              className="h-11 w-auto"
              priority
            />
          </button>

          {/* ── Desktop nav links ── */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="relative font-mono text-[#cccc99]/60 hover:text-[#cccc99] text-xs tracking-[0.15em] uppercase transition-colors duration-200 group py-1"
              >
                {label}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-[#cccc99] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">
            {/* Cart icon → navigates to /cart */}
            <button
              onClick={() => router.push('/cart')}
              className="relative p-2 text-[#cccc99]/70 hover:text-[#cccc99] transition-colors group"
              aria-label={`Cart (${totalItems} items)`}
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
              {totalItems > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-[#cccc99] text-[#001a00]
                             text-[10px] font-mono font-bold flex items-center justify-center px-0.5
                             animate-pulse-glow"
                >
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-[#cccc99]/70 hover:text-[#cccc99] transition-colors"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 bg-[#001200]/98 backdrop-blur-lg ${
          mobileOpen ? 'max-h-80 border-t border-[#cccc99]/10' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="font-mono text-[#cccc99]/70 hover:text-[#cccc99] text-xs tracking-[0.2em]
                         uppercase py-3 border-b border-[#cccc99]/8 last:border-0 transition-colors"
            >
              {label}
            </a>
          ))}
          <button
            onClick={() => { setMobileOpen(false); router.push('/cart') }}
            className="flex items-center gap-2 font-mono text-[#cccc99]/70 hover:text-[#cccc99] text-xs
                       tracking-[0.2em] uppercase py-3 transition-colors"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            Cart {totalItems > 0 && `(${totalItems})`}
          </button>
        </div>
      </div>
    </nav>
  )
}
