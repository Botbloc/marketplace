
import React from "react";

export default function SellingWithUs() {
  return (
    <main className="sell-page">
      {/* Top hero */}
      <section className="hero">
        <h1>Selling with us</h1>
        <p className="lede">
          Got a great idea or product? Every innovation effort deserves reward. Build components,
          drivers, or functional modules and list them on the BotBloc Marketplace. Reach a greater
          audience across multiple industries and keep up to <strong>90%</strong> of every sale while we handle
          payments, governance, and feature promotion. Free-to-use or open-source works are welcome.
        </p>
        <p className="note">More details will be available soon.</p>
      </section>

      {/* Benefits strip */}
      <section className="benefits">
        <ul className="benefits__list">
          <li>
            <span className="dot" aria-hidden />
            <div>
              <h3>Focus on your expertise</h3>
              <p>Leave the rest of the robot to others.</p>
            </div>
          </li>
          <li>
            <span className="dot" aria-hidden />
            <div>
              <h3>Build with minimal code</h3>
              <p>Develop and test your modules quickly.</p>
            </div>
          </li>
          <li>
            <span className="dot" aria-hidden />
            <div>
              <h3>Transparent data</h3>
              <p>Shape your ideas based on a proven market.</p>
            </div>
          </li>
          <li>
            <span className="dot" aria-hidden />
            <div>
              <h3>Save 80%+ costs</h3>
              <p>We handle marketing and customer outreach.</p>
            </div>
          </li>
        </ul>
      </section>

      {/* How it works */}
      <section className="how">
        <h2>How it works</h2>
        <ol className="steps">
          <li>
            Get a Core and necessary components on our Marketplace.
          </li>
          <li>
            Use our Developer app to set up and test your component or workflows.
          </li>
          <li>
            Submit your files and fill out any necessary information.
          </li>
          <li>
            Wait for compliance check (usually 5–10 working days).
          </li>
          <li>
            Check your listing on our Seller Portal.
          </li>
        </ol>
      </section>

      {/* CTA */}
      <section className="cta">
        <h3>Ready to unleash your market potential?</h3>
        <button className="btn-primary" type="button">Sign up</button>
      </section>
    </main>
  );
}


