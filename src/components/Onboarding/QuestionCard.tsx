import { motion } from 'framer-motion';
import type { Question } from '../../utils/questions';

interface QuestionCardProps {
  question: Question;
  onAnswer: (optionIndex: number) => void;
}

export function QuestionCard({ question, onAnswer }: QuestionCardProps) {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="retro-window">
        {/* Title Bar */}
        <div className="retro-titlebar">
          <span>QUESTION_{question.id}.txt</span>
        </div>

        {/* Content */}
        <div className="retro-content">
          {/* Question Text */}
          <div className="mb-6 p-4 bg-black text-center">
            <h2 className="font-retro text-2xl text-retro-gold leading-relaxed">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => onAnswer(index)}
                className="w-full p-4 text-left font-retro text-xl bg-win95-medium border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 hover:bg-retro-teal/20 transition-none group"
                whileTap={{
                  borderColor: '#808080 #ffffff #ffffff #808080',
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Option number */}
                  <span className="font-pixel text-xs text-retro-blue-dark bg-retro-gold px-2 py-1 flex-shrink-0">
                    {index + 1}
                  </span>
                  {/* Option text */}
                  <span className="text-gray-800 group-hover:text-retro-blue-dark">
                    {option.text}
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Hint */}
          <div className="mt-4 text-center">
            <span className="font-retro text-lg text-gray-500">
              계속하려면 옵션을 선택하세요
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
