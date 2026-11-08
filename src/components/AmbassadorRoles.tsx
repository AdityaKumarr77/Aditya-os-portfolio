import { motion } from "framer-motion";
import { BadgeCheck, Maximize2 } from "lucide-react";
import { useState } from "react";
import { ambassadorRoles } from "@/data/portfolio";
import SectionLabel from "./SectionLabel";
import SectionGlow from "./SectionGlow";
import ImagePreviewModal, { type ImagePreview } from "./ImagePreviewModal";
import { thumbnailSrc } from "@/lib/images";

export default function AmbassadorRoles() {
  const [selected, setSelected] = useState<ImagePreview | null>(null);

  return (
    <section id="roles" aria-labelledby="section-06-title" className="relative overflow-hidden px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-28 py-24 md:py-28 lg:py-32 max-w-[1600px] mx-auto">
      <SectionGlow position="top-left" color="violet" />
      <SectionLabel
        index="06"
        module="Community Access"
        title="Ambassador Roles"
        description="Community and outreach roles beyond coursework and projects."
        id="section-06-title"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        {ambassadorRoles.map((r, i) => (
          <motion.div
            key={r.role + i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="relative card p-6 overflow-hidden"
          >
            <div
              className="absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-10"
              style={{ background: "var(--color-violet)", filter: "blur(30px)" }}
            />
            <div className="flex items-center justify-between mb-5">
              <BadgeCheck size={22} className="signal-text" strokeWidth={1.6} />
              <span
                className={`font-mono text-[10px] tracking-widest px-2.5 py-1 rounded-full border ${
                  r.status === "ACTIVE"
                    ? "border-[var(--color-signal)] text-[var(--color-signal)]"
                    : "border-[var(--color-line)] text-[var(--color-text-faint)]"
                }`}
              >
                {r.status}
              </span>
            </div>
            <p className="label mb-1">Role</p>
            <p className="font-display font-semibold text-lg mb-4">{r.role}</p>
            <p className="label mb-1">Organization</p>
            <p className="text-sm text-[var(--color-text-dim)] mb-4">{r.organization}</p>
            <p className="label mb-1">Contribution</p>
            <p className="text-sm text-[var(--color-text-dim)]">{r.contribution}</p>
            <button
              onClick={() => setSelected({ src: r.image, title: `${r.organization} — ${r.role}` })}
              data-cursor="image"
              aria-label={`View certificate for ${r.organization}`}
              className="group relative mt-5 w-full aspect-[16/7] rounded-xl overflow-hidden border border-[var(--color-line)] bg-[var(--color-surface-2)]"
            >
              <img
                src={thumbnailSrc(r.image)}
                alt=""
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={16} className="text-white" />
              </span>
            </button>
          </motion.div>
        ))}
      </div>
      <ImagePreviewModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
