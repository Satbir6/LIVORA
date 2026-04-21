import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../components/ui/Button'
import { faqs, processSteps, trustHighlights } from '../data/siteContent'

const inquireHeroImage = 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000'
const inquireDetailImage = 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80&w=1800'

const consultationSchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  phone: z
    .string()
    .regex(/^\d{10}$/, 'Please enter a valid 10-digit phone number'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  projectType: z.string().min(3, 'Please select your project type'),
  budgetRange: z.string().min(3, 'Please select your budget range'),
  message: z.string().min(3, 'Please share a few more details'),
})

type ConsultationForm = z.infer<typeof consultationSchema>

export function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ConsultationForm>()

  const onSubmit = async (data: ConsultationForm) => {
    const validated = consultationSchema.safeParse(data)
    if (!validated.success) {
      validated.error.issues.forEach((issue) => {
        const path = issue.path[0]
        if (typeof path === 'string') {
          setError(path as keyof ConsultationForm, {
            type: 'manual',
            message: issue.message,
          })
        }
      })
      return
    }

    console.log('Consultation request:', data)
    setIsSubmitted(true)
    reset()
  }

  return (
    <>
      <section className="relative overflow-hidden px-5 pb-14 pt-12 sm:px-8 sm:pt-16">
        <div className="absolute inset-0">
          <img src={inquireHeroImage} alt="Inquire hero visual" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-livora-ink/90 via-livora-ink/65 to-livora-ink/35" />
        </div>

        <div className="relative mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="hero-panel border-white/20 bg-white/10 text-white lg:col-span-8">
              <span className="section-kicker text-livora-gold">Inquire</span>
              <h1 className="mb-6 text-5xl leading-[0.97] text-white sm:text-7xl">
                Plan your home with
                <br />
                <span className="font-normal italic">clarity from day one.</span>
              </h1>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-white/85 sm:text-xl">
                Share your needs, budget, and project scope. Our design team will map the right interior direction before execution begins.
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <a href="#inquire-form" className="inline-flex items-center justify-center rounded-full border border-livora-gold bg-livora-gold px-8 py-3.5 font-subheading text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-livora-ink transition-all hover:-translate-y-0.5 hover:bg-white">
                  Submit Inquiry
                </a>
                <Link
                  to="/process"
                  className="inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-3.5 font-subheading text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-livora-ink"
                >
                  See Delivery Process
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1 lg:col-span-4">
              {trustHighlights.slice(0, 3).map((item) => (
                <article key={item} className="rounded-2xl border border-white/20 bg-white/10 p-5 text-white backdrop-blur-sm">
                  <p className="font-subheading text-[0.67rem] uppercase tracking-[0.14em] text-livora-gold">{item}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="inquire-form" className="section-shell pt-10">
        <div className="mx-auto grid max-w-[1400px] gap-8 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-4">
            <div className="surface-card p-6">
              <h3 className="text-2xl text-livora-blue">What happens after inquiry?</h3>
              <div className="mt-6 space-y-5">
                {processSteps.slice(0, 3).map(([title, desc], index) => (
                  <article key={title} className="rounded-2xl border border-livora-blue/10 bg-livora-light p-4">
                    <p className="font-subheading text-[0.62rem] uppercase tracking-[0.16em] text-livora-brown">Step 0{index + 1}</p>
                    <p className="mt-2 font-subheading text-[0.74rem] uppercase tracking-[0.12em] text-livora-blue">{title}</p>
                    <p className="mt-2 text-sm text-livora-grey">{desc}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="surface-card p-6">
              <h4 className="mb-3 font-subheading text-[0.67rem] font-semibold uppercase tracking-[0.2em] text-livora-blue">Visit The Studio</h4>
              <p className="text-sm leading-relaxed text-livora-grey">
                Office No. 817, Solitaire Business Hub,
                <br />
                Baner, Pune, MH 411045
              </p>
              <p className="mt-4 text-sm leading-relaxed text-livora-grey">
                M: 7887898925
                <br />
                E: concierge@livora.in
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-[2rem] border border-livora-blue/10 bg-white/95 shadow-soft">
              <div className="bg-livora-ink p-7 text-white sm:p-9">
                <p className="font-subheading text-[0.64rem] uppercase tracking-[0.2em] text-livora-gold">Consultation Form</p>
                <h2 className="mt-3 text-3xl text-white sm:text-4xl">Tell us about your project</h2>
                <p className="mt-3 max-w-2xl text-sm text-white/75 sm:text-base">
                  The more context you share, the better we can prepare a design direction and realistic budget conversation.
                </p>
              </div>

              <form className="space-y-7 p-7 sm:p-9" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="block font-subheading text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-livora-blue">Full Name</span>
                    <input className="w-full rounded-xl border border-livora-blue/15 bg-white px-4 py-3" {...register('fullName')} />
                    {errors.fullName ? <span className="block text-sm text-red-600">{errors.fullName.message}</span> : null}
                  </label>

                  <label className="space-y-2">
                    <span className="block font-subheading text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-livora-blue">Mobile</span>
                    <input className="w-full rounded-xl border border-livora-blue/15 bg-white px-4 py-3" {...register('phone')} />
                    {errors.phone ? <span className="block text-sm text-red-600">{errors.phone.message}</span> : null}
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <label className="space-y-2">
                    <span className="block font-subheading text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-livora-blue">Project Type</span>
                    <select className="w-full rounded-xl border border-livora-blue/15 bg-white px-4 py-3" defaultValue="" {...register('projectType')}>
                      <option value="" disabled>
                        Select
                      </option>
                      <option>Full Home</option>
                      <option>Kitchen System</option>
                      <option>Wardrobe System</option>
                      <option>Storage + Utility</option>
                    </select>
                    {errors.projectType ? <span className="block text-sm text-red-600">{errors.projectType.message}</span> : null}
                  </label>

                  <label className="space-y-2">
                    <span className="block font-subheading text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-livora-blue">Investment Range</span>
                    <select className="w-full rounded-xl border border-livora-blue/15 bg-white px-4 py-3" defaultValue="" {...register('budgetRange')}>
                      <option value="" disabled>
                        Select
                      </option>
                      <option>5 - 10 Lakhs</option>
                      <option>10 - 20 Lakhs</option>
                      <option>20 - 35 Lakhs</option>
                      <option>35 Lakhs +</option>
                    </select>
                    {errors.budgetRange ? <span className="block text-sm text-red-600">{errors.budgetRange.message}</span> : null}
                  </label>
                </div>

                <label className="space-y-2">
                  <span className="block font-subheading text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-livora-blue">Email</span>
                  <input className="w-full rounded-xl border border-livora-blue/15 bg-white px-4 py-3" {...register('email')} />
                  {errors.email ? <span className="block text-sm text-red-600">{errors.email.message}</span> : null}
                </label>

                <label className="space-y-2">
                  <span className="block font-subheading text-[0.65rem] font-semibold uppercase tracking-[0.13em] text-livora-blue">Project Brief</span>
                  <textarea rows={5} className="w-full resize-none rounded-xl border border-livora-blue/15 bg-white px-4 py-3" {...register('message')} />
                  {errors.message ? <span className="block text-sm text-red-600">{errors.message.message}</span> : null}
                </label>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-xs uppercase tracking-[0.12em] text-livora-grey">Response time: within 24 hours</p>
                  <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                    {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                  </Button>
                </div>
              </form>

              {isSubmitted ? (
                <div className="mx-7 mb-7 rounded-xl bg-livora-brown/10 p-4 text-center text-sm font-medium tracking-wide text-livora-brown sm:mx-9 sm:mb-9">
                  Thank you. An interior concierge will contact you within 24 hours.
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-8">
        <div className="mx-auto grid max-w-[1400px] gap-5 lg:grid-cols-12">
          <div className="overflow-hidden rounded-[2rem] border border-livora-blue/10 bg-white shadow-soft lg:col-span-6">
            <img
              src={inquireDetailImage}
              alt="Interior detail"
              className="h-[340px] w-full object-cover sm:h-[420px] lg:h-full lg:min-h-[560px]"
              loading="lazy"
            />
          </div>
          <div className="rounded-[2rem] bg-livora-ink p-6 text-white sm:p-8 lg:col-span-6">
            <span className="section-kicker text-livora-gold">Frequently Asked</span>
            <h3 className="text-2xl leading-tight text-white sm:text-3xl">What clients ask before getting started</h3>
            <div className="mt-5 space-y-3">
              {faqs.slice(0, 3).map((faq) => (
                <article key={faq.question} className="rounded-xl border border-white/15 bg-white/5 p-3.5 sm:p-4">
                  <p className="font-subheading text-[0.66rem] uppercase tracking-[0.12em] text-livora-gold">{faq.question}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/80">{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
