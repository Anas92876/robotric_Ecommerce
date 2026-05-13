'use client'
import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, ArrowRight, Cpu } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitted'>('idle')
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo('.nl-content',
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: '.nl-content', start: 'top 85%', once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setStatus('submitted')
      setEmail('')
    }
  }

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #002b00 0%, #001a00 40%, #003300 80%, #002200 100%)' }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-circuit-grid opacity-80" />

      {/* Glow orbs */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-72 h-72 bg-[#cccc99]/4 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-72 h-72 bg-[#003300]/60 rounded-full blur-[80px] pointer-events-none" />

      {/* Decorative corner circuits */}
      <svg className="absolute top-0 left-0 w-24 opacity-10 text-[#cccc99]" viewBox="0 0 80 80" fill="none">
        <path d="M0 0 H50 V50" stroke="currentColor" strokeWidth="1" />
        <path d="M20 0 V20 H80" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
      </svg>
      <svg className="absolute bottom-0 right-0 w-24 opacity-10 text-[#cccc99] rotate-180" viewBox="0 0 80 80" fill="none">
        <path d="M0 0 H50 V50" stroke="currentColor" strokeWidth="1" />
        <path d="M20 0 V20 H80" stroke="currentColor" strokeWidth="1" />
        <circle cx="50" cy="50" r="3" fill="currentColor" />
        <circle cx="20" cy="20" r="3" fill="currentColor" />
      </svg>

      <div className="relative max-w-2xl mx-auto px-4 text-center nl-content">
        {/* Icon */}
        <div className="w-12 h-12 border border-[#cccc99]/35 flex items-center justify-center mx-auto mb-6 animate-pulse-glow">
          <Mail className="w-5 h-5 text-[#cccc99]" />
        </div>

        <div className="mb-2 font-mono text-[#cccc99]/45 text-[11px] tracking-[0.35em] uppercase">
          Stay Updated
        </div>
        <h2 className="font-mono text-2xl md:text-3xl text-white mb-3">
          Join the <span className="text-[#cccc99]">Maker Network</span>
        </h2>
        <p className="font-body text-[#cccc99]/50 mb-8 max-w-md mx-auto text-sm leading-relaxed">
          Exclusive deals, new product alerts, Arduino &amp; Raspberry Pi tutorials — delivered straight to your inbox.
        </p>

        {status === 'submitted' ? (
          <div className="border border-[#cccc99]/30 bg-[#cccc99]/5 p-5 max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 font-mono text-[#cccc99] text-sm tracking-[0.15em]">
              <Cpu className="w-4 h-4" />
              <span>TRANSMISSION RECEIVED</span>
            </div>
            <p className="font-mono text-[#cccc99]/50 text-[11px] tracking-widest uppercase mt-2">
              Welcome to the network
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 min-w-0 bg-[#001200]/80 border border-[#cccc99]/25 border-r-0
                         text-[#cccc99] placeholder-[#cccc99]/25
                         font-mono text-sm px-4 py-3.5
                         focus:outline-none focus:border-[#cccc99]/50
                         transition-colors duration-200"
            />
            <button
              type="submit"
              className="flex-shrink-0 bg-[#cccc99] text-[#001a00] font-mono text-xs tracking-[0.2em] uppercase
                         px-5 py-3.5 font-bold flex items-center gap-2
                         hover:bg-white transition-colors duration-200"
            >
              <span className="hidden sm:inline">Subscribe</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="font-mono text-[#cccc99]/25 text-[10px] tracking-wider mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  )
}
