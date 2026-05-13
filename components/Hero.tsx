'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const WORDS = [
  { text: 'Build', accent: false },
  { text: 'the', accent: false },
  { text: 'Future,', accent: true },
  { text: 'One', accent: false },
  { text: 'Circuit', accent: true },
  { text: 'at', accent: false },
  { text: 'a', accent: false },
  { text: 'Time.', accent: true },
]

const STATS = [
  { value: '500+', label: 'Products' },
  { value: '10k+', label: 'Makers' },
  { value: '99%', label: 'Satisfaction' },
]

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const tagRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      tl.fromTo(tagRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }, 0.3
      )
      .fromTo('.hero-word',
        { y: 90, opacity: 0, rotationX: -80, transformOrigin: 'bottom center' },
        { y: 0, opacity: 1, rotationX: 0, duration: 0.75, stagger: 0.07 }, 0.5
      )
      .fromTo(subtitleRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }, 1.3
      )
      .fromTo(ctaRef.current,
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }, 1.5
      )
      .fromTo(statsRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7 }, 1.7
      )

      // Floating circuit elements
      gsap.to('.float-chip', {
        y: -18,
        duration: 4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.8, from: 'random' },
      })

      // Pulse on dots
      gsap.to('.pulse-dot', {
        scale: 1.5,
        opacity: 0.3,
        duration: 1.2,
        ease: 'power2.inOut',
        yoyo: true,
        repeat: -1,
        stagger: 0.4,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #003300 0%, #001a00 55%, #000d00 100%)' }}
    >
      {/* Circuit grid */}
      <div className="absolute inset-0 bg-circuit-grid opacity-100" />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_0%,#001200_100%)] pointer-events-none" />

      {/* Floating SVG chips — top left */}
      <svg
        className="float-chip absolute top-24 left-6 sm:left-16 w-20 sm:w-28 opacity-20 text-[#cccc99] select-none"
        viewBox="0 0 100 100" fill="none"
      >
        <rect x="18" y="18" width="64" height="64" stroke="currentColor" strokeWidth="1.5" />
        <rect x="28" y="28" width="44" height="44" stroke="currentColor" strokeWidth="1" />
        {[34, 50, 66].map(y => (
          <line key={y} x1="18" y1={y} x2="0" y2={y} stroke="currentColor" strokeWidth="1.5" />
        ))}
        {[34, 50, 66].map(y => (
          <line key={y + 100} x1="82" y1={y} x2="100" y2={y} stroke="currentColor" strokeWidth="1.5" />
        ))}
        {[34, 50, 66].map(x => (
          <line key={x + 200} x1={x} y1="18" x2={x} y2="0" stroke="currentColor" strokeWidth="1.5" />
        ))}
        {[34, 50, 66].map(x => (
          <line key={x + 300} x1={x} y1="82" x2={x} y2="100" stroke="currentColor" strokeWidth="1.5" />
        ))}
        <text x="38" y="54" fill="currentColor" fontSize="9" fontFamily="monospace">MCU</text>
      </svg>

      {/* Floating traces — top right */}
      <svg
        className="float-chip absolute top-28 right-8 sm:right-20 w-24 sm:w-36 opacity-15 text-[#cccc99] select-none"
        viewBox="0 0 120 100" fill="none"
        style={{ animationDelay: '1s' }}
      >
        <path d="M10 50 H35 V20 H80 V50 H110" stroke="currentColor" strokeWidth="1.5" />
        <path d="M35 20 V5 H55" stroke="currentColor" strokeWidth="1.5" />
        <path d="M80 20 V5 H65" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="35" cy="20" r="3" fill="currentColor" />
        <circle cx="80" cy="20" r="3" fill="currentColor" />
        <circle cx="35" cy="50" r="3" fill="currentColor" />
        <circle cx="80" cy="50" r="3" fill="currentColor" />
        <rect x="53" y="0" width="14" height="10" stroke="currentColor" strokeWidth="1" />
        <text x="56" y="8" fill="currentColor" fontSize="5" fontFamily="monospace">R1</text>
        <circle cx="10" cy="50" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="110" cy="50" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>

      {/* Bottom left Arduino-like board */}
      <svg
        className="float-chip absolute bottom-28 left-4 sm:left-20 w-32 sm:w-44 opacity-10 text-[#cccc99] select-none"
        viewBox="0 0 160 80" fill="none"
        style={{ animationDelay: '2s' }}
      >
        <rect x="8" y="8" width="144" height="64" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <rect x="20" y="18" width="32" height="44" stroke="currentColor" strokeWidth="1" />
        <rect x="66" y="18" width="32" height="44" stroke="currentColor" strokeWidth="1" />
        <circle cx="118" cy="40" r="14" stroke="currentColor" strokeWidth="1.5" />
        <text x="108" y="38" fill="currentColor" fontSize="7" fontFamily="monospace">UNO</text>
        <text x="109" y="47" fill="currentColor" fontSize="5" fontFamily="monospace">R3</text>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <line key={i} x1={22 + i * 6} y1="8" x2={22 + i * 6} y2="0" stroke="currentColor" strokeWidth="1.5" />
        ))}
        {[0, 1, 2, 3].map(i => (
          <line key={i + 10} x1={22 + i * 6} y1="72" x2={22 + i * 6} y2="80" stroke="currentColor" strokeWidth="1.5" />
        ))}
      </svg>

      {/* Binary rain — right side */}
      <div
        className="float-chip absolute right-4 sm:right-12 top-1/3 opacity-8 text-[#cccc99] font-mono text-[9px] leading-5 select-none hidden sm:block"
        style={{ animationDelay: '1.5s' }}
      >
        {['01001000', '01101001', '00100001', '10110010', '01010101', '11001100', '10101010'].map((b, i) => (
          <div key={i} style={{ opacity: 1 - i * 0.12 }}>{b}</div>
        ))}
      </div>

      {/* Pulse dots */}
      <div className="pulse-dot absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-[#cccc99]/60 rounded-full" />
      <div className="pulse-dot absolute bottom-1/3 right-1/3 w-1.5 h-1.5 bg-[#cccc99]/60 rounded-full" />
      <div className="pulse-dot absolute top-2/3 left-1/2 w-1 h-1 bg-[#cccc99]/40 rounded-full" />

      {/* Scan line */}
      <div className="absolute left-0 right-0 h-px bg-[#cccc99]/8 animate-scan pointer-events-none" />

      {/* ——— Main content ——— */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-16">

        {/* Tag */}
        <div ref={tagRef} className="inline-flex items-center gap-2.5 border border-[#cccc99]/25 px-4 py-2 mb-8 bg-[#cccc99]/5">
          <span className="w-1.5 h-1.5 bg-[#cccc99] rounded-full animate-blink" />
          <span className="font-mono text-[#cccc99]/70 text-[11px] tracking-[0.3em] uppercase">
            Mindset Is Everything
          </span>
          <span className="w-1.5 h-1.5 bg-[#cccc99] rounded-full animate-blink" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Headline */}
        <h1 className="font-mono font-bold leading-[1.05] mb-6 perspective-[800px]">
          <div className="flex flex-wrap justify-center gap-x-[0.25em] gap-y-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl overflow-hidden py-2">
            {WORDS.map((w, i) => (
              <span
                key={i}
                className={`hero-word inline-block ${w.accent ? 'text-[#cccc99]' : 'text-white'}`}
                style={{ display: 'inline-block' }}
              >
                {w.text}
              </span>
            ))}
          </div>
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-body text-[#cccc99]/55 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed tracking-wide"
        >
          Egypt's premier destination for Arduino, Raspberry Pi &amp; cutting-edge maker technology.
          Fuel your creativity with the components that matter.
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#products"
            className="group relative px-8 py-4 bg-[#cccc99] text-[#001a00] font-mono font-bold text-sm tracking-[0.2em] uppercase overflow-hidden transition-transform duration-200 hover:scale-105 min-w-[180px]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              Shop Now
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-15 transition-opacity duration-200" />
          </a>
          <a
            href="#categories"
            className="group px-8 py-4 border border-[#cccc99]/40 text-[#cccc99] font-mono text-sm tracking-[0.2em] uppercase hover:border-[#cccc99] hover:bg-[#cccc99]/8 transition-all duration-200 hover:scale-105 min-w-[180px] text-center"
          >
            Explore Kits
          </a>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-4 max-w-sm mx-auto pt-8 border-t border-[#cccc99]/15"
        >
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <div className="font-mono text-[#cccc99] text-2xl sm:text-3xl font-bold glow-text">{value}</div>
              <div className="font-body text-[#cccc99]/40 text-xs uppercase tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#001a00] to-transparent pointer-events-none" />
    </section>
  )
}
