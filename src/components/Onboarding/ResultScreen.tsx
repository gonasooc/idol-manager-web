import { motion } from 'framer-motion';
import type { InitialStats } from '@/utils/calculateInitialStats';
import { RetroSliderGauge } from '@/components/PersonalityGauge';

interface ResultScreenProps {
  stats: InitialStats;
  personaTitle: string;
  personaEmoji: string;
  personaDescription: string;
  onStart: () => void;
}

// Retro stat bar component
function RetroStatBar({
  label,
  value,
  maxValue,
  color,
  showSign = false,
}: {
  label: string;
  value: number;
  maxValue: number;
  color: string;
  showSign?: boolean;
}) {
  const percentage = showSign
    ? (Math.abs(value) / (maxValue / 2)) * 100
    : (value / maxValue) * 100;

  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center">
        <span className="font-pixel text-xs text-gray-700">{label}</span>
        <span className="font-pixel text-xs" style={{ color }}>
          {showSign && value > 0 ? '+' : ''}{value}
        </span>
      </div>
      <div className="retro-gauge">
        <motion.div
          className="h-4"
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: `${percentage}%`, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            backgroundColor: color,
            boxShadow: 'inset 0 -4px 0 rgba(0, 0, 0, 0.3)',
          }}
        />
      </div>
    </div>
  );
}

export function ResultScreen({
  stats,
  personaTitle,
  personaEmoji,
  personaDescription,
  onStart,
}: ResultScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="retro-window">
        {/* Title Bar */}
        <div className="retro-titlebar">
          <span>ANALYSIS_COMPLETE.exe</span>
        </div>

        {/* Content */}
        <div className="retro-content">
          {/* Persona Display */}
          <div className="text-center mb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block text-5xl mb-4"
            >
              {personaEmoji}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-pixel text-xs text-retro-gold mb-2"
            >
              {personaTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="font-retro text-lg text-gray-700"
            >
              {personaDescription}
            </motion.p>
          </div>

          {/* Stats Display */}
          <div className="bg-retro-blue-dark p-4 space-y-4 mb-6">
            <div className="font-pixel text-xs text-center text-retro-teal mb-4">
              초기 스탯 계산 완료
            </div>

            <RetroStatBar
              label="친밀도"
              value={stats.bondLevel}
              maxValue={100}
              color="#ff69b4"
            />

            <RetroSliderGauge
              label="감정"
              value={stats.kindness}
              negativeLabel="차가움"
              positiveLabel="따뜻함"
              negativeColor="text-retro-blue"
              positiveColor="text-retro-pink"
            />

            <RetroSliderGauge
              label="태도"
              value={stats.confidence}
              negativeLabel="소심함"
              positiveLabel="대담함"
              negativeColor="text-retro-green"
              positiveColor="text-retro-orange"
            />
          </div>

          {/* Decorative message */}
          <div className="text-center mb-6 p-3 border-2 border-dashed border-retro-gold bg-retro-gold/10">
            <span className="font-retro text-base text-gray-700">
              연습생 프로필이 완성되었습니다!
            </span>
          </div>

          {/* Start Button */}
          <motion.button
            onClick={onStart}
            className="retro-btn retro-btn-primary w-full py-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileTap={{ scale: 0.98 }}
          >
            게임 시작
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
