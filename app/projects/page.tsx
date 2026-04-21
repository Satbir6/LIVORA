import SiteLayout from "@/components/SiteLayout";

export default function ProjectsPage() {
  return (
    <SiteLayout>
      <section>
        <h1 className="text-4xl font-bold text-[var(--secondary)] md:text-5xl">Projects</h1>
        <p className="mt-5 max-w-3xl">
          Curated project showcases will be listed here with complete details on scope, timeline, and delivered outcomes.
        </p>
      </section>
    </SiteLayout>
  );
}
