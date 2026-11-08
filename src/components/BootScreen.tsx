import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/data/portfolio";
import { usePrefersReducedMotion } from "@/lib/hooks";

const LINES = [
  "Loading identity...",
  "Loading projects...",
  "Loading experience...",
  "Loading skills...",
];

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [visibleLines, setVisibleLines] = useState(0);
  const [systemOnline, setSystemOnline] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (reduced) {
      onDone();
      return;
    }

    const stepDelay = 190;
    const timers: ReturnType<typeof setTimeout>[] = [];

    LINES.forEach((_, i) => {
      timers.push(
        setTimeout(() => setVisibleLines(i + 1), 220 + i * stepDelay)
      );
    });
    timers.push(
      setTimeout(() => setSystemOnline(true), 220 + LINES.length * stepDelay + 150)
    );
    timers.push(
      setTimeout(() => setExiting(true), 220 + LINES.length * stepDelay + 850)
    );
    timers.push(
      setTimeout(() => onDone(), 220 + LINES.length * stepDelay + 1250)
    );

    return () => timers.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  if (reduced) return null;

  const skip = () => {
    setExiting(true);
    setTimeout(onDone, 350);
  };

  return (
    <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[var(--color-ink)] font-mono"
          initial={{ opacity: 1 }}
          animate={{ opacity: exiting ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{ pointerEvents: exiting ? "none" : "auto" }}
          aria-hidden={exiting}
        >
          <p className="sr-only" role="status">
            Loading portfolio
          </p>

          <button
            onClick={skip}
            className="absolute top-6 right-6 text-[11px] tracking-widest text-[var(--color-text-faint)] hover:text-[var(--color-signal)] transition-colors uppercase border border-[var(--color-line)] rounded-full px-3 py-1.5"
          >
            Skip →
          </button>

          <div aria-hidden="true" className="w-[min(90vw,420px)] text-left">
            <p className="text-[var(--color-signal)] text-sm tracking-widest mb-6">
              INITIALIZING ADITYA.OS
              <span className="animate-blink">_</span>
            </p>

            <div className="space-y-2 min-h-[110px]">
              {LINES.map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: i < visibleLines ? 1 : 0, x: i < visibleLines ? 0 : -6 }}
                  transition={{ duration: 0.25 }}
                  className="text-xs text-[var(--color-text-dim)]"
                >
                  <span className="text-[var(--color-signal-dim)]">$</span> {line}
                  {i < visibleLines ? (
                    <span className="text-[var(--color-signal)]"> ✓</span>
                  ) : null}
                </motion.p>
              ))}
            </div>

            <AnimatePresence>
              {systemOnline && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                  className="mt-6 pt-5 border-t border-[var(--color-line)]"
                >
                  <p className="text-[var(--color-signal)] text-xs tracking-widest mb-2">
                    SYSTEM ONLINE ✓
                  </p>
                  <p className="font-display text-2xl sm:text-3xl font-semibold text-[var(--color-text)] tracking-tight">
                    {personalInfo.name.toUpperCase()}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
    </AnimatePresence>
  );
}
