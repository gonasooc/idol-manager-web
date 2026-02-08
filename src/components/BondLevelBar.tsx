import { useAtomValue } from 'jotai';
import { bondLevelAtom } from '@/store/atoms';
import { motion } from 'framer-motion';

// Pixel Heart Component
function PixelHeart({ filled, color }: { filled: boolean; color: string }) {
  if (!filled) {
    return <span className="pixel-heart-empty" />;
  }

  // Map tier colors to hex for filter
  const getColorHex = (c: string) => {
    switch (c) {
        case 'max': return '#ff0080'; // retro-primary
        case 'high': return '#00af54'; // retro-success
        case 'mid': return '#ffc800'; // retro-warning
        case 'low': return '#ff124f'; // retro-error
        default: return '#000000';
    }
  };

  return (
    <span
      className="pixel-heart"
      style={{
        filter: `drop-shadow(0 0 2px ${getColorHex(color)})`,
        transform: filled ? 'scale(1.1)' : 'scale(1)',
      }}
    />
  );
}

// Continuous Gauge Component
function ContinuousGauge({ value, max = 100 }: { value: number; max?: number }) {
  const percentage = (value / max) * 100;

  const getBarColor = () => {
    if (value >= 90) return 'bg-retro-primary';
    if (value >= 60) return 'bg-retro-success';
    if (value >= 30) return 'bg-retro-warning';
    return 'bg-retro-error';
  };

  return (
    <div className="retro-gauge w-full h-6 relative bg-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ 
            backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 1px, transparent 0, transparent 50%)',
            backgroundSize: '4px 4px'
        }} />
        
      <motion.div
        className={`h-full ${getBarColor()} border-r-2 border-black`}
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
    if (level >= 90) return { label: '최고', color: 'max', bg: 'bg-retro-primary text-black' };
    if (level >= 60) return { label: '높음', color: 'high', bg: 'bg-retro-success text-black' };
    if (level >= 30) return { label: '보통', color: 'mid', bg: 'bg-retro-warning text-black' };
    return { label: '낮음', color: 'low', bg: 'bg-retro-error text-black' };
  };

  const tier = getTier(bondLevel);

  return (
    <div className="space-y-2 p-1">
      {/* Header with pixel hearts */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Animated pixel hearts */}
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: bondLevel >= 90 ? [0, -4, 0] : 0,
                  rotate: bondLevel >= 90 ? [0, 10, -10, 0] : 0,
                }}
                transition={{
                  duration: 0.6,
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
          <span className="font-pixel text-xs font-bold">친밀도</span>
        </div>

        {/* Value display */}
        <div className="flex items-center gap-2">
          <motion.span
            key={bondLevel}
            initial={{ scale: 1.5, color: '#ff0080' }}
            animate={{ scale: 1, color: '#000' }}
            className="font-pixel text-sm"
          >
            {bondLevel}%
          </motion.span>
          <span
            className={`font-pixel text-[10px] px-2 py-0.5 border-2 border-black rounded-md ${tier.bg}`}
          >
            {tier.label}
          </span>
        </div>
      </div>

      {/* Continuous Progress Bar */}
      <ContinuousGauge value={bondLevel} />
    </div>
  );
}
