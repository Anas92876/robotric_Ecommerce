import { Zap, Github, Twitter, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react'

const SOCIAL = [
  { Icon: Github, label: 'GitHub' },
  { Icon: Twitter, label: 'Twitter' },
  { Icon: Instagram, label: 'Instagram' },
  { Icon: Youtube, label: 'YouTube' },
]

const PRODUCT_LINKS = [
  'Arduino Boards', 'Raspberry Pi', 'Sensors & Modules', 'Robotics Kits',
  'Displays', 'Motors & Drivers', 'Starter Kits',
]

const COMPANY_LINKS = [
  'About RoboTrick', 'Our Story', 'Careers', 'Blog & Tutorials',
  'Community', 'Partner Program', 'Press Kit',
]

export default function Footer() {
  return (
    <footer className="bg-[#001000] border-t border-[#cccc99]/12 relative overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#cccc99]/20 to-transparent" />

      {/* Circuit decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-circuit-grid-sm opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 bg-[#cccc99] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#003300]" />
              </div>
              <span className="font-mono text-[#cccc99] text-xl tracking-wider">
                Robo<span className="text-white">Trick</span>
              </span>
            </div>
            <p className="font-mono text-[#cccc99]/30 text-[10px] tracking-[0.3em] uppercase mb-4">
              Mindset Is Everything
            </p>
            <p className="font-body text-[#cccc99]/45 text-sm leading-relaxed mb-6">
              Egypt's premier electronics & maker tech store.
              Empowering the next generation of engineers, makers, and innovators.
            </p>
            <div className="flex gap-2.5">
              {SOCIAL.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 border border-[#cccc99]/18 flex items-center justify-center
                             text-[#cccc99]/40 hover:border-[#cccc99]/45 hover:text-[#cccc99]/80
                             transition-all duration-200"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-mono text-[#cccc99]/70 text-[11px] tracking-[0.3em] uppercase mb-4 pb-2 border-b border-[#cccc99]/12">
              Products
            </h4>
            <nav className="space-y-0.5">
              {PRODUCT_LINKS.map(item => (
                <a
                  key={item}
                  href="#"
                  className="block font-body text-[#cccc99]/45 text-sm py-1.5 hover:text-[#cccc99]/80 transition-colors duration-150"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-mono text-[#cccc99]/70 text-[11px] tracking-[0.3em] uppercase mb-4 pb-2 border-b border-[#cccc99]/12">
              Company
            </h4>
            <nav className="space-y-0.5">
              {COMPANY_LINKS.map(item => (
                <a
                  key={item}
                  href="#"
                  className="block font-body text-[#cccc99]/45 text-sm py-1.5 hover:text-[#cccc99]/80 transition-colors duration-150"
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-mono text-[#cccc99]/70 text-[11px] tracking-[0.3em] uppercase mb-4 pb-2 border-b border-[#cccc99]/12">
              Contact
            </h4>
            <div className="space-y-3 mb-5">
              {[
                { Icon: MapPin, text: 'Cairo, Egypt' },
                { Icon: Phone, text: '+20 100 000 0000' },
                { Icon: Mail, text: 'hello@robotrick.eg' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon className="w-3.5 h-3.5 text-[#cccc99]/35 flex-shrink-0" />
                  <span className="font-body text-[#cccc99]/50 text-sm">{text}</span>
                </div>
              ))}
            </div>
            <div className="bg-[#001a00] border border-[#cccc99]/12 p-3">
              <p className="font-mono text-[#cccc99]/35 text-[10px] tracking-[0.25em] uppercase">Support Hours</p>
              <p className="font-body text-[#cccc99]/55 text-xs mt-1">Sun – Thu &nbsp; 9:00 AM – 6:00 PM EET</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[#cccc99]/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[#cccc99]/25 text-[11px] tracking-wider">
            © 2024 RoboTrick. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            {['Privacy Policy', 'Terms of Service', 'Shipping', 'Returns'].map(item => (
              <a
                key={item}
                href="#"
                className="font-mono text-[#cccc99]/25 text-[10px] tracking-[0.15em] uppercase hover:text-[#cccc99]/55 transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
