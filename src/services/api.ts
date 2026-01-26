/**
 * Backend API Service
 * 실제 백엔드 API와 통신하는 서비스
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ChatRequest {
  message: string;
  stats: {
    bondLevel: number;
    kindness: number;
    confidence: number;
  };
  persona: string;
}

export interface ChatResponse {
  response: string;
  statChanges: {
    bond: number;
    kindness: number;
    confidence: number;
  };
}

export interface HealthResponse {
  status: 'ok' | 'degraded';
  backend: string;
  ollama: string;
}

/**
 * 채팅 메시지 전송
 */
export async function sendChatMessage(request: ChatRequest): Promise<ChatResponse> {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || 'API 요청 실패');
  }

  return response.json();
}

/**
 * 서버 상태 확인
 */
export async function checkHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_URL}/api/health`, {
      method: 'GET',
    });

    if (!response.ok) {
      return false;
    }

    const data: HealthResponse = await response.json();
    return data.status === 'ok' || data.status === 'degraded';
  } catch (error) {
    console.error('Health check failed:', error);
    return false;
  }
}

/**
 * 상세 서버 상태 조회
 */
export async function getHealthStatus(): Promise<HealthResponse | null> {
  try {
    const response = await fetch(`${API_URL}/api/health`, {
      method: 'GET',
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Health status failed:', error);
    return null;
  }
}
