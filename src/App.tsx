import { useEffect, useState } from 'react';
import BackgroundScene from './components/BackgroundScene';

const resumeUrl = '/Rohit_Panwar_MnG_AzureDevOps.pdf';

const skills = [
  'Azure DevOps',
  'GitHub Actions',
  'Terraform',
  'AKS',
  'ARM Templates',
  'Azure Policy',
  'Azure Monitor',
];

const sections = [
  { id: 'story', label: 'Story' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
];

const storyCards = [
  {
    title: 'Architect Azure Platforms',
    description:
      'Design modular landing zones, secure networking and governance frameworks that support enterprise workloads with drift-free infrastructure as code.',
  },
  {
    title: 'Automate with Confidence',
    description:
      'Build GitHub Actions and Azure DevOps pipelines that deploy reliably across Dev, UAT and Production while enforcing approvals, security, and traceability.',
  },
  {
    title: 'Operate at Scale',
    description:
      'Enable observability, cost management and policy-driven cloud controls that keep production stable, secure, and business-ready.',
  },
];

const roles = [
  {
    title: 'Senior Azure DevOps & Cloud Engineer',
    company: 'Capgemini Technology India Services Limited',
    date: 'Dec 2025 – Present',
    bullets: [
      'Designed resilient Terraform-based landing zones and modular IaC for secure enterprise Azure platforms.',
      'Built Azure DevOps and GitHub Actions pipelines to automate deployment, governance, and release controls.',
      'Optimized AKS, App Services, and serverless solutions with monitoring, security, and cost management.',
    ],
  },
  {
    title: 'Technical Azure Consultant',
    company: 'Sonata Software Limited (Customer: Microsoft)',
    date: 'Oct 2018 – Nov 2025',
    bullets: [
      'Implemented enterprise governance with Azure Policy, RBAC, landing zones, and resource tagging.',
      'Delivered cloud migrations and platform modernisation using AKS, ACR, and hybrid networking.',
      'Enabled observability with Azure Monitor, Application Insights, and Sentinel for production reliability.',
    ],
  },
];

const certifications = [
  'AZ-305 Azure Solutions Architect Expert',
  'AZ-102 Designing and Implementing an Azure AI Solution',
  'AZ-104 Azure Administrator',
];

function App() {
  const [activeSection, setActiveSection] = useState('story');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45 },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app-shell">
      <BackgroundScene />
      <nav className="section-nav">
        {sections.map((section) => (
          <button
            key={section.id}
            type="button"
            className={activeSection === section.id ? 'active' : ''}
            onClick={() => scrollToSection(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <header className="hero-panel glow-panel hero-story">
        <div className="hero-copy">
          <p className="eyebrow">Azure DevOps & Cloud Platform Engineer</p>
          <h1>Rohit Panwar</h1>
          <p className="hero-description">
            I create immersive cloud stories for enterprises by designing secure Azure infrastructure, automating pipelines, and governing platforms so teams can deliver faster with confidence.
          </p>
          <div className="kpi-grid">
            <div>
              <span>8.4+</span>
              <p>Years of experience</p>
            </div>
            <div>
              <span>3</span>
              <p>Azure certifications</p>
            </div>
            <div>
              <span>Enterprise</span>
              <p>Financial services clients</p>
            </div>
          </div>
          <div className="hero-actions">
            <a className="button button-primary" href={resumeUrl} download>
              Download Resume
            </a>
            <a className="button button-secondary" href="mailto:rohitpanwar2025@outlook.com">
              Contact Me
            </a>
          </div>
        </div>
        <aside className="hero-card">
          <div className="hero-card__header">
            <span>Connect with Rohit</span>
          </div>
          <div className="hero-card__body">
            <strong>Hyderabad, India</strong>
            <p>rohitpanwar2025@outlook.com</p>
            <p>+91 9929202384</p>
          </div>
        </aside>
      </header>

      <section id="story" className="glass-panel section-intro">
        <p className="section-label">Platform Story</p>
        <h2>Modern Azure architecture brought to life with narrative design and 3D motion.</h2>
        <p>
          This portfolio blends immersive visuals with Rohit's real Azure DevOps journey, showcasing how governance, automation, and cloud reliability create a stronger digital story.
        </p>
      </section>

      <section id="story-cards" className="glass-panel story-panel">
        <div className="story-grid">
          {storyCards.map((card) => (
            <article key={card.title} className="story-card">
              <span className="story-pill">Story</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className="glass-panel">
        <h2>Signature Skills</h2>
        <div className="skill-grid">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>

      <section id="experience" className="glass-panel">
        <h2>Work Experience</h2>
        <div className="timeline">
          {roles.map((role) => (
            <article key={role.title} className="timeline-card">
              <div className="timeline-card__meta">
                <p>{role.company}</p>
                <span>{role.date}</span>
              </div>
              <h3>{role.title}</h3>
              <ul>
                {role.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-panel small-columns">
        <div>
          <h2>Certifications</h2>
          <ul>
            {certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Education</h2>
          <p>Bachelor of Computer Applications (BCA), University of Rajasthan — 2017</p>
        </div>
      </section>

      <section id="contact" className="glass-panel contact-panel">
        <h2>Impact-Driven Cloud Leadership</h2>
        <p>
          I help teams transform Azure operations with governance, DevOps automation, and secure cloud architecture. If you're building enterprise-grade Azure platforms, let's design a resilient, scalable foundation together.
        </p>
        <div className="contact-actions">
          <a className="button button-primary" href={resumeUrl} download>
            Download Resume
          </a>
          <a className="button button-secondary" href="mailto:rohitpanwar2025@outlook.com">
            Send a Message
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;
