import { motion } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { currentPersonaAtom } from '../../store/atoms';

export function TypingIndicator() {
  const persona = useAtomValue(currentPersonaAtom);

  return (
    <div className="flex items-end gap-3">
      {/* Idol Avatar */}
      <motion.div
        className="flex-shrink-0 w-10 h-10 bg-win95-medium border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 flex items-center justify-center text-xl"
        animate={{ y: [0, -2, 0] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        {persona.emoji}
      </motion.div>

      {/* Typing Bubble */}
      <div className="retro-bubble retro-bubble-idol">
        <div className="flex items-center gap-2">
          <span className="font-pixel text-xs text-gray-600">TYPING</span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-3 bg-gray-600"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scaleY: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
