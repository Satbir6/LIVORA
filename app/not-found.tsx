import Link from "next/link";
import { Compass, Search } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout>
      <div className="animate-fade-in min-h-[70vh] bg-[#F5F1EC] px-6 py-20">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div className="relative">
            <div className="relative flex aspect-[4/5] flex-col rounded-sm border border-[#E6D6C5] bg-white p-8 shadow-2xl">
              <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-5">
                <div
                  className="absolute left-0 top-0 h-full w-full border-[1px] border-[#1F3F5B]"
                  style={{
                    backgroundImage: "linear-gradient(#1F3F5B 1px, transparent 1px), linear-gradient(90deg, #1F3F5B 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
              </div>

              <div className="relative z-10 mb-12 flex items-start justify-between">
                <div className="select-none font-playfair text-[120px] font-bold leading-none text-[#C8A97E]/20">404</div>
                <Compass className="animate-pulse text-[#B9926B]" size={48} />
              </div>

              <div className="relative z-10 flex flex-grow flex-col items-center justify-center">
                <div className="mb-8 flex h-48 w-48 items-center justify-center rounded-full border-2 border-dashed border-[#C8A97E]">
                  <Search size={40} className="text-[#1F3F5B] opacity-40" />
                </div>
                <h3 className="max-w-[200px] text-center font-montserrat text-xl font-semibold uppercase tracking-[0.08em] text-[#1F3F5B]">
                  The requested space cannot be found
                </h3>
              </div>

              <div className="relative z-10 flex items-end justify-between border-t border-[#E6D6C5] pt-8">
                <div>
                  <p className="mb-1 font-montserrat text-[10px] uppercase tracking-widest text-[#8A8A8A]">Blueprint Ref.</p>
                  <p className="font-inter text-xs text-[#1F3F5B]">ERR_PAGE_MISSING_04</p>
                </div>
                <div className="text-right">
                  <p className="mb-1 font-montserrat text-[10px] uppercase tracking-widest text-[#8A8A8A]">Coordinates</p>
                  <p className="font-inter text-xs text-[#1F3F5B]">0.0.0.0 / Unknown</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full bg-[#1F3F5B]/5" />
          </div>

          <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <div className="mb-6 flex items-center">
              <div className="mr-4 h-[1px] w-12 bg-[#C8A97E]" />
              <span className="font-montserrat text-[11px] font-medium uppercase tracking-[0.2em] text-[#C8A97E]">Misplaced Space</span>
            </div>

            <h1 className="mb-6 font-playfair text-4xl leading-[1.1] text-[#1F3F5B] md:text-[56px]">Even great design hits a dead end.</h1>

            <p className="mb-12 max-w-md font-inter text-[17px] leading-relaxed text-[#8A8A8A]">
              The page you are looking for has been moved, removed, or never existed in the original floor plan. Let&apos;s get you back to the main lobby.
            </p>

            <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-sm bg-[#B9926B] px-12 py-4 font-montserrat text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#1F3F5B]"
              >
                Return Home
              </Link>
              <Link
                href="/inquiry"
                className="inline-flex items-center justify-center rounded-sm border border-[#B9926B] px-8 py-4 font-montserrat text-[13px] font-medium uppercase tracking-[0.12em] text-[#1F3F5B] transition-all duration-300 hover:bg-[#B9926B] hover:text-white"
              >
                Contact Support
              </Link>
            </div>

            <div className="mt-20 grid w-full grid-cols-2 gap-8 border-t border-[#E6D6C5] pt-12">
              <div>
                <h4 className="mb-4 font-montserrat text-[10px] uppercase tracking-widest text-[#B9926B]">Start Over</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/" className="font-inter text-sm text-[#1F3F5B] transition-colors hover:text-[#B9926B]">
                      Homepage
                    </Link>
                  </li>
                  <li>
                    <Link href="/the-brand" className="font-inter text-sm text-[#1F3F5B] transition-colors hover:text-[#B9926B]">
                      The Brand
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 font-montserrat text-[10px] uppercase tracking-widest text-[#B9926B]">Explore</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/process" className="font-inter text-sm text-[#1F3F5B] transition-colors hover:text-[#B9926B]">
                      Our Process
                    </Link>
                  </li>
                  <li>
                    <Link href="/inquiry" className="font-inter text-sm text-[#1F3F5B] transition-colors hover:text-[#B9926B]">
                      Inquiry
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}
