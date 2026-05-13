'use client'
import Image from 'next/image'
import { useRef } from 'react'
import gsap from 'gsap'
import { ShoppingCart, Star } from 'lucide-react'
import { useCart } from './CartContext'
import type { Product } from '@/lib/products'

const BADGE_COLORS: Record<string, string> = {
  'Best Seller': 'bg-[#cccc99] text-[#001a00]',
  'Hot': 'bg-red-500 text-white',
  'Popular': 'bg-blue-500 text-white',
  'Value': 'bg-emerald-600 text-white',
  'New': 'bg-purple-500 text-white',
}

export default function ProductCard({ product }: { product: Product }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const { addItem, setIsOpen } = useCart()

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    })
    gsap.timeline()
      .to(cardRef.current, { scale: 0.97, duration: 0.1, ease: 'power2.in' })
      .to(cardRef.current, { scale: 1, duration: 0.3, ease: 'back.out(2.5)' })
  }

  const badgeClass = product.badge ? (BADGE_COLORS[product.badge] ?? 'bg-[#cccc99] text-[#001a00]') : ''

  return (
    <div
      ref={cardRef}
      className="group relative bg-[#001f00] border border-[#cccc99]/12 overflow-hidden flex flex-col
                 hover:border-[#cccc99]/40 hover:shadow-[0_0_28px_rgba(204,204,153,0.12),0_8px_32px_rgba(0,0,0,0.4)]
                 transition-all duration-300"
    >
      {/* Badge */}
      {product.badge && (
        <div className={`absolute top-3 left-3 z-10 font-mono text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 font-bold ${badgeClass}`}>
          {product.badge}
        </div>
      )}

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-[#002800]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          loading="lazy"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001f00] via-[#001f00]/30 to-transparent" />
        {/* Scanline on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-400 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(transparent, transparent 3px, rgba(0,26,0,0.8) 3px, rgba(0,26,0,0.8) 4px)',
          }}
        />
        {/* Original price badge */}
        {product.originalPrice && (
          <div className="absolute bottom-3 right-3 font-mono text-[10px] text-[#cccc99]/50 line-through">
            ${product.originalPrice.toFixed(2)}
          </div>
        )}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category */}
        <span className="font-mono text-[#cccc99]/40 text-[10px] tracking-[0.2em] uppercase">{product.category}</span>

        {/* Name */}
        <h3 className="font-mono text-white text-sm font-medium leading-snug group-hover:text-[#cccc99] transition-colors duration-200 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="font-body text-[#cccc99]/40 text-xs leading-relaxed line-clamp-2 mt-0.5">
          {product.description}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mt-1">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map(i => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i <= Math.floor(product.rating)
                    ? 'text-[#cccc99] fill-[#cccc99]'
                    : i - 0.5 <= product.rating
                    ? 'text-[#cccc99] fill-[#cccc99]/50'
                    : 'text-[#cccc99]/20'
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[#cccc99]/40 text-[10px]">{product.rating}</span>
          <span className="font-mono text-[#cccc99]/25 text-[10px]">({product.reviews.toLocaleString()})</span>
        </div>

        {/* Divider */}
        <div className="border-t border-[#cccc99]/8 mt-auto pt-3 flex items-center justify-between gap-2">
          <div>
            <span className="font-mono text-[#cccc99] text-lg font-bold">${product.price.toFixed(2)}</span>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 bg-[#002800] hover:bg-[#cccc99] text-[#cccc99] hover:text-[#001a00]
                       font-mono text-[11px] tracking-[0.15em] uppercase px-3 py-2
                       border border-[#cccc99]/25 hover:border-[#cccc99]
                       transition-all duration-200 flex-shrink-0 group/btn"
          >
            <ShoppingCart className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>

      {/* Top accent line on hover */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#cccc99]/0 to-transparent group-hover:via-[#cccc99]/40 transition-all duration-500" />
    </div>
  )
}
