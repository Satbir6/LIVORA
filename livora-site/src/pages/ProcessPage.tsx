import { Link } from 'react-router-dom'
import { SiteLayout } from '../components/SiteLayout'
import { galleryImages, processSteps } from '../data/siteContent'

const phaseVisuals = [
  galleryImages.showcase[0],
  galleryImages.showcase[1],
  galleryImages.showcase[2],
  galleryImages.showcase[3],
  galleryImages.showcase[4],
]

const stageHighlights = [
  ['Discovery Call', 'Site Context Mapping'],
  ['Layout Strategy', 'Material Direction'],
  ['Finish Selection', 'Budget Alignment'],
  ['Factory Precision', 'On-site Coordination'],
  ['Quality Sign-off', 'Move-in Readiness'],
]

export function ProcessPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
        <div className="absolute inset-0">
          <img src={galleryImages.process} alt="Livora process hero" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-livora-ink/90 via-livora-ink/70 to-livora-ink/30" />
        </div>

        <div className="relative mx-auto grid max-w-[1400px] items-end gap-10 lg:grid-cols-12">
          <div className="hero-panel border-white/20 bg-white/10 text-white lg:col-span-8">
            <span className="section-kicker text-livora-gold">Our Process</span>
            <h1 className="mb-6 text-5xl leading-[0.97] text-white sm:text-7xl">
              A clear, staged journey
              <br />
              <span className="font-normal italic">from concept to handover.</span>
            </h1>
            <p className="max-w-2xl text-lg font-light leading-relaxed text-white/85 sm:text-xl">
              Every Livora project follows a structured framework so you know what happens next, who owns it, and when it gets delivered.
            </p>
          </div>

          <div className="rounded-[1.6rem] border border-white/20 bg-white/10 p-6 text-white backdrop-blur-sm lg:col-span-4">
            <p className="font-subheading text-[0.66rem] uppercase tracking-[0.2em] text-livora-gold">Typical Timeline</p>
            <p className="mt-3 font-heading text-5xl leading-none">45-60</p>
            <p className="mt-1 text-sm uppercase tracking-[0.14em] text-white/85">Days</p>
            <div className="mt-6 space-y-2 text-sm text-white/80">
              <p>5 clearly defined stages</p>
              <p>Weekly progress checkpoints</p>
              <p>Milestone-based approvals</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-8">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-12 max-w-2xl">
            <span className="section-kicker">Step by Step</span>
            <h2 className="text-4xl sm:text-6xl">Five phases. One coordinated execution plan.</h2>
          </div>

          <div className="space-y-6">
            {processSteps.map(([title, desc], index) => {
              const serial = String(index + 1).padStart(2, '0')
              const reverse = index % 2 === 1

              return (
                <article key={title} className="surface-card grid grid-cols-1 overflow-hidden p-0 lg:grid-cols-12">
                  <div className={`relative lg:col-span-7 ${reverse ? 'lg:order-2' : ''}`}>
                    <img src={phaseVisuals[index]} alt={title} className="h-[320px] w-full object-cover sm:h-[380px]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-livora-ink/65 via-livora-ink/20 to-transparent" />
                    <div className="absolute left-6 top-6 rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs font-subheading uppercase tracking-[0.16em] text-white backdrop-blur-sm">
                      Stage {serial}
                    </div>
                  </div>

                  <div className={`p-7 sm:p-9 lg:col-span-5 ${reverse ? 'lg:order-1' : ''}`}>
                    <p className="font-subheading text-[0.66rem] uppercase tracking-[0.2em] text-livora-brown">Phase {serial}</p>
                    <h3 className="mt-3 text-3xl text-livora-blue">{title}</h3>
                    <p className="mt-4 text-livora-grey">{desc}</p>

                    <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {stageHighlights[index].map((tag) => (
                        <p key={tag} className="rounded-full border border-livora-blue/15 bg-livora-light px-4 py-2 text-[0.65rem] font-subheading uppercase tracking-[0.12em] text-livora-blue">
                          {tag}
                        </p>
                      ))}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section-shell pt-10">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-livora-ink p-8 text-white sm:p-12">
          <div className="mb-10 max-w-2xl">
            <span className="section-kicker text-livora-gold">Project Promise</span>
            <h2 className="text-4xl text-white sm:text-5xl">You always know where your project stands.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {['Transparent Milestones', 'Dedicated Coordination', 'On-time Delivery Focus'].map((item) => (
              <article key={item} className="rounded-2xl border border-white/15 bg-white/5 p-6">
                <p className="font-subheading text-[0.68rem] uppercase tracking-[0.15em] text-livora-gold">{item}</p>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-full border border-livora-gold bg-livora-gold px-8 py-3.5 font-subheading text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-livora-ink transition-all hover:-translate-y-0.5 hover:bg-white"
            >
              Start Your Project
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center justify-center rounded-full border border-white/25 px-8 py-3.5 font-subheading text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-livora-ink"
            >
              Explore The Brand
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
