import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { currentPersonaAtom } from '@/store/atoms';

export function TypingIndicator() {
  const persona = useAtomValue(currentPersonaAtom);

  return (
    <div className="flex items-end gap-3 translate-y-2">
      {/* Idol Avatar */}
      <motion.div
        className="shrink-0 w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center text-xl shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      >
        {persona.emoji}
      </motion.div>

      {/* Typing Bubble */}
      <div className="retro-bubble retro-bubble-idol py-3 px-4">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 bg-retro-primary rounded-full border border-black"
                animate={{
                  y: [0, -6, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
