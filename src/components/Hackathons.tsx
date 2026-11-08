import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { hackathons } from "@/data/portfolio";
import SectionLabel from "./SectionLabel";
import SectionGlow from "./SectionGlow";
import ImagePreviewModal, { type ImagePreview } from "./ImagePreviewModal";

export default function Hackathons() {
  const [open, setOpen] = useState<number | null>(0);
  const [selected, setSelected] = useState<ImagePreview | null>(null);

  return (
    <section id="hackathons" aria-labelledby="section-07-title" className="relative overflow-hidden px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-28 py-24 md:py-28 lg:py-32 max-w-[1600px] mx-auto">
      <SectionGlow position="top-right" color="signal" />
      <SectionLabel index="07" module="Event Log" title="Hackathons" id="section-07-title" />

      <div className="relative">
        <div className="absolute left-[15px] sm:left-1/2 top-0 bottom-0 w-px bg-[var(--color-line)] sm:-translate-x-1/2" />

        <div className="space-y-8">
          {hackathons.map((h, i) => {
            const isOpen = open === i;
            const alignRight = i % 2 === 1;
            return (
              <motion.div
                key={h.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`relative pl-10 sm:pl-0 sm:w-1/2 ${alignRight ? "sm:ml-auto sm:pl-10" : "sm:pr-10"}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute left-[9px] sm:left-auto top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[var(--color-ink)] bg-[var(--color-signal)] ${
                    alignRight ? "sm:-left-[7px]" : "sm:-right-[7px]"
                  }`}
                  style={{ boxShadow: "0 0 0 3px color-mix(in srgb, var(--color-signal) 25%, transparent)" }}
                />
                <div className="card p-5 hover:border-[var(--color-signal-dim)] transition-colors">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`hackathon-panel-${i}`}
                    className="w-full text-left"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-mono text-[10px] tracking-widest signal-text">{h.year}</p>
                        <p className="font-display font-semibold text-lg mt-1">{h.name}</p>
                        <p className="text-xs text-[var(--color-text-dim)] mt-1">{h.organization}</p>
                      </div>
                    </div>
                  </button>

                  <div id={`hackathon-panel-${i}`}>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="mt-4 pt-4 border-t border-[var(--color-line)] space-y-3">
                            {h.project && (
                              <p className="text-sm text-[var(--color-text-dim)]">
                                <span className="label mr-2">Project</span>
                                {h.project}
                              </p>
                            )}
                            {h.achievement && (
                              <p className="text-sm text-[var(--color-text-dim)]">{h.achievement}</p>
                            )}
                            <button
                              type="button"
                              onClick={() =>
                                setSelected({ src: h.image, title: h.name, subtitle: `${h.organization} · ${h.year}` })
                              }
                              data-cursor="image"
                              className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider signal-text hover:opacity-80 transition-opacity"
                            >
                              <Maximize2 size={12} aria-hidden="true" /> View Proof
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ImagePreviewModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
