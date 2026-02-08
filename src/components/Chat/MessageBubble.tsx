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
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Idol Avatar (only for idol messages) */}
      {!isUser && (
        <motion.div
          className="shrink-0 w-12 h-12 bg-white border-2 border-black rounded-full overflow-hidden flex items-center justify-center text-xl shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {persona.emoji}
        </motion.div>
      )}

      {/* Message Bubble */}
      <div
        className={`max-w-[75%] ${
          isUser
            ? 'retro-bubble retro-bubble-user animate-pop-in origin-bottom-right'
            : 'retro-bubble retro-bubble-idol animate-pop-in origin-bottom-left'
        }`}
      >
        {/* Idol name (only for idol messages) */}
        {!isUser && (
          <div className="font-pixel text-xs text-retro-primary mb-2 pb-1 border-b-2 border-dashed border-gray-200 uppercase tracking-wider">
            {persona.title}
          </div>
        )}

        {/* Message content */}
        <p className="font-retro text-xl leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>

        {/* Stat changes display */}
        {message.statChanges && (
          <div className="mt-2 pt-2 border-t-2 border-gray-100 flex flex-wrap gap-2">
            {message.statChanges.bond !== undefined && message.statChanges.bond !== 0 && (
              <span
                className={`font-pixel text-[10px] px-2 py-1 rounded-sm border border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)] ${
                  message.statChanges.bond > 0
                    ? 'bg-retro-primary text-black'
                    : 'bg-retro-error text-black'
                }`}
              >
                친밀도 {message.statChanges.bond > 0 ? '+' : ''}{message.statChanges.bond}
              </span>
            )}
            {message.statChanges.kindness !== undefined && message.statChanges.kindness !== 0 && (
              <span
                className={`font-pixel text-[10px] px-2 py-1 rounded-sm border border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)] ${
                  message.statChanges.kindness > 0
                    ? 'bg-retro-warning text-black'
                    : 'bg-retro-blue text-white'
                }`}
              >
                따뜻함 {message.statChanges.kindness > 0 ? '+' : ''}{message.statChanges.kindness}
              </span>
            )}
            {message.statChanges.confidence !== undefined && message.statChanges.confidence !== 0 && (
              <span
                className={`font-pixel text-[10px] px-2 py-1 rounded-sm border border-black shadow-[1px_1px_0_0_rgba(0,0,0,1)] ${
                  message.statChanges.confidence > 0
                    ? 'bg-retro-success text-black'
                    : 'bg-retro-secondary text-white'
                }`}
              >
                대담함 {message.statChanges.confidence > 0 ? '+' : ''}{message.statChanges.confidence}
              </span>
            )}
          </div>
        )}

        {/* Timestamp */}
        <div
          className={`font-retro text-xs mt-2 opacity-60 ${
            isUser ? 'text-white' : 'text-black'
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
        <div className="shrink-0 w-10 h-10 bg-retro-black border-2 border-black rounded-lg flex items-center justify-center font-pixel text-[8px] text-white shadow-[2px_2px_0_0_rgba(100,100,100,1)]">
          YOU
        </div>
      )}
    </motion.div>
  );
}
