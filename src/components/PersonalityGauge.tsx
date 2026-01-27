import { useAtomValue } from 'jotai';
import { personalityScoreAtom } from '../store/atoms';
import { motion } from 'framer-motion';

interface GaugeProps {
  label: string;
  value: number;
  negativeLabel: string;
  positiveLabel: string;
  negativeColor: string;
  positiveColor: string;
}

function RetroSliderGauge({
  label,
  value,
  negativeLabel,
  positiveLabel,
  negativeColor,
  positiveColor,
}: GaugeProps) {
  // Convert -100~100 to 0~100 for display
  const displayValue = (value + 100) / 2;

  // Determine which side the value is on
  const isPositive = value >= 0;
  const intensity = Math.abs(value);

  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-pixel text-xs text-gray-800">{label}</span>
        <motion.span
          key={value}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={`font-pixel text-xs ${
            isPositive ? positiveColor : negativeColor
          }`}
        >
          {value > 0 ? '+' : ''}
          {value}
        </motion.span>
      </div>

      {/* Retro Slider Track */}
      <div className="relative h-6 bg-black p-1 border-2 border-t-gray-600 border-l-gray-600 border-b-white border-r-white">
        {/* Track background with segments */}
        <div className="absolute inset-1 flex">
          {/* Left side (negative) */}
          <div className="flex-1 flex gap-px bg-gray-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`neg-${i}`}
                className="flex-1"
                style={{
                  backgroundColor:
                    !isPositive && (4 - i) * 20 < intensity
                      ? negativeColor.replace('text-', '')
                      : '#333',
                  opacity: !isPositive && (4 - i) * 20 < intensity ? 1 : 0.3,
                }}
              />
            ))}
          </div>

          {/* Center divider */}
          <div className="w-1 bg-gray-500" />

          {/* Right side (positive) */}
          <div className="flex-1 flex gap-px bg-gray-800">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={`pos-${i}`}
                className="flex-1"
                style={{
                  backgroundColor:
                    isPositive && i * 20 < intensity
                      ? positiveColor.replace('text-', '')
                      : '#333',
                  opacity: isPositive && i * 20 < intensity ? 1 : 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Slider thumb */}
        <motion.div
          className="absolute top-0 bottom-0 w-3 bg-win95-medium border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600"
          style={{
            left: `calc(${displayValue}% - 6px)`,
          }}
          initial={false}
          animate={{
            left: `calc(${displayValue}% - 6px)`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between font-retro text-sm">
        <span className={!isPositive && intensity > 50 ? negativeColor + ' font-bold' : 'text-gray-700'}>
          {negativeLabel}
        </span>
        <span className={isPositive && intensity > 50 ? positiveColor + ' font-bold' : 'text-gray-700'}>
          {positiveLabel}
        </span>
      </div>
    </div>
  );
}

export function PersonalityGauge() {
  const personality = useAtomValue(personalityScoreAtom);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="pixel-star" />
        <h3 className="font-pixel text-xs text-gray-800">성격</h3>
      </div>

      <RetroSliderGauge
        label="감정"
        value={personality.kindness}
        negativeLabel="차가움"
        positiveLabel="따뜻함"
        negativeColor="text-retro-blue"
        positiveColor="text-retro-pink"
      />

      <RetroSliderGauge
        label="태도"
        value={personality.confidence}
        negativeLabel="소심함"
        positiveLabel="대담함"
        negativeColor="text-retro-green"
        positiveColor="text-retro-orange"
      />
    </div>
  );
}
