import { useEffect, useRef, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  messagesAtom,
  isTypingAtom,
  addMessageAtom,
} from '../../store/chatAtoms';
import {
  bondLevelAtom,
  personalityScoreAtom,
  currentPersonaAtom,
  updateBondLevelAtom,
  updatePersonalityAtom,
} from '../../store/atoms';
import { sendChatMessage, checkHealth } from '../../services/api';
import { sendMessage as sendMockMessage } from '../../services/mockChatApi';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { ChatInput } from './ChatInput';
import { ConnectionStatus } from '../UI/ConnectionStatus';

export function ChatContainer() {
  const messages = useAtomValue(messagesAtom);
  const [isTyping, setIsTyping] = useAtom(isTypingAtom);
  const addMessage = useSetAtom(addMessageAtom);
  const updateBond = useSetAtom(updateBondLevelAtom);
  const updatePersonality = useSetAtom(updatePersonalityAtom);

  const bondLevel = useAtomValue(bondLevelAtom);
  const personalityScore = useAtomValue(personalityScoreAtom);
  const currentPersona = useAtomValue(currentPersonaAtom);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Backend connection state
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  // Auto scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Check backend connection on mount
  useEffect(() => {
    const checkBackendConnection = async () => {
      const healthy = await checkHealth();
      setIsOnline(healthy);
      if (!healthy) {
        console.warn('Backend connection failed. Running in offline mode (Mock API).');
      }
    };

    checkBackendConnection();
  }, []);

  const handleSendMessage = async (content: string) => {
    // Add user message
    addMessage({
      role: 'user',
      content,
    });

    // Show typing indicator
    setIsTyping(true);

    try {
      let result;

      // Online: real API call
      if (isOnline) {
        try {
          result = await sendChatMessage({
            message: content,
            stats: {
              bondLevel,
              kindness: personalityScore.kindness,
              confidence: personalityScore.confidence,
            },
            persona: currentPersona.type,
          });
        } catch (apiError) {
          console.error('Backend API call failed, falling back to Mock API:', apiError);
          setIsOnline(false);
          result = await sendMockMessage(content, {
            bondLevel,
            personalityScore,
            currentPersona,
          });
        }
      } else {
        // Offline: use Mock API
        result = await sendMockMessage(content, {
          bondLevel,
          personalityScore,
          currentPersona,
        });
      }

      // Apply stat changes
      if (result.statChanges.bond !== undefined) {
        updateBond(result.statChanges.bond);
      }
      if (
        result.statChanges.kindness !== undefined ||
        result.statChanges.confidence !== undefined
      ) {
        updatePersonality({
          kindness: result.statChanges.kindness,
          confidence: result.statChanges.confidence,
        });
      }

      // Add idol response
      addMessage({
        role: 'idol',
        content: result.response,
        statChanges: result.statChanges,
      });
    } catch (error) {
      console.error('Message send failed:', error);
      addMessage({
        role: 'idol',
        content: 'ERROR: Communication failed...',
      });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Retro Window Header */}
      <div className="retro-titlebar">
        <div className="flex items-center gap-2">
          <span className="text-base">{currentPersona.emoji}</span>
          <span>CHAT.exe</span>
        </div>
        <div className="flex gap-1">
          <ConnectionStatus isOnline={isOnline} />
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 bg-retro-cream">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 animate-pixel-bounce">{currentPersona.emoji}</div>
            <p className="font-pixel text-sm text-gray-800 mb-2">{currentPersona.title}</p>
            <p className="font-retro text-xl text-gray-600">{currentPersona.description}</p>
            <div className="mt-6 p-4 border-2 border-dashed border-retro-teal bg-retro-teal/10">
              <p className="font-retro text-lg text-gray-700 blink-cursor">
                대화를 시작하려면 메시지를 보내세요
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <ChatInput onSend={handleSendMessage} disabled={isTyping} />
    </div>
  );
}
