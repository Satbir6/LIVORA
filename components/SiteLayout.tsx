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
    <div className="min-h-screen flex flex-col bg-background font-inter text-foreground">
      <header className="sticky top-0 z-50 border-b border-(--soft-beige) bg-background shadow-sm">
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-12">
          <Link href="/" aria-label="Livora Home" className="inline-flex items-center">
            <Image src={navbarLogo} alt="Livora" priority className="h-10 w-auto md:h-12" />
          </Link>
          <button className="text-(--secondary) md:hidden" onClick={() => setIsMobileMenuOpen((prev) => !prev)} aria-label="Toggle navigation">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-montserrat text-sm font-semibold uppercase tracking-wider transition-colors hover:text-(--primary) ${
                  pathname === link.href ? "text-(--primary)" : "text-(--secondary)"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
        {isMobileMenuOpen && (
          <div className="border-t border-(--soft-beige) bg-background px-6 py-6 shadow-md md:hidden">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`font-montserrat text-lg font-medium uppercase tracking-[0.12em] ${
                    pathname === link.href ? "text-(--primary)" : "text-(--secondary)"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/book-consultation"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-sm bg-(--primary) px-8 py-4 font-montserrat text-[14px] font-semibold uppercase tracking-wider text-white transition-all duration-300 hover:bg-(--muted-gold)"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="grow">{children}</main>

      <footer className="border-t-8 border-(--primary) bg-(--secondary) px-6 pb-10 pt-20 text-(--neutralLight) md:px-12">
        <div className="mx-auto mb-16 grid w-full max-w-7xl gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Image src={footerLogo} alt="Livora" className="h-20 w-auto md:h-24" />
            <p className="mt-4 font-playfair text-xl italic text-(--soft-beige)">Designed for living. Engineered for life.</p>
            <div className="mt-6 flex gap-4">
              <a href="#" className="rounded-full bg-[#2c5375] px-4 py-2 text-sm transition-colors hover:bg-(--primary)">
                Instagram
              </a>
              <a href="#" className="rounded-full bg-[#2c5375] px-4 py-2 text-sm transition-colors hover:bg-(--primary)">
                Facebook
              </a>
              <a href="#" className="rounded-full bg-[#2c5375] px-4 py-2 text-sm transition-colors hover:bg-(--primary)">
                LinkedIn
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-montserrat text-lg font-semibold uppercase tracking-wider text-(--muted-gold)">Quick Links</h4>
            <div className="mt-6 grid gap-3">
              {footerLinks.map((link) => (
                <Link key={link.href} href={link.href} className="font-inter text-sm transition-colors hover:text-(--primary)">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-montserrat text-lg font-semibold uppercase tracking-wider text-(--muted-gold)">Contact</h4>
            <ul className="mt-6 grid gap-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 mt-0.5 shrink-0 text-(--primary)" />
                <span className="font-inter text-sm">Office No. 817,<br /> Solitaire Business Hub,<br />Baner, Pune, MH 411045</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 shrink-0 text-(--primary)" />
                <span className="font-inter text-sm">+91 78878 98925</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 shrink-0 text-(--primary)" />
                <span className="font-inter text-sm">hello@livora.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 border-t border-[#2c5375] pt-8 text-sm text-(--warm-grey) md:flex-row">
          <p className="font-light">&copy; {new Date().getFullYear()} Livora Interiors. All Rights Reserved.</p>
          <div className="space-x-6">
            <a href="#" className="transition-colors hover:text-(--neutralLight)">
              Privacy Policy
            </a>
            <a href="#" className="transition-colors hover:text-(--neutralLight)">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
