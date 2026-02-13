import { useEffect, useState, useRef } from "react";
import {
  Truck,
  Package,
  Undo2,
  ShieldCheck,
  Phone,
  Mail,
} from "lucide-react";

const POLICY_SECTIONS = [
  { id: "shipping", label: "Shipping Policy" },
  { id: "packaging", label: "Packaging & Handling" },
  { id: "returns", label: "Return & Refund Policy" },
  { id: "cancellation", label: "Order Cancellation" },
  { id: "contact", label: "Support & Contact" },
];

function FadeInSection({
  id,
  children,
}: {
  id?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </section>
  );
}

export default function ShippingReturnsPage() {
  const [activeSection, setActiveSection] = useState<string>("shipping");

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) setActiveSection(id);
          }
        });
      },
      { threshold: 0.3 }
    );

    POLICY_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative px-4 sm:px-6 lg:px-8 py-16">

      {/* Gradient background blobs */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-64 bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-0 h-64 w-80 bg-gradient-to-tr from-amber-500/15 to-rose-500/15 blur-3xl" />

      <div className="relative max-w-6xl mx-auto flex flex-col md:flex-row gap-10">

        {/* Sticky TOC */}
        <aside className="md:w-64 md:sticky md:top-28 h-max bg-white/80 backdrop-blur-sm border border-neutral-200 rounded-2xl shadow-sm p-4">
          <div className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500 mb-3">
            Overview
          </div>
          <p className="text-sm text-neutral-600 mb-4">
            Quickly jump to any section of the policy.
          </p>
          <nav className="space-y-1">
            {POLICY_SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`w-full text-left text-sm rounded-xl px-3 py-2 transition-all ${
                  activeSection === section.id
                    ? "bg-amber-50 text-amber-800 border border-amber-200 shadow-sm"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <div className="flex-1 space-y-16">

          {/* Hero */}
          <FadeInSection>
            <div className="text-center mb-10">
              <h1 className="text-4xl font-serif font-bold text-neutral-900 mb-4">
                Shipping & Returns
              </h1>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                We take utmost care to ensure every artwork is delivered safely,
                securely, and on time — so that it reaches you in perfect condition.
              </p>
            </div>

            {/* Highlight strip */}
            <div className="relative overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-r from-amber-50 via-rose-50 to-emerald-50 px-6 py-4 mb-10">
              <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-500 to-rose-500" />
              <p className="pl-4 text-sm text-neutral-700">
                <span className="font-semibold">Note:</span> All policies are
                crafted to protect both the collector and the artist, ensuring a
                transparent and trusted experience.
              </p>
            </div>
          </FadeInSection>

          {/* Summary Cards */}
          <FadeInSection>
            <div className="grid md:grid-cols-2 gap-8 mb-4">
              <div className="relative p-8 bg-white rounded-2xl shadow-sm border border-neutral-200">
                <div className="absolute -top-6 -left-6 h-16 w-16 bg-amber-500/10 rounded-full blur-xl" />
                <Truck className="w-10 h-10 text-amber-700 mb-4" />
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">
                  Shipping Timeline
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  Processing time: <strong>3–5 business days</strong>.<br />
                  Domestic delivery: <strong>5–10 days</strong>.<br />
                  International: <strong>10–21 days</strong>.
                </p>
              </div>

              <div className="relative p-8 bg-white rounded-2xl shadow-sm border border-neutral-200">
                <div className="absolute -top-6 -right-6 h-16 w-16 bg-rose-500/10 rounded-full blur-xl" />
                <Package className="w-10 h-10 text-amber-700 mb-4" />
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">
                  Secure Packaging
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  Multi-layer protective packaging with reinforced corners and
                  moisture-resistant materials to prevent damage during transit.
                </p>
              </div>

              <div className="relative p-8 bg-white rounded-2xl shadow-sm border border-neutral-200">
                <div className="absolute -bottom-6 -left-6 h-16 w-16 bg-emerald-500/10 rounded-full blur-xl" />
                <Undo2 className="w-10 h-10 text-amber-700 mb-4" />
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">
                  Return Eligibility
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  Returns accepted only for damaged artworks or incorrect
                  deliveries, with photo verification within{" "}
                  <strong>48 hours</strong> of delivery.
                </p>
              </div>

              <div className="relative p-8 bg-white rounded-2xl shadow-sm border border-neutral-200">
                <div className="absolute -bottom-6 -right-6 h-16 w-16 bg-amber-500/10 rounded-full blur-xl" />
                <ShieldCheck className="w-10 h-10 text-amber-700 mb-4" />
                <h2 className="text-xl font-semibold text-neutral-900 mb-3">
                  Buyer Protection
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  Every shipment is tracked and insured, giving you peace of mind
                  from studio dispatch to final delivery.
                </p>
              </div>
            </div>
          </FadeInSection>

          {/* Full Policy Details Box */}
          <FadeInSection>
            <div className="mt-10 bg-neutral-50/80 backdrop-blur-sm p-10 rounded-2xl border border-neutral-200 shadow-sm space-y-12">

              {/* Shipping */}
              <div id="shipping">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-3">
                  Shipping Policy
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  Once your order is placed, the artwork is carefully inspected,
                  finished if required, and prepared for dispatch. Processing time
                  is typically <strong>3–5 business days</strong>.
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-neutral-700">
                  <li>Domestic (India): 5–10 business days.</li>
                  <li>International: 10–21 business days, depending on destination.</li>
                  <li>Tracking details are shared via email once dispatched.</li>
                  <li>Shipping costs are calculated transparently at checkout.</li>
                </ul>
              </div>

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-neutral-300/70 to-transparent" />

              {/* Packaging */}
              <div id="packaging">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-3">
                  Packaging & Handling
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  We use gallery-grade packing methods to ensure each artwork
                  arrives in the same condition it leaves the studio.
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-neutral-700">
                  <li>Reinforced corners and protective edge guards.</li>
                  <li>Moisture-resistant inner wrapping.</li>
                  <li>Bubble wrap and double-wall cardboard boxes.</li>
                  <li>Custom wooden crates for large or high-value works.</li>
                </ul>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-neutral-300/70 to-transparent" />

              {/* Returns */}
              <div id="returns">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-3">
                  Return & Refund Policy
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  Each piece is original and made with care, so returns are only
                  accepted under specific conditions:
                </p>
                <ul className="list-disc list-inside mt-3 space-y-1 text-neutral-700">
                  <li>The artwork arrives visibly damaged.</li>
                  <li>The wrong artwork was delivered.</li>
                </ul>
                <p className="text-neutral-700 leading-relaxed mt-3">
                  In such cases, please contact us within{" "}
                  <strong>48 hours of delivery</strong> with clear photos/videos
                  of the artwork and packaging. Once verified, we will offer a
                  replacement (if available) or a full refund.
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-neutral-300/70 to-transparent" />

              {/* Cancellation */}
              <div id="cancellation">
                <h2 className="text-2xl font-semibold text-neutral-900 mb-3">
                  Order Cancellation
                </h2>
                <p className="text-neutral-700 leading-relaxed">
                  Orders can be cancelled within{" "}
                  <strong>12 hours of purchase</strong>. After processing and
                  packaging begin, cancellation requests cannot be accommodated as
                  the artwork is already prepared for dispatch.
                </p>
              </div>

              <div className="h-px bg-gradient-to-r from-transparent via-neutral-300/70 to-transparent" />

              {/* Contact */}
              <div id="contact" className="grid md:grid-cols-[1.2fr,1fr] gap-6 items-center">
                <div>
                  <h2 className="text-2xl font-semibold text-neutral-900 mb-3">
                    Support & Contact
                  </h2>
                  <p className="text-neutral-700 leading-relaxed mb-3">
                    Have questions about your shipment, tracking details, or a
                    recent delivery? We’re here to help.
                  </p>
                  <p className="text-neutral-700 leading-relaxed">
                    Share your order ID and any relevant photos so we can assist
                    you as quickly as possible.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-amber-700" />
                    <div>
                      <div className="text-xs uppercase tracking-wide text-neutral-500">
                        Email
                      </div>
                      <div className="text-sm font-medium text-neutral-800">
                        poojascreativepalette@gmail.com
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-amber-700" />
                    <div>
                      <div className="text-xs uppercase tracking-wide text-neutral-500">
                        Phone / WhatsApp
                      </div>
                      <div className="text-sm font-medium text-neutral-800">
                        +91 9833325936
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-neutral-500 pt-2">
                    Response time: typically within 24–48 business hours.
                  </p>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </div>
    </div>
  );
}
