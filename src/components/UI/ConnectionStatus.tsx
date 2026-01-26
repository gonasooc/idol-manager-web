/**
 * Backend connection status display component (Retro style)
 */

import { motion } from 'framer-motion';

interface ConnectionStatusProps {
  isOnline: boolean | null;
}

export function ConnectionStatus({ isOnline }: ConnectionStatusProps) {
  if (isOnline === null) {
    return (
      <motion.div
        className="flex items-center gap-2 px-2 py-1 bg-retro-gold/20 border border-retro-gold"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        <span className="font-pixel text-xs text-retro-gold">[?]</span>
        <span className="font-retro text-sm text-retro-gold">CONNECTING...</span>
      </motion.div>
    );
  }

  if (isOnline) {
    return (
      <div className="flex items-center gap-2 px-2 py-1 bg-retro-green/20 border border-retro-green">
        <span className="font-pixel text-xs text-retro-green">[+]</span>
        <span className="font-retro text-sm text-retro-green">ONLINE</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-2 py-1 bg-retro-orange/20 border border-retro-orange">
      <span className="font-pixel text-xs text-retro-orange">[-]</span>
      <span className="font-retro text-sm text-retro-orange">OFFLINE</span>
    </div>
  );
}
