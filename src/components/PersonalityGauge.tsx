import { useAtomValue } from 'jotai';
import { personalityScoreAtom } from '@/store/atoms';
import { motion } from 'framer-motion';

interface GaugeProps {
  label: string;
  value: number;
  negativeLabel: string;
  positiveLabel: string;
  negativeColor: string;
  positiveColor: string;
}

export function RetroSliderGauge({
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
  
  return (
    <div className="space-y-1">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="font-pixel text-xs font-bold text-black border-2 border-black bg-white px-1 shadow-[2px_2px_0_0_rgba(0,0,0,1)]">{label}</span>
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

      {/* Neo-Retro Slider Track */}
      <div className="relative h-8 bg-white border-3 border-black rounded-full overflow-hidden shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
        {/* Center Indicator */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-black/20 z-0" />
        
        {/* Fill based on value */}
        <motion.div 
            className={`absolute top-0 bottom-0 z-0 ${isPositive ? 'bg-retro-primary/30' : 'bg-retro-blue/30'}`}
            initial={{ width: '50%' }}
            animate={{ 
                left: isPositive ? '50%' : `${displayValue}%`,
                width: `${Math.abs(value)/2}%`
            }} 
        />

        {/* Slider thumb */}
        <motion.div
          className="absolute top-1 bottom-1 w-6 bg-retro-warning border-2 border-black rounded-full z-10 flex items-center justify-center"
          style={{
            left: `calc(${displayValue}% - 12px)`,
          }}
          initial={false}
          animate={{
            left: `calc(${displayValue}% - 12px)`,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
            <div className="w-2 h-2 bg-white rounded-full border border-black" />
        </motion.div>
      </div>

      {/* Labels */}
      <div className="flex justify-between font-retro text-sm px-1">
        <span className={`${!isPositive ? negativeColor + ' font-bold' : 'text-gray-500'}`}>
          {negativeLabel}
        </span>
        <span className={`${isPositive ? positiveColor + ' font-bold' : 'text-gray-500'}`}>
          {positiveLabel}
        </span>
      </div>
    </div>
  );
}

export function PersonalityGauge() {
  const personality = useAtomValue(personalityScoreAtom);

  return (
    <div className="space-y-4 p-1">
      <div className="flex items-center gap-2 mb-2">
        <span className="pixel-star animate-spin-slow" />
        <h3 className="font-pixel text-xs font-bold">성격</h3>
      </div>

      <RetroSliderGauge
        label="감정"
        value={personality.kindness}
        negativeLabel="차가움"
        positiveLabel="따뜻함"
        negativeColor="text-retro-blue"
        positiveColor="text-retro-primary"
      />

      <RetroSliderGauge
        label="태도"
        value={personality.confidence}
        negativeLabel="소심함"
        positiveLabel="대담함"
        negativeColor="text-retro-success"
        positiveColor="text-retro-warning"
      />
    </div>
  );
}
