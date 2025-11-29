import React, { useEffect, useState, useRef } from "react";
import {
  Truck,
  Package,
  Undo2,
  ShieldCheck,
  Phone,
  Mail,
  ChevronRight,
  Info,
  Clock,
  MapPin
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
    --c-rose-900: #881337;

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

  .srp-wrapper {
    min-height: 100vh;
    background-color: var(--c-slate-50);
    font-family: var(--font-sans);
    color: var(--c-slate-600);
    padding-bottom: 8rem;
    position: relative;
  }

  /* Background Decor */
  .srp-bg-decor {
    position: fixed;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
  }
  .srp-bg-gradient {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 500px;
    background: linear-gradient(to bottom, #ffffff, transparent);
  }
  .srp-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.4;
  }
  .srp-orb-1 { top: -10%; right: -5%; width: 500px; height: 500px; background-color: var(--c-amber-200); }
  .srp-orb-2 { top: 20%; left: -10%; width: 400px; height: 400px; background-color: var(--c-rose-100); }

  /* Layout Utilities */
  .srp-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
    z-index: 1;
  }
  .srp-grid-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  @media (min-width: 768px) {
    .srp-grid-layout {
      grid-template-columns: 240px 1fr;
      gap: 3rem;
    }
  }
  @media (min-width: 1024px) {
    .srp-grid-layout {
      grid-template-columns: 280px 1fr;
      gap: 4rem;
    }
  }

  /* Hero Section */
  .srp-hero {
    padding: 5rem 1.5rem 4rem;
    text-align: center;
    max-width: 56rem;
    margin: 0 auto;
  }
  .srp-badge {
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
  .srp-pulse-dot {
    width: 0.5rem; height: 0.5rem;
    background-color: var(--c-emerald-500);
    border-radius: 50%;
    animation: srp-pulse 2s infinite;
  }
  @keyframes srp-pulse {
    0% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
    100% { opacity: 1; transform: scale(1); }
  }
  .srp-title {
    font-family: var(--font-serif);
    font-size: 2.5rem;
    font-weight: 700;
    color: var(--c-slate-900);
    margin-bottom: 1.5rem;
    line-height: 1.1;
  }
  @media (min-width: 768px) { .srp-title { font-size: 3.5rem; } }

  .srp-lead {
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--c-slate-600);
  }

  /* Navigation Sidebar */
  .srp-nav-wrapper {
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
    .srp-nav-wrapper {
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
  .srp-nav-list {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 0 1.5rem;
    scrollbar-width: none;
  }
  .srp-nav-list::-webkit-scrollbar { display: none; }
  @media (min-width: 768px) {
    .srp-nav-list {
      flex-direction: column;
      padding: 0;
    }
  }
  .srp-nav-header {
    display: none;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--c-slate-400);
    margin-bottom: 1rem;
    padding-left: 0.75rem;
  }
  @media (min-width: 768px) { .srp-nav-header { display: block; } }

  .srp-nav-btn {
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
  .srp-nav-btn:hover {
    background-color: var(--c-slate-100);
    color: var(--c-slate-900);
  }
  .srp-nav-btn.active {
    background-color: var(--c-amber-50);
    color: var(--c-amber-900);
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    border: 1px solid var(--c-amber-200);
  }
  .srp-nav-dot {
    width: 6px; height: 6px;
    background-color: var(--c-amber-500);
    border-radius: 50%;
    position: absolute;
    left: 8px;
    transform: scale(0);
    transition: transform 0.3s;
  }
  .srp-nav-btn.active .srp-nav-dot { transform: scale(1); }
  .srp-nav-text { margin-left: 0; transition: margin 0.2s; }
  .srp-nav-btn.active .srp-nav-text { margin-left: 0.5rem; }

  /* Content Sections */
  .srp-content-col { display: flex; flex-direction: column; gap: 5rem; }
  .srp-section-offset { scroll-margin-top: 8rem; }

  /* Cards */
  .srp-card {
    background: white;
    border-radius: 1rem;
    border: 1px solid var(--c-slate-200);
    padding: 1.5rem;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    transition: box-shadow 0.3s;
  }
  .srp-card:hover { box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1); }
  
  /* Summary Grid */
  .srp-summary-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  @media (min-width: 640px) { .srp-summary-grid { grid-template-columns: 1fr 1fr; } }
  
  .srp-summary-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    background: white;
    padding: 1rem;
    border-radius: 0.75rem;
    border: 1px solid var(--c-slate-100);
  }
  .srp-icon-box { padding: 0.75rem; border-radius: 0.5rem; display: flex; }
  .srp-icon-box.blue { background: var(--c-blue-50); color: var(--c-blue-600); }
  .srp-icon-box.amber { background: var(--c-amber-50); color: var(--c-amber-500); }
  .srp-icon-box.rose { background: var(--c-rose-50); color: var(--c-rose-600); }
  .srp-icon-box.emerald { background: var(--c-emerald-50); color: var(--c-emerald-600); }

  /* Main Policy Box */
  .srp-policy-box {
    background: white;
    border: 1px solid var(--c-slate-200);
    border-radius: 1rem;
    padding: 1.5rem;
    position: relative;
    overflow: hidden;
  }
  @media (min-width: 768px) { .srp-policy-box { padding: 2.5rem; } }
  .srp-accent-bar {
    position: absolute;
    top: 0; left: 0; bottom: 0; width: 4px;
  }
  .srp-accent-bar.blue { background-color: var(--c-blue-500); }
  .srp-accent-bar.rose { background-color: var(--c-rose-500); }

  .srp-header-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.5rem; }
  .srp-h2 { font-size: 1.5rem; font-weight: 700; color: var(--c-slate-900); margin: 0; }
  
  .srp-prose p { margin-bottom: 1.5rem; line-height: 1.6; }
  .srp-prose strong { color: var(--c-slate-900); font-weight: 600; }
  
  .srp-info-grid {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 1.5rem;
  }
  @media (min-width: 640px) { .srp-info-grid { grid-template-columns: 1fr 1fr; } }
  
  .srp-info-card {
    background-color: var(--c-slate-50);
    border: 1px solid var(--c-slate-100);
    border-radius: 0.75rem;
    padding: 1rem;
  }
  .srp-info-card-title {
    display: flex; align-items: center; gap: 0.5rem;
    font-weight: 600; color: var(--c-slate-900); margin-bottom: 0.5rem;
  }
  .srp-note-box {
    background-color: var(--c-blue-50);
    color: var(--c-blue-800);
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex; gap: 0.75rem; align-items: start;
    font-size: 0.875rem;
  }

  /* List Styling */
  .srp-list { display: flex; flex-direction: column; gap: 1rem; }
  .srp-list-item { display: flex; gap: 0.75rem; align-items: start; }
  .srp-bullet { color: var(--c-amber-500); flex-shrink: 0; margin-top: 2px; }

  /* Returns Grid */
  .srp-returns-grid { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.5rem; }
  @media (min-width: 640px) { .srp-returns-grid { flex-direction: row; } }
  .srp-return-card {
    flex: 1;
    background: rgba(255, 241, 242, 0.5);
    border: 1px solid var(--c-rose-100);
    padding: 1.25rem;
    border-radius: 0.75rem;
  }
  .srp-return-card h4 { color: var(--c-rose-900); font-weight: 600; margin: 0 0 0.5rem 0; }
  .srp-return-card p { font-size: 0.875rem; color: var(--c-rose-800); margin: 0; }
  
  .srp-action-link {
    background: none; border: none; padding: 0;
    color: var(--c-rose-600); font-weight: 600; font-size: 0.875rem;
    cursor: pointer; text-decoration: none;
  }
  .srp-action-link:hover { text-decoration: underline; color: var(--c-rose-800); }

  /* Cancellation */
  .srp-cancel-box {
    display: flex; gap: 1rem; align-items: start;
    background: var(--c-slate-100);
    padding: 1.25rem;
    border-radius: 0.75rem;
  }
  .srp-simple-section {
    padding-left: 1.5rem;
    border-left: 2px solid var(--c-slate-200);
    position: relative;
  }
  .srp-timeline-dot {
    position: absolute; left: -9px; top: 0;
    width: 1rem; height: 1rem;
    border-radius: 50%;
    background: var(--c-slate-400);
    box-shadow: 0 0 0 4px white;
  }
  .srp-timeline-dot.amber { background: var(--c-amber-500); }

  /* Contact Section */
  .srp-contact-wrapper {
    background: linear-gradient(135deg, var(--c-slate-900), var(--c-slate-800));
    color: white;
    padding: 2rem;
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1);
  }
  @media (min-width: 768px) { .srp-contact-wrapper { padding: 3rem; } }
  .srp-contact-grid {
    display: grid; gap: 2.5rem; position: relative; z-index: 10;
  }
  @media (min-width: 768px) { .srp-contact-grid { grid-template-columns: 1fr 1fr; align-items: center; } }
  
  .srp-contact-item { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
  .srp-contact-icon {
    width: 2.5rem; height: 2.5rem;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(4px);
  }
  .srp-contact-link { color: white; text-decoration: none; font-weight: 500; transition: color 0.2s; }
  .srp-contact-link:hover { color: var(--c-amber-300); }
  
  .srp-hours-card {
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 0.75rem;
    padding: 1.5rem;
  }
  .srp-hour-row {
    display: flex; justify-content: space-between;
    border-bottom: 1px solid rgba(255,255,255,0.1);
    padding-bottom: 0.5rem; margin-bottom: 0.75rem;
    font-size: 0.875rem; color: var(--c-slate-300);
  }
  .srp-hour-row:last-child { border: none; padding: 0; margin: 0; }
  
  /* Animation Classes */
  .fade-wrapper {
    transition: all 0.7s ease-out;
  }
  .fade-hidden { opacity: 0; transform: translateY(2rem); }
  .fade-visible { opacity: 1; transform: translateY(0); }
`;

// --- Configuration ---
const SECTIONS = [
  { id: "shipping", label: "Shipping Policy" },
  { id: "packaging", label: "Packaging & Handling" },
  { id: "returns", label: "Return & Refund Policy" },
  { id: "cancellation", label: "Order Cancellation" },
  { id: "contact", label: "Support & Contact" },
];

// --- Sub-Components ---

/**
 * FadeIn Wrapper
 * Adds a subtle entry animation to content blocks using standard CSS classes
 */
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

/**
 * Sticky Navigation (Adaptive: Top bar on mobile, Sidebar on desktop)
 */
const TableOfContents = ({ activeSection, onNavigate }) => {
  return (
    <nav className="srp-nav-wrapper">
      <div className="srp-nav-header">Contents</div>
      <div className="srp-nav-list">
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`srp-nav-btn ${activeSection === section.id ? "active" : ""}`}
          >
            {/* Active Indicator Dot */}
            <span className="srp-nav-dot" />
            <span className="srp-nav-text">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

// --- Main Component ---

export default function ShippingReturnsPage() {
  const [activeSection, setActiveSection] = useState("shipping");

  // Handle smooth scroll with offset
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    
    // Offset for sticky headers
    const offset = 100; 
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
    setActiveSection(id);
  };

  // Intersection Observer for active state
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
      <div className="srp-wrapper">
        
        {/* --- Decorative Background --- */}
        <div className="srp-bg-decor">
          <div className="srp-bg-gradient" />
          <div className="srp-orb srp-orb-1" />
          <div className="srp-orb srp-orb-2" />
        </div>

        {/* --- Hero Section --- */}
        <header className="srp-hero">
          <FadeIn>
            <div className="srp-badge">
              <span className="srp-pulse-dot" />
              <span>Updated November 2025</span>
            </div>
            <h1 className="srp-title">
              Shipping & Returns
            </h1>
            <p className="srp-lead">
              We ensure every masterpiece arrives safely. Here is everything you need to know about our delivery process and policies.
            </p>
          </FadeIn>
        </header>

        {/* --- Main Content Layout --- */}
        <main className="srp-container">
          <div className="srp-grid-layout">
            
            {/* Sidebar Navigation */}
            <aside>
              <TableOfContents 
                activeSection={activeSection} 
                onNavigate={scrollToSection} 
              />
            </aside>

            {/* Content Column */}
            <div className="srp-content-col">
              
              {/* Quick Summary Grid */}
              <FadeIn>
                <div className="srp-summary-grid">
                  {[
                    { icon: Truck, title: "Shipping", desc: "5-10 Days Domestic", theme: "blue" },
                    { icon: Package, title: "Packaging", desc: "Gallery-Grade Secure", theme: "amber" },
                    { icon: Undo2, title: "Returns", desc: "48hr Reporting Window", theme: "rose" },
                    { icon: ShieldCheck, title: "Insured", desc: "Fully Tracked", theme: "emerald" },
                  ].map((item, idx) => (
                    <div key={idx} className="srp-summary-item srp-card">
                      <div className={`srp-icon-box ${item.theme}`}>
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

              {/* SECTION 1: Shipping */}
              <section id="shipping" className="srp-section-offset">
                <FadeIn>
                  <div className="srp-policy-box">
                    <div className="srp-accent-bar blue" />
                    <div className="srp-header-row">
                      <Truck className="text-blue-500" size={24} color="var(--c-blue-500)" />
                      <h2 className="srp-h2">Shipping Policy</h2>
                    </div>
                    
                    <div className="srp-prose">
                      <p>
                        Once your order is placed, the artwork undergoes a final quality inspection and finishing process. 
                        Our standard processing time is <strong>3–5 business days</strong> before dispatch.
                      </p>
                      
                      <div className="srp-info-grid">
                        <div className="srp-info-card">
                          <div className="srp-info-card-title">
                            <MapPin size={16} color="var(--c-slate-400)" />
                            <span>Domestic (India)</span>
                          </div>
                          <p style={{ margin: 0, fontSize: "0.875rem" }}>
                            Delivered within <span style={{ fontWeight: 500, color: "var(--c-slate-900)" }}>5–10 business days</span> via trusted courier partners.
                          </p>
                        </div>
                        <div className="srp-info-card">
                          <div className="srp-info-card-title">
                            <MapPin size={16} color="var(--c-slate-400)" />
                            <span>International</span>
                          </div>
                          <p style={{ margin: 0, fontSize: "0.875rem" }}>
                            Delivered within <span style={{ fontWeight: 500, color: "var(--c-slate-900)" }}>10–21 business days</span> depending on customs clearance.
                          </p>
                        </div>
                      </div>

                      <div className="srp-note-box">
                        <Info size={20} style={{ flexShrink: 0, marginTop: "2px" }} />
                        <p style={{ margin: 0 }}>Shipping costs are calculated at checkout based on the weight, dimensions, and destination of the artwork.</p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* SECTION 2: Packaging */}
              <section id="packaging" className="srp-section-offset">
                <FadeIn>
                  <div className="srp-simple-section">
                    <div className="srp-timeline-dot amber" />
                    <h2 className="srp-h2" style={{ marginBottom: "1.5rem" }}>Packaging & Handling</h2>
                    <p style={{ marginBottom: "1.5rem" }}>
                      We adhere to museum-quality packing standards. Your artwork travels through a rigorous multi-layer protection system:
                    </p>
                    <div className="srp-list">
                      {[
                        "Protective glassine paper (acid-free) for surface protection.",
                        "Moisture-resistant inner wrapping to prevent humidity damage.",
                        "High-density bubble wrap and reinforced corner guards.",
                        "Double-walled cardboard boxing or custom wooden crates for large pieces."
                      ].map((item, i) => (
                        <div key={i} className="srp-list-item">
                          <ChevronRight size={20} className="srp-bullet" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* SECTION 3: Returns */}
              <section id="returns" className="srp-section-offset">
                <FadeIn>
                  <div className="srp-policy-box">
                    <div className="srp-accent-bar rose" />
                    <div className="srp-header-row">
                      <Undo2 size={24} color="var(--c-rose-500)" />
                      <h2 className="srp-h2">Return & Refund Policy</h2>
                    </div>

                    <div className="srp-prose">
                      <p>
                        Due to the sensitive nature of original art, returns are accepted <strong>only</strong> under the following circumstances:
                      </p>
                      
                      <div className="srp-returns-grid">
                        <div className="srp-return-card">
                          <h4>Visibly Damaged</h4>
                          <p>If the packaging or artwork arrives damaged during transit.</p>
                        </div>
                        <div className="srp-return-card">
                          <h4>Incorrect Item</h4>
                          <p>If the artwork delivered does not match your order.</p>
                        </div>
                      </div>

                      <div style={{ paddingTop: "1rem", borderTop: "1px solid var(--c-slate-100)" }}>
                        <h4 style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--c-slate-900)", marginBottom: "0.5rem", marginTop: 0 }}>The Process</h4>
                        <p style={{ marginBottom: "1rem" }}>
                          Please notify us within <span style={{ fontWeight: 600 }}>48 hours</span> of delivery. You must provide unboxing videos or clear photographs of the damage.
                        </p>
                        <button 
                          onClick={() => scrollToSection('contact')}
                          className="srp-action-link"
                        >
                          Contact Support to initiate a return &rarr;
                        </button>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* SECTION 4: Cancellation */}
              <section id="cancellation" className="srp-section-offset">
                <FadeIn>
                  <div className="srp-simple-section">
                    <div className="srp-timeline-dot" />
                    <h2 className="srp-h2" style={{ marginBottom: "1rem" }}>Order Cancellation</h2>
                    <div className="srp-cancel-box">
                      <Clock size={24} color="var(--c-slate-500)" style={{ flexShrink: 0 }} />
                      <div>
                        <p style={{ fontWeight: 500, margin: "0 0 0.25rem 0", color: "var(--c-slate-700)" }}>12-Hour Grace Period</p>
                        <p style={{ fontSize: "0.875rem", margin: 0, color: "var(--c-slate-500)" }}>
                          You may cancel your order within 12 hours of purchase for a full refund. After this window, the packaging process begins, and cancellations are no longer possible.
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* SECTION 5: Contact */}
              <section id="contact" className="srp-section-offset">
                <FadeIn>
                  <div className="srp-contact-wrapper">
                    {/* Abstract shapes */}
                    <div style={{ position: "absolute", top: "-4rem", right: "-4rem", width: "16rem", height: "16rem", background: "rgba(255,255,255,0.05)", borderRadius: "50%", filter: "blur(40px)" }} />
                    <div style={{ position: "absolute", bottom: "-4rem", left: "-4rem", width: "16rem", height: "16rem", background: "rgba(245,158,11,0.1)", borderRadius: "50%", filter: "blur(40px)" }} />

                    <div className="srp-contact-grid">
                      <div>
                        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.875rem", fontWeight: 700, marginBottom: "1rem" }}>Still have questions?</h2>
                        <p style={{ color: "var(--c-slate-300)", lineHeight: 1.6, marginBottom: "2rem" }}>
                          Our support team is available to help with tracking, specific packaging requests, or general inquiries.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                          <div className="srp-contact-item">
                            <div className="srp-contact-icon">
                              <Mail size={20} color="var(--c-amber-400)" />
                            </div>
                            <div>
                              <p style={{ fontSize: "0.75rem", color: "var(--c-slate-400)", textTransform: "uppercase", letterSpacing: "0.05em", margin: 0 }}>Email Us</p>
                              <a href="mailto:poojascreativepalette@gmail.com" className="srp-contact-link">
                                poojascreativepalette@gmail.com
                              </a>
                            </div>
                          </div>
                          <div className="srp-contact-item">
                            <div className="srp-contact-icon">
                              <Phone size={20} color="var(--c-amber-400)" />
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

                      <div className="srp-hours-card">
                        <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginBottom: "0.75rem", marginTop: 0 }}>Support Hours</h3>
                        <div className="srp-hour-row">
                          <span>Monday - Friday</span>
                          <span style={{ color: "white" }}>10:00 AM - 7:00 PM</span>
                        </div>
                        <div className="srp-hour-row">
                          <span>Saturday</span>
                          <span style={{ color: "white" }}>11:00 AM - 4:00 PM</span>
                        </div>
                        <div className="srp-hour-row">
                          <span>Response Time</span>
                          <span style={{ color: "var(--c-amber-400)" }}>Within 24 Hours</span>
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