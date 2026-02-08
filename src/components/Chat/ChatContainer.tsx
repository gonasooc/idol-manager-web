import { useEffect, useRef, useState } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  messagesAtom,
  isTypingAtom,
  addMessageAtom,
  updateMessageContentAtom,
  appendMessageContentAtom,
} from '@/store/chatAtoms';
import {
  bondLevelAtom,
  personalityScoreAtom,
  currentPersonaAtom,
  updateBondLevelAtom,
  updatePersonalityAtom,
} from '@/store/atoms';
import { sendChatMessageStream, checkHealth } from '@/services/api';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { ChatInput } from './ChatInput';
import { ConnectionStatus } from '@/components/UI/ConnectionStatus';

export function ChatContainer() {
  const [messages, setMessages] = useAtom(messagesAtom);
  const [isTyping, setIsTyping] = useAtom(isTypingAtom);
  const addMessage = useSetAtom(addMessageAtom);
  const updateMessageContent = useSetAtom(updateMessageContentAtom);
  const appendMessageContent = useSetAtom(appendMessageContentAtom);
  const updateBond = useSetAtom(updateBondLevelAtom);
  const updatePersonality = useSetAtom(updatePersonalityAtom);

  const bondLevel = useAtomValue(bondLevelAtom);
  const personalityScore = useAtomValue(personalityScoreAtom);
  const currentPersona = useAtomValue(currentPersonaAtom);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const currentIdolMessageIdRef = useRef<string | null>(null);

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
    // Check if online
    if (!isOnline) {
      return; // 오프라인이면 메시지 전송 불가
    }

    // Add user message
    addMessage({
      role: 'user',
      content,
    });

    // Show typing indicator
    setIsTyping(true);

    // Create idol message with unique ID and empty content
    const idolMessageId = `${Date.now()}-${Math.random()}`;
    currentIdolMessageIdRef.current = idolMessageId;

    // Manually add message to have control over the ID
    const newIdolMessage = {
      id: idolMessageId,
      role: 'idol' as const,
      content: '',
      timestamp: Date.now(),
      isStreaming: true,
    };

    setMessages((prev) => [...prev, newIdolMessage]);

    try {
      await sendChatMessageStream(
        {
          message: content,
          stats: {
            bondLevel,
            kindness: personalityScore.kindness,
            confidence: personalityScore.confidence,
          },
          persona: currentPersona.type,
        },
        // onChunk: append text to message
        (chunk: string) => {
          appendMessageContent({
            id: idolMessageId,
            chunk: chunk,
            isStreaming: true,
          });
        },
        // onComplete: apply stat changes and mark streaming complete
        (statChanges) => {
          // Mark streaming as complete and save statChanges to message
          appendMessageContent({
            id: idolMessageId,
            chunk: '',
            isStreaming: false,
            statChanges,
          });

          // Apply stat changes
          if (statChanges.bond !== undefined) {
            updateBond(statChanges.bond);
          }
          if (
            statChanges.kindness !== undefined ||
            statChanges.confidence !== undefined
          ) {
            updatePersonality({
              kindness: statChanges.kindness,
              confidence: statChanges.confidence,
            });
          }
        },
        // onError: handle streaming errors
        // onError: handle streaming errors
        (error) => {
          console.error('Stream error:', error);
          updateMessageContent({
            id: idolMessageId,
            content: '앗, 잠시만요! 머리 식힐 시간이 필요해요 💦 조금만 있다가 다시 대화해요!',
            isStreaming: false,
          });
          // setIsOnline(false) removed as per user request (only health check updates status)
        }
      );
    } catch (error) {
      console.error('Message send failed:', error);
      updateMessageContent({
        id: idolMessageId,
        content: '앗, 잠시만요! 머리 식힐 시간이 필요해요 💦 조금만 있다가 다시 대화해요!',
        isStreaming: false,
      });
      // setIsOnline(false) removed as per user request
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-retro-bg">
      {/* Neo-Retro Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b-2 border-black sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-black overflow-hidden bg-retro-primary/[0.2] flex items-center justify-center">
            <span className="text-lg">{currentPersona.emoji}</span>
          </div>
          <div>
              <div className="font-pixel text-xs font-bold text-black">{currentPersona.title}</div>
              <div className="font-retro text-xs text-green-600 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                ONLINE
              </div>
          </div>
        </div>
        <div>
          <ConnectionStatus isOnline={isOnline} />
        </div>
      </div>

      {/* Message List */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        {messages.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4 animate-pop-in">{currentPersona.emoji}</div>
            <p className="font-pixel text-sm text-gray-900 mb-2">{currentPersona.title}</p>
            <p className="font-retro text-xl text-gray-700">{currentPersona.description}</p>
            <div className="mt-8 mx-auto max-w-xs p-4 border-2 border-black bg-white shadow-[4px_4px_0_0_#000] rotate-1 hover:rotate-0 transition-transform">
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

      {/* Offline Warning */}
      {isOnline === false && (
        <div className="px-4 py-2 bg-retro-error text-white border-t-2 border-black">
          <p className="font-pixel text-xs text-center">
            서버에 연결할 수 없습니다. 백엔드 서버를 확인해주세요.
          </p>
        </div>
      )}

      {/* Chat Input */}
      <ChatInput 
        onSend={handleSendMessage} 
        disabled={isTyping || isOnline === false} 
        isOnline={isOnline !== false} 
        isTyping={isTyping}
      />
    </div>
  );
}
