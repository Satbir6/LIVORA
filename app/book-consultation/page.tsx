import SiteLayout from "@/components/SiteLayout";

export default function BookConsultationPage() {
  return (
    <SiteLayout>
      <section className="relative overflow-hidden rounded-3xl bg-[var(--secondary)] p-8 text-white md:p-12">
        <div className="absolute -bottom-16 -right-16 h-52 w-52 rounded-full bg-[var(--muted-gold)]/30 blur-3xl" />
        <h1 className="text-4xl font-bold md:text-5xl">Let&apos;s Design Your Home the Right Way</h1>
        <p className="mt-5 max-w-3xl text-white/90">
          Get expert guidance on layout, materials, budget, and timelines-before you commit.
        </p>
        <ul className="mt-6 space-y-2 text-white/90">
          <li>- Free consultation</li>
          <li>- No obligation</li>
          <li>- Personalised recommendations</li>
        </ul>
        <button className="mt-8 rounded-full bg-[var(--primary)] px-7 py-3 font-medium text-white transition hover:-translate-y-0.5 hover:bg-[var(--muted-gold)]">
          Schedule My Consultation
        </button>
      </section>
    </SiteLayout>
  );
}
