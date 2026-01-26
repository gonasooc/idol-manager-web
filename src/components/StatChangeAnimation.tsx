import { motion, AnimatePresence } from 'framer-motion';
import { useAtomValue } from 'jotai';
import { statChangeLogAtom } from '../store/atoms';

const STAT_LABELS = {
  bond: '<3',
  kindness: ':)',
  confidence: '!!',
} as const;

const STAT_COLORS = {
  bond: { positive: '#ff69b4', negative: '#ff6b6b' },
  kindness: { positive: '#ffd700', negative: '#4169e1' },
  confidence: { positive: '#40e0d0', negative: '#32cd32' },
} as const;

export function StatChangeAnimation() {
  const changes = useAtomValue(statChangeLogAtom);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {changes.map((change, index) => {
          const colors = STAT_COLORS[change.type];
          const color = change.value > 0 ? colors.positive : colors.negative;

          return (
            <motion.div
              key={change.id}
              initial={{ opacity: 0, y: 0, x: '-50%', scale: 0.5 }}
              animate={{
                opacity: [0, 1, 1, 0],
                y: [0, -20, -40, -60],
                scale: [0.5, 1.2, 1, 0.8],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              className="absolute left-1/2 top-1/4"
              style={{
                marginLeft: `${(index % 3 - 1) * 80}px`,
              }}
            >
              <div
                className="font-pixel text-xl px-4 py-2 border-4"
                style={{
                  backgroundColor: '#000',
                  borderColor: color,
                  color: color,
                  boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
                }}
              >
                {STAT_LABELS[change.type]} {change.value > 0 ? '+' : ''}
                {change.value}
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
