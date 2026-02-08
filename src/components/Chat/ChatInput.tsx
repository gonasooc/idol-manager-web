import { useState, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white p-3 border-t-[3px] border-black">
      <div className="max-w-4xl mx-auto flex items-end gap-2">
        {/* Retro Text Input */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
          disabled={disabled}
          rows={1}
          className="retro-input flex-1 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          style={{
            minHeight: '44px',
            maxHeight: '120px',
          }}
        />

        {/* Send Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className={`retro-btn ${
            disabled || !input.trim()
              ? 'opacity-50'
              : 'retro-btn-primary'
          }`}
        >
          전송
        </motion.button>
      </div>

      {/* Keyboard hint */}
      <div className="max-w-4xl mx-auto mt-2 text-right">
        <span className="font-pixel text-[10px] text-gray-400">
          ENTER로 전송 | SHIFT+ENTER로 줄바꿈
        </span>
      </div>
    </div>
  );
}
