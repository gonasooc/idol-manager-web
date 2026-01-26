import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { Message } from '../types';

// 메시지 히스토리 - localStorage에 자동 저장
export const messagesAtom = atomWithStorage<Message[]>('idol-messages', []);

// 아이돌 타이핑 중 여부
export const isTypingAtom = atom<boolean>(false);

// 메시지 추가 헬퍼
export const addMessageAtom = atom(
  null,
  (get, set, message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    };

    const currentMessages = get(messagesAtom);
    set(messagesAtom, [...currentMessages, newMessage]);
  }
);

// 메시지 히스토리 초기화
export const clearMessagesAtom = atom(
  null,
  (_get, set) => {
    set(messagesAtom, []);
  }
);
