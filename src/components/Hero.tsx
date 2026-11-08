import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { personalInfo } from "@/data/portfolio";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative min-h-[100svh] flex items-center pt-32 pb-20 px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-28 overflow-hidden"
    >
      {/* ambient backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 78% 18%, color-mix(in srgb, var(--color-signal) 10%, transparent), transparent), radial-gradient(45% 40% at 15% 85%, color-mix(in srgb, var(--color-violet) 9%, transparent), transparent)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-line) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="max-w-[1600px] mx-auto w-full grid lg:grid-cols-[1.15fr_0.85fr] gap-14 xl:gap-24 items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-3 py-1.5 mb-7 font-mono text-[11px] tracking-widest text-[var(--color-signal)]"
          >
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[var(--color-signal)] animate-blink" />
            {personalInfo.status}
          </motion.div>

          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="font-display font-semibold leading-[0.98] tracking-tight text-balance"
            style={{ fontSize: "clamp(2.75rem, 6vw, 6.5rem)" }}
          >
            ADITYA
            <br />
            KUMAR JHA
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-6 font-mono text-sm tracking-wide text-[var(--color-signal)]"
          >
            Computer Science &amp; Engineering Student
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-1 font-mono text-sm tracking-wide text-[var(--color-text-dim)]"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 max-w-xl text-[var(--color-text-dim)] leading-relaxed text-balance"
          >
            {personalInfo.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.38 }}
            className="mt-9 flex flex-wrap items-center gap-3.5"
          >
            <motion.a
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.97 }}
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-signal)] text-[var(--color-ink)] font-mono text-xs uppercase tracking-wider font-medium px-6 py-3.5 hover:brightness-110 transition-[filter]"
            >
              Explore My Work
              <ArrowDown size={14} />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.035 }}
              whileTap={{ scale: 0.97 }}
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] font-mono text-xs uppercase tracking-wider px-6 py-3.5 text-[var(--color-text)] hover:border-[var(--color-signal)] hover:text-[var(--color-signal)] transition-colors"
            >
              <Download size={14} />
              Download Resume
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative mx-auto w-full max-w-[340px] xl:max-w-[420px]"
        >
          <div className="relative rounded-[28px] p-[1px] overflow-hidden"
            style={{ background: "linear-gradient(155deg, var(--color-signal) 0%, transparent 35%, transparent 70%, var(--color-violet) 100%)" }}
          >
            <div className="relative rounded-[27px] bg-[var(--color-surface)] overflow-hidden aspect-[4/5]">
              <img
                src={personalInfo.photoPath}
                alt={`${personalInfo.name} — profile photo`}
                width={840}
                height={1112}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                data-cursor="image"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                  const fallback = e.currentTarget.parentElement?.querySelector(".fallback-initials");
                  if (fallback) (fallback as HTMLElement).style.display = "flex";
                }}
              />
              <div
                className="fallback-initials absolute inset-0 hidden items-center justify-center font-display text-7xl font-semibold text-[var(--color-text-faint)]"
                style={{
                  background:
                    "radial-gradient(circle at 50% 35%, var(--color-surface-2), var(--color-surface))",
                }}
              >
                {personalInfo.initials}
              </div>

              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[var(--color-ink)] via-transparent to-transparent opacity-70" />

              {/* scan line */}
              <div aria-hidden="true" className="absolute left-0 right-0 h-16 opacity-20 pointer-events-none"
                style={{
                  background: "linear-gradient(180deg, transparent, var(--color-signal), transparent)",
                  animation: "scanY 3.2s ease-in-out infinite",
                }}
              />
            </div>
          </div>

          {/* floating ID metadata */}
          <div className="absolute -bottom-5 -left-5 glass rounded-2xl px-4 py-3 font-mono text-[10px] tracking-widest text-[var(--color-text-dim)]">
            <p className="text-[var(--color-signal)]">ID // AKJ-001</p>
            <p className="mt-1">ROLE: BUILDER</p>
          </div>
          <div className="absolute -top-4 -right-4 glass rounded-full px-3 py-1.5 font-mono text-[10px] tracking-widest text-[var(--color-signal)] flex items-center gap-1.5">
            <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[var(--color-signal)]" />
            VERIFIED
          </div>
        </motion.div>
      </div>
    </section>
  );
}
