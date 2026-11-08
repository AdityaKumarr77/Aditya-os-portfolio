import { motion } from "framer-motion";

export default function SectionLabel({
  index,
  module,
  title,
  description,
  id,
}: {
  index: string;
  module: string;
  title: string;
  description?: string;
  id?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-14 lg:mb-16 max-w-2xl"
    >
      <p className="label mb-3 flex items-center gap-2">
        <span className="signal-text">{index}</span>
        <span className="w-4 h-px bg-[var(--color-line)]" />
        {module}
      </p>
      <h2 id={id} className="font-display font-semibold tracking-tight text-3xl sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-[var(--color-text-dim)] leading-relaxed text-base lg:text-lg">{description}</p>
      )}
    </motion.div>
  );
}
