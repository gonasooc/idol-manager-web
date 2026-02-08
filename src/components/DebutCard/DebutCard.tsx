import { motion } from 'framer-motion';
import type { PersonaInfo } from '@/types';

interface DebutCardProps {
  idolName: string;
  bondLevel: number;
  kindness: number;
  confidence: number;
  persona: PersonaInfo;
}

const PERSONA_STYLES: Record<string, { bg: string; border: string; accent: string }> = {
  'gentle-confident': { bg: 'bg-retro-warning', border: 'border-black', accent: 'text-retro-primary' },
  'gentle-shy': { bg: 'bg-retro-success', border: 'border-black', accent: 'text-retro-warning' },
  'cold-confident': { bg: 'bg-retro-primary', border: 'border-black', accent: 'text-black' },
  'cold-shy': { bg: 'bg-retro-blue', border: 'border-black', accent: 'text-retro-cyan' },
  'balanced': { bg: 'bg-retro-secondary', border: 'border-black', accent: 'text-retro-green' },
};

function getCardGrade(bondLevel: number): { grade: string; color: string } {
  if (bondLevel >= 90) return { grade: 'S', color: '#ff0080' }; // Hot Pink
  if (bondLevel >= 70) return { grade: 'A', color: '#ffc800' }; // Gold
  if (bondLevel >= 50) return { grade: 'B', color: '#00af54' }; // Green
  return { grade: 'C', color: '#888' };
}

function getStatBar(value: number, total: number = 100) {
  const percentage = Math.max(0, Math.min(100, (value / total) * 100));
  const filled = Math.round(percentage / 10);
  return Array(10).fill(0).map((_, i) => i < filled ? '■' : '□').join('');
}

function getTitle(bondLevel: number): string {
  if (bondLevel >= 90) return '데뷔 준비 완료!';
  if (bondLevel >= 70) return '연습생+';
  if (bondLevel >= 50) return '연습생';
  return '루키';
}

export function DebutCard({ idolName, bondLevel, kindness, confidence, persona }: DebutCardProps) {
  const { grade, color } = getCardGrade(bondLevel);
  const style = PERSONA_STYLES[persona.type] || PERSONA_STYLES['balanced'];
  const title = getTitle(bondLevel);

  // Convert kindness and confidence to 0-100 scale
  const kindnessDisplay = Math.round(((kindness + 100) / 200) * 100);
  const confidenceDisplay = Math.round(((confidence + 100) / 200) * 100);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, rotateY: 90 }}
      animate={{ scale: 1, opacity: 1, rotateY: 0 }}
      transition={{ type: 'spring', damping: 12 }}
      className="relative w-full max-w-sm mx-auto perspective-1000"
      style={{ aspectRatio: '3/4' }}
    >
      {/* Card Container */}
      <div className={`h-full w-full bg-white border-[4px] border-black rounded-xl overflow-hidden shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex flex-col relative`}>
        
        {/* Holographic Overlay for S-Rank */}
        {bondLevel >= 90 && (
            <div className="absolute inset-0 z-20 pointer-events-none opacity-30 bg-gradient-to-tr from-transparent via-white to-transparent animate-pulse" />
        )}

        {/* Header Section */}
        <div className={`${style.bg} p-4 border-b-4 border-black relative overflow-hidden`}>
            {/* Background Pattern */}
             <div className="absolute inset-0 opacity-10" style={{ 
                backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                backgroundSize: '8px 8px'
            }} />

            <div className="relative z-10 flex justify-between items-start">
                <div>
                    <span className="font-pixel text-xs bg-black text-white px-2 py-1 mb-2 inline-block rounded-sm">{title}</span>
                    <h1 className="font-pixel text-2xl text-black leading-none uppercase tracking-tighter drop-shadow-sm filter mt-1">
                        {idolName}
                    </h1>
                    <p className="font-retro text-lg font-bold opacity-80 mt-1 uppercase">{persona.title}</p>
                </div>
                <div className="w-16 h-16 bg-white border-4 border-black rounded-full flex items-center justify-center text-4xl shadow-[2px_2px_0_0_rgba(0,0,0,0.5)]">
                    {persona.emoji}
                </div>
            </div>
            
             {/* Grade Badge */}
             <div className="absolute -bottom-6 -right-2 rotate-12 z-20">
                <div className="relative">
                     <span className="absolute inset-0 text-black translate-x-1 translate-y-1 font-pixel text-6xl font-bold">{grade}</span>
                     <span className="font-pixel text-6xl font-bold" style={{ color: color }}>{grade}</span>
                </div>
            </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 p-6 flex flex-col justify-center space-y-6 bg-retro-bg font-retro relative">
             {/* Watermark */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-9xl opacity-5 pointer-events-none grayscale">
                 {persona.emoji}
             </div>

            <div className="space-y-4 relative z-10">
                <div className="bg-white p-3 border-2 border-black shadow-[4px_4px_0_0_rgba(0,0,0,0.1)]">
                    <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-lg">친밀도</span>
                        <span className="font-pixel text-xs bg-retro-primary text-black px-1">{bondLevel}%</span>
                    </div>
                    <div className="font-mono text-sm tracking-tighter text-retro-primary">
                        {getStatBar(bondLevel)}
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white p-2 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,0.1)]">
                        <div className="font-bold text-sm mb-1">상냥함</div>
                        <div className="font-mono text-xs tracking-tighter text-retro-warning overflow-hidden whitespace-nowrap">
                            {getStatBar(kindnessDisplay, 100).substring(0, 5)}...
                        </div>
                        <div className="text-right font-pixel text-[10px] mt-1">{kindnessDisplay}</div>
                    </div>
                     <div className="bg-white p-2 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,0.1)]">
                        <div className="font-bold text-sm mb-1">대담함</div>
                        <div className="font-mono text-xs tracking-tighter text-retro-success overflow-hidden whitespace-nowrap">
                            {getStatBar(confidenceDisplay, 100).substring(0, 5)}...
                        </div>
                        <div className="text-right font-pixel text-[10px] mt-1">{confidenceDisplay}</div>
                    </div>
                </div>
            </div>
        </div>

        {/* Footer */}
        <div className="bg-black text-white p-3 flex justify-between items-center font-pixel text-[10px]">
            <span>IDOL MANAGER CARD</span>
            <span className="opacity-70">{new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
}
