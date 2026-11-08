import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { personalInfo, projects, skills, socialLinks } from "@/data/portfolio";
import { useDialog } from "@/lib/useDialog";

type Line = { text: string; kind?: "cmd" | "out" };

const HELP = "about · projects · skills · experience · contact · github · resume · clear";

function AssistantLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative flex items-center justify-center rounded-2xl border border-[var(--color-signal)] bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.38),transparent_32%),linear-gradient(145deg,color-mix(in_srgb,var(--color-signal)_24%,transparent),color-mix(in_srgb,var(--color-surface-2)_80%,transparent))] shadow-[0_0_26px_color-mix(in_srgb,var(--color-signal)_22%,transparent)] ${compact ? "h-7 w-7 sm:h-8 sm:w-8" : "h-8 w-8 sm:h-9 sm:w-9"}`}
    >
      <div className={`relative flex items-center justify-center ${compact ? "h-4 w-4 sm:h-5 sm:w-5" : "h-4 w-4 sm:h-5 sm:w-5"}`}>
        <span className={`absolute rounded-full border border-[var(--color-signal)] bg-[var(--color-ink)]/10 ${compact ? "h-3.5 w-3.5 sm:h-4 sm:w-4" : "h-4 w-4"}`} />
        <span className={`absolute rounded-full bg-[var(--color-signal)] shadow-[0_0_12px_var(--color-signal)] ${compact ? "h-2 w-2 sm:h-2.5 sm:w-2.5" : "h-2.5 w-2.5"}`} />
        <span className={`absolute rounded-full bg-[var(--color-text)] ${compact ? "-top-0.5 left-1 h-1 w-1 sm:-top-1 sm:left-1 sm:h-1.5 sm:w-1.5" : "-top-1 left-1 h-1.5 w-1.5"}`} />
      </div>
      <span className={`absolute -bottom-1 -right-1 flex items-center justify-center rounded-full bg-[var(--color-ink)] ring-2 ring-[var(--color-signal)] ${compact ? "h-2.5 w-2.5 sm:h-3 sm:w-3" : "h-3 w-3"}`}>
        <span className={`rounded-full bg-[var(--color-signal)] ${compact ? "h-1 w-1 sm:h-1.5 sm:w-1.5" : "h-1.5 w-1.5"}`} />
      </span>
    </div>
  );
}

function run(cmd: string): { output: string[]; action?: () => void } {
  const c = cmd.trim().toLowerCase();

  switch (c) {
    case "help":
      return { output: [HELP] };
    case "whoami":
      return {
        output: [personalInfo.name, "CSE Student", "Developer", "Builder", "Tech Explorer"],
      };
    case "about":
      return {
        output: [personalInfo.intro],
        action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }),
      };
    case "projects":
      return {
        output: projects.map((p) => `${p.number} — ${p.name}`),
        action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" }),
      };
    case "skills":
      return {
        output: [skills.map((s) => s.name).join(", ")],
        action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }),
      };
    case "experience":
      return {
        output: ["Scrolling to internships & hackathons..."],
        action: () => document.getElementById("internships")?.scrollIntoView({ behavior: "smooth" }),
      };
    case "contact":
      return {
        output: [`${socialLinks.email}`, `${socialLinks.phone}`],
        action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }),
      };
    case "github":
      return {
        output: [`Opening ${socialLinks.github} ...`],
        action: () => window.open(socialLinks.github, "_blank", "noopener,noreferrer"),
      };
    case "resume":
      return {
        output: ["Opening resume ..."],
        action: () => window.open(personalInfo.resumeUrl, "_blank", "noopener,noreferrer"),
      };
    case "":
      return { output: [] };
    default:
      return { output: [`command not found: ${c}`, `type 'help' for a list of commands`] };
  }
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<Line[]>([
    { text: "ADITYA.OS terminal — type 'help' to get started", kind: "out" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const dialogRef = useDialog({ open, onClose: () => setOpen(false) });

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 150);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [lines]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim().toLowerCase() === "clear") {
      setLines([]);
      setInput("");
      return;
    }
    const { output, action } = run(input);
    setLines((prev) => [
      ...prev,
      { text: `$ ${input}`, kind: "cmd" },
      ...output.map((o) => ({ text: o, kind: "out" as const })),
    ]);
    setInput("");
    if (action) setTimeout(action, 200);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Open portfolio assistant"
        className="fixed bottom-24 right-3 z-40 flex items-center gap-1.5 rounded-full border border-[var(--color-line)] bg-[rgba(11,13,15,0.58)] px-1.5 py-1.5 text-[var(--color-text-dim)] shadow-[0_18px_38px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-colors hover:border-[var(--color-signal)] hover:text-[var(--color-signal)] sm:bottom-20 sm:right-4 sm:gap-2 sm:px-2.5 sm:py-2"
      >
        <AssistantLogo compact />
        <span className="hidden sm:inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--color-text-dim)]">
          <span>Assistant</span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-99 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-6"
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label="Portfolio assistant terminal"
              tabIndex={-1}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[calc(100vw-0.75rem)] max-w-[calc(100vw-0.75rem)] sm:max-w-lg rounded-t-2xl sm:rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] font-mono text-xs sm:text-sm overflow-hidden"
            >
              <div className="flex items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3 border-b border-[var(--color-line)]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-rose)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-amber)]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-signal)]" />
                  <span className="ml-2 text-[9px] sm:text-[11px] text-[var(--color-text-faint)]">aditya@os:~</span>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close terminal">
                  <X size={14} className="text-[var(--color-text-dim)] sm:size-[15px]" />
                </button>
              </div>

              <div
                role="log"
                aria-live="polite"
                aria-label="Terminal output"
                className="h-[60vh] max-h-72 sm:h-64 overflow-y-auto px-3 py-2.5 sm:px-4 sm:py-3 space-y-1"
              >
                {lines.map((l, i) => (
                  <p
                    key={i}
                    className={l.kind === "cmd" ? "text-[var(--color-text)]" : "text-[var(--color-text-dim)]"}
                  >
                    {l.text}
                  </p>
                ))}
                <div ref={endRef} />
              </div>

              <form onSubmit={submit} className="flex items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 border-t border-[var(--color-line)]">
                <span className="signal-text text-xs sm:text-sm">$</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-[var(--color-text)] text-xs sm:text-sm"
                  placeholder="type a command..."
                  aria-label="Terminal command input"
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
