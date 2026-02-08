import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { currentPersonaAtom } from '@/store/atoms';
import { BondLevelBar } from '@/components/BondLevelBar';
import { PersonalityGauge } from '@/components/PersonalityGauge';
import { motion, AnimatePresence } from 'framer-motion';

export function StatsBar() {
  const persona = useAtomValue(currentPersonaAtom);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="sticky top-0 z-40 p-2">
      {/* Neo-Retro Window Container */}
      <div className="retro-window bg-white/90 backdrop-blur-sm">
        {/* Title Bar */}
        <div
          className="retro-titlebar cursor-pointer select-none"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg filter drop-shadow-md">{persona.emoji}</span>
            <span className="font-bold tracking-widest">STATUS_CHECK</span>
            {/* Minimized summary */}
            {isMinimized && (
              <span className="font-retro text-sm ml-2 animate-pulse">
                - {persona.title}
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="retro-titlebar-btn min hover:bg-green-400"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
            >
              {isMinimized ? '+' : '-'}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              className="retro-content space-y-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'backOut' }}
            >
              {/* Current Persona Display */}
              <motion.div
                key={persona.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-4 p-4 bg-retro-bg border-2 border-dashed border-black rounded-lg shadow-sm"
              >
                <div className="relative">
                    <motion.div 
                        className="absolute inset-0 bg-retro-warning rounded-full blur-md opacity-50"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="text-5xl relative z-10">{persona.emoji}</span>
                </div>
                
                <div className="flex-1">
                  <div className="font-bold text-xl">{persona.title}</div>
                  <p className="font-retro text-lg text-gray-600 leading-tight mt-1">{persona.description}</p>
                </div>
              </motion.div>

              <div className="grid grid-cols-1 gap-4">
                  <BondLevelBar />
                  <div className="w-full h-0.5 bg-black/10 my-1" />
                  <PersonalityGauge />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
