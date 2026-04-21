"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";

export default function InquiryPage() {
  return (
    <SiteLayout>
      <div className="animate-fade-in bg-[#F5F1EC]">
        <div className="flex min-h-screen flex-col lg:flex-row">
          <div className="relative min-h-[50vh] w-full lg:min-h-screen lg:w-5/12">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200"
              alt="Consultation"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#1F3F5B] via-[#1F3F5B]/80 to-transparent p-10 md:p-16">
              <div className="mb-6 h-[2px] w-12 bg-[#C8A97E]" />
              <h1 className="mb-4 font-playfair text-4xl font-normal leading-[1.1] tracking-[-0.015em] text-[#F5F1EC] md:text-[64px]">Let&apos;s Design Your Home.</h1>
              <p className="mb-8 max-w-sm font-inter text-lg font-light leading-relaxed text-[#E6D6C5]">
                Get expert guidance on layout, materials, budget, and timelines-before you commit to anything.
              </p>
              <div className="space-y-4 border-t border-[#F5F1EC]/20 pt-6">
                <p className="flex items-start font-inter font-light text-[#F5F1EC]">
                  <MapPin size={18} className="mr-4 mt-1 shrink-0 text-[#C8A97E]" />
                  <span className="leading-relaxed">
                    Office No. 817, Solitaire Business Hub,
                    <br />
                    Baner, Pune, MH 411045
                  </span>
                </p>
                <p className="flex items-center font-inter font-light text-[#F5F1EC]"><Phone size={18} className="mr-4 text-[#C8A97E]" /> +91 78878 98925</p>
                <p className="flex items-center font-inter font-light text-[#F5F1EC]"><Mail size={18} className="mr-4 text-[#C8A97E]" /> design@livora.com</p>
              </div>
            </div>
          </div>

          <div className="flex w-full items-center justify-center bg-[#F5F1EC] p-8 md:p-16 lg:w-7/12 lg:p-24">
            <div className="w-full max-w-2xl rounded-sm bg-white p-10 shadow-sm md:p-14">
              <h3 className="mb-2 font-montserrat text-sm font-medium uppercase tracking-[0.12em] text-[#B9926B]">Project Inquiry</h3>
              <h2 className="mb-8 border-b border-[#E6D6C5] pb-6 font-playfair text-3xl font-normal tracking-[-0.015em] text-[#1F3F5B] md:text-[44px]">Tell us about your space</h2>

              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="mb-3 block font-montserrat text-xs font-medium uppercase tracking-wide-premium text-[#8A8A8A]">Project Requirements</label>
                  <textarea rows={3} className="w-full resize-none border-b border-[#E6D6C5] bg-transparent py-2 font-inter focus:border-[#B9926B] focus:outline-none" placeholder="Briefly describe what you are looking for..." />
                </div>

                <button
                  type="submit"
                  className="mt-4 inline-flex w-full items-center justify-center rounded-sm bg-[#B9926B] px-8 py-4 font-montserrat text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#1F3F5B]"
                >
                  Schedule My Consultation
                </button>
              </form>
            </div>
          </div>
        </div>

        <section className="border-t border-[#E6D6C5] bg-white px-6 py-24 md:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <div className="mb-6 flex items-center justify-center">
                <div className="mr-4 h-[1px] w-12 bg-[#C8A97E]" />
                <h3 className="font-montserrat text-sm font-medium uppercase tracking-[0.12em] text-[#C8A97E]">Our Location</h3>
                <div className="ml-4 h-[1px] w-12 bg-[#C8A97E]" />
              </div>
              <h2 className="font-playfair text-3xl font-normal tracking-[-0.015em] text-[#1F3F5B] md:text-[44px]">Visit Our Studio</h2>
            </div>

            <div className="relative z-10 h-[450px] w-full overflow-hidden rounded-sm border-4 border-[#F5F1EC] bg-[#F5F1EC] shadow-xl lg:h-[550px]">
              <iframe
                src="https://maps.google.com/maps?q=Solitaire%20Business%20Hub,%20Baner,%20Pune&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Livora Studio Location"
              />
            </div>

            <div className="mt-12 flex flex-col items-center justify-center gap-6 text-[#1F3F5B] md:flex-row">
              <div className="flex h-14 w-14 -translate-y-2 transform items-center justify-center rounded-full bg-[#1F3F5B] shadow-lg">
                <MapPin className="text-[#C8A97E]" size={28} />
              </div>
              <p className="text-center font-inter text-lg font-light text-[#2B2B2B] md:text-left">
                <strong className="mb-2 block font-montserrat text-[13px] font-medium uppercase tracking-wide-premium text-[#1F3F5B]">Livora Headquarters</strong>
                Office No. 817, Solitaire Business Hub, Baner, Pune, MH 411045
              </p>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
