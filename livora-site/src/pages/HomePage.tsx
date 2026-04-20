import { Link } from 'react-router-dom'
import { SiteLayout } from '../components/SiteLayout'
import { Button } from '../components/ui/Button'
import { serviceGalleryStockImages, serviceStockImages, services, stats, testimonials, whyChooseUs } from '../data/siteContent'

export function HomePage() {
  return (
    <SiteLayout>
      <section className="relative min-h-[90vh] overflow-hidden px-5 py-16 sm:px-8">
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center"
          style={{
            backgroundImage:
              "linear-gradient(102deg, rgba(18,35,48,0.82), rgba(18,35,48,0.24)), url('/images/Hero.jpg')",
          }}
        />
        <div className="spot-grid absolute inset-0 opacity-25" />
        <div className="relative mx-auto flex min-h-[80vh] max-w-[1400px] items-center">
          <div className="hero-panel max-w-3xl text-white">
            <span className="section-kicker text-livora-gold">Bespoke Interior Systems</span>
            <h1 className="mb-7 text-5xl font-semibold leading-[0.96] text-white sm:text-6xl lg:text-8xl">
              Premium Interiors
              <br />
              <span className="font-normal italic">Designed to Be Lived In</span>
            </h1>
            <p className="mb-10 max-w-2xl text-lg font-light leading-relaxed text-white/85 sm:text-xl">
              Thoughtfully engineered spaces that blend visual sophistication, comfort, and function, tailored to your lifestyle and budget.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link to="/contact">
                <Button className="w-full px-8 py-3.5 sm:w-auto">Get Free Consultation</Button>
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/60 px-8 py-3.5 text-center font-subheading text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-livora-blue"
              >
                Visit Showroom
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 animate-float">Scroll</div>
      </section>

      <section className="section-shell pt-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="surface-card grid grid-cols-2 gap-4 p-5 sm:grid-cols-4 sm:p-8">
            {stats.map((item) => (
              <div key={item.label} className="rounded-2xl bg-livora-light p-4 text-center sm:p-6">
                <p className="font-heading text-3xl text-livora-blue sm:text-5xl">{item.value}</p>
                <p className="mt-1 text-[0.72rem] font-subheading uppercase tracking-[0.12em] text-livora-grey sm:text-xs">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-16 max-w-2xl">
            <span className="section-kicker">Why Livora</span>
            <h2 className="text-4xl sm:text-6xl">You get more than furniture. You get a complete interior system.</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item) => (
              <article key={item.title} className="surface-card p-7">
                <h3 className="text-2xl">{item.title}</h3>
                <p className="mt-3 text-livora-grey">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-xl">
              <span className="section-kicker">Core Solutions</span>
              <h2 className="text-4xl sm:text-6xl">Built Around Modern Homes</h2>
            </div>
            <div>
              <Link to="/process" className="font-subheading text-xs uppercase tracking-[0.16em] text-livora-blue underline decoration-livora-brown underline-offset-8">
                See Our Process
              </Link>
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <article key={service} className="surface-card overflow-hidden p-0">
                <img
                  src={serviceStockImages[service] ?? serviceGalleryStockImages[index % serviceGalleryStockImages.length]}
                  alt={service}
                  className="h-64 w-full object-cover"
                  loading="lazy"
                />
                <div className="p-6">
                  <h3 className="text-xl text-livora-blue">{service}</h3>
                  <p className="mt-2 text-sm text-livora-grey">Tailored layouts, practical detailing, and premium materials for everyday durability.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-8">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] bg-livora-ink p-8 text-white sm:p-12">
          <span className="section-kicker text-livora-gold">Client Confidence</span>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {testimonials.map((item) => (
              <article key={item.name} className="rounded-2xl border border-white/20 bg-white/5 p-6">
                <p className="text-white/85">"{item.text}"</p>
                <p className="mt-5 font-subheading text-xs uppercase tracking-[0.16em] text-livora-gold">{item.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pb-28 pt-16 text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="mb-6 text-5xl text-livora-blue sm:text-6xl">Start your transformation.</h2>
          <p className="mx-auto mb-10 max-w-xl text-livora-grey">A single consultation can define your layout, budget, and material direction with clarity.</p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex w-full items-center justify-center rounded-full border border-livora-blue/20 px-8 py-3.5 font-subheading text-xs font-semibold uppercase tracking-[0.14em] text-livora-blue transition-colors hover:bg-livora-blue hover:text-white sm:w-auto"
            >
              Visit Pune Showroom
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
