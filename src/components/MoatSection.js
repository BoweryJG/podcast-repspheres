import React from 'react';

export default function MoatSection() {
  return (
    <section className="moat-section section" id="exclusivity">
      <div className="container">
        <h2 className="section-title">The Strategic Moat – Exclusive Licensing</h2>
        <span className="section-title-underline"></span>
        <div className="moat-cards">
          <div className="card">
            <div className="card-icon">🔒</div>
            <h3 className="card-title">Limited Distribution</h3>
            <p className="card-content">This system isn't mass distributed. It's reserved for elite teams who understand the power of true exclusivity.</p>
          </div>
          <div className="card">
            <div className="card-icon">🛡️</div>
            <h3 className="card-title">Vertical Protection</h3>
            <p className="card-content">One team per vertical. One license per region. That's how moats are built and competitive advantages are maintained.</p>
          </div>
          <div className="card">
            <div className="card-icon">🧬</div>
            <h3 className="card-title">Proprietary Advantage</h3>
            <p className="card-content">While competitors struggle with generic messaging, your team operates with psychological precision that can't be replicated.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
