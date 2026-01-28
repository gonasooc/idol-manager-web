export interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    weights: {
      kindness?: number;
      confidence?: number;
      bondLevel?: number;
    };
  }[];
}

export const questions: Question[] = [
  {
    id: 1,
    question: '연습생을 어떻게 키우고 싶나요?',
    options: [
      {
        text: '혹독하게',
        weights: { kindness: -15, confidence: 5, bondLevel: -5 },
      },
      {
        text: '따뜻하게',
        weights: { kindness: 10, confidence: -5, bondLevel: 3 },
      },
      {
        text: '균형있게',
        weights: { kindness: 0, confidence: 0 },
      },
    ],
  },
  {
    id: 2,
    question: '실수했을 때 어떻게 대하고 싶나요?',
    options: [
      {
        text: '엄하게 지적',
        weights: { kindness: -12, confidence: 3, bondLevel: -3 },
      },
      {
        text: '격려하며 알려주기',
        weights: { kindness: 8, bondLevel: 3 },
      },
      {
        text: '스스로 깨닫게',
        weights: { confidence: 3 },
      },
    ],
  },
  {
    id: 3,
    question: '연습 스케줄은?',
    options: [
      {
        text: '빡빡하게',
        weights: { kindness: -8, confidence: 5, bondLevel: -2 },
      },
      {
        text: '여유있게',
        weights: { kindness: 5, confidence: -3, bondLevel: 2 },
      },
      {
        text: '상황에 따라',
        weights: { kindness: 2, confidence: 2 },
      },
    ],
  },
  {
    id: 4,
    question: '칭찬 스타일은?',
    options: [
      {
        text: '자주 칭찬',
        weights: { kindness: 8, bondLevel: 5 },
      },
      {
        text: '가끔 칭찬',
        weights: { kindness: 2, bondLevel: 1 },
      },
      {
        text: '성과 있을 때만',
        weights: { kindness: -8, confidence: 3, bondLevel: -2 },
      },
    ],
  },
  {
    id: 5,
    question: '목표 설정은?',
    options: [
      {
        text: '높은 목표',
        weights: { confidence: 5, kindness: -5, bondLevel: -2 },
      },
      {
        text: '현실적 목표',
        weights: { kindness: 3, confidence: 3 },
      },
      {
        text: '본인이 정하게',
        weights: { kindness: 5, confidence: -3, bondLevel: 2 },
      },
    ],
  },
  {
    id: 6,
    question: '다른 연습생과 비교?',
    options: [
      {
        text: '자주 비교',
        weights: { kindness: -15, confidence: 5, bondLevel: -5 },
      },
      {
        text: '비교 안함',
        weights: { kindness: 8, bondLevel: 3 },
      },
      {
        text: '가끔',
        weights: { kindness: -3, confidence: 2 },
      },
    ],
  },
  {
    id: 7,
    question: '휴식 시간은?',
    options: [
      {
        text: '최소한',
        weights: { kindness: -12, confidence: 3, bondLevel: -3 },
      },
      {
        text: '충분히',
        weights: { kindness: 8, bondLevel: 5 },
      },
      {
        text: '본인 재량',
        weights: { kindness: 3, confidence: 2, bondLevel: 1 },
      },
    ],
  },
  {
    id: 8,
    question: '피드백 스타일은?',
    options: [
      {
        text: '직설적',
        weights: { kindness: -8, confidence: 5, bondLevel: -2 },
      },
      {
        text: '부드럽게',
        weights: { kindness: 8, bondLevel: 3 },
      },
      {
        text: '질문으로 유도',
        weights: { kindness: 3, confidence: 3, bondLevel: 1 },
      },
    ],
  },
  {
    id: 9,
    question: '실패 후 반응?',
    options: [
      {
        text: '다시 도전',
        weights: { confidence: 5, kindness: -5, bondLevel: -2 },
      },
      {
        text: '위로 먼저',
        weights: { kindness: 8, bondLevel: 5 },
      },
      {
        text: '분석 후 재시도',
        weights: { confidence: 3, kindness: 2 },
      },
    ],
  },
  {
    id: 10,
    question: '데뷔 목표 기간?',
    options: [
      {
        text: '최대한 빠르게',
        weights: { kindness: -8, confidence: 5, bondLevel: -3 },
      },
      {
        text: '준비되면',
        weights: { kindness: 3, confidence: 3 },
      },
      {
        text: '여유있게',
        weights: { kindness: 5, confidence: -3, bondLevel: 2 },
      },
    ],
  },
];
