import { useAtomValue } from 'jotai';
import { bondLevelAtom } from '../store/atoms';
import { motion } from 'framer-motion';

// Pixel Heart Component
function PixelHeart({ filled, color }: { filled: boolean; color: string }) {
  if (!filled) {
    return <span className="pixel-heart-empty" />;
  }

  return (
    <span
      className="pixel-heart"
      style={{
        filter: color === 'max' ? 'drop-shadow(0 0 4px #ff69b4)' : undefined,
      }}
    />
  );
}

// Continuous Gauge Component
function ContinuousGauge({ value, max = 100 }: { value: number; max?: number }) {
  const percentage = (value / max) * 100;

  const getBarColor = () => {
    if (value >= 90) return 'bg-retro-pink';
    if (value >= 60) return 'bg-retro-gold';
    if (value >= 30) return 'bg-retro-orange';
    return 'bg-retro-red';
  };

  return (
    <div className="retro-gauge flex-1">
      <motion.div
        className={`h-4 ${getBarColor()}`}
        style={{ boxShadow: 'inset 0 -4px 0 rgba(0, 0, 0, 0.3)' }}
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
    </div>
  );
}

export function BondLevelBar() {
  const bondLevel = useAtomValue(bondLevelAtom);

  // Determine bond level tier
  const getTier = (level: number) => {
    if (level >= 90) return { label: '최고', color: 'max' };
    if (level >= 60) return { label: '높음', color: 'high' };
    if (level >= 30) return { label: '보통', color: 'mid' };
    return { label: '낮음', color: 'low' };
  };

  const tier = getTier(bondLevel);

  return (
    <div className="space-y-2">
      {/* Header with pixel hearts */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Animated pixel hearts */}
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: bondLevel >= 90 ? [0, -2, 0] : 0,
                }}
                transition={{
                  duration: 0.5,
                  repeat: bondLevel >= 90 ? Infinity : 0,
                  delay: i * 0.1,
                }}
              >
                <PixelHeart
                  filled={bondLevel >= (i + 1) * 30}
                  color={tier.color}
                />
              </motion.div>
            ))}
          </div>
          <span className="font-pixel text-xs text-gray-800">친밀도</span>
        </div>

        {/* Value display */}
        <div className="flex items-center gap-2">
          <motion.span
            key={bondLevel}
            initial={{ scale: 1.3, color: '#ffd700' }}
            animate={{ scale: 1, color: '#1a1a4e' }}
            className="font-pixel text-sm"
          >
            {bondLevel}
          </motion.span>
          <span
            className={`font-pixel text-xs px-2 py-1 ${
              tier.color === 'max'
                ? 'bg-pink-600 text-white levelup-glow'
                : tier.color === 'high'
                ? 'bg-amber-600 text-white'
                : tier.color === 'mid'
                ? 'bg-orange-600 text-white'
                : 'bg-red-600 text-white'
            }`}
          >
            {tier.label}
          </span>
        </div>
      </div>

      {/* Continuous Progress Bar */}
      <ContinuousGauge value={bondLevel} />

      {/* Level markers */}
      <div className="flex justify-between font-retro text-sm text-gray-700 px-1">
        <span>0</span>
        <span className={bondLevel >= 30 ? 'text-orange-700 font-bold' : ''}>
          30
        </span>
        <span className={bondLevel >= 60 ? 'text-amber-700 font-bold' : ''}>
          60
        </span>
        <span className={bondLevel >= 90 ? 'text-pink-600 font-bold' : ''}>
          90
        </span>
        <span>100</span>
      </div>
    </div>
  );
}
