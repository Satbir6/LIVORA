import Link from "next/link";
import SiteLayout from "@/components/SiteLayout";

export default function ProcessPage() {
  const phases = [
    {
      phase: "01",
      title: "Consultation & Discovery",
      desc: "Every project begins with a conversation. We delve into your lifestyle, aesthetic preferences, and functional needs. Whether online or in person, this stage sets the foundation for a home that truly reflects you.",
      img: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000",
    },
    {
      phase: "02",
      title: "Architectural Design Planning",
      desc: "Our design team translates your vision into precise layouts and material palettes. We provide high-fidelity 3D visualizations so you can walk through your future space before a single board is cut.",
      img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000",
    },
    {
      phase: "03",
      title: "Material Customisation",
      desc: "We guide you through selecting premium finishes, hardware, and module configurations. This phase ensures every detail is perfectly aligned with both your taste and your established budget.",
      img: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?auto=format&fit=crop&q=80&w=1000",
    },
    {
      phase: "04",
      title: "Precision Execution",
      desc: "Design meets manufacturing. Our advanced CNC factory takes over to produce your interiors with millimeter precision. Simultaneously, our site team prepares your home for a seamless, rapid installation.",
      img: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=1000",
    },
    {
      phase: "05",
      title: "Final Handover",
      desc: "We conduct rigorous multi-point quality inspections before handing over the keys. You walk into a fully finished, ready-to-live home, backed by our comprehensive warranties.",
      img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=1000",
    },
  ];

  return (
    <SiteLayout>
      <section className="relative flex h-[80vh] min-h-[600px] items-center justify-center text-center">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000" alt="Our Process" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1F3F5B]/80 via-[#1F3F5B]/90 to-[#F5F1EC]" />
        </div>

        <div className="relative z-10 mx-auto mt-16 flex max-w-4xl flex-col items-center px-6">
          <span className="mb-6 font-montserrat text-sm font-medium uppercase tracking-[0.2em] text-[#C8A97E]">Our Methodology</span>
          <h1 className="text-center font-playfair text-4xl font-normal leading-tight text-[#F5F1EC] md:text-[64px]">
            A Predictable Path
            <br />
            to Your Perfect Home
          </h1>
          <div className="mx-auto mb-8 mt-8 h-[2px] w-16 bg-[#B9926B]" />
          <p className="mx-auto max-w-2xl font-inter text-lg font-light leading-relaxed text-[#E6D6C5] md:text-xl">
            Precision from concept to handover. We&apos;ve replaced industry guesswork with a predictable, five-stage framework that guarantees results without the usual stress.
          </p>
        </div>

        <div className="absolute bottom-12 left-1/2 flex -translate-x-1/2 transform animate-bounce flex-col items-center">
          <div className="h-16 w-px bg-gradient-to-b from-[#B9926B] to-transparent" />
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#F5F1EC] px-6 py-24 md:px-12">
        <div className="relative mx-auto max-w-6xl">
          <div className="absolute bottom-10 left-1/2 top-10 z-0 hidden w-[2px] -translate-x-1/2 transform bg-[#E6D6C5] md:block" />

          <div className="space-y-24 md:space-y-32">
            {phases.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div key={step.phase} className={`relative z-10 flex w-full flex-col items-center justify-between md:flex-row ${isEven ? "md:flex-row-reverse" : ""}`}>
                  <div className="absolute left-1/2 z-20 hidden h-16 w-16 -translate-x-1/2 transform items-center justify-center rounded-full border-[3px] border-[#B9926B] bg-[#F5F1EC] font-playfair text-xl font-semibold text-[#1F3F5B] shadow-sm md:flex">
                    {step.phase}
                  </div>

                  <div className="group relative mb-8 h-72 w-full overflow-hidden rounded-sm shadow-xl md:mb-0 md:h-[450px] md:w-[45%]">
                    <img src={step.img} alt={step.title} className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-[#1F3F5B]/10 transition-colors duration-500 group-hover:bg-transparent" />
                  </div>

                  <div className={`flex w-full flex-col justify-center md:w-[42%] ${isEven ? "md:items-end md:text-right" : "md:items-start md:text-left"}`}>
                    <div className="mb-2 font-playfair text-6xl italic text-[#B9926B] opacity-20 md:hidden">{step.phase}</div>
                    <h3 className="mb-4 font-montserrat text-sm font-medium uppercase tracking-[0.12em] text-[#B9926B]">{`Phase ${step.phase}`}</h3>
                    <h2 className="mb-6 font-playfair text-3xl font-normal text-[#1F3F5B] md:text-4xl">{step.title}</h2>
                    <p className={`font-inter font-light text-[#8A8A8A] ${isEven ? "md:text-right" : "md:text-left"}`}>{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t-4 border-[#B9926B] bg-[#1F3F5B] px-6 py-20 md:px-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 flex flex-wrap items-center justify-center gap-10 text-center md:justify-between md:gap-6 md:text-left">
            <div className="w-full text-center md:w-auto">
              <h4 className="mb-2 font-playfair text-5xl text-[#C8A97E] md:text-6xl">45-60</h4>
              <p className="font-montserrat text-sm uppercase tracking-[0.12em] text-[#F5F1EC]">Day Delivery Timeline</p>
            </div>
            <div className="hidden h-16 w-px bg-[#C8A97E]/30 md:block" />
            <div className="w-full text-center md:w-auto">
              <h4 className="mb-2 font-playfair text-5xl text-[#C8A97E] md:text-6xl">5</h4>
              <p className="font-montserrat text-sm uppercase tracking-[0.12em] text-[#F5F1EC]">Defined Phases</p>
            </div>
            <div className="hidden h-16 w-px bg-[#C8A97E]/30 md:block" />
            <div className="w-full text-center md:w-auto">
              <h4 className="mb-2 font-playfair text-5xl text-[#C8A97E] md:text-6xl">100%</h4>
              <p className="font-montserrat text-sm uppercase tracking-[0.12em] text-[#F5F1EC]">Pricing Transparency</p>
            </div>
          </div>

          <div className="border-t border-[#C8A97E]/20 pt-10 text-center">
            <h2 className="mb-8 font-playfair text-3xl font-normal text-[#F5F1EC] md:text-[44px]">Ready to begin?</h2>
            <Link
              href="/inquiry"
              className="inline-flex items-center justify-center rounded-sm bg-[#B9926B] px-8 py-4 font-montserrat text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-all duration-300 hover:bg-[#1F3F5B]"
            >
              Start Your Project
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
