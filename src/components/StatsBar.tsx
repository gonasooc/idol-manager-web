import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { currentPersonaAtom, bondLevelAtom } from '../store/atoms';
import { BondLevelBar } from './BondLevelBar';
import { PersonalityGauge } from './PersonalityGauge';
import { motion, AnimatePresence } from 'framer-motion';

export function StatsBar() {
  const persona = useAtomValue(currentPersonaAtom);
  const bondLevel = useAtomValue(bondLevelAtom);
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className="sticky top-0 z-40">
      {/* Retro Window Container */}
      <div className="retro-window mx-2 mt-2">
        {/* Title Bar - 클릭으로 토글 */}
        <div
          className="retro-titlebar cursor-pointer select-none"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          <div className="flex items-center gap-2">
            <span className="text-base">{persona.emoji}</span>
            <span>STATUS.exe</span>
            {/* 최소화 시 요약 정보 표시 */}
            {isMinimized && (
              <span className="font-retro text-xs ml-2 text-white/80">
                - {persona.title} | ❤️ {bondLevel}
              </span>
            )}
          </div>
          <div className="flex gap-1">
            <button
              className="retro-titlebar-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
            >
              {isMinimized ? '□' : '_'}
            </button>
          </div>
        </div>

        {/* Content Area - 애니메이션으로 열기/닫기 */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              className="retro-content space-y-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Current Persona Display */}
              <motion.div
                key={persona.type}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-retro-teal/20 to-retro-cyan/20 border-2 border-dashed border-retro-teal"
              >
                <motion.span
                  className="text-4xl"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  {persona.emoji}
                </motion.span>
                <div>
                  <h2 className="font-pixel text-sm text-gray-900">{persona.title}</h2>
                  <p className="font-retro text-lg text-gray-600">{persona.description}</p>
                </div>
              </motion.div>

              {/* Bond Level Bar */}
              <BondLevelBar />

              {/* Personality Gauge */}
              <PersonalityGauge />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
