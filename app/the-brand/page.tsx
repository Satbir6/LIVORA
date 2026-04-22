import SiteLayout from "@/components/SiteLayout";

export default function TheBrandPage() {
  return (
    <SiteLayout>
      <div className="animate-fade-in">
        <section className="relative flex h-[65vh] min-h-[500px] items-center justify-center text-center">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
              alt="Intentional Interiors"
              className="h-full w-full object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-[#1F3F5B]/50" />
          </div>
          <div className="relative z-10 mx-auto mt-16 max-w-4xl px-6">
            <div className="mx-auto mb-8 h-[2px] w-12 bg-[#C8A97E]" />
            <h1 className="mb-6 font-playfair text-4xl font-normal leading-[1.1] tracking-[-0.015em] text-[#F5F1EC] md:text-[64px]">
              Intentional, Functional, Timeless
            </h1>
            <p className="mx-auto max-w-2xl font-inter text-lg font-light leading-[1.7] text-[#E6D6C5] md:text-xl">
              At Livora, we believe your home should support your life-not complicate it. We don&apos;t just design spaces. We build interior systems that combine aesthetics, usability, and long-term performance.
            </p>
          </div>
        </section>

        <section className="bg-white px-6 py-24 md:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-20 text-center">
              <h3 className="mb-4 font-montserrat text-sm font-medium uppercase tracking-[0.12em] text-[#B9926B]">Our Journey</h3>
              <h2 className="font-playfair text-3xl font-normal tracking-[-0.015em] text-[#1F3F5B] md:text-[44px]">How Livora Evolved</h2>
            </div>

            <div className="space-y-24">
              <div className="group flex flex-col items-center gap-12 md:flex-row">
                <div className="w-full overflow-hidden rounded-sm shadow-lg md:w-1/2">
                  <img src="/images/Observation-First.jpg" alt="Observation First" className="h-[400px] w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <div className="w-full md:w-1/2 md:pl-12">
                  <span className="mb-2 block font-playfair text-6xl italic text-[#E6D6C5] opacity-60 md:text-8xl">01</span>
                  <h3 className="mb-4 font-montserrat text-sm font-medium uppercase tracking-[0.12em] text-[#1F3F5B]">Observation First</h3>
                  <p className="font-inter font-light leading-[1.7] text-[#8A8A8A]">We identified a common problem: homes that looked gorgeous in renders but failed in everyday use. We saw a gap between showroom aesthetics and the durability required for real-life living.</p>
                </div>
              </div>

              <div className="group flex flex-col items-center gap-12 md:flex-row-reverse">
                <div className="w-full overflow-hidden rounded-sm shadow-lg md:w-1/2">
                  <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000" alt="Systems Thinking" className="h-[400px] w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <div className="w-full md:w-1/2 md:pr-12">
                  <span className="mb-2 block font-playfair text-6xl italic text-[#E6D6C5] opacity-60 md:text-8xl">02</span>
                  <h3 className="mb-4 font-montserrat text-sm font-medium uppercase tracking-[0.12em] text-[#1F3F5B]">Systems Thinking</h3>
                  <p className="font-inter font-light leading-[1.7] text-[#8A8A8A]">We moved beyond decoration to structured, functional interior planning. Every element is designed to work together as a cohesive system, rather than isolated pieces of mismatched furniture.</p>
                </div>
              </div>

              <div className="group flex flex-col items-center gap-12 md:flex-row">
                <div className="w-full overflow-hidden rounded-sm shadow-lg md:w-1/2">
                  <img src="/images/Precision-Delivery.jpg" alt="Precision Delivery" className="h-[400px] w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                </div>
                <div className="w-full md:w-1/2 md:pl-12">
                  <span className="mb-2 block font-playfair text-6xl italic text-[#E6D6C5] opacity-60 md:text-8xl">03</span>
                  <h3 className="mb-4 font-montserrat text-sm font-medium uppercase tracking-[0.12em] text-[#1F3F5B]">Precision Delivery</h3>
                  <p className="font-inter font-light leading-[1.7] text-[#8A8A8A]">Today, we combine design, engineering, and execution into one accountable system. Advanced factory manufacturing ensures that what we design is precisely what we deliver to your home.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative bg-[#1F3F5B] px-6 py-32 md:px-12">
          <div className="pointer-events-none absolute inset-0 opacity-10">
            <img src="/images/Complete-Home-Interiors.png" className="h-full w-full object-cover" alt="Background Texture" />
          </div>

          <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-16 lg:flex-row">
            <div className="relative lg:w-5/12">
              <div className="sticky top-32">
                <div className="mb-6 flex items-center">
                  <div className="mr-4 h-[1px] w-12 bg-[#C8A97E]" />
                  <h3 className="font-montserrat text-sm font-medium uppercase tracking-[0.12em] text-[#C8A97E]">Core Principles</h3>
                </div>
                <h2 className="mb-6 font-playfair text-3xl font-normal tracking-[-0.015em] text-[#F5F1EC] md:text-[44px]">Our Framework for Every Project</h2>
                <p className="max-w-sm font-inter font-light leading-[1.7] text-[#8A8A8A]">
                  We operate on six uncompromising pillars. These principles guide our design, material selection, and final execution-ensuring every home is built to our exacting standards.
                </p>
              </div>
            </div>

            <div className="lg:w-7/12">
              <div className="flex flex-col">
                {[
                  { title: "Design That Works", desc: "Creative yet highly practical solutions tailored to your specific lifestyle, ensuring form always follows function." },
                  { title: "Built for Comfort", desc: "Materials and finishes meticulously selected for uncompromised long-term performance and everyday tactile luxury." },
                  { title: "Personalised to You", desc: "We reject cookie-cutter templates. Every home is a distinct reflection of the people actually living in it." },
                  { title: "Transparent & Reliable", desc: "Clear pricing, precisely defined timelines, and zero ambiguity. We respect your investment and your time." },
                  { title: "Global Standards", desc: "Sourcing premium materials and employing modern, international manufacturing techniques for flawless execution." },
                  { title: "Execution You Can Track", desc: "Clear milestones, consistent updates, and absolute full accountability at every single stage of the build." },
                ].map((principle, idx) => (
                  <div key={principle.title} className="group flex flex-col items-start border-t border-[#C8A97E]/20 py-12 transition-colors first:border-t-0 hover:border-[#C8A97E]/60 md:flex-row lg:first:pt-0">
                    <div className="mb-4 md:mb-0 md:w-1/4">
                      <span className="font-playfair text-6xl italic text-[#C8A97E] opacity-30 transition-opacity duration-500 group-hover:opacity-100">
                        0{idx + 1}.
                      </span>
                    </div>

                    <div className="md:w-3/4 md:pl-6">
                      <h4 className="mb-4 font-montserrat text-sm font-medium uppercase tracking-wide-premium text-[#F5F1EC] transition-colors duration-500 group-hover:text-[#C8A97E]">
                        {principle.title}
                      </h4>
                      <p className="font-inter text-[17px] font-light leading-relaxed text-[#8A8A8A] transition-colors duration-500 group-hover:text-[#E6D6C5]">
                        {principle.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </SiteLayout>
  );
}
