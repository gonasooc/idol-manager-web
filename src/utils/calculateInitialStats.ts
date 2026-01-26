import type { Question } from './questions';

export interface InitialStats {
  bondLevel: number;
  kindness: number;
  confidence: number;
}

export function calculateInitialStats(answers: number[][], questions: Question[]): InitialStats {
  const totalWeights = {
    kindness: 0,
    confidence: 0,
    bondLevel: 0,
  };

  // 각 답변의 가중치 합산
  answers.forEach((answer) => {
    const [questionIndex, optionIndex] = answer;
    const option = questions[questionIndex].options[optionIndex];
    const weights = option.weights;

    if (weights.kindness) totalWeights.kindness += weights.kindness;
    if (weights.confidence) totalWeights.confidence += weights.confidence;
    if (weights.bondLevel) totalWeights.bondLevel += weights.bondLevel;
  });

  // 초기값 설정 (bondLevel은 0~100, kindness/confidence는 -100~100)
  const bondLevel = Math.max(0, Math.min(100, 50 + totalWeights.bondLevel));
  const kindness = Math.max(-100, Math.min(100, totalWeights.kindness));
  const confidence = Math.max(-100, Math.min(100, totalWeights.confidence));

  return {
    bondLevel,
    kindness,
    confidence,
  };
}
