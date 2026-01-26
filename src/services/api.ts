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

export interface StatChanges {
  bond?: number;
  kindness?: number;
  confidence?: number;
}

/**
 * 채팅 메시지 전송 (SSE 스트리밍)
 */
export async function sendChatMessageStream(
  request: ChatRequest,
  onChunk: (text: string) => void,
  onComplete: (statChanges: StatChanges) => void,
  onError: (error: Error) => void
): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/chat/stream`, {
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

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('ReadableStream not supported');
    }

    const decoder = new TextDecoder();
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      // Decode the chunk and add to buffer
      buffer += decoder.decode(value, { stream: true });

      // Process complete SSE events
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // Keep incomplete line in buffer

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const data = line.slice(6).trim();

          if (data === '[DONE]') {
            continue;
          }

          try {
            const parsed = JSON.parse(data);

            if (parsed.type === 'chunk') {
              onChunk(parsed.content);
            } else if (parsed.type === 'done') {
              onComplete(parsed.statChanges || {});
            }
          } catch (e) {
            console.warn('Failed to parse SSE data:', data, e);
          }
        }
      }
    }
  } catch (error) {
    onError(error instanceof Error ? error : new Error('Unknown error'));
  }
}
