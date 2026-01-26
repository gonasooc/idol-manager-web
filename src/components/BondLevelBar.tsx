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

// Segmented Gauge Component
function SegmentedGauge({ value, max = 100 }: { value: number; max?: number }) {
  const segments = 10;
  const filledSegments = Math.floor((value / max) * segments);

  const getSegmentColor = (index: number) => {
    if (index >= filledSegments) return '';
    if (value >= 90) return 'max';
    if (value >= 60) return 'high';
    if (value >= 30) return 'mid';
    return 'low';
  };

  return (
    <div className="retro-gauge flex-1">
      {Array.from({ length: segments }).map((_, index) => (
        <motion.div
          key={index}
          className={`retro-gauge-segment ${
            index < filledSegments ? `filled ${getSegmentColor(index)}` : ''
          }`}
          initial={false}
          animate={{
            opacity: index < filledSegments ? 1 : 0.3,
          }}
        />
      ))}
    </div>
  );
}

export function BondLevelBar() {
  const bondLevel = useAtomValue(bondLevelAtom);

  // Determine bond level tier
  const getTier = (level: number) => {
    if (level >= 90) return { label: 'MAX', color: 'max' };
    if (level >= 60) return { label: 'HIGH', color: 'high' };
    if (level >= 30) return { label: 'MID', color: 'mid' };
    return { label: 'LOW', color: 'low' };
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
          <span className="font-pixel text-xs text-gray-800">BOND LV</span>
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
                ? 'bg-retro-pink text-white levelup-glow'
                : tier.color === 'high'
                ? 'bg-retro-gold text-gray-900'
                : tier.color === 'mid'
                ? 'bg-retro-orange text-gray-900'
                : 'bg-retro-red text-white'
            }`}
          >
            {tier.label}
          </span>
        </div>
      </div>

      {/* Segmented Progress Bar */}
      <SegmentedGauge value={bondLevel} />

      {/* Level markers */}
      <div className="flex justify-between font-retro text-sm text-gray-600 px-1">
        <span>0</span>
        <span className={bondLevel >= 30 ? 'text-retro-orange font-bold' : ''}>
          30
        </span>
        <span className={bondLevel >= 60 ? 'text-retro-gold font-bold' : ''}>
          60
        </span>
        <span className={bondLevel >= 90 ? 'text-retro-pink font-bold' : ''}>
          90
        </span>
        <span>100</span>
      </div>
    </div>
  );
}
