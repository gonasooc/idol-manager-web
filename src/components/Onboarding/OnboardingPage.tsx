import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { AnimatePresence, motion } from 'framer-motion';
import { questions } from '../../utils/questions';
import { calculateInitialStats } from '../../utils/calculateInitialStats';
import {
  bondLevelAtom,
  personalityScoreAtom,
  onboardingCompletedAtom,
  currentPersonaAtom,
} from '../../store/atoms';
import { ProgressBar } from './ProgressBar';
import { QuestionCard } from './QuestionCard';
import { ResultScreen } from './ResultScreen';
import { useAtomValue } from 'jotai';

export function OnboardingPage() {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<number[][]>([]);
  const [showResult, setShowResult] = useState(false);
  const [calculatedStats, setCalculatedStats] = useState<ReturnType<typeof calculateInitialStats> | null>(null);

  const setBondLevel = useSetAtom(bondLevelAtom);
  const setPersonalityScore = useSetAtom(personalityScoreAtom);
  const setOnboardingCompleted = useSetAtom(onboardingCompletedAtom);
  const currentPersona = useAtomValue(currentPersonaAtom);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers, [currentQuestionIndex, optionIndex]];
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions completed - calculate initial stats
      const stats = calculateInitialStats(newAnswers, questions);
      setCalculatedStats(stats);
      setShowResult(true);
    }
  };

  const handleStart = () => {
    if (calculatedStats) {
      // Save calculated stats to Jotai atoms
      setBondLevel(calculatedStats.bondLevel);
      setPersonalityScore({
        kindness: calculatedStats.kindness,
        confidence: calculatedStats.confidence,
      });
      setOnboardingCompleted(true);
      navigate('/main');
    }
  };

  if (showResult && calculatedStats) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ResultScreen
          stats={calculatedStats}
          personaTitle={currentPersona.title}
          personaEmoji={currentPersona.emoji}
          personaDescription={currentPersona.description}
          onStart={handleStart}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Title Window */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="retro-window mb-6"
        >
          <div className="retro-titlebar">
            <span>IDOL_MANAGER.exe</span>
            <div className="flex gap-1">
              <button className="retro-titlebar-btn">_</button>
              <button className="retro-titlebar-btn">x</button>
            </div>
          </div>
          <div className="retro-content text-center py-4">
            <h1 className="font-pixel text-lg text-gray-900 mb-2">
              IDOL MANAGER
            </h1>
            <p className="font-retro text-xl text-gray-600">
              당신의 프로듀싱 스타일을 알려주세요
            </p>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <ProgressBar
          current={currentQuestionIndex + 1}
          total={questions.length}
        />

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestionIndex}
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        </AnimatePresence>
      </div>
    </div>
  );
}
