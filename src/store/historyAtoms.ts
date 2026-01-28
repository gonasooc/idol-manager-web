import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import type { PersonaType } from '@/types';

export interface StatSnapshot {
  timestamp: number;
  bondLevel: number;
  kindness: number;
  confidence: number;
  persona: PersonaType;
}

// localStorage에 스탯 히스토리 저장
export const statHistoryAtom = atomWithStorage<StatSnapshot[]>('idol-stat-history', []);

// 스탯 히스토리에 새로운 스냅샷 추가
export const addStatSnapshotAtom = atom(
  null,
  (get, set, snapshot: StatSnapshot) => {
    const history = get(statHistoryAtom);
    set(statHistoryAtom, [...history, snapshot]);
  }
);

// 통계 계산용 derived atoms
export const historyStatsAtom = atom((get) => {
  const history = get(statHistoryAtom);

  if (history.length === 0) {
    return {
      totalSnapshots: 0,
      maxBondLevel: 0,
      minBondLevel: 0,
      mostFrequentPersona: 'balanced' as PersonaType,
      personaCounts: {} as Record<PersonaType, number>,
    };
  }

  const bondLevels = history.map(s => s.bondLevel);
  const maxBondLevel = Math.max(...bondLevels);
  const minBondLevel = Math.min(...bondLevels);

  // 페르소나별 카운트
  const personaCounts = history.reduce((acc, snapshot) => {
    acc[snapshot.persona] = (acc[snapshot.persona] || 0) + 1;
    return acc;
  }, {} as Record<PersonaType, number>);

  // 가장 많이 머문 페르소나
  const mostFrequentPersona = Object.entries(personaCounts).reduce(
    (max, [persona, count]) => (count > max.count ? { persona: persona as PersonaType, count } : max),
    { persona: 'balanced' as PersonaType, count: 0 }
  ).persona;

  return {
    totalSnapshots: history.length,
    maxBondLevel,
    minBondLevel,
    mostFrequentPersona,
    personaCounts,
  };
});
