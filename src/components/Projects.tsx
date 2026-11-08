import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";
import SectionLabel from "./SectionLabel";
import { GithubIcon } from "./BrandIcons";
import SectionGlow from "./SectionGlow";
import { useDialog } from "@/lib/useDialog";

export default function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const titleId = useId();
  const dialogRef = useDialog({ open: Boolean(selected), onClose: () => setSelected(null) });

  return (
    <section id="projects" aria-labelledby="section-04-title" className="relative overflow-hidden px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-28 py-24 md:py-28 lg:py-32 max-w-[1600px] mx-auto">
      <SectionGlow position="top-left" color="violet" />
      <SectionLabel
        index="04"
        module="Case Studies"
        title="Projects"
        description="Selected work — the problem each one solved and how it was built."
        id="section-04-title"
      />

      <div className="space-y-4">
        {projects.map((p, i) => (
          <motion.button
            key={p.name}
            onClick={() => setSelected(p)}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="w-full text-left card p-6 sm:p-7 hover:border-[var(--color-signal-dim)] transition-colors group"
          >
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-5">
                <span className="font-mono text-xs text-[var(--color-text-faint)] pt-1.5 shrink-0">
                  {p.number}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-xl sm:text-2xl tracking-tight">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-dim)] leading-relaxed max-w-xl">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {p.stack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-1 rounded-full border border-[var(--color-line)] text-[var(--color-text-dim)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <ArrowUpRight
                size={20}
                className="text-[var(--color-text-faint)] group-hover:text-[var(--color-signal)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
              />
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-99 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full sm:max-w-2xl max-h-[88vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-7 sm:p-9"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="font-mono text-xs text-[var(--color-signal)]">
                  PROJECT {selected.number}
                </span>
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="p-1.5 rounded-full border border-[var(--color-line)] hover:border-[var(--color-signal)] transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              <h3 id={titleId} className="font-display font-semibold text-3xl tracking-tight mb-6">
                {selected.name}
              </h3>

              <div className="space-y-5">
                <div>
                  <p className="label mb-1.5">Problem</p>
                  <p className="text-sm text-[var(--color-text-dim)] leading-relaxed">{selected.problem}</p>
                </div>
                <div>
                  <p className="label mb-1.5">Approach</p>
                  <p className="text-sm text-[var(--color-text-dim)] leading-relaxed">{selected.approach}</p>
                </div>
                <div>
                  <p className="label mb-1.5">Key Features</p>
                  <ul className="space-y-1.5">
                    {selected.features.map((f) => (
                      <li key={f} className="text-sm text-[var(--color-text-dim)] flex gap-2">
                        <span className="signal-text">›</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="label mb-1.5">Stack</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.stack.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] px-2 py-1 rounded-full border border-[var(--color-line)] text-[var(--color-text-dim)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-8">
                {selected.liveUrl && (
                  <a
                    href={selected.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[var(--color-signal)] text-[var(--color-ink)] font-mono text-xs uppercase tracking-wider px-5 py-3"
                  >
                    Live Demo <ArrowUpRight size={13} />
                  </a>
                )}
                {selected.githubUrl && (
                  <a
                    href={selected.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] font-mono text-xs uppercase tracking-wider px-5 py-3 hover:border-[var(--color-signal)] hover:text-[var(--color-signal)] transition-colors"
                  >
                    <GithubIcon size={14} /> Source Code
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
