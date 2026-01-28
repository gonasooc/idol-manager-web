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
    question: '연습생은 어떤 환경에서 자랐나요?',
    options: [
      {
        text: '빡센 훈련 속에서',
        weights: { kindness: -15, confidence: 5, bondLevel: -5 },
      },
      {
        text: '따뜻한 분위기에서',
        weights: { kindness: 10, confidence: -5, bondLevel: 3 },
      },
      {
        text: '균형 잡힌 환경에서',
        weights: { kindness: 0, confidence: 0 },
      },
    ],
  },
  {
    id: 2,
    question: '연습생이 실수했을 때 보이는 반응은?',
    options: [
      {
        text: '스스로를 채찍질한다',
        weights: { kindness: -12, confidence: 3, bondLevel: -3 },
      },
      {
        text: '다음엔 잘하자며 털어낸다',
        weights: { kindness: 8, bondLevel: 3 },
      },
      {
        text: '조용히 원인을 분석한다',
        weights: { confidence: 3 },
      },
    ],
  },
  {
    id: 3,
    question: '연습생의 자기 관리 스타일은?',
    options: [
      {
        text: '스스로 빡빡하게',
        weights: { kindness: -8, confidence: 5, bondLevel: -2 },
      },
      {
        text: '여유롭게 페이스 조절',
        weights: { kindness: 5, confidence: -3, bondLevel: 2 },
      },
      {
        text: '컨디션에 따라 유연하게',
        weights: { kindness: 2, confidence: 2 },
      },
    ],
  },
  {
    id: 4,
    question: '연습생이 칭찬받을 때 반응은?',
    options: [
      {
        text: '기뻐하며 동기부여 얻음',
        weights: { kindness: 8, bondLevel: 5 },
      },
      {
        text: '담담하게 받아들임',
        weights: { kindness: 2, bondLevel: 1 },
      },
      {
        text: '아직 멀었다며 더 노력',
        weights: { kindness: -8, confidence: 3, bondLevel: -2 },
      },
    ],
  },
  {
    id: 5,
    question: '연습생의 목표 의식은?',
    options: [
      {
        text: '높은 목표를 향해 돌진',
        weights: { confidence: 5, kindness: -5, bondLevel: -2 },
      },
      {
        text: '현실적인 목표 설정',
        weights: { kindness: 3, confidence: 3 },
      },
      {
        text: '흐름에 맡기는 편',
        weights: { kindness: 5, confidence: -3, bondLevel: 2 },
      },
    ],
  },
  {
    id: 6,
    question: '연습생의 경쟁심은?',
    options: [
      {
        text: '강한 경쟁심',
        weights: { kindness: -15, confidence: 5, bondLevel: -5 },
      },
      {
        text: '자신만의 길을 걷는 편',
        weights: { kindness: 8, bondLevel: 3 },
      },
      {
        text: '적당히 자극받는 정도',
        weights: { kindness: -3, confidence: 2 },
      },
    ],
  },
  {
    id: 7,
    question: '연습생의 휴식 패턴은?',
    options: [
      {
        text: '쉬는 것도 아깝다',
        weights: { kindness: -12, confidence: 3, bondLevel: -3 },
      },
      {
        text: '충분히 쉬어야 한다',
        weights: { kindness: 8, bondLevel: 5 },
      },
      {
        text: '몸이 원할 때 쉰다',
        weights: { kindness: 3, confidence: 2, bondLevel: 1 },
      },
    ],
  },
  {
    id: 8,
    question: '연습생이 피드백을 받아들이는 방식은?',
    options: [
      {
        text: '직설적인 게 좋다',
        weights: { kindness: -8, confidence: 5, bondLevel: -2 },
      },
      {
        text: '부드럽게 말해줬으면',
        weights: { kindness: 8, bondLevel: 3 },
      },
      {
        text: '스스로 깨달을 때까지',
        weights: { kindness: 3, confidence: 3, bondLevel: 1 },
      },
    ],
  },
  {
    id: 9,
    question: '연습생이 실패 후 보이는 모습은?',
    options: [
      {
        text: '바로 다시 도전한다',
        weights: { confidence: 5, kindness: -5, bondLevel: -2 },
      },
      {
        text: '잠시 위로가 필요하다',
        weights: { kindness: 8, bondLevel: 5 },
      },
      {
        text: '냉정히 분석 후 재시도',
        weights: { confidence: 3, kindness: 2 },
      },
    ],
  },
  {
    id: 10,
    question: '연습생의 데뷔 열망은?',
    options: [
      {
        text: '하루라도 빨리!',
        weights: { kindness: -8, confidence: 5, bondLevel: -3 },
      },
      {
        text: '준비됐을 때 하고 싶다',
        weights: { kindness: 3, confidence: 3 },
      },
      {
        text: '과정 자체가 좋다',
        weights: { kindness: 5, confidence: -3, bondLevel: 2 },
      },
    ],
  },
];
