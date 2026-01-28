import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { PersonalityScore, PersonaInfo, PersonaType, StatChange } from '@/types';
import { addStatSnapshotAtom } from '@/store/historyAtoms';

// 온보딩 완료 여부 - localStorage에 자동 저장
export const onboardingCompletedAtom = atomWithStorage<boolean>('idol-onboarding-completed', false);

// 친밀도 (0~100) - localStorage에 자동 저장
export const bondLevelAtom = atomWithStorage<number>('idol-bond-level', 50);

// 성향 지수 (-100 ~ 100) - localStorage에 자동 저장
export const personalityScoreAtom = atomWithStorage<PersonalityScore>(
  'idol-personality-score',
  {
    kindness: 0,
    confidence: 0,
  }
);

// 페르소나 타입 정보
const PERSONA_MAP: Record<PersonaType, PersonaInfo> = {
  'gentle-confident': {
    type: 'gentle-confident',
    title: '다정한 리더',
    emoji: '🌟',
    description: '따뜻하면서도 당당한 리더십을 가진 아이돌',
  },
  'gentle-shy': {
    type: 'gentle-shy',
    title: '햇살 같은 동료',
    emoji: '🌻',
    description: '부드럽고 친근하지만 조금 수줍은 매력',
  },
  'cold-confident': {
    type: 'cold-confident',
    title: '독기 있는 연습생',
    emoji: '🔥',
    description: '냉철하고 목표 지향적인 프로 정신',
  },
  'cold-shy': {
    type: 'cold-shy',
    title: '조용한 프로',
    emoji: '🌙',
    description: '말은 없지만 실력으로 증명하는 스타일',
  },
  'balanced': {
    type: 'balanced',
    title: '균형잡힌 아이돌',
    emoji: '⚖️',
    description: '어떤 상황에도 적응하는 밸런스형',
  },
};

// 성격 유형 계산 함수
function calculatePersona(score: PersonalityScore): PersonaInfo {
  const { kindness, confidence } = score;

  // 균형잡힌 타입 (둘 다 -20 ~ 20 범위 내)
  if (Math.abs(kindness) < 20 && Math.abs(confidence) < 20) {
    return PERSONA_MAP['balanced'];
  }

  // 4가지 주요 타입
  if (kindness > 0 && confidence > 0) {
    return PERSONA_MAP['gentle-confident'];
  } else if (kindness > 0 && confidence <= 0) {
    return PERSONA_MAP['gentle-shy'];
  } else if (kindness <= 0 && confidence > 0) {
    return PERSONA_MAP['cold-confident'];
  } else {
    return PERSONA_MAP['cold-shy'];
  }
}

// 현재 페르소나 (derived atom) - 성향 지수에 따라 자동 계산
export const currentPersonaAtom = atom<PersonaInfo>(
  (get) => {
    const score = get(personalityScoreAtom);
    return calculatePersona(score);
  }
);

// 스탯 변화 로그 (플로팅 텍스트용) - 메모리에만 저장, 최대 10개 유지
export const statChangeLogAtom = atom<StatChange[]>([]);

// 스탯 변화 추가 헬퍼
export const addStatChangeAtom = atom(
  null,
  (get, set, change: Omit<StatChange, 'id' | 'timestamp'>) => {
    const newChange: StatChange = {
      ...change,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    };

    const currentLog = get(statChangeLogAtom);
    // 최신 10개만 유지
    set(statChangeLogAtom, [...currentLog, newChange].slice(-10));

    // 2초 후 자동 제거
    setTimeout(() => {
      set(statChangeLogAtom, (log) => log.filter((l) => l.id !== newChange.id));
    }, 2000);
  }
);

// 친밀도 업데이트 헬퍼 (변화량 로그 자동 생성)
export const updateBondLevelAtom = atom(
  null,
  (get, set, delta: number) => {
    const current = get(bondLevelAtom);
    const newValue = Math.max(0, Math.min(100, current + delta));
    set(bondLevelAtom, newValue);

    // 변화가 있으면 로그 추가
    if (delta !== 0) {
      set(addStatChangeAtom, { type: 'bond', value: delta });

      // 히스토리 기록
      const personality = get(personalityScoreAtom);
      const persona = get(currentPersonaAtom);
      set(addStatSnapshotAtom, {
        timestamp: Date.now(),
        bondLevel: newValue,
        kindness: personality.kindness,
        confidence: personality.confidence,
        persona: persona.type,
      });
    }
  }
);

// 성향 지수 업데이트 헬퍼 (변화량 로그 자동 생성)
export const updatePersonalityAtom = atom(
  null,
  (get, set, updates: { kindness?: number; confidence?: number }) => {
    const current = get(personalityScoreAtom);
    const newScore = {
      kindness: updates.kindness !== undefined
        ? Math.max(-100, Math.min(100, current.kindness + updates.kindness))
        : current.kindness,
      confidence: updates.confidence !== undefined
        ? Math.max(-100, Math.min(100, current.confidence + updates.confidence))
        : current.confidence,
    };

    set(personalityScoreAtom, newScore);

    // 변화가 있으면 로그 추가
    const hasChange = (updates.kindness !== undefined && updates.kindness !== 0) ||
                      (updates.confidence !== undefined && updates.confidence !== 0);

    if (updates.kindness !== undefined && updates.kindness !== 0) {
      set(addStatChangeAtom, { type: 'kindness', value: updates.kindness });
    }
    if (updates.confidence !== undefined && updates.confidence !== 0) {
      set(addStatChangeAtom, { type: 'confidence', value: updates.confidence });
    }

    // 히스토리 기록
    if (hasChange) {
      const bondLevel = get(bondLevelAtom);
      const persona = get(currentPersonaAtom);
      set(addStatSnapshotAtom, {
        timestamp: Date.now(),
        bondLevel,
        kindness: newScore.kindness,
        confidence: newScore.confidence,
        persona: persona.type,
      });
    }
  }
);
