import { useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useDialog } from "@/lib/useDialog";

export default function LegalModal({
  title,
  open,
  onClose,
  children,
}: {
  title: string;
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const titleId = useId();
  const dialogRef = useDialog({ open, onClose });

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-99 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full sm:max-w-xl max-h-[85vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-[var(--color-surface)] border border-[var(--color-line)] p-7 sm:p-9"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 id={titleId} className="font-display font-semibold text-2xl">{title}</h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="p-2 rounded-full border border-[var(--color-line)] hover:border-[var(--color-signal)] transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <div className="space-y-4 text-sm text-[var(--color-text-dim)] leading-relaxed">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
