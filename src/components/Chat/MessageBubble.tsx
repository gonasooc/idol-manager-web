import { motion } from 'framer-motion';
import type { Message } from '@/types';
import { useAtomValue } from 'jotai';
import { currentPersonaAtom } from '@/store/atoms';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const persona = useAtomValue(currentPersonaAtom);
  const isUser = message.role === 'user';

  // Don't render idol messages without content (TypingIndicator handles this state)
  if (!isUser && !message.content) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Idol Avatar (only for idol messages) */}
      {!isUser && (
        <motion.div
          className="flex-shrink-0 w-10 h-10 bg-win95-medium border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 flex items-center justify-center text-xl"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 3 }}
        >
          {persona.emoji}
        </motion.div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-[75%] ${
          isUser
            ? 'retro-bubble retro-bubble-user'
            : 'retro-bubble retro-bubble-idol'
        }`}
      >
        {/* Idol name (only for idol messages) */}
        {!isUser && (
          <div className="font-pixel text-xs text-gray-800 mb-2 pb-1 border-b border-dashed border-gray-500">
            {persona.title}
          </div>
        )}

        {/* Message content */}
        <p className="font-retro text-xl leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>

        {/* Stat changes display */}
        {message.statChanges && (
          <div className="mt-2 pt-2 border-t border-dashed border-gray-500 flex flex-wrap gap-2">
            {message.statChanges.bond !== undefined && message.statChanges.bond !== 0 && (
              <span
                className={`font-pixel text-xs px-2 py-1 ${
                  message.statChanges.bond > 0
                    ? 'bg-pink-600 text-white'
                    : 'bg-red-700 text-white'
                }`}
              >
                친밀도 {message.statChanges.bond > 0 ? '+' : ''}{message.statChanges.bond}
              </span>
            )}
            {message.statChanges.kindness !== undefined && message.statChanges.kindness !== 0 && (
              <span
                className={`font-pixel text-xs px-2 py-1 ${
                  message.statChanges.kindness > 0
                    ? 'bg-amber-600 text-white'
                    : 'bg-blue-700 text-white'
                }`}
              >
                따뜻함 {message.statChanges.kindness > 0 ? '+' : ''}{message.statChanges.kindness}
              </span>
            )}
            {message.statChanges.confidence !== undefined && message.statChanges.confidence !== 0 && (
              <span
                className={`font-pixel text-xs px-2 py-1 ${
                  message.statChanges.confidence > 0
                    ? 'bg-orange-600 text-white'
                    : 'bg-emerald-700 text-white'
                }`}
              >
                대담함 {message.statChanges.confidence > 0 ? '+' : ''}{message.statChanges.confidence}
              </span>
            )}
          </div>
        )}

        {/* Timestamp */}
        <div
          className={`font-retro text-sm mt-2 ${
            isUser ? 'text-gray-700' : 'text-gray-700'
          }`}
        >
          {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </div>
      </div>

      {/* User Avatar Placeholder */}
      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 bg-retro-cyan border-2 border-t-white border-l-white border-b-gray-600 border-r-gray-600 flex items-center justify-center font-pixel text-xs text-gray-800">
          YOU
        </div>
      )}
    </motion.div>
  );
}
