import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import html2canvas from 'html2canvas';
import { DebutCard } from './DebutCard';
import type { PersonaInfo } from '../../types';

interface DebutCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  bondLevel: number;
  kindness: number;
  confidence: number;
  persona: PersonaInfo;
}

export function DebutCardModal({
  isOpen,
  onClose,
  bondLevel,
  kindness,
  confidence,
  persona,
}: DebutCardModalProps) {
  const [idolName, setIdolName] = useState('MY IDOL');
  const [isSaving, setIsSaving] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleSaveImage = async () => {
    if (!cardRef.current) return;

    setIsSaving(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      });

      canvas.toBlob((blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${idolName}-debut-card.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
    } catch (error) {
      console.error('Failed to save image:', error);
      alert('IMAGE SAVE FAILED');
    } finally {
      setIsSaving(false);
    }
  };

  const handleShare = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) return;

        const file = new File([blob], `${idolName}-debut-card.png`, { type: 'image/png' });

        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `${idolName} Debut Card`,
            text: `${persona.title} style idol!`,
            files: [file],
          });
        } else {
          handleSaveImage();
        }
      });
    } catch (error) {
      console.error('Failed to share:', error);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="retro-window max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Title Bar */}
            <div className="retro-titlebar">
              <span>CARD_GENERATOR.exe</span>
              <button
                onClick={onClose}
                className="retro-titlebar-btn"
              >
                x
              </button>
            </div>

            {/* Content */}
            <div className="retro-content">
              {/* Name Input */}
              <div className="mb-4">
                <label className="font-pixel text-xs text-gray-700 block mb-2">
                  IDOL NAME:
                </label>
                <input
                  type="text"
                  value={idolName}
                  onChange={(e) => setIdolName(e.target.value.toUpperCase())}
                  placeholder="ENTER NAME"
                  maxLength={20}
                  className="retro-input w-full uppercase"
                />
              </div>

              {/* Card Preview */}
              <div ref={cardRef} className="mb-4">
                <DebutCard
                  idolName={idolName}
                  bondLevel={bondLevel}
                  kindness={kindness}
                  confidence={confidence}
                  persona={persona}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleSaveImage}
                  disabled={isSaving}
                  className="retro-btn retro-btn-primary flex-1 flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      >
                        [*]
                      </motion.span>
                      SAVING...
                    </>
                  ) : (
                    <>
                      [v] SAVE
                    </>
                  )}
                </button>

                <button
                  onClick={handleShare}
                  className="retro-btn flex-1 flex items-center justify-center gap-2"
                >
                  {'[>]'} SHARE
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
