'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import {
  Minus, Plus, Trash2, ShieldCheck, Truck,
  RefreshCw, ArrowLeft, ShoppingBag, Cpu,
} from 'lucide-react'
import { useCart } from '@/components/CartContext'
import type { CartItem } from '@/components/CartContext'

/* ═══════════════════════════════════════════════════
   FLOATING CIRCUIT DECORATIONS
═══════════════════════════════════════════════════ */
function FloatingCircuits() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.fc-el', {
        y: -14,
        duration: 5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 1.2, from: 'random' },
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden>
      {/* Top-left chip */}
      <svg className="fc-el absolute -top-4 -left-4 w-44 opacity-[0.055] text-[#cccc99]" viewBox="0 0 160 160" fill="none">
        <rect x="40" y="40" width="80" height="80" stroke="currentColor" strokeWidth="1.2" />
        <rect x="55" y="55" width="50" height="50" stroke="currentColor" strokeWidth="0.7" />
        {[55, 75, 95].map(y => (
          <g key={y}>
            <line x1="40" y1={y} x2="5" y2={y} stroke="currentColor" strokeWidth="1.2" />
            <line x1="120" y1={y} x2="155" y2={y} stroke="currentColor" strokeWidth="1.2" />
            <circle cx="40" cy={y} r="2.5" fill="currentColor" />
            <circle cx="120" cy={y} r="2.5" fill="currentColor" />
          </g>
        ))}
        {[55, 75, 95].map(x => (
          <g key={x + 200}>
            <line x1={x} y1="40" x2={x} y2="5" stroke="currentColor" strokeWidth="1.2" />
            <line x1={x} y1="120" x2={x} y2="155" stroke="currentColor" strokeWidth="1.2" />
          </g>
        ))}
        <text x="68" y="83" fill="currentColor" fontSize="10" fontFamily="monospace">MCU</text>
      </svg>

      {/* Bottom-right trace */}
      <svg className="fc-el absolute -bottom-6 -right-6 w-52 opacity-[0.04] text-[#cccc99]" viewBox="0 0 180 120" fill="none">
        <path d="M10 60 H50 V20 H140 V60 H170" stroke="currentColor" strokeWidth="1.2" />
        <path d="M50 20 V5 H90" stroke="currentColor" strokeWidth="1.2" />
        <path d="M140 20 V5 H100" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="50" cy="20" r="3" fill="currentColor" />
        <circle cx="140" cy="20" r="3" fill="currentColor" />
        <circle cx="50" cy="60" r="3" fill="currentColor" />
        <circle cx="140" cy="60" r="3" fill="currentColor" />
        <rect x="88" y="0" width="24" height="10" stroke="currentColor" strokeWidth="1" />
        <text x="91" y="8" fill="currentColor" fontSize="6" fontFamily="monospace">R2K</text>
        <circle cx="10" cy="60" r="4" stroke="currentColor" strokeWidth="1" />
        <circle cx="170" cy="60" r="4" stroke="currentColor" strokeWidth="1" />
      </svg>

      {/* Mid-left binary rain */}
      <div className="fc-el absolute left-6 top-1/3 opacity-[0.045] text-[#cccc99] font-mono text-[9px] leading-4 hidden lg:block">
        {['01001000', '01101001', '00100001', '10110010', '01010101', '11001100'].map((b, i) => (
          <div key={i} style={{ opacity: 1 - i * 0.14 }}>{b}</div>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   EMPTY CART
═══════════════════════════════════════════════════ */
function EmptyCart({ onBack }: { onBack: () => void }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.ec-icon', { scale: 0.4, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.7)' })
      gsap.fromTo('.ec-text', { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.12, ease: 'power2.out', delay: 0.4 })
      gsap.to('.ec-icon', { y: -10, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 0.7 })
      // Pulse the circuit ring
      gsap.to('.ec-ring', { rotate: 360, transformOrigin: '50% 50%', duration: 20, ease: 'none', repeat: -1 })
    }, ref)
    return () => ctx.revert()
  }, [])

  return (
    <div ref={ref} className="flex flex-col items-center justify-center py-32 text-center">
      <div className="ec-icon relative mb-8">
        {/* Rotating circuit ring */}
        <svg className="ec-ring absolute inset-0 w-full h-full" viewBox="0 0 96 96" fill="none">
          <circle cx="48" cy="48" r="44" stroke="#cccc99" strokeWidth="0.8" strokeDasharray="8 4" opacity="0.15" />
        </svg>
        <div className="w-24 h-24 flex items-center justify-center">
          <svg className="w-16 h-16 text-[#cccc99]/20" viewBox="0 0 64 64" fill="none">
            <rect x="8" y="8" width="48" height="48" rx="2" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 2.5" />
            <circle cx="32" cy="32" r="12" stroke="currentColor" strokeWidth="1.5" />
            <line x1="20" y1="32" x2="8" y2="32" stroke="currentColor" strokeWidth="1.5" />
            <line x1="44" y1="32" x2="56" y2="32" stroke="currentColor" strokeWidth="1.5" />
            <line x1="32" y1="20" x2="32" y2="8" stroke="currentColor" strokeWidth="1.5" />
            <line x1="32" y1="44" x2="32" y2="56" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="32" cy="32" r="3" fill="currentColor" opacity="0.4" />
          </svg>
          <ShoppingBag className="w-6 h-6 text-[#cccc99]/25 absolute" />
        </div>
      </div>

      <h2 className="ec-text font-mono text-[#cccc99]/45 text-2xl tracking-[0.3em] uppercase mb-2">
        Cart Is Empty
      </h2>
      <p className="ec-text font-body text-[#cccc99]/30 text-sm mb-2">
        No components in your build list yet.
      </p>
      <p className="ec-text font-mono text-[#cccc99]/20 text-[11px] tracking-widest uppercase mb-10">
        [ 0x00 ITEMS ]
      </p>
      <button
        onClick={onBack}
        className="ec-text flex items-center gap-2.5 font-mono text-[12px] tracking-[0.25em] uppercase
                   border border-[#cccc99]/25 text-[#cccc99]/55 px-7 py-3.5
                   hover:border-[#cccc99]/55 hover:text-[#cccc99] hover:bg-[#cccc99]/5
                   transition-all duration-200"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Browse Products
      </button>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   CART ITEM ROW
═══════════════════════════════════════════════════ */
interface ItemRowProps {
  item: CartItem
  onRemove: () => void
  onQtyChange: (qty: number, ref: React.RefObject<HTMLSpanElement>) => void
  rowRef: (el: HTMLDivElement | null) => void
}

function CartItemRow({ item, onRemove, onQtyChange, rowRef }: ItemRowProps) {
  const qtyRef = useRef<HTMLSpanElement>(null)
  const elRef = useRef<HTMLDivElement>(null)

  const combinedRef = useCallback((el: HTMLDivElement | null) => {
    ;(elRef as React.MutableRefObject<HTMLDivElement | null>).current = el
    rowRef(el)
  }, [rowRef])

  const handleHoverIn = () => {
    gsap.to(elRef.current, {
      boxShadow: '0 0 24px rgba(204,204,153,0.09), 0 4px 20px rgba(0,0,0,0.4)',
      borderColor: 'rgba(204,204,153,0.32)',
      duration: 0.25,
    })
  }
  const handleHoverOut = () => {
    gsap.to(elRef.current, {
      boxShadow: '0 0 0px rgba(204,204,153,0)',
      borderColor: 'rgba(204,204,153,0.12)',
      duration: 0.25,
    })
  }

  return (
    <div
      ref={combinedRef}
      className="cart-item-row flex items-center gap-3 sm:gap-4 bg-[#001f00] border border-[#cccc99]/12 p-3 sm:p-4"
      style={{ willChange: 'transform, opacity, height', overflow: 'hidden' }}
      onMouseEnter={handleHoverIn}
      onMouseLeave={handleHoverOut}
    >
      {/* Product image */}
      <div className="relative w-[72px] h-[72px] sm:w-20 sm:h-20 flex-shrink-0 overflow-hidden bg-[#002800]">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001f00]/60 to-transparent" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="font-mono text-[#cccc99]/40 text-[10px] tracking-[0.2em] uppercase mb-0.5">Component</p>
        <h3 className="font-mono text-white text-xs sm:text-sm font-medium leading-snug line-clamp-2">
          {item.name}
        </h3>
        <p className="font-mono text-[#cccc99] text-sm font-bold mt-1">
          ${item.price.toFixed(2)}
        </p>
      </div>

      {/* Qty stepper */}
      <div className="flex items-center border border-[#cccc99]/18 flex-shrink-0">
        <button
          onClick={() => onQtyChange(item.quantity - 1, qtyRef)}
          className="w-8 h-8 flex items-center justify-center text-[#cccc99]/50
                     hover:text-[#cccc99] hover:bg-[#cccc99]/8 transition-all"
          aria-label="Decrease"
        >
          <Minus className="w-3 h-3" />
        </button>
        <div
          className="w-9 h-8 flex items-center justify-center overflow-hidden"
          style={{ perspective: '300px' }}
        >
          <span
            ref={qtyRef}
            className="font-mono text-[#cccc99] text-sm font-bold"
            style={{ display: 'inline-block' }}
          >
            {item.quantity}
          </span>
        </div>
        <button
          onClick={() => onQtyChange(item.quantity + 1, qtyRef)}
          className="w-8 h-8 flex items-center justify-center text-[#cccc99]/50
                     hover:text-[#cccc99] hover:bg-[#cccc99]/8 transition-all"
          aria-label="Increase"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>

      {/* Line total */}
      <div className="hidden sm:block w-20 text-right flex-shrink-0">
        <p className="font-mono text-[#cccc99] text-sm font-bold">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove */}
      <button
        onClick={onRemove}
        className="w-8 h-8 flex items-center justify-center text-[#cccc99]/25
                   hover:text-red-400 hover:bg-red-500/8 transition-all flex-shrink-0"
        aria-label="Remove"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   CHECKOUT BUTTON  (SVG border trace on hover)
═══════════════════════════════════════════════════ */
function CheckoutButton({ loading, onClick }: { loading: boolean; onClick: () => void }) {
  const pathRef = useRef<SVGRectElement>(null)

  const handleEnter = () => {
    if (!pathRef.current) return
    gsap.fromTo(pathRef.current,
      { strokeDashoffset: 2000 },
      { strokeDashoffset: 0, duration: 0.65, ease: 'power2.inOut' }
    )
  }
  const handleLeave = () => {
    if (!pathRef.current) return
    gsap.to(pathRef.current, { strokeDashoffset: 2000, duration: 0.3, ease: 'power2.in' })
  }

  return (
    <div className="relative">
      <button
        onClick={onClick}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="relative w-full bg-[#cccc99] text-[#001a00] font-mono font-bold
                   text-sm tracking-[0.22em] uppercase py-4
                   hover:bg-white transition-colors duration-200 overflow-hidden"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span>PROCESSING</span>
            <span className="flex gap-1 items-center">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 bg-[#001a00] rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.18}s` }}
                />
              ))}
            </span>
          </span>
        ) : (
          'Proceed to Checkout'
        )}
      </button>
      {/* SVG circuit-trace border */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <rect
          ref={pathRef}
          x="0.8" y="0.8"
          width="98.4" height="98.4"
          fill="none"
          stroke="rgba(0,40,0,0.55)"
          strokeWidth="2"
          strokeDasharray="2000"
          strokeDashoffset="2000"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   ORDER SUMMARY
═══════════════════════════════════════════════════ */
interface SummaryProps {
  subtotal: number
  shipping: number
  tax: number
  grandTotal: number
  totalRef: React.RefObject<HTMLSpanElement>
  loading: boolean
  onCheckout: () => void
}

function OrderSummary({ subtotal, shipping, tax, grandTotal, totalRef, loading, onCheckout }: SummaryProps) {
  const panelRef = useRef<HTMLDivElement>(null)

  // Count-up animation for grand total on first mount
  useEffect(() => {
    if (!totalRef.current || grandTotal === 0) return
    const obj = { v: 0 }
    const el = totalRef.current
    gsap.to(obj, {
      v: grandTotal,
      duration: 1,
      ease: 'power2.out',
      delay: 0.6,
      onUpdate() { el.textContent = `$${obj.v.toFixed(2)}` },
      onComplete() { el.textContent = `$${grandTotal.toFixed(2)}` },
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Animated border glow on the panel
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(panelRef.current, {
        boxShadow: '0 0 30px rgba(204,204,153,0.12), 0 0 60px rgba(204,204,153,0.04)',
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, panelRef)
    return () => ctx.revert()
  }, [])

  const TRUST = [
    { Icon: ShieldCheck, line1: 'Secure', line2: 'Payment' },
    { Icon: Truck, line1: 'Free >$50', line2: 'Shipping' },
    { Icon: RefreshCw, line1: 'Easy', line2: 'Returns' },
  ]

  return (
    <div ref={panelRef} className="bg-[#002200] border border-[#cccc99]/18 p-6">
      {/* Terminal title bar */}
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-[#cccc99]/12">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/55" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#cccc99]/35" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/55" />
        </div>
        <div className="flex items-center gap-1.5 ml-2">
          <Cpu className="w-3 h-3 text-[#cccc99]/35" />
          <span className="font-mono text-[#cccc99]/40 text-[11px] tracking-[0.25em] uppercase">
            order.summary
          </span>
        </div>
      </div>

      {/* Line items */}
      <div className="space-y-3.5 mb-5">
        {[
          { label: 'SUBTOTAL', value: `$${subtotal.toFixed(2)}`, highlight: false },
          {
            label: 'SHIPPING',
            value: shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`,
            highlight: shipping === 0,
          },
          { label: 'TAX (14% EGY)', value: `$${tax.toFixed(2)}`, highlight: false },
        ].map(({ label, value, highlight }) => (
          <div key={label} className="flex justify-between items-center">
            <span className="font-mono text-[#cccc99]/45 text-[11px] tracking-[0.2em]">{label}</span>
            <span className={`font-mono text-sm font-medium ${highlight ? 'text-emerald-400' : 'text-[#cccc99]'}`}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Divider with circuit nodes */}
      <div className="flex items-center gap-0 mb-5">
        <div className="w-2 h-2 border border-[#cccc99]/35 rotate-45 flex-shrink-0" />
        <div className="flex-1 h-px bg-[#cccc99]/18" />
        <div className="w-2 h-2 border border-[#cccc99]/35 rotate-45 flex-shrink-0" />
      </div>

      {/* Grand total */}
      <div className="flex justify-between items-baseline mb-7">
        <span className="font-mono text-[#cccc99]/70 text-xs tracking-[0.25em] uppercase font-bold">Total</span>
        <span ref={totalRef} className="font-mono text-[#cccc99] text-2xl font-bold">
          ${grandTotal.toFixed(2)}
        </span>
      </div>

      {/* Checkout button */}
      <div className="mb-3">
        <CheckoutButton loading={loading} onClick={onCheckout} />
      </div>

      {/* Continue shopping */}
      <button
        onClick={() => window.history.back()}
        className="flex items-center justify-center gap-2 w-full font-mono text-[11px]
                   tracking-[0.2em] uppercase text-[#cccc99]/35
                   hover:text-[#cccc99]/65 transition-colors duration-200 py-2.5"
      >
        <ArrowLeft className="w-3 h-3" />
        Continue Shopping
      </button>

      {/* Trust badges */}
      <div className="mt-5 pt-5 border-t border-[#cccc99]/10 grid grid-cols-3 gap-2">
        {TRUST.map(({ Icon, line1, line2 }) => (
          <div key={line1} className="flex flex-col items-center gap-1.5 text-center">
            <Icon className="w-4 h-4 text-[#cccc99]/30" />
            <p className="font-mono text-[#cccc99]/28 text-[9px] tracking-wide leading-tight">
              {line1}
              <br />{line2}
            </p>
          </div>
        ))}
      </div>

      {/* Security note */}
      <p className="mt-4 text-center font-mono text-[#cccc99]/20 text-[9px] tracking-widest uppercase">
        256-bit SSL encrypted
      </p>
    </div>
  )
}

/* ═══════════════════════════════════════════════════
   MAIN CART PAGE
═══════════════════════════════════════════════════ */
export default function CartPage() {
  const router = useRouter()
  const { items, removeItem, updateQty, clearCart, totalPrice } = useCart()

  const pageRef    = useRef<HTMLDivElement>(null)
  const scanRef    = useRef<HTMLDivElement>(null)
  const breadRef   = useRef<HTMLDivElement>(null)
  const headRef    = useRef<HTMLHeadingElement>(null)
  const dividerRef = useRef<HTMLDivElement>(null)
  const leftRef    = useRef<HTMLDivElement>(null)
  const rightRef   = useRef<HTMLDivElement>(null)
  const cursorRef  = useRef<HTMLDivElement>(null)
  const totalRef   = useRef<HTMLSpanElement>(null)

  const itemEls = useRef<Map<number, HTMLDivElement>>(new Map())
  const [loading, setLoading] = useState(false)

  const shipping   = totalPrice >= 50 ? 0 : 5.99
  const tax        = totalPrice * 0.14
  const grandTotal = totalPrice + shipping + tax

  /* ── Custom cursor trail (desktop only) ── */
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor || typeof window === 'undefined') return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.28, ease: 'power3' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.28, ease: 'power3' })

    const onMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      gsap.to(cursor, { opacity: 0.75, scale: 1, duration: 0.1 })
    }
    const onLeave = () => gsap.to(cursor, { opacity: 0, scale: 0.5, duration: 0.5 })

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  /* ── Page entrance animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      // 1 · Terminal boot flicker
      tl.set(pageRef.current, { opacity: 0 })
        .to(pageRef.current, { opacity: 1,   duration: 0.07 })
        .to(pageRef.current, { opacity: 0.15, duration: 0.05 })
        .to(pageRef.current, { opacity: 1,   duration: 0.06 })
        .to(pageRef.current, { opacity: 0.35, duration: 0.04 })
        .to(pageRef.current, { opacity: 1,   duration: 0.07 })

      // 2 · Scanline sweep (runs in parallel with flicker)
      tl.fromTo(scanRef.current,
        { top: '0%', opacity: 0.7 },
        { top: '105%', opacity: 0.2, duration: 0.55, ease: 'none' },
        0
      )

      // 3 · Breadcrumb drop-in
      tl.fromTo(breadRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: 'power2.out' },
        0.22
      )

      // 4 · Heading typewriter (clip-path with step easing)
      tl.fromTo(headRef.current,
        { clipPath: 'inset(0 100% 0 0)' },
        { clipPath: 'inset(0 0% 0 0)', duration: 0.55, ease: 'steps(4)' },
        0.28
      )

      // 5 · Divider rule expands
      tl.fromTo(dividerRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.5, ease: 'power2.out', transformOrigin: 'left center' },
        0.55
      )

      // 6 · Items slide in from left
      tl.fromTo('.cart-item-row',
        { x: -55, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.45, stagger: 0.09, ease: 'power2.out' },
        0.65
      )

      // 7 · Summary slides in from right
      tl.fromTo(rightRef.current,
        { x: 55, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
        0.72
      )

    }, pageRef)
    return () => ctx.revert()
  }, [])

  /* ── Remove item with animation ── */
  const handleRemove = useCallback((id: number) => {
    const el = itemEls.current.get(id)
    if (!el) { removeItem(id); return }

    gsap.set(el, { height: el.offsetHeight, overflow: 'hidden' })
    gsap.timeline()
      .to(el, { x: -55, opacity: 0, duration: 0.28, ease: 'power2.in' })
      .to(el, {
        height: 0,
        marginBottom: 0,
        paddingTop: 0,
        paddingBottom: 0,
        duration: 0.24,
        ease: 'power2.inOut',
      })
      .call(() => {
        removeItem(id)
        itemEls.current.delete(id)
      })
  }, [removeItem])

  /* ── Quantity change with flip animation ── */
  const handleQtyChange = useCallback((
    id: number,
    newQty: number,
    qtyRef: React.RefObject<HTMLSpanElement>,
  ) => {
    if (newQty < 1) { handleRemove(id); return }

    if (qtyRef.current) {
      gsap.timeline()
        .to(qtyRef.current,  { rotationX: 90,  opacity: 0, duration: 0.12, ease: 'power2.in' })
        .call(() => updateQty(id, newQty))
        .to(qtyRef.current,  { rotationX: 0,  opacity: 1, duration: 0.2,  ease: 'back.out(1.8)' })
    } else {
      updateQty(id, newQty)
    }

    // Bounce the grand total display
    if (totalRef.current) {
      gsap.fromTo(totalRef.current,
        { scale: 1.14, color: '#88ffaa' },
        { scale: 1,    color: '#cccc99', duration: 0.55, ease: 'elastic.out(1, 0.5)' }
      )
    }
  }, [updateQty, handleRemove])

  /* ── Checkout ── */
  const handleCheckout = () => {
    setLoading(true)
    // Simulate — replace with real checkout logic
    setTimeout(() => setLoading(false), 3200)
  }

  /* ── Clear cart with stagger exit ── */
  const handleClear = () => {
    const els = Array.from(itemEls.current.values())
    gsap.to(els, {
      x: -60,
      opacity: 0,
      height: 0,
      marginBottom: 0,
      paddingTop: 0,
      paddingBottom: 0,
      duration: 0.3,
      stagger: 0.06,
      ease: 'power2.in',
      onComplete: () => {
        clearCart()
        itemEls.current.clear()
      },
    })
  }

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#001a00] relative overflow-x-hidden"
      style={{ opacity: 0 }}
    >
      {/* ── Custom cursor glow ── */}
      <div
        ref={cursorRef}
        className="fixed w-8 h-8 rounded-full pointer-events-none z-[999] opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(204,204,153,0.45) 0%, transparent 65%)',
          top: 0,
          left: 0,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'screen',
        }}
        aria-hidden
      />

      {/* ── Scanline element ── */}
      <div
        ref={scanRef}
        className="fixed left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#cccc99]/60 to-transparent pointer-events-none z-[60]"
        style={{ top: 0, opacity: 0 }}
        aria-hidden
      />

      {/* ── Background ── */}
      <div className="absolute inset-0 bg-circuit-grid" />
      <FloatingCircuits />

      {/* ══════════════════════════════════════════
          CONTENT
      ══════════════════════════════════════════ */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">

        {/* Breadcrumb */}
        <nav ref={breadRef} className="flex items-center gap-2 mb-8" style={{ opacity: 0 }} aria-label="Breadcrumb">
          {[
            { label: 'HOME',     href: '/' },
            { label: 'PRODUCTS', href: '/#products' },
          ].map(({ label, href }, i) => (
            <span key={label} className="flex items-center gap-2">
              <button
                onClick={() => router.push(href)}
                className="font-mono text-[#cccc99]/32 text-[11px] tracking-[0.2em] uppercase hover:text-[#cccc99]/65 transition-colors"
              >
                {label}
              </button>
              <span className="font-mono text-[#cccc99]/18 text-[11px]">/</span>
            </span>
          ))}
          <span className="font-mono text-[#cccc99]/60 text-[11px] tracking-[0.2em] uppercase">CART</span>
        </nav>

        {/* Page heading */}
        <div className="mb-10">
          <h1
            ref={headRef}
            className="font-mono text-5xl sm:text-6xl lg:text-7xl font-bold text-[#cccc99] tracking-[0.15em] glow-text"
            style={{ clipPath: 'inset(0 100% 0 0)' }}
          >
            CART
            <span className="text-[#cccc99]/60 animate-blink ml-1">_</span>
          </h1>

          {/* Divider with item count */}
          <div
            ref={dividerRef}
            className="flex items-center gap-3 mt-4"
            style={{ opacity: 0 }}
          >
            <div className="w-2 h-2 border border-[#cccc99]/40 rotate-45" />
            <span className="font-mono text-[#cccc99]/38 text-[11px] tracking-[0.35em] uppercase">
              [ {items.length} ITEM{items.length !== 1 ? 'S' : ''} IN CART ]
            </span>
            <div className="flex-1 h-px bg-[#cccc99]/10" />
            <div className="w-2 h-2 border border-[#cccc99]/20 rotate-45" />
          </div>
        </div>

        {/* ── Empty state ── */}
        {items.length === 0 ? (
          <EmptyCart onBack={() => router.push('/')} />
        ) : (
          /* ── Two-column layout ── */
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* ── Left: item list ── */}
            <div ref={leftRef} className="flex-1 min-w-0">

              {/* Column header */}
              <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto_auto] gap-4 px-4 pb-3 border-b border-[#cccc99]/8">
                {['PRODUCT', 'UNIT PRICE', 'QTY', 'TOTAL', ''].map(h => (
                  <span key={h} className="font-mono text-[#cccc99]/25 text-[10px] tracking-[0.2em] uppercase">{h}</span>
                ))}
              </div>

              {/* Items */}
              <div className="space-y-3 mt-3">
                {items.map(item => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    onRemove={() => handleRemove(item.id)}
                    onQtyChange={(qty, ref) => handleQtyChange(item.id, qty, ref)}
                    rowRef={(el) => {
                      if (el) itemEls.current.set(item.id, el)
                      else itemEls.current.delete(item.id)
                    }}
                  />
                ))}
              </div>

              {/* Footer actions */}
              <div className="flex items-center justify-between mt-5 pt-5 border-t border-[#cccc99]/8">
                <button
                  onClick={() => router.push('/')}
                  className="flex items-center gap-2 font-mono text-[#cccc99]/38 text-[11px]
                             tracking-[0.2em] uppercase hover:text-[#cccc99]/70 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Continue Shopping
                </button>
                <button
                  onClick={handleClear}
                  className="font-mono text-red-500/38 text-[11px] tracking-[0.15em] uppercase
                             hover:text-red-400/75 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* ── Right: order summary ── */}
            <div
              ref={rightRef}
              className="w-full lg:w-[380px] xl:w-96 lg:sticky lg:top-24 flex-shrink-0"
              style={{ opacity: 0 }}
            >
              <OrderSummary
                subtotal={totalPrice}
                shipping={shipping}
                tax={tax}
                grandTotal={grandTotal}
                totalRef={totalRef}
                loading={loading}
                onCheckout={handleCheckout}
              />
            </div>

          </div>
        )}
      </div>
    </div>
  )
}
