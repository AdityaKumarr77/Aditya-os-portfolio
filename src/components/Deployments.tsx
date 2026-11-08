import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { deployments } from "@/data/portfolio";
import SectionLabel from "./SectionLabel";
import { GithubIcon } from "./BrandIcons";
import SectionGlow from "./SectionGlow";

const statusColor: Record<string, string> = {
  LIVE: "var(--color-signal)",
  DEPLOYED: "var(--color-signal)",
  OFFLINE: "var(--color-text-faint)",
};

export default function Deployments() {
  return (
    <section id="deployments" aria-labelledby="section-03-title" className="relative overflow-hidden px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-28 py-24 md:py-28 lg:py-32 max-w-[1600px] mx-auto">
      <SectionGlow position="top-right" color="signal" />
      <SectionLabel
        index="03"
        module="Deployment Monitor"
        title="Deployments"
        description="Projects currently shipped and reachable outside this page."
        id="section-03-title"
      />

      <div className="card overflow-hidden">
        <div className="hidden sm:grid grid-cols-[1.4fr_1.6fr_1fr_0.8fr_auto] gap-4 px-6 py-3 border-b border-[var(--color-line)] label">
          <span>Project</span>
          <span>Stack</span>
          <span>Status</span>
          <span>Uptime</span>
          <span className="text-right">Links</span>
        </div>

        {deployments.map((d, i) => (
          <motion.div
            key={d.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="grid sm:grid-cols-[1.4fr_1.6fr_1fr_0.8fr_auto] gap-4 px-6 py-5 border-b border-[var(--color-line-soft)] last:border-b-0 items-center"
          >
            <div>
              <p className="font-display font-semibold">{d.name}</p>
              <p className="text-xs text-[var(--color-text-dim)] mt-1 leading-relaxed sm:max-w-xs">
                {d.description}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {d.stack.map((t) => (
                <span
                  key={t}
                  className="font-mono text-[10px] px-2 py-1 rounded-full border border-[var(--color-line)] text-[var(--color-text-dim)]"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 font-mono text-xs" style={{ color: statusColor[d.status] }}>
              <span
                aria-hidden="true"
                className="w-1.5 h-1.5 rounded-full animate-blink"
                style={{ background: statusColor[d.status] }}
              />
              {d.status}
            </div>
            <div className="font-mono text-xs text-[var(--color-text-dim)]">
              {d.status === "OFFLINE" ? "—" : "99.9%"}
            </div>
            <div className="flex items-center gap-2 justify-start sm:justify-end">
              {d.liveUrl && (
                <a
                  href={d.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live site for ${d.name}`}
                  className="p-2 rounded-full border border-[var(--color-line)] hover:border-[var(--color-signal)] hover:text-[var(--color-signal)] transition-colors"
                >
                  <ExternalLink size={14} />
                </a>
              )}
              {d.githubUrl && (
                <a
                  href={d.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open source code for ${d.name}`}
                  className="p-2 rounded-full border border-[var(--color-line)] hover:border-[var(--color-signal)] hover:text-[var(--color-signal)] transition-colors"
                >
                  <GithubIcon size={14} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
