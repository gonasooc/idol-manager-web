import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { motion } from 'framer-motion';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: ChatInputProps) {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      // Set height based on scrollHeight, max 120px (approx 5 rows)
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSend = () => {
    // Allow whitespace messages (removed trim check), but prevent empty string
    if (input.length > 0 && !disabled) {
      onSend(input);
      setInput('');
      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
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
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "연결 중이거나 오프라인 상태입니다..." : "메시지를 입력하세요..."}
          disabled={disabled}
          maxLength={1000}
          rows={1}
          className="retro-input flex-1 resize-none disabled:bg-gray-100 disabled:cursor-not-allowed overflow-y-auto disabled:text-gray-400"
          style={{
            minHeight: '44px',
            maxHeight: '120px',
            lineHeight: '24px'
          }}
        />

        {/* Send Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
          onClick={handleSend}
          disabled={disabled || input.length === 0}
          className={`retro-btn ${
            disabled || input.length === 0
              ? 'opacity-50'
              : 'retro-btn-primary'
          }`}
          style={{ height: '44px' }}
        >
          전송
        </motion.button>
      </div>

      {/* Keyboard hint & Char count */}
      <div className="max-w-4xl mx-auto mt-2 flex justify-between items-center px-1">
        <span className="font-pixel text-[10px] text-gray-400">
          ENTER로 전송 | SHIFT+ENTER로 줄바꿈
        </span>
        <span className={`font-pixel text-[10px] ${input.length >= 1000 ? 'text-retro-error' : 'text-gray-400'}`}>
          {disabled ? "OFFLINE" : `${input.length}/1000`}
        </span>
      </div>
    </div>
  );
}
