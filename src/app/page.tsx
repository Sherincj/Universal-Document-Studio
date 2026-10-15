import Link from "next/link";

/** Renders the initial application shell and an intentional Phase 01 status view. */
export default function HomePage() {
  return (
    <main className="app-shell">
      <section className="hero">
        <p className="eyebrow">PHASE 01 · FOUNDATION</p>
        <h1>Universal Document Studio</h1>
        <p>
          Create, edit, preview, and export documents from one reliable
          workspace.
        </p>
        <Link className="primary-link" href="/api/health">
          Check system health
        </Link>
      </section>
    </main>
  );
}
