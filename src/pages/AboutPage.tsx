import { Link } from 'react-router-dom'
import { missionPillars, stats } from '../data/siteContent'

const brandJourney = [
  {
    phase: '01',
    title: 'Observation First',
    text: 'We began by studying what homeowners struggled with: beautiful spaces that failed in daily use.',
  },
  {
    phase: '02',
    title: 'Systems Approach',
    text: 'Our studio shifted from decorative thinking to complete interior systems planned for real routines.',
  },
  {
    phase: '03',
    title: 'Precision Delivery',
    text: 'Today, Livora combines premium materials, process control, and project accountability from start to finish.',
  },
]

const distinctionPillars = [
  'Design + Function Balance',
  'Transparent Quotations',
  'Factory-grade Precision',
  'Smart Space Utilization',
  'Dedicated Project Tracking',
  'After-handover Assistance',
]

export function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden px-5 pb-14 pt-10 sm:px-8 sm:pt-14">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1617103996702-96ff29b1c467?auto=format&fit=crop&q=80&w=2200"
            alt="Livora brand background"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-livora-ink/90 via-livora-ink/65 to-livora-ink/30" />
        </div>

        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="hero-panel border-white/20 bg-white/10 text-white lg:col-span-7">
              <span className="section-kicker text-livora-gold">The Brand</span>
              <h1 className="mb-6 text-5xl leading-[0.97] text-white sm:text-7xl">
                Interiors that feel
                <br />
                <span className="font-normal italic">intentional, useful, and timeless.</span>
              </h1>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-white/85 sm:text-xl">
                Livora was created to solve a simple gap: most homes were forced to choose between good looks and day-to-day practicality. Our work blends
                both through engineered interior systems.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-livora-gold bg-livora-gold px-8 py-3.5 font-subheading text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-livora-ink transition-all hover:-translate-y-0.5 hover:bg-white"
                >
                  Start a Project
                </Link>
                <Link
                  to="/process"
                  className="inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-3.5 font-subheading text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-livora-ink"
                >
                  See Our Process
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-5">
              {stats.map((item) => (
                <article key={item.label} className="rounded-2xl border border-white/20 bg-white/10 p-4 text-white backdrop-blur-sm sm:p-6">
                  <p className="font-heading text-4xl leading-none text-livora-gold sm:text-5xl">{item.value}</p>
                  <p className="mt-2 text-[0.68rem] font-subheading uppercase tracking-[0.12em] text-white/85 sm:text-[0.72rem]">{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-12">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 max-w-2xl">
            <span className="section-kicker">Our Journey</span>
            <h2 className="text-4xl sm:text-6xl">How the Livora philosophy was shaped</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {brandJourney.map((item) => (
              <article key={item.phase} className="surface-card p-7 sm:p-8">
                <p className="font-heading text-6xl leading-none text-livora-brown/35">{item.phase}</p>
                <h3 className="mt-5 text-2xl text-livora-blue">{item.title}</h3>
                <p className="mt-3 text-livora-grey">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <span className="section-kicker">Core Principles</span>
              <h2 className="text-4xl sm:text-6xl">Every project follows the same quality framework</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-livora-grey sm:text-base">
              We optimize for livability, durability, and elegant detailing while keeping communication and timelines clear.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {missionPillars.map((pillar, index) => (
              <article key={pillar.title} className="surface-card p-7">
                <p className="mb-3 font-subheading text-[0.65rem] uppercase tracking-[0.14em] text-livora-brown">Principle 0{index + 1}</p>
                <h3 className="text-xl text-livora-blue">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-livora-grey">{pillar.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-10">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-livora-ink p-8 text-white sm:p-12">
          <div className="mb-10 max-w-2xl">
            <span className="section-kicker text-livora-gold">The Livora Distinction</span>
            <h2 className="text-4xl text-white sm:text-5xl">What clients feel through the Livora experience</h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {distinctionPillars.map((item) => (
              <div key={item} className="rounded-2xl border border-white/15 bg-white/5 p-5">
                <p className="font-subheading text-[0.69rem] uppercase tracking-[0.15em] text-livora-gold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-28 pt-12">
        <div className="mx-auto max-w-[1100px] rounded-[2rem] border border-livora-blue/10 bg-white/80 p-8 text-center shadow-soft backdrop-blur-sm sm:p-12">
          <h2 className="text-4xl sm:text-6xl">Ready to shape your home around how you live?</h2>
          <p className="mx-auto mt-5 max-w-2xl text-livora-grey">
            Speak with our design team to map scope, visual direction, and practical execution before you begin.
          </p>

        </div>
      </section>
    </>
  )
}
