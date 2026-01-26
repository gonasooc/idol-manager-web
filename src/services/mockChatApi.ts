import type { IdolStats } from '../types';
import {
  getRandomResponse,
  getNegativeResponse,
  getEncouragementResponse,
} from '../utils/speechStyles';

interface ChatResponse {
  response: string;
  statChanges: {
    bond?: number;
    kindness?: number;
    confidence?: number;
  };
}

// 키워드 감지 함수들
function hasPositiveKeywords(message: string): boolean {
  const keywords = ['잘했어', '최고', '응원', '좋아', '멋져', '훌륭', '대단', '완벽', '사랑'];
  return keywords.some(kw => message.includes(kw));
}

function hasNegativeKeywords(message: string): boolean {
  const keywords = ['왜 그래', '실망', '못해', '싫어', '짜증', '별로', '그만', '안 돼'];
  return keywords.some(kw => message.includes(kw));
}

function hasEncouragementKeywords(message: string): boolean {
  const keywords = ['힘내', '할 수 있어', '파이팅', '화이팅', '포기하지마', '괜찮아'];
  return keywords.some(kw => message.includes(kw));
}

// Mock API - 실제로는 백엔드와 통신
export async function sendMessage(
  userMessage: string,
  currentStats: IdolStats
): Promise<ChatResponse> {
  // 네트워크 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

  const { bondLevel, currentPersona } = currentStats;
  const personaType = currentPersona.type;

  let response = '';
  const statChanges: ChatResponse['statChanges'] = {};

  // 키워드 기반 응답 및 스탯 변화
  if (hasPositiveKeywords(userMessage)) {
    response = getRandomResponse(personaType, bondLevel);
    statChanges.bond = Math.floor(Math.random() * 6) + 5; // 5~10
    statChanges.kindness = Math.floor(Math.random() * 3) + 3; // 3~5
  } else if (hasNegativeKeywords(userMessage)) {
    response = getNegativeResponse(personaType, bondLevel);
    statChanges.bond = -(Math.floor(Math.random() * 6) + 5); // -5~-10
    statChanges.kindness = -(Math.floor(Math.random() * 3) + 3); // -3~-5
  } else if (hasEncouragementKeywords(userMessage)) {
    response = getEncouragementResponse(personaType);
    statChanges.bond = Math.floor(Math.random() * 4) + 3; // 3~6
    statChanges.confidence = Math.floor(Math.random() * 4) + 5; // 5~8
  } else {
    // 일반 대화 - 약간의 랜덤 친밀도 증가
    response = getRandomResponse(personaType, bondLevel);
    statChanges.bond = Math.floor(Math.random() * 3) + 1; // 1~3
  }

  return {
    response,
    statChanges,
  };
}
