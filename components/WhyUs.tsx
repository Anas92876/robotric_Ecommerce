'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Truck, Headphones, ShieldCheck, Users } from 'lucide-react'

const FEATURES = [
  {
    icon: Truck,
    title: 'Fast Shipping',
    description: 'Same-day dispatch on orders placed before 2 PM. Nationwide delivery within 48 hours across Egypt.',
    stat: '48h',
    label: 'Max Delivery',
    color: 'text-emerald-400',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Our team of engineers and makers answer every technical question. We speak your language.',
    stat: '24/7',
    label: 'Available',
    color: 'text-blue-400',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Guaranteed',
    description: 'Every component is tested and verified. Official distributor for Arduino, Raspberry Pi, and more.',
    stat: '100%',
    label: 'Authentic',
    color: 'text-[#cccc99]',
  },
  {
    icon: Users,
    title: 'Maker Community',
    description: "Join Egypt's largest electronics community. Share projects, get help, find collaborators.",
    stat: '10k+',
    label: 'Members',
    color: 'text-purple-400',
  },
]

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo('.why-title',
        { y: 35, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.why-title', start: 'top 88%', once: true }
        }
      )
      gsap.fromTo('.why-card',
        { y: 55, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.65, stagger: 0.13, ease: 'power2.out',
          scrollTrigger: { trigger: '.why-grid', start: 'top 82%', once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-[#002200] relative overflow-hidden">
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#cccc99]/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#cccc99]/25 to-transparent" />

      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#003300]/50 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="why-title text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-3 font-mono text-[#cccc99]/45 text-[11px] tracking-[0.3em] uppercase">
            <span className="w-5 h-px bg-[#cccc99]/40" />
            Why Choose Us
            <span className="w-5 h-px bg-[#cccc99]/40" />
          </div>
          <h2 className="font-mono text-3xl md:text-4xl text-white">
            The <span className="text-[#cccc99]">RoboTrick</span> Advantage
          </h2>
        </div>

        <div className="why-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, title, description, stat, label, color }) => (
            <div
              key={title}
              className="why-card group relative bg-[#001a00] border border-[#cccc99]/12 p-6
                         hover:border-[#cccc99]/35 hover:shadow-[0_0_32px_rgba(204,204,153,0.08),0_4px_24px_rgba(0,0,0,0.4)]
                         transition-all duration-300 overflow-hidden"
            >
              {/* Top accent */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#cccc99]/0 to-transparent group-hover:via-[#cccc99]/35 transition-all duration-500" />

              {/* Icon box */}
              <div className={`w-11 h-11 border border-[#cccc99]/20 flex items-center justify-center mb-5 group-hover:border-[#cccc99]/45 transition-colors duration-300 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>

              {/* Big stat */}
              <div className="font-mono text-[#cccc99] text-3xl font-bold mb-0.5">{stat}</div>
              <div className="font-mono text-[#cccc99]/35 text-[10px] tracking-[0.25em] uppercase mb-4">{label}</div>

              {/* Text */}
              <h3 className="font-mono text-white text-sm font-medium mb-2 group-hover:text-[#cccc99] transition-colors">{title}</h3>
              <p className="font-body text-[#cccc99]/45 text-sm leading-relaxed">{description}</p>

              {/* Corner decoration */}
              <div className="absolute bottom-0 right-0 w-8 h-8 border-t border-l border-[#cccc99]/0 group-hover:border-[#cccc99]/20 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
