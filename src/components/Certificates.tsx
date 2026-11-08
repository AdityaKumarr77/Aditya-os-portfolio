import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { certificates } from "@/data/portfolio";
import SectionLabel from "./SectionLabel";
import SectionGlow from "./SectionGlow";
import ImagePreviewModal, { type ImagePreview } from "./ImagePreviewModal";
import { thumbnailSrc } from "@/lib/images";

export default function Certificates() {
  const [selected, setSelected] = useState<ImagePreview | null>(null);
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (i: number) => {
    const clamped = Math.max(0, Math.min(certificates.length - 1, i));
    setActive(clamped);
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[clamped] as HTMLElement | undefined;
    card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = (track.children[0] as HTMLElement)?.offsetWidth ?? 1;
    const gap = 20;
    const i = Math.round(track.scrollLeft / (cardWidth + gap));
    setActive(Math.max(0, Math.min(certificates.length - 1, i)));
  };

  return (
    <section id="certificates" aria-labelledby="section-05-title" className="relative overflow-hidden px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-28 py-24 md:py-28 lg:py-32 max-w-[1600px] mx-auto">
      <SectionGlow position="top-right" color="amber" />

      <div className="flex items-end justify-between gap-6 mb-14 lg:mb-16">
        <SectionLabel
          index="05"
          module="Credential Archive"
          title="Certificates"
          description="Slide through and click any certificate to view it at full size."
          id="section-05-title"
        />
        <div className="hidden sm:flex items-center gap-2 shrink-0 pb-1">
          <button
            onClick={() => scrollToIndex(active - 1)}
            disabled={active === 0}
            aria-label="Previous certificate"
            className="w-10 h-10 rounded-full border border-[var(--color-line)] flex items-center justify-center text-[var(--color-text-dim)] hover:border-[var(--color-signal)] hover:text-[var(--color-signal)] disabled:opacity-30 disabled:hover:border-[var(--color-line)] disabled:hover:text-[var(--color-text-dim)] transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollToIndex(active + 1)}
            disabled={active === certificates.length - 1}
            aria-label="Next certificate"
            className="w-10 h-10 rounded-full border border-[var(--color-line)] flex items-center justify-center text-[var(--color-text-dim)] hover:border-[var(--color-signal)] hover:text-[var(--color-signal)] disabled:opacity-30 disabled:hover:border-[var(--color-line)] disabled:hover:text-[var(--color-text-dim)] transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        role="region"
        aria-roledescription="carousel"
        aria-label="Certificate archive"
        tabIndex={0}
        className="flex gap-5 overflow-x-auto pb-4 -mx-6 px-6 sm:mx-0 sm:px-0 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {certificates.map((c, i) => (
          <motion.button
            key={c.title}
            onClick={() =>
              setSelected({ src: c.image, title: c.title, subtitle: `${c.issuer} · ${c.date}` })
            }
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group relative shrink-0 snap-start w-[78%] xs:w-[65%] sm:w-[42%] lg:w-[30%] xl:w-[23%] rounded-2xl overflow-hidden border border-[var(--color-line)] bg-[var(--color-surface)] text-left hover:border-[var(--color-signal-dim)] hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(240,178,63,0.35)] transition-all duration-300"
          >
            <div className="aspect-[4/3] overflow-hidden bg-[var(--color-surface-2)] relative">
              <img
                src={thumbnailSrc(c.image)}
                alt=""
                loading="lazy"
                decoding="async"
                data-cursor="image"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = "0";
                }}
              />
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 size={13} className="text-white" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
              <p className="font-display font-semibold text-sm text-white">{c.title}</p>
              <p className="font-mono text-[10px] tracking-wider text-[var(--color-signal)] mt-1">
                {c.issuer}
              </p>
            </div>
            <div className="p-4 group-hover:opacity-0 transition-opacity">
              <p className="font-display font-medium text-sm">{c.title}</p>
              <p className="text-xs text-[var(--color-text-dim)] mt-1">{c.issuer}</p>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Slide indicators */}
      <div className="flex flex-wrap items-center justify-center gap-0 mt-6">
        {certificates.map((c, i) => (
          <button
            key={c.title}
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to certificate ${i + 1}`}
            aria-current={active === i ? "true" : undefined}
            className="flex h-6 w-6 items-center justify-center rounded-full"
          >
            <span
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: active === i ? 22 : 6,
                background: active === i ? "var(--color-signal)" : "var(--color-line)",
              }}
            />
          </button>
        ))}
      </div>

      <ImagePreviewModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
