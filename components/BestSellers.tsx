'use client'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { ShoppingCart, Star, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'
import { bestSellers } from '@/lib/products'
import { useCart } from './CartContext'

export default function BestSellers() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const { addItem } = useCart()

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo('.bs-header',
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: 'power2.out',
          scrollTrigger: { trigger: '.bs-header', start: 'top 88%', once: true }
        }
      )
      gsap.fromTo('.bs-card',
        { x: 50, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'power2.out',
          scrollTrigger: { trigger: '.bs-track', start: 'top 85%', once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const scroll = (dir: 'left' | 'right') => {
    trackRef.current?.scrollBy({ left: dir === 'right' ? 310 : -310, behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="py-24 bg-[#001a00] relative overflow-hidden">
      {/* Horizontal circuit line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#cccc99]/8 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bs-header flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#cccc99]/50" />
              <span className="font-mono text-[#cccc99]/45 text-[11px] tracking-[0.3em] uppercase">Top Picks</span>
            </div>
            <h2 className="font-mono text-3xl md:text-4xl text-white">
              Best <span className="text-[#cccc99]">Sellers</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 border border-[#cccc99]/25 flex items-center justify-center text-[#cccc99]/55
                         hover:bg-[#cccc99] hover:text-[#001a00] hover:border-[#cccc99] transition-all duration-200"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 border border-[#cccc99]/25 flex items-center justify-center text-[#cccc99]/55
                         hover:bg-[#cccc99] hover:text-[#001a00] hover:border-[#cccc99] transition-all duration-200"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Track */}
        <div
          ref={trackRef}
          className="bs-track flex gap-5 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
        >
          {bestSellers.map((product, idx) => (
            <div
              key={product.id}
              className="bs-card flex-shrink-0 w-72 bg-[#001f00] border border-[#cccc99]/12 overflow-hidden
                         group hover:border-[#cccc99]/38 hover:shadow-[0_0_28px_rgba(204,204,153,0.10)]
                         transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden bg-[#002800]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="288px"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001f00] via-[#001f00]/20 to-transparent" />

                {/* Rank badge */}
                <div className="absolute top-3 right-3 w-8 h-8 bg-[#001a00]/90 border border-[#cccc99]/30 flex items-center justify-center">
                  <span className="font-mono text-[#cccc99] text-xs font-bold">#{idx + 1}</span>
                </div>

                {product.badge && (
                  <div className="absolute top-3 left-3 bg-[#cccc99] text-[#001a00] font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 font-bold">
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="font-mono text-[#cccc99]/40 text-[10px] tracking-[0.2em] uppercase mb-1">{product.category}</p>
                <h3 className="font-mono text-white text-sm font-medium mb-2 group-hover:text-[#cccc99] transition-colors leading-snug">
                  {product.name}
                </h3>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${i <= Math.floor(product.rating) ? 'text-[#cccc99] fill-[#cccc99]' : 'text-[#cccc99]/18'}`}
                    />
                  ))}
                  <span className="font-mono text-[#cccc99]/35 text-[10px] ml-1">
                    {product.rating} ({product.reviews.toLocaleString()})
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-mono text-[#cccc99] text-xl font-bold">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="font-mono text-[#cccc99]/35 text-xs line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image })}
                    className="flex items-center gap-1.5 bg-[#002800] hover:bg-[#cccc99] text-[#cccc99] hover:text-[#001a00]
                               font-mono text-[11px] tracking-[0.1em] uppercase px-3 py-2
                               border border-[#cccc99]/25 hover:border-[#cccc99]
                               transition-all duration-200"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* View all card */}
          <div className="flex-shrink-0 w-56 border border-dashed border-[#cccc99]/15 flex flex-col items-center justify-center gap-3 hover:border-[#cccc99]/35 hover:bg-[#cccc99]/3 transition-all duration-300 cursor-pointer group">
            <div className="w-10 h-10 border border-[#cccc99]/25 flex items-center justify-center text-[#cccc99]/40 group-hover:border-[#cccc99]/50 group-hover:text-[#cccc99]/70 transition-all">
              <ChevronRight className="w-5 h-5" />
            </div>
            <span className="font-mono text-[#cccc99]/40 text-[11px] tracking-[0.2em] uppercase group-hover:text-[#cccc99]/70 transition-colors">
              View All
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
