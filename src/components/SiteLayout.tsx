import { useEffect, useState, type ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { navItems } from '../data/siteContent'
import logoIcon from '../../LOGO/icon.svg'
import logofooter from '../../LOGO/Frame 6.png'


type Props = {
  children: ReactNode
}

export function SiteLayout({ children }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="relative overflow-hidden bg-transparent">
      <div className="ornament-dot -left-10 top-32" />
      <div className="ornament-dot right-0 top-[30rem] h-48 w-48" />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-livora-blue/10 bg-white/85 shadow-soft backdrop-blur-lg'
            : 'border-b border-livora-blue/5 bg-white/60 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-4 sm:px-8">
          <NavLink to="/" className="flex items-center gap-3.5">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-livora-brown/30 bg-white/80 p-2.5 shadow-soft">
              <img src={logoIcon} alt="LIVORA icon" className="h-7 w-auto" />
            </span>
            <span className="font-heading text-[1.95rem] font-semibold tracking-[0.14em] text-livora-ink">LIVORA</span>
          </NavLink>
          <nav className="hidden items-center gap-2 rounded-full border border-livora-blue/10 bg-white/80 p-2 shadow-soft md:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 font-subheading text-[0.72rem] uppercase tracking-[0.14em] transition-all duration-300 ease-out ${
                    isActive
                      ? 'bg-livora-blue text-white shadow-soft'
                      : 'text-livora-blue hover:bg-livora-sand hover:text-livora-ink'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to="/contact"
              className="rounded-full border border-livora-brown bg-livora-brown px-5 py-2.5 font-subheading text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-white transition-all hover:-translate-y-0.5 hover:bg-livora-gold hover:border-livora-gold"
            >
              Book Consultation
            </NavLink>
          </nav>
          <button
            type="button"
            aria-label="Toggle navigation"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-livora-blue/20 bg-white/85 text-2xl text-livora-blue md:hidden"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className="leading-none">{menuOpen ? '×' : '☰'}</span>
          </button>
        </div>
        {menuOpen ? (
          <div className="absolute left-0 top-full w-full border-t border-livora-blue/10 bg-white p-6 shadow-premium md:hidden">
            <div className="flex w-full flex-col gap-3">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                      `rounded-xl px-4 py-3 font-subheading text-[0.72rem] uppercase tracking-[0.14em] transition-all duration-300 ease-out ${
                      isActive ? 'bg-livora-blue text-white' : 'bg-livora-light text-livora-blue'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <NavLink
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="rounded-xl bg-livora-brown px-4 py-3 text-center font-subheading text-[0.72rem] uppercase tracking-[0.14em] text-white"
              >
                Book Consultation
              </NavLink>
            </div>
          </div>
        ) : null}
      </header>

      <main className="relative z-10 pt-24">
        <div key={location.pathname} className="animate-reveal motion-reduce:animate-none">
          {children}
        </div>
      </main>

      <footer className="relative mt-10 overflow-hidden border-t border-livora-blue/20 bg-livora-ink text-white">
        <div className="pointer-events-none absolute -right-20 top-6 h-72 w-72 rounded-full bg-livora-gold/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 bottom-6 h-72 w-72 rounded-full bg-livora-blue/40 blur-3xl" />

        <div className="relative mx-auto max-w-[1400px] px-5 pb-10 pt-12 sm:px-8 sm:pt-16">
          <div className="mb-14 rounded-[2rem] border border-white/15 bg-white/[0.04] p-7 backdrop-blur-sm sm:p-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="max-w-2xl">
                <p className="mb-4 font-subheading text-[0.65rem] uppercase tracking-[0.22em] text-livora-gold">Design Consultation</p>
                <h3 className="font-heading text-4xl leading-[1.06] text-white sm:text-5xl">Bring your dream home into focus.</h3>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                  Discuss layout, finishes, timelines, and budget with the Livora design team and receive practical direction in your first call.
                </p>
              </div>
              <NavLink
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-livora-gold bg-livora-gold px-8 py-3.5 font-subheading text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-livora-ink transition-all hover:-translate-y-0.5 hover:bg-white"
              >
                Book a Consultation
              </NavLink>
            </div>
          </div>

          <div className="mb-14 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4">
            <div className="xl:col-span-1">
              <img src={logofooter} alt="LIVORA logo" className="mb-7 h-16 w-auto sm:h-20" />
              <p className="max-w-sm text-sm leading-relaxed text-white/70">
                Complete modular interior systems engineered for modern living, with precise execution and transparent project planning.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-subheading text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-livora-gold">Quick Links</h4>
              <div className="space-y-2.5 text-sm text-white/70">
                {navItems.map((item) => (
                  <div key={item.path}>
                    <NavLink to={item.path} className="transition-colors hover:text-white">
                      {item.label}
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-subheading text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-livora-gold">Signature Solutions</h4>
              <div className="space-y-2.5 text-sm text-white/70">
                <p>Modular Kitchens</p>
                <p>Wardrobes and Storage</p>
                <p>TV and Display Units</p>
                <p>Complete Home Interiors</p>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-subheading text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-livora-gold">Visit and Connect</h4>
              <p className="mb-4 text-sm leading-relaxed text-white/70">
                817, Solitaire Business Hub,
                <br />
                Baner, Pune, MH 411045
              </p>
              <p className="text-sm text-white">
                +91 8669714195
                <br />
                concierge@livora.in
              </p>
              <div className="mt-5 flex flex-wrap gap-4 text-[0.68rem] font-subheading uppercase tracking-[0.14em] text-white/70">
                <a href="#" className="transition-colors hover:text-white">
                  Instagram
                </a>
                <a href="#" className="transition-colors hover:text-white">
                  Pinterest
                </a>
                <a href="#" className="transition-colors hover:text-white">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-white/15 pt-6 text-[0.64rem] uppercase tracking-[0.18em] text-white/45 md:flex-row md:items-center md:justify-between">
            <p>&copy; {new Date().getFullYear()} Livora Systems. Engineered for Modern Living.</p>
            <div className="flex gap-8">
              <a href="#" className="transition-colors hover:text-white">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
