import Link from "next/link";

export default function BusinessPage() {
  return (
    <main className="page_business">
      {/* Hero (video placeholder) */}
      <section className="hero">
        <div className="heroInner">
          <h1>Video for businesses</h1>
          <p>Customized solution of robots tailored to your needs</p>
        </div>
      </section>

      {/* Feature strip */}
      <section className="features">
        <div className="container">
          <ul className="featuresList">
            <li><span className="dot" /> Save 80% operating and setup costs compared to traditional robots</li>
            <li><span className="dot" /> Customize and replicate workflow with ML capabilities</li>
            <li><span className="dot" /> Enhance efficiency by up to 50% compared to human workers</li>
            <li><span className="dot" /> Upgrade and reconfigure for new tasks seamlessly</li>
          </ul>
        </div>
      </section>

      {/* Use cases */}
      <section className="useCases">
        <div className="container">
          <h2>Explore Use Cases</h2>
          <div className="cards">
            {[
              { title: "Material Transport", href: "/use-cases/material-transport" },
              { title: "Quality Inspection", href: "/use-cases/quality-inspection" },
              { title: "Assembly", href: "/use-cases/assembly" },
              { title: "Plastic Injection", href: "/use-cases/plastic-injection" },
            ].map((c) => (
              <Link key={c.title} href={c.href} className="card">
                <div className="cardMedia" />
                <div className="cardBody">
                  <h3>{c.title}</h3>
                  <span className="learn">learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="trust">
        <div className="container">
          <h2>Trusted by 20+ businesses worldwide</h2>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container">
          <h2>Ready to automate?</h2>
          <Link href="/contact" className="ctaButton">
            Book a Free Demo
          </Link>
        </div>
      </section>
    </main>
  );
}
