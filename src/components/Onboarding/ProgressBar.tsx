import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100;

  return (
    <div className="w-full mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <span className="font-pixel text-xs text-teal-600 font-bold">
          질문 {current}/{total}
        </span>
        <span className="font-pixel text-xs text-amber-600 font-bold">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Continuous Progress Bar */}
      <div className="retro-gauge">
        <motion.div
          className="h-4 bg-amber-400"
          style={{ boxShadow: 'inset 0 -4px 0 rgba(0, 0, 0, 0.3)' }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
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
