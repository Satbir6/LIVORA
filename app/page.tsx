import Link from "next/link";
import { CheckSquare, Clock, FileText, Home as HomeIcon, Layers, ShieldCheck } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";

export default function Home() {
  return (
    <SiteLayout>
      <div className="animate-fade-in">
        <section className="relative flex h-screen min-h-[700px] items-center overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000"
              alt="Premium Interior"
              className="h-full w-full scale-105 animate-[pulse_30s_ease-in-out_infinite_alternate] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1F3F5B]/95 via-[#1F3F5B]/80 to-[#1F3F5B]/30" />
          </div>

          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between px-6 pt-20 md:flex-row md:px-12">
            <div className="w-full md:w-3/5 md:pr-12">
              <div className="mb-8 flex items-center">
                <div className="mr-4 h-[1px] w-12 bg-[#C8A97E]" />
                <span className="font-montserrat text-[11px] font-medium uppercase tracking-[0.2em] text-[#C8A97E]">Redefining Living Spaces</span>
              </div>
              <h1 className="mb-6 font-playfair text-4xl leading-[1.05] text-[#F5F1EC] md:text-[64px]">Premium Interiors Designed Around Real Living</h1>
              <p className="mb-10 max-w-lg font-inter text-lg font-light leading-relaxed text-[#E6D6C5] md:text-xl">
                Not just beautiful spaces-intelligent interiors engineered for how you actually live. Livora blends design,
                durability, and absolute precision.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/inquiry"
                  className="inline-flex items-center justify-center rounded-sm bg-[#C8A97E] px-8 py-4 font-montserrat text-[13px] font-medium uppercase tracking-[0.12em] text-[#1F3F5B] transition-all duration-300 hover:bg-[#F5F1EC]"
                >
                  Book a Consultation
                </Link>
                <Link
                  href="/process"
                  className="inline-flex items-center justify-center rounded-sm border border-[#C8A97E] px-8 py-4 font-montserrat text-[13px] font-medium uppercase tracking-[0.12em] text-[#F5F1EC] transition-all duration-300 hover:bg-[#C8A97E] hover:text-[#1F3F5B]"
                >
                  Explore Process
                </Link>
              </div>
            </div>

            <div className="relative mt-16 hidden w-full md:mt-0 md:block md:w-2/5">
              <div className="relative h-[450px] w-full shadow-2xl lg:h-[550px]">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=800"
                  alt="Architectural Detail"
                  className="h-full w-full rounded-sm object-cover"
                />
                <div className="absolute -bottom-8 -left-8 rounded-sm border-l-4 border-[#B9926B] bg-[#F5F1EC] p-8 shadow-xl">
                  <div className="mb-1 font-playfair text-4xl text-[#1F3F5B]">
                    10<span className="text-[#C8A97E]">+</span>
                  </div>
                  <div className="font-montserrat text-[10px] uppercase tracking-[0.12em] text-[#8A8A8A]">Years of Excellence</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-20 border-b border-[#C8A97E]/30 bg-[#E6D6C5]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 divide-y divide-[#C8A97E]/30 md:grid-cols-5 md:divide-x md:divide-y-0">
            {[
              { label: "450+ Homes Delivered", icon: HomeIcon },
              { label: "60-Day Handover", icon: Clock },
              { label: "10+2 Year Warranty", icon: ShieldCheck },
              { label: "100% Transparent Pricing", icon: FileText },
              { label: "End-to-End Management", icon: CheckSquare },
            ].map((item) => (
              <div key={item.label} className="group flex cursor-default flex-col items-center justify-center px-4 py-10 transition-colors duration-500 hover:bg-[#F5F1EC]">
                <item.icon className="mb-3 h-5 w-5 text-[#B9926B]" />
                <span className="text-center font-montserrat text-[10px] font-medium uppercase tracking-[0.12em] text-[#1F3F5B] md:text-[11px]">{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#F5F1EC] px-6 py-32 md:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 flex flex-col justify-between md:flex-row md:items-end">
              <div className="max-w-2xl">
                <h3 className="mb-4 font-montserrat text-sm font-medium uppercase tracking-[0.12em] text-[#B9926B]">Our Expertise</h3>
                <h2 className="font-playfair text-3xl leading-tight text-[#1F3F5B] md:text-[44px]">
                  Complete Interior Solutions,
                  <br />
                  Engineered for Life.
                </h2>
              </div>
              <p className="hidden max-w-sm text-right font-inter font-light text-[#8A8A8A] md:block">
                We design and deliver fully integrated interior systems that bring consistency, function, and long-term reliability.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-12">
              {[
                {
                  title: "Modular Kitchens",
                  desc: "Precision-engineered culinary spaces built for intense daily use and timeless appeal.",
                  img: "/images/Modular-Kitchens.jpg",
                },
                {
                  title: "Wardrobes & Storage",
                  desc: "Intelligent organization systems seamlessly integrated into your home's architecture.",
                  img: "/images/Wardrobes-Storage.jpg",
                },
                {
                  title: "Complete Home Interiors",
                  desc: "End-to-end spatial design ensuring cohesive aesthetics across every single room.",
                  img: "/images/Complete-Home-Interiors.png",
                },
              ].map((service) => (
                <div key={service.title} className="group relative h-[450px] cursor-pointer overflow-hidden rounded-sm shadow-md lg:h-[600px]">
                  <img src={service.img} alt={service.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F3F5B]/90 via-[#1F3F5B]/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 w-full translate-y-4 p-8 transition-transform duration-500 group-hover:translate-y-0 md:p-10">
                    <div className="mb-4 h-[2px] w-8 bg-[#C8A97E]" />
                    <h3 className="mb-2 font-montserrat text-sm font-medium uppercase tracking-[0.12em] text-[#F5F1EC]">{service.title}</h3>
                    <p className="font-inter text-sm font-light leading-relaxed text-[#E6D6C5] opacity-0 transition-opacity delay-100 duration-500 group-hover:opacity-100">
                      {service.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white px-6 py-32 md:px-12">
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-20 lg:flex-row">
            <div className="relative w-full lg:w-1/2">
              <img
                src="/images/image-Home-Page.png"
                alt="Precision Design"
                className="h-[650px] w-full rounded-sm object-cover shadow-2xl"
              />
              <div className="absolute -right-16 top-1/4 hidden h-64 w-48 border-8 border-white shadow-xl lg:block">
                <img src="https://picsum.photos/id/1060/600/800" className="h-full w-full object-cover" alt="Detail" />
              </div>
            </div>

            <div className="w-full lg:w-1/2 lg:pl-10">
              <h3 className="mb-4 font-montserrat text-sm font-medium uppercase tracking-[0.12em] text-[#B9926B]">The Approach</h3>
              <h2 className="mb-8 font-playfair text-3xl text-[#1F3F5B] md:text-[44px]">Why Homeowners Choose Livora</h2>
              <p className="mb-12 max-w-lg font-inter font-light text-[#8A8A8A]">
                Good design isn&apos;t enough. An interior space must perform flawlessly every single day without compromise.
              </p>

              <div className="space-y-2">
                {[
                  {
                    title: "Factory Precision Manufacturing",
                    desc: "Advanced CNC production ensures millimeter accuracy, seamless finishes, and incredible long-term reliability.",
                  },
                  {
                    title: "Transparent Pricing System",
                    desc: "No inflated discounts or hidden costs. We provide clear, fixed quotations you can completely trust.",
                  },
                  {
                    title: "Premium-Grade Materials",
                    desc: "Carefully selected core materials and global hardware built specifically for durability and intense daily use.",
                  },
                  {
                    title: "Faster, Predictable Delivery",
                    desc: "Factory-led execution drastically reduces on-site delays and keeps your moving timelines strictly under control.",
                  },
                ].map((feature, idx) => (
                  <div key={feature.title} className="group flex items-start border-t border-[#E6D6C5] pb-4 pt-6">
                    <span className="mr-6 mt-1 font-playfair text-2xl italic text-[#C8A97E] opacity-70 transition-opacity group-hover:opacity-100 md:mr-8 md:text-3xl">
                      0{idx + 1}
                    </span>
                    <div>
                      <h4 className="mb-3 font-montserrat text-sm font-medium uppercase tracking-[0.12em] text-[#1F3F5B] transition-colors group-hover:text-[#B9926B]">
                        {feature.title}
                      </h4>
                      <p className="font-inter text-[15px] leading-relaxed text-[#8A8A8A] transition-colors group-hover:text-[#2B2B2B]">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#1F3F5B] px-6 py-32 text-[#F5F1EC] md:px-12">
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <img src="/images/Complete-Home-Interiors.png" className="h-full w-full object-cover" alt="Background Texture" />
          </div>

          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-16 lg:flex-row">
            <div className="w-full lg:w-5/12">
              <h3 className="mb-4 font-montserrat text-sm font-medium uppercase tracking-[0.12em] text-[#C8A97E]">The Livora Difference</h3>
              <h2 className="mb-6 font-playfair text-3xl text-[#F5F1EC] md:text-[44px]">Execution Over Intention.</h2>
              <p className="mb-10 font-inter text-lg font-light leading-relaxed text-[#E6D6C5] md:text-xl">
                Most interior projects fail in execution-not design. At Livora, we solve this with a rigorous, system-driven approach that completely removes the guesswork.
              </p>

              <div className="relative h-72 w-full overflow-hidden rounded-sm border-l-4 border-[#B9926B] shadow-2xl md:h-96">
                <img
                  src="/images/image-Home-Page-1.jpg"
                  alt="System Driven Design"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div className="w-full lg:w-7/12">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
                {[
                  { title: "Unified Workflow", desc: "Design, manufacturing, and execution are handled under one roof. No pointing fingers, just results." },
                  { title: "Zero Vendor Dependency", desc: "We don't rely on fragmented third-party carpenters. We fully control the process and the timeline." },
                  { title: "Measurable Timelines", desc: "Strict milestone tracking ensures you know exactly when you will be moving into your new home." },
                  { title: "Real-Life Performance", desc: "Engineered and built for intense daily usage and wear-not just to look perfect in a glossy showroom." },
                ].map((item) => (
                  <div key={item.title} className="rounded-sm border-t-2 border-[#C8A97E]/30 bg-[#18324a] p-10 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-[#C8A97E]">
                    <Layers className="mb-6 h-8 w-8 text-[#C8A97E] opacity-50" />
                    <h4 className="mb-4 font-montserrat text-[13px] font-medium uppercase tracking-[0.12em] text-[#F5F1EC]">{item.title}</h4>
                    <p className="font-inter font-light leading-relaxed text-[#8A8A8A]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-[#E6D6C5] bg-[#F5F1EC] px-6 py-32 text-center md:px-12">
          <div className="mx-auto max-w-6xl">
            <h3 className="mb-4 font-montserrat text-sm font-medium uppercase tracking-[0.12em] text-[#B9926B]">Methodology</h3>
            <h2 className="mb-16 font-playfair text-3xl text-[#1F3F5B] md:text-[44px]">A Clear Path from Idea to Finished Home</h2>

            <div className="relative my-20 flex flex-col items-start justify-between md:flex-row md:items-center">
              <div className="absolute left-[10%] top-8 -z-10 hidden h-[1px] w-[80%] bg-[#C8A97E]/50 md:block" />
              <div className="absolute bottom-0 left-6 top-0 -z-10 w-[1px] bg-[#C8A97E]/50 md:hidden" />

              {["Consultation", "Design Planning", "Customisation", "Execution", "Handover"].map((step, idx) => (
                <div key={step} className="z-10 mb-8 flex w-full flex-row items-center bg-[#F5F1EC] md:mb-0 md:w-auto md:flex-col md:px-4">
                  <div className="mb-0 mr-6 flex h-12 w-12 flex-shrink-0 cursor-default items-center justify-center rounded-full border-2 border-[#B9926B] bg-[#F5F1EC] font-playfair text-xl italic text-[#1F3F5B] shadow-sm transition-colors hover:bg-[#1F3F5B] hover:text-[#F5F1EC] md:mb-6 md:mr-0 md:h-16 md:w-16 md:text-2xl">
                    {idx + 1}
                  </div>
                  <span className="max-w-[120px] font-montserrat text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1F3F5B] md:text-center md:text-xs">{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <Link
                href="/process"
                className="inline-flex items-center justify-center rounded-sm border border-[#1F3F5B] px-8 py-4 font-montserrat text-[13px] font-medium uppercase tracking-[0.12em] text-[#1F3F5B] transition-all duration-300 hover:bg-[#1F3F5B] hover:text-[#F5F1EC]"
              >
                View Detailed Process
              </Link>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
