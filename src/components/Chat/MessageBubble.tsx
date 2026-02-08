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
      className={`flex items-end mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Idol Avatar (only for idol messages) */}
      {!isUser && (
        <motion.div
          className="shrink-0 w-10 h-10 mr-2 bg-white border-2 border-black rounded-full overflow-hidden flex items-center justify-center text-xl shadow-[2px_2px_0_0_rgba(0,0,0,1)]"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          {persona.emoji}
        </motion.div>
      )}

      {/* Message Bubble Container */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%]`}>
        
        {/* Idol Name (outside bubble, above) */}
        {!isUser && (
          <span className="font-pixel text-[10px] text-gray-500 mb-1 ml-1">
            {persona.title}
          </span>
        )}

        {/* Bubble */}
        <div
          className={`relative px-4 py-3 border-2 border-black shadow-[2px_2px_0_0_rgba(0,0,0,0.1)] ${
            isUser
              ? 'bg-[#7928ca] text-white rounded-l-2xl rounded-tr-2xl rounded-br-sm'
              : 'bg-white text-black rounded-r-2xl rounded-tl-2xl rounded-bl-sm'
          }`}
        >
          {/* Message content */}
          <p className="font-retro text-lg leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>

          {/* Stat changes display inside bubble */}
          {message.statChanges && (
            <div className="mt-2 pt-2 border-t border-black/10 flex flex-wrap gap-1">
              {message.statChanges.bond !== undefined && message.statChanges.bond !== 0 && (
                <span className="font-pixel text-[9px] px-1.5 py-0.5 bg-black text-white rounded-sm">
                  친밀도 {message.statChanges.bond > 0 ? '+' : ''}{message.statChanges.bond}
                </span>
              )}
              {message.statChanges.kindness !== undefined && message.statChanges.kindness !== 0 && (
                <span className="font-pixel text-[9px] px-1.5 py-0.5 bg-retro-warning text-black border border-black rounded-sm">
                  따뜻함 {message.statChanges.kindness > 0 ? '+' : ''}{message.statChanges.kindness}
                </span>
              )}
              {message.statChanges.confidence !== undefined && message.statChanges.confidence !== 0 && (
                <span className="font-pixel text-[9px] px-1.5 py-0.5 bg-retro-success text-black border border-black rounded-sm">
                  대담함 {message.statChanges.confidence > 0 ? '+' : ''}{message.statChanges.confidence}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Timestamp (outside bubble, bottom) */}
        <span className="font-retro text-[10px] text-gray-400 mt-1 mx-1">
          {new Date(message.timestamp).toLocaleTimeString('ko-KR', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
      </div>
    </motion.div>
  );
}
