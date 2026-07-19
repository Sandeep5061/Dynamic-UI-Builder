import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../Styles/homepage.css';

const features = [
  {
    title: 'Drag-and-drop form building',
    description: 'Create reusable sections with text fields, dropdowns, dates, choices, and action buttons without writing code.',
  },
  {
    title: 'Metadata-first templates',
    description: 'Every screen is saved as structured JSON so teams can version, audit, and regenerate user interfaces quickly.',
  },
  {
    title: 'Data collection workflows',
    description: 'Publish templates, collect records, and review submitted data from one simple workspace.',
  },
];

const steps = ['Design sections', 'Save templates', 'Collect submissions'];

const MainPage = () => {
  return (
    <div className="marketing-page">
      <Navbar />

      <main className="hero-shell">
        <section className="hero-content" aria-labelledby="hero-title">
          <p className="eyebrow">No-code internal tool builder</p>
          <h1 id="hero-title">Launch custom data apps from reusable form templates.</h1>
          <p className="hero-copy">
            Dynamic UI Builder turns form metadata into production-ready workflows for operations,
            HR, field teams, and support teams that need useful apps fast.
          </p>

          <div className="hero-actions">
            <Link className="primary-cta" to="/create">Start building</Link>
            <Link className="secondary-cta" to="/view">View sections</Link>
          </div>

          <dl className="proof-strip" aria-label="Product highlights">
            <div>
              <dt>3x</dt>
              <dd>faster workflow setup</dd>
            </div>
            <div>
              <dt>0</dt>
              <dd>code required</dd>
            </div>
            <div>
              <dt>JSON</dt>
              <dd>portable template output</dd>
            </div>
          </dl>
        </section>

        <section className="product-card" aria-label="Workflow preview">
          <div className="card-header">
            <span className="status-dot" />
            <span>Template pipeline</span>
          </div>
          <ol className="workflow-list">
            {steps.map((step, index) => (
              <li key={step}>
                <span>{index + 1}</span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
          <div className="json-preview">
            <code>{'{ "component": "dropdown", "required": true }'}</code>
          </div>
        </section>
      </main>

      <section className="feature-grid" aria-label="Core capabilities">
        {features.map((feature) => (
          <article className="feature-card" key={feature.title}>
            <h2>{feature.title}</h2>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default MainPage;
