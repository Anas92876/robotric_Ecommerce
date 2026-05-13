'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Zap, Cpu, Radio, Plug, Bot, Monitor, Settings2 } from 'lucide-react'
import { categoryConfig } from '@/lib/products'

const ICONS = [Zap, Cpu, Radio, Plug, Bot, Monitor, Settings2]

export default function CategoryBar() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo('.cat-pill',
        { x: -30, opacity: 0, scale: 0.9 },
        {
          x: 0, opacity: 1, scale: 1,
          duration: 0.45, stagger: 0.07, ease: 'back.out(1.4)',
          scrollTrigger: { trigger: '.cat-track', start: 'top 92%', once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="categories"
      className="py-10 bg-[#002200] border-y border-[#cccc99]/10 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-mono text-[#cccc99]/50 text-[11px] tracking-[0.3em] uppercase">
            Browse By Category
          </h3>
          <a
            href="#products"
            className="font-mono text-[#cccc99]/35 text-[11px] tracking-widest uppercase hover:text-[#cccc99]/70 transition-colors"
          >
            View All →
          </a>
        </div>

        <div className="cat-track flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {categoryConfig.map(({ name, count }, i) => {
            const Icon = ICONS[i] ?? Zap
            return (
              <button
                key={name}
                className="cat-pill flex-shrink-0 flex items-center gap-2.5 px-5 py-3
                           border border-[#cccc99]/18 text-[#cccc99]/65
                           hover:border-[#cccc99]/45 hover:bg-[#cccc99]/6 hover:text-[#cccc99]
                           transition-all duration-200 group"
              >
                <Icon className="w-3.5 h-3.5 group-hover:scale-110 transition-transform duration-200 flex-shrink-0" />
                <span className="font-mono text-[11px] tracking-[0.12em] whitespace-nowrap">{name}</span>
                <span className="font-mono text-[10px] text-[#cccc99]/35 bg-[#001a00] px-1.5 py-0.5 group-hover:text-[#cccc99]/55 transition-colors">
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
