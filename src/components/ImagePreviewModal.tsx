import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useDialog } from "@/lib/useDialog";

export interface ImagePreview {
  src: string;
  title: string;
  subtitle?: string;
}

export default function ImagePreviewModal({
  item,
  onClose,
}: {
  item: ImagePreview | null;
  onClose: () => void;
}) {
  const dialogRef = useDialog({ open: Boolean(item), onClose });

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-99 flex items-center justify-center bg-black/88 backdrop-blur-md p-4 sm:p-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full max-h-[90vh] flex flex-col"
          >
            <div className="flex items-center justify-between mb-4 px-1">
              <div>
                <p className="font-display font-semibold text-lg text-white">{item.title}</p>
                {item.subtitle && (
                  <p className="font-mono text-[11px] tracking-wider text-[var(--color-signal)] mt-0.5">
                    {item.subtitle}
                  </p>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close preview"
                className="p-2 rounded-full border border-[var(--color-line)] hover:border-[var(--color-signal)] text-white transition-colors shrink-0"
              >
                <X size={16} />
              </button>
            </div>
            <div className="overflow-auto rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]">
              <img
                src={item.src}
                alt={item.title}
                decoding="async"
                className="w-full h-auto block"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.style.display = "none";
                  const fallback = img.nextElementSibling as HTMLElement | null;
                  if (fallback) fallback.style.display = "flex";
                }}
              />
              <div className="hidden aspect-[4/3] items-center justify-center flex-col gap-2 text-[var(--color-text-faint)]">
                <span className="font-mono text-xs">Image not available yet</span>
                <span className="font-mono text-[10px]">Add it to the public folder to preview here</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
