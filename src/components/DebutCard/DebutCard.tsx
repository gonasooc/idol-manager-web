import { motion } from 'framer-motion';
import type { PersonaInfo } from '../../types';

interface DebutCardProps {
  idolName: string;
  bondLevel: number;
  kindness: number;
  confidence: number;
  persona: PersonaInfo;
}

const PERSONA_COLORS: Record<string, { primary: string; secondary: string }> = {
  'gentle-confident': { primary: '#ffd700', secondary: '#ff69b4' },
  'gentle-shy': { primary: '#f4a460', secondary: '#ffd700' },
  'cold-confident': { primary: '#ff4500', secondary: '#ff6b6b' },
  'cold-shy': { primary: '#4169e1', secondary: '#40e0d0' },
  'balanced': { primary: '#32cd32', secondary: '#40e0d0' },
};

function getCardGrade(bondLevel: number): { grade: string; stars: string; color: string } {
  if (bondLevel >= 90) {
    return { grade: 'S', stars: '***', color: '#ffd700' };
  } else if (bondLevel >= 70) {
    return { grade: 'A', stars: '**', color: '#c0c0c0' };
  } else if (bondLevel >= 50) {
    return { grade: 'B', stars: '*', color: '#f4a460' };
  } else {
    return { grade: 'C', stars: '-', color: '#808080' };
  }
}

function getStatBar(value: number, total: number = 100) {
  const percentage = Math.max(0, Math.min(100, (value / total) * 100));
  const filled = Math.round(percentage / 10);
  const empty = 10 - filled;
  return '|'.repeat(filled) + '.'.repeat(empty);
}

function getTitle(bondLevel: number): string {
  if (bondLevel >= 90) return 'DEBUT READY!';
  if (bondLevel >= 70) return 'TRAINEE+';
  if (bondLevel >= 50) return 'TRAINEE';
  return 'ROOKIE';
}

export function DebutCard({ idolName, bondLevel, kindness, confidence, persona }: DebutCardProps) {
  const { grade, stars, color } = getCardGrade(bondLevel);
  const colors = PERSONA_COLORS[persona.type] || PERSONA_COLORS['balanced'];
  const title = getTitle(bondLevel);

  // Convert kindness and confidence to 0-100 scale
  const kindnessDisplay = Math.round(((kindness + 100) / 200) * 100);
  const confidenceDisplay = Math.round(((confidence + 100) / 200) * 100);

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-full max-w-sm mx-auto"
      style={{ aspectRatio: '2/3' }}
    >
      {/* Card Frame */}
      <div
        className="absolute inset-0 p-1"
        style={{
          background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
        }}
      >
        {/* Inner card */}
        <div className="h-full bg-retro-blue-dark border-4 border-gray-800 flex flex-col p-4 relative overflow-hidden">
          {/* Scanline effect */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="h-1 bg-white"
                style={{ marginBottom: '2px', opacity: 0.1 }}
              />
            ))}
          </div>

          {/* Grade Badge */}
          <div
            className="absolute top-4 right-4 w-14 h-14 flex items-center justify-center border-4"
            style={{ borderColor: color, backgroundColor: `${color}30` }}
          >
            <span className="font-pixel text-2xl" style={{ color }}>
              {grade}
            </span>
          </div>

          {/* Header: Idol Name & Persona */}
          <div className="mb-4">
            <div className="text-4xl mb-2">{persona.emoji}</div>
            <h1 className="font-pixel text-lg text-white drop-shadow-lg truncate pr-16">
              {idolName}
            </h1>
            <p className="font-retro text-xl" style={{ color: colors.primary }}>
              {persona.title}
            </p>
          </div>

          {/* Stats Section */}
          <div className="flex-1 flex flex-col justify-center space-y-3 bg-black/50 p-4 border-2 border-gray-700">
            {/* Bond Level */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-pixel text-xs text-gray-400">&lt;3 BOND</span>
                <span className="font-pixel text-xs text-retro-pink">{bondLevel}</span>
              </div>
              <div className="font-retro text-lg text-retro-pink tracking-widest">
                [{getStatBar(bondLevel)}]
              </div>
            </div>

            {/* Kindness */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-pixel text-xs text-gray-400">:) KIND</span>
                <span className="font-pixel text-xs text-retro-gold">{kindnessDisplay}</span>
              </div>
              <div className="font-retro text-lg text-retro-gold tracking-widest">
                [{getStatBar(kindnessDisplay)}]
              </div>
            </div>

            {/* Confidence */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-pixel text-xs text-gray-400">!! CONF</span>
                <span className="font-pixel text-xs text-retro-teal">{confidenceDisplay}</span>
              </div>
              <div className="font-retro text-lg text-retro-teal tracking-widest">
                [{getStatBar(confidenceDisplay)}]
              </div>
            </div>
          </div>

          {/* Footer: Title & Date */}
          <div className="mt-4 text-center">
            <div
              className="font-pixel text-sm mb-2"
              style={{ color: color }}
            >
              {stars} {title} {stars}
            </div>
            <div className="font-retro text-lg text-gray-500">
              {new Date().toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
              }).replace(/\. /g, '/').replace('.', '')}
            </div>
          </div>

          {/* S-Rank Sparkle Effect */}
          {bondLevel >= 90 && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                background: [
                  'linear-gradient(45deg, transparent 40%, rgba(255,215,0,0.3) 50%, transparent 60%)',
                  'linear-gradient(45deg, transparent 0%, rgba(255,215,0,0.3) 10%, transparent 20%)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
