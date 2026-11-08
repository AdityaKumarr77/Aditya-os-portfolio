import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { contactInfo, socialLinks } from "@/data/portfolio";
import SectionLabel from "./SectionLabel";
import SectionGlow from "./SectionGlow";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio message from ${form.name || "a visitor"}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" aria-labelledby="section-09-title" className="relative overflow-hidden px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-28 py-24 md:py-28 lg:py-32 max-w-[1600px] mx-auto">
      <SectionGlow position="bottom-right" color="signal" />
      <SectionLabel index="09" module="Communication Uplink" title="Open Connection" description="Have an idea? Let's build something." id="section-09-title" />

      <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8">
        <div className="space-y-4">
          <a
            href={`mailto:${contactInfo.email}`}
            className="card p-5 flex items-center gap-4 hover:border-[var(--color-signal-dim)] transition-colors"
          >
            <Mail size={18} className="signal-text shrink-0" strokeWidth={1.6} />
            <div>
              <p className="label mb-1">Email</p>
              <p className="text-sm">{contactInfo.email}</p>
            </div>
          </a>
          <a
            href={`tel:${socialLinks.phone.replace(/\s/g, "")}`}
            className="card p-5 flex items-center gap-4 hover:border-[var(--color-signal-dim)] transition-colors"
          >
            <Phone size={18} className="signal-text shrink-0" strokeWidth={1.6} />
            <div>
              <p className="label mb-1">Phone</p>
              <p className="text-sm">{contactInfo.phone}</p>
            </div>
          </a>
          <div className="card p-5 flex items-center gap-4">
            <MapPin size={18} className="signal-text shrink-0" strokeWidth={1.6} />
            <div>
              <p className="label mb-1">Location</p>
              <p className="text-sm">{contactInfo.address}</p>
            </div>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
          className="card p-6 sm:p-7 font-mono"
        >
          <p className="text-[11px] tracking-widest text-[var(--color-text-faint)] mb-5">
            <span className="signal-text">$</span> compose --new-message
          </p>

          <label className="block mb-4">
            <span className="label block mb-1.5">Your Name</span>
            <input
              required
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-[var(--color-surface-2)] border border-[var(--color-line)] rounded-lg px-3.5 py-2.5 text-sm font-body text-[var(--color-text)] focus:border-[var(--color-signal)] outline-none transition-colors"
              placeholder="Jane Doe"
            />
          </label>

          <label className="block mb-4">
            <span className="label block mb-1.5">Your Email</span>
            <input
              required
              type="email"
              name="email"
              autoComplete="email"
              inputMode="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-[var(--color-surface-2)] border border-[var(--color-line)] rounded-lg px-3.5 py-2.5 text-sm font-body text-[var(--color-text)] focus:border-[var(--color-signal)] outline-none transition-colors"
              placeholder="jane@example.com"
            />
          </label>

          <label className="block mb-6">
            <span className="label block mb-1.5">Message</span>
            <textarea
              required
              name="message"
              autoComplete="off"
              rows={4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-[var(--color-surface-2)] border border-[var(--color-line)] rounded-lg px-3.5 py-2.5 text-sm font-body text-[var(--color-text)] focus:border-[var(--color-signal)] outline-none transition-colors resize-none"
              placeholder="Let's build something..."
            />
          </label>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[var(--color-signal)] text-[var(--color-ink)] text-xs uppercase tracking-wider font-medium py-3.5 hover:brightness-110 transition-all"
          >
            Send Message <Send size={14} />
          </button>

          {sent && (
            <p role="status" aria-live="polite" className="mt-3 text-[11px] text-[var(--color-signal)] text-center">
              Your email client should now be open with the message ready to send.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
