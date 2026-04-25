"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import navbarLogo from "@/LOGO/Navbar-logo.png";
import footerLogo from "@/LOGO/Logo-footer.png";

const CONSULTATION_POPUP_KEY = "livora-consultation-popup-seen";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/the-brand", label: "The Brand" },
  { href: "/process", label: "Process" },
  { href: "/inquiry", label: "Inquiry" },
];

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/the-brand", label: "The Brand" },
  { href: "/process", label: "Process" },
  { href: "/inquiry", label: "Inquiry" },
];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isConsultationPopupOpen, setIsConsultationPopupOpen] = useState(false);

  useEffect(() => {
    if (pathname === "/inquiry") {
      return;
    }

    const hasSeenPopup = sessionStorage.getItem(CONSULTATION_POPUP_KEY) === "true";
    if (hasSeenPopup) {
      return;
    }

    const timer = window.setTimeout(() => {
      setIsConsultationPopupOpen(true);
      sessionStorage.setItem(CONSULTATION_POPUP_KEY, "true");
    }, 10000);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  const closeConsultationPopup = () => {
    setIsConsultationPopupOpen(false);
    sessionStorage.setItem(CONSULTATION_POPUP_KEY, "true");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] font-inter text-[var(--foreground)]">
      <header className="sticky top-0 z-50 border-b border-[var(--soft-beige)] bg-[var(--background)] shadow-sm">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <Link href="/" aria-label="Livora Home" className="inline-flex items-center">
            <Image src={navbarLogo} alt="Livora" priority className="h-10 w-auto md:h-12" />
          </Link>
          <button className="text-[var(--secondary)] md:hidden" onClick={() => setIsMobileMenuOpen((prev) => !prev)} aria-label="Toggle navigation">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-montserrat text-sm font-semibold uppercase tracking-wider transition-colors hover:text-[var(--primary)] ${
                  pathname === link.href ? "text-[var(--primary)]" : "text-[var(--secondary)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="border-t border-[var(--soft-beige)] bg-[var(--background)] px-6 py-6 shadow-md md:hidden">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-montserrat text-lg font-medium uppercase tracking-[0.12em] ${
                    pathname === link.href ? "text-[var(--primary)]" : "text-[var(--secondary)]"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">{children}</main>

      {isConsultationPopupOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[rgba(12,23,35,0.58)] px-6">
          <div className="relative w-full max-w-md rounded-md border border-[var(--soft-beige)] bg-[var(--background)] p-8 shadow-2xl">
            <button
              type="button"
              aria-label="Close consultation popup"
              onClick={closeConsultationPopup}
              className="absolute right-3 top-3 text-[var(--secondary)] transition-colors hover:text-[var(--primary)]"
            >
              <X size={22} />
            </button>
            <h3 className="font-montserrat text-xl font-semibold uppercase tracking-[0.08em] text-[var(--secondary)]">Book Free Consultation</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--warm-grey)]">
              Begin your interior transformation with a complimentary consultation crafted around your space, style, and budget.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/inquiry"
                onClick={closeConsultationPopup}
                className="inline-flex w-full items-center justify-center rounded-sm bg-[var(--primary)] px-6 py-3 font-montserrat text-xs font-semibold uppercase tracking-[0.11em] text-white transition-all duration-300 hover:bg-[var(--muted-gold)]"
              >
                Book Free Consultation
              </Link>
              <button
                type="button"
                onClick={closeConsultationPopup}
                className="inline-flex w-full items-center justify-center rounded-sm border border-[var(--soft-beige)] px-6 py-3 font-montserrat text-xs font-semibold uppercase tracking-[0.11em] text-[var(--secondary)] transition-colors hover:border-[var(--primary)] hover:text-[var(--primary)]"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t-8 border-[var(--primary)] bg-[var(--secondary)] px-6 pb-10 pt-20 text-[var(--neutralLight)] md:px-12">
        <div className="mx-auto mb-16 grid w-full max-w-7xl gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Image src={footerLogo} alt="Livora" className="h-20 w-auto md:h-24" />
            <p className="mt-4 font-playfair text-xl italic text-[var(--soft-beige)]">Designed for living. Engineered for life.</p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="rounded-full bg-[#2c5375] px-4 py-2 text-sm transition-colors hover:bg-[var(--primary)]">
                Instagram
              </a>
              <a href="#" className="rounded-full bg-[#2c5375] px-4 py-2 text-sm transition-colors hover:bg-[var(--primary)]">
                Facebook
              </a>
              <a href="#" className="rounded-full bg-[#2c5375] px-4 py-2 text-sm transition-colors hover:bg-[var(--primary)]">
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-montserrat text-lg font-semibold uppercase tracking-wider text-[var(--muted-gold)]">Quick Links</h4>
            <div className="mt-6 grid gap-3">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="font-inter text-sm transition-colors hover:text-[var(--primary)]">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-montserrat text-lg font-semibold uppercase tracking-wider text-[var(--muted-gold)]">Contact</h4>
            <ul className="mt-6 grid gap-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 mt-0.5 shrink-0 text-[var(--primary)]" />
                <span className="font-inter text-sm">Office No. 817,<br /> Solitaire Business Hub,<br />Baner, Pune, MH 411045</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 shrink-0 text-[var(--primary)]" />
                <span className="font-inter text-sm">+91 78878 98925</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 shrink-0 text-[var(--primary)]" />
                <span className="font-inter text-sm">hello@livora.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 border-t border-[#2c5375] pt-8 text-sm text-[var(--warm-grey)] md:flex-row">
          <p className="font-light">&copy; {new Date().getFullYear()} Livora Interiors. All Rights Reserved.</p>
          <div className="space-x-6">
            <a href="#" className="transition-colors hover:text-[var(--neutralLight)]">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-[var(--neutralLight)]">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
