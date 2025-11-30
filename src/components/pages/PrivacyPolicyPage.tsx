import React, { useEffect, useState, useRef } from "react";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  Cookie,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Server
} from "lucide-react";

// --- CSS Styles ---
const styles = `
  :root {
    --c-slate-50: #f8fafc;
    --c-slate-100: #f1f5f9;
    --c-slate-200: #e2e8f0;
    --c-slate-300: #cbd5e1;
    --c-slate-400: #94a3b8;
    --c-slate-500: #64748b;
    --c-slate-600: #475569;
    --c-slate-700: #334155;
    --c-slate-800: #1e293b;
    --c-slate-900: #0f172a;

    --c-amber-50: #fffbeb;
    --c-amber-100: #fef3c7;
    --c-amber-200: #fde68a;
    --c-amber-300: #fcd34d;
    --c-amber-400: #fbbf24;
    --c-amber-500: #f59e0b;
    --c-amber-900: #78350f;

    --c-rose-50: #fff1f2;
    --c-rose-100: #ffe4e6;
    --c-rose-500: #f43f5e;
    --c-rose-600: #e11d48;
    --c-rose-800: #9f1239;

    --c-blue-50: #eff6ff;
    --c-blue-500: #3b82f6;
    --c-blue-600: #2563eb;
    --c-blue-800: #1e40af;

    --c-emerald-50: #ecfdf5;
    --c-emerald-500: #10b981;
    --c-emerald-600: #059669;

    --font-serif: Georgia, Cambria, "Times New Roman", Times, serif;
    --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  * { box-sizing: border-box; }

  .pp-wrapper {
    min-height: 100vh;
    background-color: var(--c-slate-50);
    font-family: var(--font-sans);
    color: var(--c-slate-600);
    padding-bottom: 8rem;
    position: relative;
  }

  /* Background Decor */
  .pp-bg-decor {
    position: fixed;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
  }
  .pp-bg-gradient {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 500px;
    background: linear-gradient(to bottom, #ffffff, transparent);
  }
  .pp-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
  }
  .pp-orb-1 { top: -10%; left: -5%; width: 600px; height: 600px; background-color: var(--c-blue-50); }
  .pp-orb-2 { top: 30%; right: -10%; width: 500px; height: 500px; background-color: var(--c-emerald-50); }

  /* Layout Utilities */
  .pp-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
    z-index: 1;
  }
  .pp-grid-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  @media (min-width: 768px) {
    .pp-grid-layout {
      grid-template-columns: 240px 1fr;
      gap: 3rem;
    }
  }
  @media (min-width: 1024px) {
    .pp-grid-layout {
      grid-template-columns: 280px 1fr;
      gap: 4rem;
    }
  }

  /* Hero Section */
  .pp-hero {
    padding: 5rem 1.5rem 4rem;
    text-align: center;
    max-width: 56rem;
    margin: 0 auto;
  }
  .pp-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.25rem 0.75rem;
    background: white;
    border: 1px solid var(--c-slate-200);
    border-radius: 9999px;
    margin-bottom: 1.5rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--c-slate-500);
  }
  .pp-lock-icon {
    width: 0.75rem; height: 0.75rem;
    color: var(--c-emerald-500);
  }
  .pp-title {
    font-family: var(--font-serif);
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--c-slate-900);
    margin-bottom: 1.5rem;
    line-height: 1.1;
  }
  @media (min-width: 768px) { .pp-title { font-size: 3.5rem; } }

  .pp-lead {
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--c-slate-600);
  }

  /* Navigation Sidebar */
  .pp-nav-wrapper {
    position: sticky;
    top: 1rem;
    z-index: 30;
    background: rgba(255,255,255,0.9);
    backdrop-filter: blur(8px);
    border-bottom: 1px solid var(--c-slate-200);
    padding: 1rem 0;
    margin: 0 -1.5rem 2rem;
  }
  @media (min-width: 768px) {
    .pp-nav-wrapper {
      position: sticky;
      top: 6rem;
      background: transparent;
      backdrop-filter: none;
      border: none;
      padding: 0;
      margin: 0;
      align-self: start;
    }
  }
  .pp-nav-list {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 0 1.5rem;
    scrollbar-width: none;
  }
  .pp-nav-list::-webkit-scrollbar { display: none; }
  @media (min-width: 768px) {
    .pp-nav-list {
      flex-direction: column;
      padding: 0;
    }
  }
  .pp-nav-header {
    display: none;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--c-slate-400);
    margin-bottom: 1rem;
    padding-left: 0.75rem;
  }
  @media (min-width: 768px) { .pp-nav-header { display: block; } }

  .pp-nav-btn {
    display: flex;
    align-items: center;
    width: 100%;
    text-align: left;
    padding: 0.625rem 1rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    border: none;
    background: none;
    cursor: pointer;
    white-space: nowrap;
    transition: all 0.2s;
    position: relative;
    color: var(--c-slate-600);
  }
  .pp-nav-btn:hover {
    background-color: var(--c-slate-100);
    color: var(--c-slate-900);
  }
  .pp-nav-btn.active {
    background-color: var(--c-emerald-50);
    color: var(--c-emerald-600);
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    border: 1px solid var(--c-emerald-500);
  }
  .pp-nav-dot {
    width: 6px; height: 6px;
    background-color: var(--c-emerald-500);
    border-radius: 50%;
    position: absolute;
    left: 8px;
    transform: scale(0);
    transition: transform 0.3s;
  }
  .pp-nav-btn.active .pp-nav-dot { transform: scale(1); }
  .pp-nav-text { margin-left: 0; transition: margin 0.2s; }
  .pp-nav-btn.active .pp-nav-text { margin-left: 0.5rem; }

  /* Content Sections */
  .pp-content-col { display: flex; flex-direction: column; gap: 5rem; }
  .pp-section-offset { scroll-margin-top: 8rem; }

  /* Cards */
  .pp-card {
    background: white;
    border-radius: 1rem;
    border: 1px solid var(--c-slate-200);
    padding: 1.5rem;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    transition: box-shadow 0.3s;
  }
  .pp-card:hover { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
  
  /* Summary Grid */
  .pp-summary-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  @media (min-width: 640px) { .pp-summary-grid { grid-template-columns: 1fr 1fr; } }
  
  .pp-summary-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: white;
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid var(--c-slate-100);
  }
  .pp-icon-box { padding: 0.75rem; border-radius: 0.5rem; display: flex; }
  .pp-icon-box.blue { background: var(--c-blue-50); color: var(--c-blue-600); }
  .pp-icon-box.amber { background: var(--c-amber-50); color: var(--c-amber-500); }
  .pp-icon-box.emerald { background: var(--c-emerald-50); color: var(--c-emerald-600); }
  .pp-icon-box.slate { background: var(--c-slate-100); color: var(--c-slate-600); }

  /* Main Policy Box */
  .pp-policy-box {
    background: white;
    border: 1px solid var(--c-slate-200);
    border-radius: 1rem;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
  }
  @media (min-width: 768px) { .pp-policy-box { padding: 2.5rem; } }
  .pp-accent-bar {
    position: absolute;
    top: 0; left: 0; bottom: 0; width: 4px;
  }
  .pp-accent-bar.slate { background-color: var(--c-slate-400); }
  .pp-accent-bar.emerald { background-color: var(--c-emerald-500); }

  .pp-header-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
  .pp-h2 { font-size: 1.5rem; font-weight: 700; color: var(--c-slate-900); margin: 0; }
  .pp-h3 { font-size: 1.125rem; font-weight: 600; color: var(--c-slate-800); margin: 1.5rem 0 0.5rem 0; }
  
  .pp-prose p { margin-bottom: 1.25rem; line-height: 1.6; }
  .pp-prose strong { color: var(--c-slate-900); font-weight: 600; }
  
  /* Feature Grid (for data types) */
  .pp-feature-grid {
    display: grid;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  @media (min-width: 640px) { .pp-feature-grid { grid-template-columns: repeat(2, 1fr); } }
  
  .pp-feature-card {
    background-color: var(--c-slate-50);
    border: 1px solid var(--c-slate-200);
    border-radius: 0.75rem;
    padding: 1rem;
  }
  .pp-feature-icon { margin-bottom: 0.5rem; color: var(--c-slate-500); }
  .pp-feature-title { font-weight: 600; color: var(--c-slate-900); font-size: 0.875rem; margin-bottom: 0.25rem; }
  .pp-feature-desc { font-size: 0.8125rem; color: var(--c-slate-500); margin: 0; }

  /* Cookie List */
  .pp-cookie-list { display: flex; flex-direction: column; gap: 0.75rem; }
  .pp-cookie-item {
    display: flex; gap: 1rem;
    padding: 1rem;
    border-radius: 0.75rem;
    background: var(--c-blue-50);
    border: 1px solid var(--c-blue-500);
    border-left-width: 4px;
  }
  .pp-cookie-item.optional {
    background: var(--c-slate-50);
    border-color: var(--c-slate-300);
  }

  /* List Styling */
  .pp-list { display: flex; flex-direction: column; gap: 0.75rem; }
  .pp-list-item { display: flex; gap: 0.75rem; align-items: start; }
  .pp-bullet { color: var(--c-emerald-500); flex-shrink: 0; margin-top: 4px; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

  /* Simple Sections */
  .pp-simple-section {
    padding-left: 1.5rem;
    border-left: 2px solid var(--c-slate-200);
    position: relative;
  }
  .pp-timeline-dot {
    position: absolute; left: -9px; top: 0;
    width: 1rem; height: 1rem;
    border-radius: 50%;
    background: var(--c-slate-400);
    box-shadow: 0 0 0 4px white;
  }
  .pp-timeline-dot.emerald { background: var(--c-emerald-500); }

  /* Contact Section */
  .pp-contact-wrapper {
    background: linear-gradient(135deg, var(--c-slate-900), var(--c-slate-800));
    color: white;
    padding: 2rem;
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
  }
  @media (min-width: 768px) { .pp-contact-wrapper { padding: 3rem; } }
  .pp-contact-grid {
    display: grid; gap: 2.5rem; position: relative; z-index: 10;
  }
  @media (min-width: 768px) { .pp-contact-grid { grid-template-columns: 1fr 1fr; align-items: center; } }
  
  .pp-contact-item { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
  .pp-contact-icon {
    width: 2.5rem; height: 2.5rem;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px);
  }
  .pp-contact-link { color: white; text-decoration: none; font-weight: 500; transition: color 0.2s; }
  .pp-contact-link:hover { color: var(--c-emerald-300); }
  
  .pp-info-card {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 0.75rem;
    padding: 1.5rem;
  }

  /* Animation Classes */
  .fade-wrapper {
    transition: all 0.7s ease-out;
  }
  .fade-hidden { opacity: 0; transform: translateY(2rem); }
  .fade-visible { opacity: 1; transform: translateY(0); }
`;

// --- Configuration ---
const SECTIONS = [
  { id: "collection", label: "Information We Collect" },
  { id: "usage", label: "How We Use Data" },
  { id: "sharing", label: "Sharing & Disclosure" },
  { id: "cookies", label: "Cookies Policy" },
  { id: "rights", label: "Your Rights" },
  { id: "contact", label: "Contact Us" },
];

// --- Sub-Components ---

const FadeIn = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`fade-wrapper ${isVisible ? "fade-visible" : "fade-hidden"}`}
    >
      {children}
    </div>
  );
};

const TableOfContents = ({ activeSection, onNavigate }) => {
  return (
    <nav className="pp-nav-wrapper">
      <div className="pp-nav-header">Policy Sections</div>
      <div className="pp-nav-list">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`pp-nav-btn ${activeSection === section.id ? "active" : ""}`}
          >
            <span className="pp-nav-dot" />
            <span className="pp-nav-text">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

// --- Main Component ---

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("collection");

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    
    const offset = 100; 
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    setActiveSection(id);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: [0.3, 0.6], rootMargin: "-20% 0px -50% 0px" }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{styles}</style>
      <div className="pp-wrapper">
        
        {/* --- Decorative Background --- */}
        <div className="pp-bg-decor">
          <div className="pp-bg-gradient" />
          <div className="pp-orb pp-orb-1" />
          <div className="pp-orb pp-orb-2" />
        </div>

        {/* --- Hero Section --- */}
        <header className="pp-hero">
          <FadeIn>
            <div className="pp-badge">
              <Lock className="pp-lock-icon" />
              <span>Your Trust is Our Priority</span>
            </div>
            <h1 className="pp-title">
              Privacy Policy
            </h1>
            <p className="pp-lead">
              We value your privacy as much as we value art. This policy outlines how we collect, protect, and use your personal information.
            </p>
          </FadeIn>
        </header>

        {/* --- Main Content Layout --- */}
        <main className="pp-container">
          <div className="pp-grid-layout">
            
            {/* Sidebar Navigation */}
            <aside>
              <TableOfContents 
                activeSection={activeSection} 
                onNavigate={scrollToSection} 
              />
            </aside>

            {/* Content Column */}
            <div className="pp-content-col">
              
              {/* Quick Summary Grid */}
              <FadeIn>
                <div className="pp-summary-grid">
                  {[
                    { icon: Shield, title: "Secure Data", desc: "Encrypted transmission", theme: "emerald" },
                    { icon: Eye, title: "Transparent", desc: "No hidden tracking", theme: "blue" },
                    { icon: AlertCircle, title: "No Spam", desc: "Only relevant updates", theme: "amber" },
                    { icon: CheckCircle2, title: "Control", desc: "Your data, your rights", theme: "slate" },
                  ].map((item, idx) => (
                    <div key={idx} className="pp-summary-item pp-card">
                      <div className={`pp-icon-box ${item.theme}`}>
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h3 style={{ fontWeight: 600, margin: 0, color: "var(--c-slate-900)" }}>{item.title}</h3>
                        <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--c-slate-500)" }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>

              {/* SECTION 1: Information Collection */}
              <section id="collection" className="pp-section-offset">
                <FadeIn>
                  <div className="pp-policy-box">
                    <div className="pp-accent-bar emerald" />
                    <div className="pp-header-row">
                      <FileText size={24} color="var(--c-emerald-500)" />
                      <h2 className="pp-h2">Information We Collect</h2>
                    </div>
                    
                    <div className="pp-prose">
                      <p>
                        We collect only the information necessary to provide you with a seamless art buying experience. This includes:
                      </p>
                      
                      <div className="pp-feature-grid">
                        <div className="pp-feature-card">
                          <div className="pp-feature-icon"><CheckCircle2 size={18} /></div>
                          <div className="pp-feature-title">Identity Data</div>
                          <p className="pp-feature-desc">Name, username, or similar identifiers to manage your account.</p>
                        </div>
                        <div className="pp-feature-card">
                          <div className="pp-feature-icon"><Mail size={18} /></div>
                          <div className="pp-feature-title">Contact Data</div>
                          <p className="pp-feature-desc">Email address, billing address, and delivery address for shipping.</p>
                        </div>
                        <div className="pp-feature-card">
                          <div className="pp-feature-icon"><Lock size={18} /></div>
                          <div className="pp-feature-title">Payment Data</div>
                          <p className="pp-feature-desc">Processed securely via third-party gateways. We do not store card details.</p>
                        </div>
                        <div className="pp-feature-card">
                          <div className="pp-feature-icon"><Server size={18} /></div>
                          <div className="pp-feature-title">Technical Data</div>
                          <p className="pp-feature-desc">IP address, browser type, and device info to improve website performance.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* SECTION 2: Usage */}
              <section id="usage" className="pp-section-offset">
                <FadeIn>
                  <div className="pp-simple-section">
                    <div className="pp-timeline-dot emerald" />
                    <h2 className="pp-h2" style={{ marginBottom: "1.5rem" }}>How We Use Data</h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                      Your information is used strictly to fulfill our contract with you and improve our services:
                    </p>
                    <div className="pp-list">
                      {[
                        "To process and deliver your artwork orders.",
                        "To manage payments, fees, and charges.",
                        "To communicate with you regarding your order status.",
                        "To improve our website functionality and customer service.",
                        "To send promotional emails (only if you have opted in)."
                      ].map((item, i) => (
                        <div key={i} className="pp-list-item">
                          <div className="pp-bullet" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* SECTION 3: Sharing */}
              <section id="sharing" className="pp-section-offset">
                <FadeIn>
                  <div className="pp-policy-box">
                    <div className="pp-accent-bar slate" />
                    <div className="pp-header-row">
                      <Shield size={24} color="var(--c-slate-500)" />
                      <h2 className="pp-h2">Sharing & Disclosure</h2>
                    </div>

                    <div className="pp-prose">
                      <p>
                        We <strong>never sell</strong> your personal data to advertisers. We may share your data with trusted third parties solely for operational purposes:
                      </p>
                      
                      <div className="pp-feature-grid">
                        <div className="pp-feature-card">
                           <div className="pp-feature-title">Logistics Partners</div>
                           <p className="pp-feature-desc">To ensure your artwork is delivered safely to your doorstep.</p>
                        </div>
                        <div className="pp-feature-card">
                           <div className="pp-feature-title">Payment Processors</div>
                           <p className="pp-feature-desc">Secure gateways to handle financial transactions efficiently.</p>
                        </div>
                      </div>
                      <p style={{ fontSize: "0.875rem", color: "var(--c-slate-500)" }}>
                        We require all third parties to respect the security of your personal data and to treat it in accordance with the law.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* SECTION 4: Cookies */}
              <section id="cookies" className="pp-section-offset">
                <FadeIn>
                  <div className="pp-simple-section">
                    <div className="pp-timeline-dot" />
                    <div className="pp-header-row" style={{ marginBottom: "1rem" }}>
                       <Cookie size={24} color="var(--c-slate-600)" />
                       <h2 className="pp-h2">Cookies Policy</h2>
                    </div>
                    <p style={{ marginBottom: "1.5rem" }}>
                      We use cookies to distinguish you from other users and enhance your browsing experience.
                    </p>
                    <div className="pp-cookie-list">
                      <div className="pp-cookie-item">
                        <div>
                          <h4 style={{ margin: "0 0 0.25rem 0", fontWeight: 600, color: "var(--c-blue-800)" }}>Essential Cookies</h4>
                          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--c-blue-700)" }}>
                            Necessary for the website to function, such as remembering items in your shopping cart.
                          </p>
                        </div>
                      </div>
                      <div className="pp-cookie-item optional">
                        <div>
                          <h4 style={{ margin: "0 0 0.25rem 0", fontWeight: 600, color: "var(--c-slate-800)" }}>Analytics Cookies</h4>
                          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--c-slate-600)" }}>
                            Help us understand how visitors interact with the website, allowing us to improve navigation.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </section>

               {/* SECTION 5: Rights */}
               <section id="rights" className="pp-section-offset">
                <FadeIn>
                  <div className="pp-policy-box">
                    <div className="pp-accent-bar emerald" />
                    <h2 className="pp-h2" style={{ marginBottom: "1rem" }}>Your Legal Rights</h2>
                    <div className="pp-prose">
                      <p>Under data protection laws, you have rights including:</p>
                      <div className="pp-list">
                        {[
                          "Request access to your personal data.",
                          "Request correction of your personal data.",
                          "Request erasure of your personal data.",
                          "Object to processing of your personal data.",
                          "Request restriction of processing your personal data.",
                        ].map((item, i) => (
                          <div key={i} className="pp-list-item">
                            <div className="pp-bullet" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* SECTION 6: Contact */}
              <section id="contact" className="pp-section-offset">
                <FadeIn>
                  <div className="pp-contact-wrapper">
                    {/* Abstract shapes */}
                    <div style={{ position: "absolute", top: "-4rem", right: "-4rem", width: "16rem", height: "16rem", background: "rgba(255,255,255,0.05)", borderRadius: "50%", filter: "blur(40px)" }} />
                    <div style={{ position: "absolute", bottom: "-4rem", left: "-4rem", width: "16rem", height: "16rem", background: "rgba(16, 185, 129,0.1)", borderRadius: "50%", filter: "blur(40px)" }} />

                    <div className="pp-contact-grid">
                      <div>
                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.875rem", fontWeight: 700, marginBottom: "1rem" }}>Questions about Privacy?</h2>
                        <p style={{ color: "var(--c-slate-300)", lineHeight: 1.6, marginBottom: "2rem" }}>
                          If you have any questions about this privacy policy or our privacy practices, please contact us.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                          <div className="pp-contact-item">
                            <div className="pp-contact-icon">
                              <Mail size={20} color="var(--c-emerald-400)" />
                            </div>
                            <div>
                              <p style={{ fontSize: "0.75rem", color: "var(--c-slate-400)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Email Us</p>
                              <a href="mailto:poojascreativepalette@gmail.com" className="pp-contact-link">
                                poojascreativepalette@gmail.com
                              </a>
                            </div>
                          </div>
                          <div className="pp-contact-item">
                            <div className="pp-contact-icon">
                              <Phone size={20} color="var(--c-emerald-400)" />
                            </div>
                            <div>
                              <p style={{ fontSize: "0.75rem", color: "var(--c-slate-400)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>WhatsApp / Phone</p>
                              <span style={{ fontWeight: 500 }}>
                                +91 9833325936
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pp-info-card">
                        <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem", marginTop: 0 }}>Data Protection Officer</h3>
                        <p style={{ fontSize: "0.875rem", color: "var(--c-slate-300)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                          For formal inquiries regarding data protection compliance, you may address your correspondence to our DPO at the contact details provided.
                        </p>
                        <div style={{ fontSize: "0.75rem", color: "var(--c-slate-400)" }}>
                          Last Updated: November 2025
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </section>

            </div>
          </div>
        </main>
      </div>
    </>
  );
}