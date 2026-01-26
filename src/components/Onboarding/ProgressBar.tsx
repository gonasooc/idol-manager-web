import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;
  const segments = total;

  return (
    <div className="w-full mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-pixel text-xs text-retro-teal">
          질문 {current}/{total}
        </span>
        <span className="font-pixel text-xs text-retro-gold">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Segmented Progress Bar */}
      <div className="retro-gauge">
        {Array.from({ length: segments }).map((_, index) => (
          <motion.div
            key={index}
            className={`retro-gauge-segment ${
              index < current ? 'filled high' : ''
            }`}
            initial={false}
            animate={{
              opacity: index < current ? 1 : 0.3,
            }}
            transition={{ delay: index * 0.05 }}
          />
        ))}
      </div>

      {/* Loading text effect */}
      <div className="mt-2 text-center">
        <span className="font-retro text-lg text-gray-500">
          프로듀서 데이터 로딩 중
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ...
          </motion.span>
        </span>
      </div>
    </div>
  );
}
