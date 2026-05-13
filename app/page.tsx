import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import CategoryBar from '@/components/CategoryBar'
import ProductGrid from '@/components/ProductGrid'
import WhyUs from '@/components/WhyUs'
import BestSellers from '@/components/BestSellers'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#001a00]">
      <Navbar />
      <Hero />
      <CategoryBar />
      <ProductGrid />
      <WhyUs />
      <BestSellers />
      <Newsletter />
      <Footer />
    </main>
  )
}
