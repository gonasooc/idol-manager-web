// Core data types for the idol management system

export interface PersonalityScore {
  kindness: number;      // -100 (냉정함) ~ 100 (다정함)
  confidence: number;    // -100 (소심함) ~ 100 (자신감)
}

export type PersonaType =
  | 'gentle-confident'    // 다정하고 자신감 있는 리더형
  | 'gentle-shy'          // 햇살 같은 동료
  | 'cold-confident'      // 독기 있는 연습생
  | 'cold-shy'            // 냉정하고 조용한 프로
  | 'balanced';           // 균형 잡힌 아이돌

export interface PersonaInfo {
  type: PersonaType;
  title: string;
  emoji: string;
  description: string;
}

export interface StatChange {
  id: string;
  type: 'bond' | 'kindness' | 'confidence';
  value: number;
  timestamp: number;
}

export interface IdolStats {
  bondLevel: number;           // 0 ~ 100
  personalityScore: PersonalityScore;
  currentPersona: PersonaInfo;
}

// Chat message types
export interface Message {
  id: string;
  role: 'user' | 'idol';
  content: string;
  timestamp: number;
  isStreaming?: boolean;
  statChanges?: {
    bond?: number;
    kindness?: number;
    confidence?: number;
  };
}
