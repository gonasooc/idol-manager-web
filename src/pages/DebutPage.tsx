import { useState } from 'react';
import { useAtomValue } from 'jotai';
import { motion } from 'framer-motion';
import { bondLevelAtom, personalityScoreAtom, currentPersonaAtom } from '@/store/atoms';
import { DebutCardModal } from '@/components/DebutCard';
import { resetOnboarding } from '@/utils/resetOnboarding';

export function DebutPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const bondLevel = useAtomValue(bondLevelAtom);
  const personality = useAtomValue(personalityScoreAtom);
  const persona = useAtomValue(currentPersonaAtom);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="retro-window max-w-md w-full"
      >
        {/* Title Bar */}
        <div className="retro-titlebar">
          <span>DEBUT_CARD.exe</span>
          <div className="flex gap-1">
            <button className="retro-titlebar-btn">_</button>
            <button className="retro-titlebar-btn">x</button>
          </div>
        </div>

        {/* Content */}
        <div className="retro-content text-center">
          {/* Animated Card Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotateY: [0, 360] }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="inline-block mb-6"
          >
            <div className="w-24 h-32 bg-linear-to-br from-retro-gold via-retro-pink to-retro-teal border-4 border-gray-800 flex items-center justify-center shadow-pixel">
              <span className="font-pixel text-2xl text-white">[*]</span>
            </div>
          </motion.div>

          <h1 className="font-pixel text-sm text-gray-800 mb-4">데뷔 카드 생성기</h1>
          <p className="font-retro text-xl text-gray-600 mb-6">
            아이돌의 성장을 담은 특별한 카드를 만드세요!
          </p>

          {/* Current Stats Preview */}
          <div className="bg-black p-3 mb-6 space-y-2 text-left">
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
              <span className="font-retro text-lg text-gray-400">성격</span>
              <span className="font-pixel text-xs text-retro-pink">{persona.emoji} {persona.title}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
              <span className="font-retro text-lg text-gray-400">친밀도</span>
              <span className="font-pixel text-xs text-retro-red">{bondLevel}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-700 pb-2">
              <span className="font-retro text-lg text-gray-400">상냥함</span>
              <span className="font-pixel text-xs text-retro-gold">{personality.kindness > 0 ? '+' : ''}{personality.kindness}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-retro text-lg text-gray-400">자신감</span>
              <span className="font-pixel text-xs text-retro-teal">{personality.confidence > 0 ? '+' : ''}{personality.confidence}</span>
            </div>
          </div>

          {/* Grade Info */}
          <div className="bg-retro-blue-dark p-3 mb-6 border-2 border-retro-gold">
            <div className="font-pixel text-xs text-retro-gold mb-3">등급 시스템</div>
            <div className="space-y-1 font-retro text-lg">
              <div className="flex justify-between text-retro-pink">
                <span>S RANK (90+)</span>
                <span>***</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>A RANK (70-89)</span>
                <span>**</span>
              </div>
              <div className="flex justify-between text-retro-orange">
                <span>B RANK (50-69)</span>
                <span>*</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>C RANK (0-49)</span>
                <span>-</span>
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsModalOpen(true)}
            className="retro-btn retro-btn-primary w-full py-4"
          >
            카드 생성
          </motion.button>

          {/* Reset Button */}
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              if (window.confirm('모든 데이터가 초기화됩니다. 새 아이돌을 육성하시겠습니까?')) {
                resetOnboarding();
              }
            }}
            className="retro-btn w-full py-3 mt-3 text-gray-500 hover:text-gray-700 border-gray-400"
          >
            새 아이돌 육성하기
          </motion.button>
        </div>
      </motion.div>

      <DebutCardModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bondLevel={bondLevel}
        kindness={personality.kindness}
        confidence={personality.confidence}
        persona={persona}
      />
    </div>
  );
}
