'use client'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProductCard from './ProductCard'
import { products, categoryConfig } from '@/lib/products'

export default function ProductGrid() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const allCategories = ['All', ...categoryConfig.map(c => c.name)]
  const filtered = activeCategory === 'All'
    ? products
    : products.filter(p => p.category === activeCategory)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: 'power2.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 88%', once: true }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const cards = document.querySelectorAll('.product-card-item')
    gsap.fromTo(cards,
      { y: 50, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' }
    )
  }, [activeCategory])

  return (
    <section ref={sectionRef} id="products" className="py-20 bg-[#001a00] relative">
      <div className="absolute inset-0 bg-circuit-grid-sm" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3 font-mono text-[#cccc99]/45 text-[11px] tracking-[0.3em] uppercase">
            <span className="w-5 h-px bg-[#cccc99]/40" />
            Our Collection
            <span className="w-5 h-px bg-[#cccc99]/40" />
          </div>
          <h2 className="font-mono text-3xl md:text-4xl lg:text-5xl text-white mb-3">
            Featured <span className="text-[#cccc99]">Products</span>
          </h2>
          <p className="font-body text-[#cccc99]/50 max-w-xl mx-auto text-base leading-relaxed">
            Professional-grade components trusted by makers, students, and engineers across Egypt
          </p>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {allCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-mono text-[11px] tracking-[0.15em] uppercase px-4 py-2 border transition-all duration-200 ${
                activeCategory === cat
                  ? 'bg-[#cccc99] text-[#001a00] border-[#cccc99] font-bold'
                  : 'border-[#cccc99]/20 text-[#cccc99]/55 hover:border-[#cccc99]/45 hover:text-[#cccc99]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(product => (
            <div key={product.id} className="product-card-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Load more */}
        <div className="text-center mt-12">
          <button className="font-mono text-xs tracking-[0.25em] uppercase text-[#cccc99]/50 border border-[#cccc99]/20 px-8 py-3 hover:border-[#cccc99]/45 hover:text-[#cccc99] transition-all duration-200">
            Load More Products
          </button>
        </div>
      </div>
    </section>
  )
}
