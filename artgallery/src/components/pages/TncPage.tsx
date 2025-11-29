import React, { useEffect, useState, useRef } from "react";
import {
  Scale,
  Gavel,
  Copyright,
  CreditCard,
  AlertTriangle,
  Globe,
  Mail,
  Phone,
  FileText,
  ShieldCheck,
  Ban,
  Users
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
    --c-amber-400: #fbbf24;
    --c-amber-500: #f59e0b;

    --c-blue-50: #eff6ff;
    --c-blue-500: #3b82f6;
    --c-blue-600: #2563eb;
    --c-blue-800: #1e40af;

    --c-rose-50: #fff1f2;
    --c-rose-500: #f43f5e;
    --c-rose-600: #e11d48;

    --c-indigo-50: #eef2ff;
    --c-indigo-500: #6366f1;
    --c-indigo-600: #4f46e5;

    --font-serif: Georgia, Cambria, "Times New Roman", Times, serif;
    --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  * { box-sizing: border-box; }

  .tc-wrapper {
    min-height: 100vh;
    background-color: var(--c-slate-50);
    font-family: var(--font-sans);
    color: var(--c-slate-600);
    padding-bottom: 8rem;
    position: relative;
  }

  /* Background Decor */
  .tc-bg-decor {
    position: fixed;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
  }
  .tc-bg-gradient {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 500px;
    background: linear-gradient(to bottom, #ffffff, transparent);
  }
  .tc-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
  }
  .tc-orb-1 { top: -5%; right: 10%; width: 500px; height: 500px; background-color: var(--c-indigo-50); }
  .tc-orb-2 { top: 25%; left: -5%; width: 450px; height: 450px; background-color: var(--c-slate-200); }

  /* Layout Utilities */
  .tc-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
    z-index: 1;
  }
  .tc-grid-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  @media (min-width: 768px) {
    .tc-grid-layout {
      grid-template-columns: 240px 1fr;
      gap: 3rem;
    }
  }
  @media (min-width: 1024px) {
    .tc-grid-layout {
      grid-template-columns: 280px 1fr;
      gap: 4rem;
    }
  }

  /* Hero Section */
  .tc-hero {
    padding: 5rem 1.5rem 4rem;
    text-align: center;
    max-width: 56rem;
    margin: 0 auto;
  }
  .tc-badge {
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
  .tc-title {
    font-family: var(--font-serif);
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--c-slate-900);
    margin-bottom: 1.5rem;
    line-height: 1.1;
  }
  @media (min-width: 768px) { .tc-title { font-size: 3.5rem; } }

  .tc-lead {
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--c-slate-600);
  }

  /* Navigation Sidebar */
  .tc-nav-wrapper {
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
    .tc-nav-wrapper {
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
  .tc-nav-list {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 0 1.5rem;
    scrollbar-width: none;
  }
  .tc-nav-list::-webkit-scrollbar { display: none; }
  @media (min-width: 768px) {
    .tc-nav-list {
      flex-direction: column;
      padding: 0;
    }
  }
  .tc-nav-header {
    display: none;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--c-slate-400);
    margin-bottom: 1rem;
    padding-left: 0.75rem;
  }
  @media (min-width: 768px) { .tc-nav-header { display: block; } }

  .tc-nav-btn {
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
  .tc-nav-btn:hover {
    background-color: var(--c-slate-100);
    color: var(--c-slate-900);
  }
  .tc-nav-btn.active {
    background-color: var(--c-indigo-50);
    color: var(--c-indigo-600);
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    border: 1px solid var(--c-indigo-500);
  }
  .tc-nav-dot {
    width: 6px; height: 6px;
    background-color: var(--c-indigo-500);
    border-radius: 50%;
    position: absolute;
    left: 8px;
    transform: scale(0);
    transition: transform 0.3s;
  }
  .tc-nav-btn.active .tc-nav-dot { transform: scale(1); }
  .tc-nav-text { margin-left: 0; transition: margin 0.2s; }
  .tc-nav-btn.active .tc-nav-text { margin-left: 0.5rem; }

  /* Content Sections */
  .tc-content-col { display: flex; flex-direction: column; gap: 5rem; }
  .tc-section-offset { scroll-margin-top: 8rem; }

  /* Cards */
  .tc-card {
    background: white;
    border-radius: 1rem;
    border: 1px solid var(--c-slate-200);
    padding: 1.5rem;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    transition: box-shadow 0.3s;
  }
  .tc-card:hover { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
  
  /* Summary Grid */
  .tc-summary-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  @media (min-width: 640px) { .tc-summary-grid { grid-template-columns: 1fr 1fr; } }
  
  .tc-summary-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: white;
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid var(--c-slate-100);
  }
  .tc-icon-box { padding: 0.75rem; border-radius: 0.5rem; display: flex; }
  .tc-icon-box.indigo { background: var(--c-indigo-50); color: var(--c-indigo-600); }
  .tc-icon-box.amber { background: var(--c-amber-50); color: var(--c-amber-500); }
  .tc-icon-box.blue { background: var(--c-blue-50); color: var(--c-blue-600); }
  .tc-icon-box.rose { background: var(--c-rose-50); color: var(--c-rose-600); }

  /* Main Policy Box */
  .tc-policy-box {
    background: white;
    border: 1px solid var(--c-slate-200);
    border-radius: 1rem;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
  }
  @media (min-width: 768px) { .tc-policy-box { padding: 2.5rem; } }
  .tc-accent-bar {
    position: absolute;
    top: 0; left: 0; bottom: 0; width: 4px;
  }
  .tc-accent-bar.indigo { background-color: var(--c-indigo-500); }
  .tc-accent-bar.slate { background-color: var(--c-slate-500); }

  .tc-header-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
  .tc-h2 { font-size: 1.5rem; font-weight: 700; color: var(--c-slate-900); margin: 0; }
  
  .tc-prose p { margin-bottom: 1.25rem; line-height: 1.6; }
  .tc-prose strong { color: var(--c-slate-900); font-weight: 600; }

  /* Feature Grid (for IP rights) */
  .tc-feature-grid {
    display: grid;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  @media (min-width: 640px) { .tc-feature-grid { grid-template-columns: repeat(2, 1fr); } }
  
  .tc-feature-card {
    background-color: var(--c-slate-50);
    border: 1px solid var(--c-slate-200);
    border-radius: 0.75rem;
    padding: 1rem;
  }
  .tc-feature-icon { margin-bottom: 0.5rem; color: var(--c-slate-500); }
  .tc-feature-title { font-weight: 600; color: var(--c-slate-900); font-size: 0.875rem; margin-bottom: 0.25rem; }
  .tc-feature-desc { font-size: 0.8125rem; color: var(--c-slate-500); margin: 0; }

  /* Simple Sections */
  .tc-simple-section {
    padding-left: 1.5rem;
    border-left: 2px solid var(--c-slate-200);
    position: relative;
  }
  .tc-timeline-dot {
    position: absolute; left: -9px; top: 0;
    width: 1rem; height: 1rem;
    border-radius: 50%;
    background: var(--c-slate-400);
    box-shadow: 0 0 0 4px white;
  }
  .tc-timeline-dot.indigo { background: var(--c-indigo-500); }
  .tc-timeline-dot.rose { background: var(--c-rose-500); }

  /* List Styling */
  .tc-list { display: flex; flex-direction: column; gap: 0.75rem; }
  .tc-list-item { display: flex; gap: 0.75rem; align-items: start; }
  .tc-bullet { color: var(--c-indigo-500); flex-shrink: 0; margin-top: 4px; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }

  /* Warning Box */
  .tc-warning-box {
    background: var(--c-rose-50);
    border: 1px solid var(--c-rose-500);
    border-radius: 0.75rem;
    padding: 1.25rem;
    display: flex;
    gap: 1rem;
    align-items: start;
    margin-top: 1rem;
  }
  .tc-warning-text { font-size: 0.875rem; color: var(--c-slate-800); line-height: 1.5; }

  /* Contact Section */
  .tc-contact-wrapper {
    background: linear-gradient(135deg, var(--c-slate-900), var(--c-slate-800));
    color: white;
    padding: 2rem;
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
  }
  @media (min-width: 768px) { .tc-contact-wrapper { padding: 3rem; } }
  .tc-contact-grid {
    display: grid; gap: 2.5rem; position: relative; z-index: 10;
  }
  @media (min-width: 768px) { .tc-contact-grid { grid-template-columns: 1fr 1fr; align-items: center; } }
  
  .tc-contact-item { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
  .tc-contact-icon {
    width: 2.5rem; height: 2.5rem;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px);
  }
  .tc-contact-link { color: white; text-decoration: none; font-weight: 500; transition: color 0.2s; }
  .tc-contact-link:hover { color: var(--c-indigo-600); }
  
  .tc-info-card {
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
  { id: "acceptance", label: "Acceptance of Terms" },
  { id: "ip", label: "Intellectual Property" },
  { id: "purchases", label: "Purchases & Payments" },
  { id: "liability", label: "Limitation of Liability" },
  { id: "law", label: "Governing Law" },
  { id: "contact", label: "Contact Information" },
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
    <nav className="tc-nav-wrapper">
      <div className="tc-nav-header">Sections</div>
      <div className="tc-nav-list">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`tc-nav-btn ${activeSection === section.id ? "active" : ""}`}
          >
            <span className="tc-nav-dot" />
            <span className="tc-nav-text">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

// --- Main Component ---

export default function TermsAndConditions() {
  const [activeSection, setActiveSection] = useState("acceptance");

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
      <div className="tc-wrapper">
        
        {/* --- Decorative Background --- */}
        <div className="tc-bg-decor">
          <div className="tc-bg-gradient" />
          <div className="tc-orb tc-orb-1" />
          <div className="tc-orb tc-orb-2" />
        </div>

        {/* --- Hero Section --- */}
        <header className="tc-hero">
          <FadeIn>
            <div className="tc-badge">
              <Scale size={14} color="var(--c-indigo-600)" />
              <span>Legal Agreement</span>
            </div>
            <h1 className="tc-title">
              Terms & Conditions
            </h1>
            <p className="tc-lead">
              Please read these terms carefully before using our services. By accessing or using our website, you agree to be bound by these terms.
            </p>
          </FadeIn>
        </header>

        {/* --- Main Content Layout --- */}
        <main className="tc-container">
          <div className="tc-grid-layout">
            
            {/* Sidebar Navigation */}
            <aside>
              <TableOfContents 
                activeSection={activeSection} 
                onNavigate={scrollToSection} 
              />
            </aside>

            {/* Content Column */}
            <div className="tc-content-col">
              
              {/* Quick Summary Grid */}
              <FadeIn>
                <div className="tc-summary-grid">
                  {[
                    { icon: Gavel, title: "Binding", desc: "Legally enforceable", theme: "indigo" },
                    { icon: Copyright, title: "Copyright", desc: "Original works", theme: "amber" },
                    { icon: ShieldCheck, title: "Liability", desc: "User responsibility", theme: "blue" },
                    { icon: Globe, title: "Jurisdiction", desc: "Governing laws", theme: "rose" },
                  ].map((item, idx) => (
                    <div key={idx} className="tc-summary-item tc-card">
                      <div className={`tc-icon-box ${item.theme}`}>
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

              {/* SECTION 1: Acceptance */}
              <section id="acceptance" className="tc-section-offset">
                <FadeIn>
                  <div className="tc-policy-box">
                    <div className="tc-accent-bar slate" />
                    <div className="tc-header-row">
                      <FileText size={24} color="var(--c-slate-500)" />
                      <h2 className="tc-h2">Acceptance of Terms</h2>
                    </div>
                    
                    <div className="tc-prose">
                      <p>
                        These Terms and Conditions constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and <strong>Pooja's Creative Palette</strong> (“we,” “us,” or “our”).
                      </p>
                      <p>
                        We operate the website as well as any other related products and services that refer to these legal terms (the “Legal Terms”). You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms.
                      </p>
                      <div className="tc-warning-box">
                        <AlertTriangle size={24} color="var(--c-rose-500)" style={{ flexShrink: 0 }} />
                        <span className="tc-warning-text">
                           IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
                        </span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* SECTION 2: Intellectual Property */}
              <section id="ip" className="tc-section-offset">
                <FadeIn>
                  <div className="tc-simple-section">
                    <div className="tc-timeline-dot indigo" />
                    <div className="tc-header-row" style={{ marginBottom: "1.5rem" }}>
                       <Copyright size={24} color="var(--c-indigo-600)" />
                       <h2 className="tc-h2">Intellectual Property Rights</h2>
                    </div>
                    <p style={{ marginBottom: "1.5rem" }}>
                      We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics.
                    </p>
                    
                    <div className="tc-feature-grid">
                        <div className="tc-feature-card">
                           <div className="tc-feature-icon"><Copyright size={18} /></div>
                           <div className="tc-feature-title">Original Artwork</div>
                           <p className="tc-feature-desc">All paintings and creative works are the sole property of the artist. Purchase does not transfer copyright.</p>
                        </div>
                        <div className="tc-feature-card">
                           <div className="tc-feature-icon"><Ban size={18} /></div>
                           <div className="tc-feature-title">No Reproduction</div>
                           <p className="tc-feature-desc">You may not copy, reproduce, aggregate, republish, or sell any part of the Services without express written permission.</p>
                        </div>
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* SECTION 3: Purchases */}
              <section id="purchases" className="tc-section-offset">
                <FadeIn>
                  <div className="tc-policy-box">
                    <div className="tc-accent-bar indigo" />
                    <div className="tc-header-row">
                      <CreditCard size={24} color="var(--c-indigo-500)" />
                      <h2 className="tc-h2">Purchases & Payments</h2>
                    </div>

                    <div className="tc-prose">
                      <p>
                         We accept various forms of payment. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services.
                      </p>
                      <div className="tc-list">
                        {[
                          "Prices are subject to change without prior notice.",
                          "We reserve the right to refuse any order placed through the Services.",
                          "You agree to pay all charges at the prices then in effect for your purchases.",
                          "Sales tax will be added to the price of purchases as deemed required by us."
                        ].map((item, i) => (
                          <div key={i} className="tc-list-item">
                            <div className="tc-bullet" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* SECTION 4: Liability */}
              <section id="liability" className="tc-section-offset">
                <FadeIn>
                  <div className="tc-simple-section">
                    <div className="tc-timeline-dot rose" />
                    <div className="tc-header-row" style={{ marginBottom: "1rem" }}>
                       <AlertTriangle size={24} color="var(--c-rose-500)" />
                       <h2 className="tc-h2">Limitation of Liability</h2>
                    </div>
                    <p style={{ marginBottom: "1.5rem" }}>
                      In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the Services.
                    </p>
                    <p style={{ fontSize: "0.875rem", color: "var(--c-slate-500)" }}>
                      Our liability to you for any cause whatsoever and regardless of the form of the action, will at all times be limited to the amount paid, if any, by you to us.
                    </p>
                  </div>
                </FadeIn>
              </section>

               {/* SECTION 5: Governing Law */}
               <section id="law" className="tc-section-offset">
                <FadeIn>
                  <div className="tc-policy-box">
                    <div className="tc-accent-bar slate" />
                    <div className="tc-header-row">
                       <Globe size={24} color="var(--c-slate-500)" />
                       <h2 className="tc-h2">Governing Law</h2>
                    </div>
                    <div className="tc-prose">
                      <p>
                        These Legal Terms shall be governed by and defined following the laws of <strong>India</strong>. Pooja's Creative Palette and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these Legal Terms.
                      </p>
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* SECTION 6: Contact */}
              <section id="contact" className="tc-section-offset">
                <FadeIn>
                  <div className="tc-contact-wrapper">
                    {/* Abstract shapes */}
                    <div style={{ position: "absolute", top: "-4rem", right: "-4rem", width: "16rem", height: "16rem", background: "rgba(255,255,255,0.05)", borderRadius: "50%", filter: "blur(40px)" }} />
                    <div style={{ position: "absolute", bottom: "-4rem", left: "-4rem", width: "16rem", height: "16rem", background: "rgba(99, 102, 241, 0.2)", borderRadius: "50%", filter: "blur(40px)" }} />

                    <div className="tc-contact-grid">
                      <div>
                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.875rem", fontWeight: 700, marginBottom: "1rem" }}>Questions about Terms?</h2>
                        <p style={{ color: "var(--c-slate-300)", lineHeight: 1.6, marginBottom: "2rem" }}>
                          If you have any clarifications needed regarding our Terms and Conditions, please reach out to us.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                          <div className="tc-contact-item">
                            <div className="tc-contact-icon">
                              <Mail size={20} color="var(--c-indigo-400)" />
                            </div>
                            <div>
                              <p style={{ fontSize: "0.75rem", color: "var(--c-slate-400)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Email Us</p>
                              <a href="mailto:poojascreativepalette@gmail.com" className="tc-contact-link">
                                poojascreativepalette@gmail.com
                              </a>
                            </div>
                          </div>
                          <div className="tc-contact-item">
                            <div className="tc-contact-icon">
                              <Phone size={20} color="var(--c-indigo-400)" />
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

                      <div className="tc-info-card">
                        <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "1rem", marginTop: 0 }}>Updates to Terms</h3>
                        <p style={{ fontSize: "0.875rem", color: "var(--c-slate-300)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                          We reserve the right to modify these terms at any time. Significant changes will be communicated through the website or via email.
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