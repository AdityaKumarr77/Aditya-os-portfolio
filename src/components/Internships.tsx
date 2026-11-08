import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, Maximize2 } from "lucide-react";
import { internships } from "@/data/portfolio";
import SectionLabel from "./SectionLabel";
import SectionGlow from "./SectionGlow";
import ImagePreviewModal, { type ImagePreview } from "./ImagePreviewModal";
import { thumbnailSrc } from "@/lib/images";

export default function Internships() {
  const [selected, setSelected] = useState<ImagePreview | null>(null);

  return (
    <section id="internships" aria-labelledby="section-08-title" className="relative overflow-hidden px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-28 py-24 md:py-28 lg:py-32 max-w-[1600px] mx-auto">
      <SectionGlow position="top-left" color="amber" />
      <SectionLabel
        index="08"
        module="Experience Log"
        title="Internships"
        description="Click a preview to view the certificate at full size."
        id="section-08-title"
      />

      <div className="space-y-4">
        {internships.map((intern, i) => (
          <motion.div
            key={intern.organization}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            className="card p-6 sm:p-7 lg:p-8 grid sm:grid-cols-[auto_1fr_auto] gap-6 items-start hover:border-[var(--color-signal-dim)] transition-colors"
          >
            <div className="flex sm:flex-col items-center sm:items-start gap-3 sm:gap-2">
              <div className="w-11 h-11 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-line)] flex items-center justify-center shrink-0">
                <Briefcase size={18} className="signal-text" strokeWidth={1.6} />
              </div>
              <p className="font-mono text-[10px] tracking-widest text-[var(--color-text-faint)] sm:mt-1">
                {intern.duration}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="font-display font-semibold text-lg lg:text-xl">{intern.organization}</h3>
                <span className="font-mono text-xs signal-text">{intern.role}</span>
              </div>
              <ul className="mt-3 space-y-1.5">
                {intern.work.map((w) => (
                  <li key={w} className="text-sm text-[var(--color-text-dim)] leading-relaxed flex gap-2">
                    <span className="signal-text shrink-0">›</span>
                    {w}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5 mt-4">
                {intern.stack.map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-2 py-1 rounded-full border border-[var(--color-line)] text-[var(--color-text-dim)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                setSelected({
                  src: intern.image,
                  title: `${intern.organization} — ${intern.role}`,
                  subtitle: intern.duration,
                })
              }
              data-cursor="image"
              aria-label={`View certificate for ${intern.organization}`}
              className="group relative w-full sm:w-28 lg:w-32 aspect-[4/3] rounded-xl overflow-hidden border border-[var(--color-line)] bg-[var(--color-surface-2)] shrink-0"
            >
              <img
                src={thumbnailSrc(intern.image)}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0";
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={16} className="text-white" />
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      <ImagePreviewModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
