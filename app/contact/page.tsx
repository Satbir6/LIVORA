import SiteLayout from "@/components/SiteLayout";

export default function ContactPage() {
  return (
    <SiteLayout>
      <section>
        <h1 className="text-4xl font-bold text-[var(--secondary)] md:text-5xl">Contact</h1>
        <p className="mt-5 max-w-3xl">Phone: +91 90000 00000</p>
        <p className="max-w-3xl">Email: hello@livora.in</p>
        <p className="max-w-3xl">Location: Hyderabad, India</p>
      </section>
    </SiteLayout>
  );
}
