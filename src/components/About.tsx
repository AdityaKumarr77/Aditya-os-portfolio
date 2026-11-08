import { motion } from "framer-motion";
import { GraduationCap, Compass, Sparkles } from "lucide-react";
import { personalInfo, stats } from "@/data/portfolio";
import SectionLabel from "./SectionLabel";
import SectionGlow from "./SectionGlow";

const cards = [
  {
    icon: GraduationCap,
    title: "Education",
    body: "B.Tech, Computer Science & Engineering",
  },
  {
    icon: Compass,
    title: "Current Focus",
    body: "Full-stack development, applied AI/ML and data analytics",
  },
  {
    icon: Sparkles,
    title: "Interests",
    body: "Competitive programming, system design, building useful tools",
  },
];

export default function About() {
  return (
    <section id="about" aria-labelledby="section-01-title" className="relative overflow-hidden px-6 sm:px-10 lg:px-14 xl:px-20 2xl:px-28 py-24 md:py-28 lg:py-32 max-w-[1600px] mx-auto">
      <SectionGlow position="top-right" color="signal" />
      <SectionLabel index="01" module="Identity Module" title="About" id="section-01-title" />

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-14">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-lg sm:text-xl leading-relaxed text-[var(--color-text-dim)] text-balance"
        >
          {personalInfo.bio}
        </motion.p>

        <div className="grid grid-cols-2 gap-4 content-start">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="card p-5"
            >
              <p className="font-display text-3xl font-semibold signal-text">{stat.value}</p>
              <p className="label mt-1.5">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mt-14">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="card p-6 lg:p-7 hover:border-[var(--color-signal-dim)] hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(63,232,201,0.35)] transition-all duration-300"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--color-surface-2)] border border-[var(--color-line)] flex items-center justify-center">
              <card.icon size={18} className="signal-text" strokeWidth={1.6} />
            </div>
            <p className="label mt-5 mb-1.5">{card.title}</p>
            <p className="text-[var(--color-text)] text-sm leading-relaxed">{card.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
