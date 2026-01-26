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
    <div className="bg-win95-medium p-3 border-t-2 border-t-white">
      <div className="max-w-4xl mx-auto flex items-end gap-2">
        {/* Input Label */}
        <div className="font-pixel text-xs text-gray-700 mb-2 hidden sm:block">
          메시지:
        </div>

        {/* Retro Text Input */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="메시지를 입력하세요..."
          disabled={disabled}
          rows={1}
          className="retro-input flex-1 resize-none disabled:bg-gray-200 disabled:cursor-not-allowed"
          style={{
            minHeight: '40px',
            maxHeight: '120px',
          }}
        />

        {/* Send Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleSend}
          disabled={disabled || !input.trim()}
          className={`retro-btn ${
            disabled || !input.trim()
              ? ''
              : 'retro-btn-primary'
          }`}
        >
          전송
        </motion.button>
      </div>

      {/* Keyboard hint */}
      <div className="max-w-4xl mx-auto mt-2">
        <span className="font-retro text-sm text-gray-600">
          ENTER로 전송 | SHIFT+ENTER로 줄바꿈
        </span>
      </div>
    </div>
  );
}
