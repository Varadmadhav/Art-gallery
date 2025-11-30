import React, { useEffect, useState, useRef } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Clock,
  MessageSquare,
  Instagram,
  Facebook,
  Globe,
  ChevronDown,
  CheckCircle2,
  Sparkles
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
    --c-amber-500: #f59e0b;
    --c-amber-600: #d97706;

    --c-violet-50: #f5f3ff;
    --c-violet-100: #ede9fe;
    --c-violet-500: #8b5cf6;
    --c-violet-600: #7c3aed;

    --c-rose-50: #fff1f2;
    --c-rose-500: #f43f5e;

    --c-emerald-50: #ecfdf5;
    --c-emerald-500: #10b981;

    --font-serif: Georgia, Cambria, "Times New Roman", Times, serif;
    --font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  * { box-sizing: border-box; }

  .cnt-wrapper {
    min-height: 100vh;
    background-color: var(--c-slate-50);
    font-family: var(--font-sans);
    color: var(--c-slate-600);
    padding-bottom: 8rem;
    position: relative;
  }

  /* Background Decor */
  .cnt-bg-decor {
    position: fixed;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 0;
  }
  .cnt-bg-gradient {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 600px;
    background: linear-gradient(to bottom, #ffffff, transparent);
  }
  .cnt-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(90px);
    opacity: 0.5;
  }
  .cnt-orb-1 { top: -10%; left: 20%; width: 600px; height: 600px; background-color: var(--c-violet-50); }
  .cnt-orb-2 { top: 40%; right: -10%; width: 500px; height: 500px; background-color: var(--c-amber-50); }

  /* Layout Utilities */
  .cnt-container {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 1.5rem;
    position: relative;
    z-index: 1;
  }
  .cnt-grid-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
  }
  @media (min-width: 1024px) {
    .cnt-grid-layout {
      grid-template-columns: 280px 1fr;
      gap: 4rem;
    }
  }

  /* Hero Section */
  .cnt-hero {
    padding: 6rem 1.5rem 5rem;
    text-align: center;
    max-width: 56rem;
    margin: 0 auto;
  }
  .cnt-badge {
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
  .cnt-title {
    font-family: var(--font-serif);
    font-size: 3rem;
    font-weight: 700;
    color: var(--c-slate-900);
    margin-bottom: 1.5rem;
    line-height: 1.1;
  }
  @media (min-width: 768px) { .cnt-title { font-size: 4rem; } }

  .cnt-lead {
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--c-slate-600);
    max-width: 40rem;
    margin: 0 auto;
  }

  /* Navigation Sidebar */
  .cnt-nav-wrapper {
    display: none;
  }
  @media (min-width: 1024px) {
    .cnt-nav-wrapper {
      display: block;
      position: sticky;
      top: 6rem;
      align-self: start;
    }
  }
  .cnt-nav-header {
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--c-slate-400);
    margin-bottom: 1rem;
    padding-left: 0.75rem;
  }
  .cnt-nav-btn {
    display: flex;
    align-items: center;
    width: 100%;
    text-align: left;
    padding: 0.75rem 1rem;
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
    margin-bottom: 0.25rem;
  }
  .cnt-nav-btn:hover {
    background-color: var(--c-slate-100);
    color: var(--c-slate-900);
  }
  .cnt-nav-btn.active {
    background-color: var(--c-violet-50);
    color: var(--c-violet-600);
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    border: 1px solid var(--c-violet-100);
  }
  .cnt-nav-dot {
    width: 6px; height: 6px;
    background-color: var(--c-violet-600);
    border-radius: 50%;
    position: absolute;
    left: 8px;
    transform: scale(0);
    transition: transform 0.3s;
  }
  .cnt-nav-btn.active .cnt-nav-dot { transform: scale(1); }
  .cnt-nav-text { margin-left: 0; transition: margin 0.2s; }
  .cnt-nav-btn.active .cnt-nav-text { margin-left: 0.5rem; }

  /* Sections */
  .cnt-content-col { display: flex; flex-direction: column; gap: 6rem; }
  .cnt-section-offset { scroll-margin-top: 8rem; }

  /* Info Cards Grid */
  .cnt-info-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  @media (min-width: 640px) { .cnt-info-grid { grid-template-columns: repeat(3, 1fr); } }

  .cnt-card {
    background: white;
    border-radius: 1rem;
    border: 1px solid var(--c-slate-200);
    padding: 1.5rem;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    transition: transform 0.2s, box-shadow 0.2s;
    text-align: center;
    display: flex; flex-direction: column; align-items: center;
  }
  .cnt-card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
  
  .cnt-icon-circle {
    width: 3rem; height: 3rem;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 1rem;
  }
  .cnt-icon-circle.violet { background: var(--c-violet-50); color: var(--c-violet-600); }
  .cnt-icon-circle.amber { background: var(--c-amber-50); color: var(--c-amber-600); }
  .cnt-icon-circle.emerald { background: var(--c-emerald-50); color: var(--c-emerald-500); }

  .cnt-card-label { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--c-slate-400); margin-bottom: 0.5rem; letter-spacing: 0.05em; }
  .cnt-card-value { font-size: 1rem; font-weight: 600; color: var(--c-slate-900); }
  .cnt-card-sub { font-size: 0.875rem; color: var(--c-slate-500); margin-top: 0.25rem; }

  /* Contact Form Box */
  .cnt-form-box {
    background: white;
    border: 1px solid var(--c-slate-200);
    border-radius: 1.5rem;
    padding: 2rem;
    position: relative;
    overflow: hidden;
  }
  @media (min-width: 768px) { .cnt-form-box { padding: 3rem; } }
  .cnt-accent-top { position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(to right, var(--c-violet-500), var(--c-amber-500)); }

  .cnt-form-header { margin-bottom: 2.5rem; }
  .cnt-h2 { font-size: 2rem; font-weight: 700; color: var(--c-slate-900); margin: 0 0 0.5rem 0; font-family: var(--font-serif); }
  .cnt-desc { color: var(--c-slate-500); }

  .cnt-form-grid { display: grid; gap: 1.5rem; }
  @media (min-width: 640px) { .cnt-form-grid { grid-template-columns: 1fr 1fr; } }
  .cnt-full-width { grid-column: 1 / -1; }

  .cnt-input-group { display: flex; flex-direction: column; gap: 0.5rem; }
  .cnt-label { font-size: 0.875rem; font-weight: 600; color: var(--c-slate-700); }
  
  .cnt-input, .cnt-textarea {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid var(--c-slate-200);
    border-radius: 0.5rem;
    background: var(--c-slate-50);
    color: var(--c-slate-900);
    font-family: var(--font-sans);
    transition: all 0.2s;
  }
  .cnt-input:focus, .cnt-textarea:focus {
    outline: none;
    background: white;
    border-color: var(--c-violet-500);
    box-shadow: 0 0 0 3px var(--c-violet-100);
  }
  .cnt-textarea { min-height: 120px; resize: vertical; }

  .cnt-submit-btn {
    background: var(--c-slate-900);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 0.75rem;
    font-weight: 600;
    cursor: pointer;
    display: inline-flex; align-items: center; justify-content: center; gap: 0.75rem;
    transition: background 0.2s, transform 0.1s;
    width: 100%;
  }
  .cnt-submit-btn:hover { background: var(--c-slate-800); }
  .cnt-submit-btn:active { transform: scale(0.98); }
  
  /* FAQ Accordion */
  .cnt-faq-list { display: flex; flex-direction: column; gap: 1rem; }
  .cnt-faq-item {
    background: white;
    border: 1px solid var(--c-slate-200);
    border-radius: 0.75rem;
    overflow: hidden;
  }
  .cnt-faq-trigger {
    width: 100%;
    display: flex; justify-content: space-between; align-items: center;
    padding: 1.25rem;
    background: none; border: none;
    font-size: 1rem; font-weight: 600; color: var(--c-slate-800);
    cursor: pointer; text-align: left;
  }
  .cnt-faq-trigger:hover { background-color: var(--c-slate-50); }
  .cnt-faq-icon { transition: transform 0.3s; color: var(--c-slate-400); }
  .cnt-faq-item.open .cnt-faq-icon { transform: rotate(180deg); color: var(--c-violet-500); }
  
  .cnt-faq-content {
    max-height: 0; overflow: hidden;
    transition: max-height 0.3s cubic-bezier(0, 1, 0, 1);
    background-color: var(--c-slate-50);
  }
  .cnt-faq-item.open .cnt-faq-content { max-height: 500px; transition: max-height 0.5s ease-in-out; }
  .cnt-faq-inner { padding: 0 1.25rem 1.25rem 1.25rem; color: var(--c-slate-600); line-height: 1.6; }

  /* Social Section */
  .cnt-social-box {
    background: linear-gradient(135deg, var(--c-slate-900), var(--c-slate-800));
    border-radius: 1.5rem;
    padding: 3rem;
    text-align: center;
    color: white;
    position: relative; overflow: hidden;
  }
  .cnt-social-links { display: flex; justify-content: center; gap: 2rem; margin-top: 2rem; position: relative; z-index: 10; }
  .cnt-social-link {
    display: flex; flex-direction: column; align-items: center; gap: 0.5rem;
    color: var(--c-slate-300); text-decoration: none;
    transition: color 0.2s, transform 0.2s;
  }
  .cnt-social-link:hover { color: white; transform: translateY(-2px); }
  .cnt-social-icon { width: 1.5rem; height: 1.5rem; }

  /* Animation Classes */
  .fade-wrapper { transition: all 0.7s ease-out; }
  .fade-hidden { opacity: 0; transform: translateY(2rem); }
  .fade-visible { opacity: 1; transform: translateY(0); }
`;

// --- Configuration ---
const SECTIONS = [
  { id: "direct", label: "Contact Info" },
  { id: "message", label: "Send a Message" },
  { id: "faq", label: "Common Questions" },
  { id: "connect", label: "Connect with Us" },
];

const FAQS = [
  { q: "Do you ship internationally?", a: "Yes, we ship our artwork worldwide. Shipping costs are calculated at checkout based on your location and the size of the piece." },
  { q: "Can I commission a custom piece?", a: "Absolutely! Pooja loves creating custom commissioned works. Please use the contact form to describe your vision." },
  { q: "How are the paintings packaged?", a: "We use gallery-grade packaging including acid-free paper, moisture barriers, and reinforced crates for larger works." },
  { q: "What is your typical response time?", a: "We strive to respond to all inquiries within 24 business hours. Weekend inquiries are answered on Mondays." }
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
    <nav className="cnt-nav-wrapper">
      <div className="cnt-nav-header">On this page</div>
      <div>
        {SECTIONS.map((section) => (
          <button
            key={section.id}
            onClick={() => onNavigate(section.id)}
            className={`cnt-nav-btn ${activeSection === section.id ? "active" : ""}`}
          >
            <span className="cnt-nav-dot" />
            <span className="cnt-nav-text">{section.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

const FaqItem = ({ item, isOpen, onClick }) => (
  <div className={`cnt-faq-item ${isOpen ? "open" : ""}`}>
    <button className="cnt-faq-trigger" onClick={onClick}>
      <span>{item.q}</span>
      <ChevronDown className="cnt-faq-icon" size={20} />
    </button>
    <div className="cnt-faq-content">
      <div className="cnt-faq-inner">{item.a}</div>
    </div>
  </div>
);

// --- Main Component ---

export default function ContactUs() {
  const [activeSection, setActiveSection] = useState("direct");
  const [openFaq, setOpenFaq] = useState(0);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: "smooth" });
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
      <div className="cnt-wrapper">
        
        {/* Decorative BG */}
        <div className="cnt-bg-decor">
          <div className="cnt-bg-gradient" />
          <div className="cnt-orb cnt-orb-1" />
          <div className="cnt-orb cnt-orb-2" />
        </div>

        {/* Hero */}
        <header className="cnt-hero">
          <FadeIn>
            <div className="cnt-badge">
              <MessageSquare size={14} color="var(--c-violet-600)" />
              <span>Here to Help</span>
            </div>
            <h1 className="cnt-title">Get in Touch</h1>
            <p className="cnt-lead">
              Have a question about a painting, a commission request, or just want to say hello? We'd love to hear from you.
            </p>
          </FadeIn>
        </header>

        {/* Main Content */}
        <main className="cnt-container">
          <div className="cnt-grid-layout">
            
            {/* Sidebar */}
            <aside>
              <TableOfContents 
                activeSection={activeSection} 
                onNavigate={scrollToSection} 
              />
            </aside>

            {/* Content Body */}
            <div className="cnt-content-col">
              
              {/* SECTION 1: Direct Info Cards */}
              <section id="direct" className="cnt-section-offset">
                <FadeIn>
                  <div className="cnt-info-grid">
                    <div className="cnt-card">
                      <div className="cnt-icon-circle violet">
                        <Mail size={24} />
                      </div>
                      <div className="cnt-card-label">Email Us</div>
                      <div className="cnt-card-value">poojascreativepalette@gmail.com</div>
                      <div className="cnt-card-sub">Responses within 24h</div>
                    </div>

                    <div className="cnt-card">
                      <div className="cnt-icon-circle amber">
                        <Phone size={24} />
                      </div>
                      <div className="cnt-card-label">Call / WhatsApp</div>
                      <div className="cnt-card-value">+91 9833325936</div>
                      <div className="cnt-card-sub">Mon-Sat, 10am - 7pm</div>
                    </div>

                    <div className="cnt-card">
                      <div className="cnt-icon-circle emerald">
                        <MapPin size={24} />
                      </div>
                      <div className="cnt-card-label">Location</div>
                      <div className="cnt-card-value">Mumbai</div>
                      <div className="cnt-card-sub">India</div>
                    </div>
                  </div>
                </FadeIn>
              </section>

              {/* SECTION 2: Contact Form */}
              <section id="message" className="cnt-section-offset">
                <FadeIn>
                  <div className="cnt-form-box">
                    <div className="cnt-accent-top" />
                    
                    <div className="cnt-form-header">
                      <h2 className="cnt-h2">Send a Message</h2>
                      <p className="cnt-desc">Fill out the form below and we'll get back to you as soon as possible.</p>
                    </div>

                    <form className="cnt-form-grid" onSubmit={(e) => e.preventDefault()}>
                      <div className="cnt-input-group">
                        <label className="cnt-label">First Name</label>
                        <input type="text" className="cnt-input" placeholder="e.g. Sarah" />
                      </div>
                      <div className="cnt-input-group">
                        <label className="cnt-label">Last Name</label>
                        <input type="text" className="cnt-input" placeholder="e.g. Connor" />
                      </div>
                      <div className="cnt-input-group cnt-full-width">
                        <label className="cnt-label">Email Address</label>
                        <input type="email" className="cnt-input" placeholder="sarah@example.com" />
                      </div>
                      <div className="cnt-input-group cnt-full-width">
                        <label className="cnt-label">Subject</label>
                        <select className="cnt-input">
                          <option>General Inquiry</option>
                          <option>Commission Request</option>
                          <option>Order Status</option>
                          <option>Collaboration</option>
                        </select>
                      </div>
                      <div className="cnt-input-group cnt-full-width">
                        <label className="cnt-label">Message</label>
                        <textarea className="cnt-textarea" placeholder="How can we help you today?"></textarea>
                      </div>
                      <div className="cnt-full-width">
                        <button className="cnt-submit-btn">
                          <span>Send Message</span>
                          <Send size={18} />
                        </button>
                      </div>
                    </form>
                  </div>
                </FadeIn>
              </section>

              {/* SECTION 3: FAQ */}
              <section id="faq" className="cnt-section-offset">
                <FadeIn>
                  <div style={{ marginBottom: "2rem" }}>
                    <h2 className="cnt-h2" style={{ fontSize: "1.75rem" }}>Frequently Asked Questions</h2>
                    <p className="cnt-desc">Quick answers to common questions about contacting us.</p>
                  </div>
                  <div className="cnt-faq-list">
                    {FAQS.map((item, idx) => (
                      <FaqItem 
                        key={idx} 
                        item={item} 
                        isOpen={openFaq === idx} 
                        onClick={() => setOpenFaq(idx === openFaq ? -1 : idx)} 
                      />
                    ))}
                  </div>
                </FadeIn>
              </section>

              {/* SECTION 4: Social Connect */}
              <section id="connect" className="cnt-section-offset">
                <FadeIn>
                  <div className="cnt-social-box">
                    {/* Abstract shapes inside box */}
                    <div style={{ position: "absolute", top: "-20%", right: "-10%", width: "300px", height: "300px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }} />
                    <div style={{ position: "absolute", bottom: "-20%", left: "-10%", width: "250px", height: "250px", background: "rgba(139, 92, 246, 0.2)", borderRadius: "50%", filter: "blur(40px)" }} />
                    
                    <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 700, margin: "0 0 1rem 0" }}>Stay Connected</h2>
                    <p style={{ color: "var(--c-slate-300)", maxWidth: "30rem", margin: "0 auto" }}>
                      Follow us on social media for behind-the-scenes looks, new artwork announcements, and exclusive offers.
                    </p>

                    <div className="cnt-social-links">
                      <a href="#" className="cnt-social-link">
                        <Instagram className="cnt-social-icon" />
                        <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Instagram</span>
                      </a>
                      <a href="#" className="cnt-social-link">
                        <Facebook className="cnt-social-icon" />
                        <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Facebook</span>
                      </a>
                      <a href="#" className="cnt-social-link">
                        <Globe className="cnt-social-icon" />
                        <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Website</span>
                      </a>
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