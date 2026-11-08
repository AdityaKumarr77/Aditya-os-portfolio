import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Palette, Settings2, Sun, X } from "lucide-react";
import { navItems, personalInfo } from "@/data/portfolio";
import { useActiveSection } from "@/lib/hooks";
import { useDialog } from "@/lib/useDialog";

interface NavProps {
  isDay: boolean;
  onThemeToggle: () => void;
  accent: string;
  onAccentChange: (accent: string) => void;
}

const accentOptions = [
  { id: "gold", label: "Gold", color: "#f2c14e" },
  { id: "cyan", label: "Cyan", color: "#63d8e8" },
  { id: "coral", label: "Coral", color: "#ef6f6c" },
  { id: "lime", label: "Lime", color: "#b7e35f" },
  { id: "violet", label: "Violet", color: "#b58cff" },
  { id: "blue", label: "Blue", color: "#5d9cff" },
  { id: "orange", label: "Orange", color: "#ff914d" },
  { id: "mint", label: "Mint", color: "#55ddb5" },
  { id: "rose", label: "Rose", color: "#ff7aa2" },
  { id: "pink", label: "Pink", color: "#ff7bd5" },
  { id: "indigo", label: "Indigo", color: "#7c8cff" },
  { id: "emerald", label: "Emerald", color: "#41d6a5" },
  { id: "sunset", label: "Sunset", color: "#ff9f6e" },
  { id: "aqua", label: "Aqua", color: "#6fe9e1" },
  { id: "magenta", label: "Magenta", color: "#d573ff" },
  { id: "chartreuse", label: "Chartreuse", color: "#d8f76a" },
];

export default function Nav({ isDay, onThemeToggle, accent, onAccentChange }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const sectionIds = useMemo(() => navItems.map((n) => n.href.replace("#", "")), []);
  const active = useActiveSection(sectionIds);
  const mobileDialogRef = useDialog({
    open: mobileOpen,
    onClose: () => setMobileOpen(false),
  });

  useEffect(() => {
    const closeOnOutsideClick = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) setSettingsOpen(false);
    };
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => document.removeEventListener("mousedown", closeOnOutsideClick);
  }, []);

  useEffect(() => {
    if (!settingsOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSettingsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [settingsOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-80 flex justify-center px-2 sm:px-6">
        <nav
          aria-label="Primary"
          className="w-full max-w-[1350px] flex items-center justify-between rounded-full glow-border glass px-4 sm:px-5 py-3 mt-5"
          style={{
            background: isDay
              ? "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(232,239,236,0.9))"
              : "linear-gradient(135deg, rgba(17,22,24,0.72), rgba(19,24,26,0.48))",
            borderColor: isDay ? "rgba(22, 46, 42, 0.2)" : undefined,
          }}
        >
          <a
            href="#home"
            className="font-display font-semibold text-sm tracking-tight text-[var(--color-text)] flex items-center gap-2 shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-[var(--color-signal)] shadow-[0_0_8px_var(--color-signal)]" />
            ADITYA<span className="signal-text">.OS</span>
          </a>

          <ul className="hidden lg:flex items-center gap-0.5 xl:gap-1 font-mono text-[10px] xl:text-[11px] tracking-wider uppercase">
            {navItems.map((item) => {
              const isActive = active === item.href.replace("#", "");
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "location" : undefined}
                    className={`px-1.5 xl:px-3 py-1.5 rounded-full transition-colors block ${
                      isActive
                        ? "text-[var(--color-ink)] bg-[var(--color-signal)]"
                        : "text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 shrink-0">
            <div className="relative" ref={settingsRef}>
              <button
                onClick={() => setSettingsOpen((open) => !open)}
                aria-label="Open system settings"
                aria-expanded={settingsOpen}
                aria-controls="top-system-settings"
                aria-haspopup="dialog"
                title="System settings"
                className="settings-trigger w-9 h-9 rounded-full border border-[var(--color-line)] flex items-center justify-center text-[var(--color-text-dim)] transition-colors"
              >
                <Settings2 size={15} />
              </button>
              <AnimatePresence>
                {settingsOpen && (
                  <motion.div
                    id="top-system-settings"
                    role="dialog"
                    aria-label="System settings"
                    initial={{ opacity: 0, y: -8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.96 }}
                    className="system-settings fixed left-3 right-3 top-16 z-50 mx-auto max-w-[17.5rem] p-4 origin-top-right sm:absolute sm:left-auto sm:right-0 sm:top-12 sm:w-[min(18rem,calc(100vw-1rem))] sm:max-w-[calc(100vw-1rem)]"
                    style={{
                      background: isDay
                        ? "linear-gradient(160deg, rgba(255,255,255,0.99), rgba(226,235,232,0.96))"
                        : "linear-gradient(160deg, rgba(12,16,18,0.78), rgba(22,28,30,0.66))",
                      borderColor: isDay ? "rgba(28, 55, 52, 0.2)" : undefined,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Palette size={14} className="signal-text" />
                      <p className="label">System settings</p>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-[var(--color-line)] p-3 mb-3">
                      <span className="text-xs text-[var(--color-text-dim)]">Display mode</span>
                      <button
                        onClick={onThemeToggle}
                        aria-label={isDay ? "Switch to night view" : "Switch to day view"}
                        aria-pressed={isDay}
                        className="theme-switch flex items-center gap-1 rounded-full border border-[var(--color-line)] p-1"
                      >
                        <span className={`p-1.5 rounded-full ${!isDay ? "bg-[var(--color-signal)] text-[var(--color-ink)]" : "text-[var(--color-text-faint)]"}`}><Moon size={12} /></span>
                        <span className={`p-1.5 rounded-full ${isDay ? "bg-[var(--color-signal)] text-[var(--color-ink)]" : "text-[var(--color-text-faint)]"}`}><Sun size={12} /></span>
                      </button>
                    </div>
                    <p className="label mb-2">Signal color</p>
                    <div className="grid grid-cols-4 gap-2">
                      {accentOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => {
                            onAccentChange(option.id);
                            setSettingsOpen(false);
                          }}
                          aria-label={`Use ${option.label} palette`}
                          aria-pressed={accent === option.id}
                          className={`flex flex-col items-center justify-center gap-1 rounded-lg border px-1.5 py-1.5 transition-colors ${accent === option.id ? "border-[var(--color-signal)] bg-[var(--color-signal)]/10" : "border-[var(--color-line)]"}`}
                        >
                          <span className="relative h-3.5 w-3.5 rounded-full" style={{ background: option.color, boxShadow: `0 0 10px ${option.color}` }}>
                            {accent === option.id && <span className="absolute inset-0 rounded-full ring-2 ring-[var(--color-signal)]" />}
                          </span>
                          <span className="text-[8px] text-[var(--color-text-dim)]">{option.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--color-text)] hover:border-[var(--color-signal)] hover:text-[var(--color-signal)] transition-colors"
            >
              Resume
            </a>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 text-[var(--color-text)]"
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-haspopup="dialog"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={mobileDialogRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-99 backdrop-blur-xl flex flex-col"
            style={{ background: isDay ? "rgba(244,247,246,0.97)" : "rgba(11,13,15,0.97)" }}
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-line)]">
              <span className="font-display font-semibold text-sm">
                ADITYA<span className="signal-text">.OS</span>
              </span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-[var(--color-text)]"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>
            <ul className="flex-1 flex flex-col justify-center gap-1 px-8 font-display">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={active === item.href.replace("#", "") ? "location" : undefined}
                    className="flex items-baseline gap-3 py-3 text-3xl font-medium text-[var(--color-text)] hover:text-[var(--color-signal)] transition-colors"
                  >
                    <span className="font-mono text-xs text-[var(--color-text-faint)]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mx-8 mb-8 text-center rounded-full bg-[var(--color-signal)] text-[var(--color-ink)] font-mono text-xs uppercase tracking-wider py-3.5"
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
