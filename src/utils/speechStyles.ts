import type { PersonaType } from '../types';

// 친밀도 구간별 말투 레벨
type SpeechLevel = 'distant' | 'casual' | 'friendly';

function getSpeechLevel(bondLevel: number): SpeechLevel {
  if (bondLevel <= 30) return 'distant';
  if (bondLevel <= 60) return 'casual';
  return 'friendly';
}

// 페르소나별 응답 템플릿
const RESPONSE_TEMPLATES: Record<PersonaType, Record<SpeechLevel, string[]>> = {
  'gentle-confident': {
    distant: [
      '잘 들었어요. 고마워요.',
      '그렇군요. 이해했어요.',
      '좋은 말씀이에요. 힘이 나네요.',
    ],
    casual: [
      '그래! 같이 힘내보자.',
      '고마워~ 덕분에 힘이 나.',
      '응, 알겠어! 열심히 할게.',
    ],
    friendly: [
      '너 덕분에 정말 힘이 나! 고마워~',
      '같이라서 든든해. 우리 끝까지 함께 가자!',
      '최고야! 네가 있어서 난 할 수 있어.',
    ],
  },
  'gentle-shy': {
    distant: [
      '아, 네... 감사합니다.',
      '그렇군요. 좋은 말씀이에요.',
      '고마워요... 힘낼게요.',
    ],
    casual: [
      '고마워... 덕분에 기분이 좋아졌어.',
      '응! 나도 열심히 할게.',
      '우와~ 정말요? 힘이 나네요!',
    ],
    friendly: [
      '진짜 고마워! 너 덕분이야~',
      '같이라서 너무 좋아. 앞으로도 잘 부탁해!',
      '너무 행복해... 계속 함께하자!',
    ],
  },
  'cold-confident': {
    distant: [
      '알겠습니다. 참고하겠습니다.',
      '그렇군요. 더 잘하겠습니다.',
      '들었습니다. 노력하겠습니다.',
    ],
    casual: [
      '알았어. 더 잘할게.',
      '그래, 이 정도는 해낼 수 있어.',
      '당연하지. 내가 누군데.',
    ],
    friendly: [
      '네 기대에 부응할게. 믿어.',
      '걱정 마. 난 할 수 있어.',
      '이 정도론 안 무너져. 더 강해질 거야.',
    ],
  },
  'cold-shy': {
    distant: [
      '...알겠습니다.',
      '네. 들었습니다.',
      '...노력하겠습니다.',
    ],
    casual: [
      '응. 알았어.',
      '...그래. 할게.',
      '알겠어. 노력할게.',
    ],
    friendly: [
      '응... 고마워.',
      '알았어. 네 말 믿을게.',
      '...네 덕분이야. 고마워.',
    ],
  },
  'balanced': {
    distant: [
      '알겠어요. 감사합니다.',
      '그렇군요. 좋은 조언이에요.',
      '네, 참고하겠습니다.',
    ],
    casual: [
      '응, 알았어. 고마워.',
      '그래! 열심히 해볼게.',
      '좋아. 같이 힘내보자.',
    ],
    friendly: [
      '고마워! 덕분에 힘이 나.',
      '그래! 우리 함께라면 뭐든 할 수 있어.',
      '너랑이라면 해낼 수 있을 것 같아.',
    ],
  },
};

// 페르소나와 친밀도에 맞는 랜덤 응답 선택
export function getRandomResponse(personaType: PersonaType, bondLevel: number): string {
  const speechLevel = getSpeechLevel(bondLevel);
  const templates = RESPONSE_TEMPLATES[personaType][speechLevel];
  return templates[Math.floor(Math.random() * templates.length)];
}

// 부정적 응답 템플릿
const NEGATIVE_RESPONSES: Record<PersonaType, Record<SpeechLevel, string[]>> = {
  'gentle-confident': {
    distant: ['조금 아쉽네요...', '그런가요... 알겠어요.'],
    casual: ['흠... 조금 속상하긴 하네.', '아... 그랬구나.'],
    friendly: ['왜 그래... 무슨 일 있어?', '속상하다... 나 뭐 잘못했어?'],
  },
  'gentle-shy': {
    distant: ['아... 그렇군요...', '...네, 알겠어요.'],
    casual: ['...조금 속상해.', '...왜 그래?'],
    friendly: ['...나 때문이야? 미안해...', '...속상해. 뭐가 문제야?'],
  },
  'cold-confident': {
    distant: ['...그렇습니까.', '알겠습니다.'],
    casual: ['뭐가 문제야?', '그래서?'],
    friendly: ['왜 그래? 무슨 일이야?', '내가 뭘 잘못했는데?'],
  },
  'cold-shy': {
    distant: ['...네.', '...알겠습니다.'],
    casual: ['...응.', '...그래.'],
    friendly: ['...미안.', '...뭐가 문제야?'],
  },
  'balanced': {
    distant: ['그렇군요... 알겠어요.', '조금 아쉽네요.'],
    casual: ['흠... 그랬구나.', '왜 그래?'],
    friendly: ['무슨 일 있어? 얘기해봐.', '속상하다... 뭐가 문제야?'],
  },
};

export function getNegativeResponse(personaType: PersonaType, bondLevel: number): string {
  const speechLevel = getSpeechLevel(bondLevel);
  const templates = NEGATIVE_RESPONSES[personaType][speechLevel];
  return templates[Math.floor(Math.random() * templates.length)];
}

// 격려 응답 템플릿
const ENCOURAGEMENT_RESPONSES: Record<PersonaType, string[]> = {
  'gentle-confident': [
    '응! 나 할 수 있어. 고마워!',
    '너의 응원이 최고의 힘이야!',
    '같이라면 뭐든 해낼 수 있을 것 같아!',
  ],
  'gentle-shy': [
    '응... 힘내볼게. 고마워!',
    '네가 있어서 용기가 나...',
    '힘내볼게... 응원해줘서 고마워!',
  ],
  'cold-confident': [
    '당연하지. 이 정도는 거뜬해.',
    '걱정 마. 난 포기 안 해.',
    '응원 고마워. 반드시 해낼게.',
  ],
  'cold-shy': [
    '...고마워. 힘낼게.',
    '...응. 해볼게.',
    '...네 덕분이야.',
  ],
  'balanced': [
    '응! 힘내볼게. 고마워!',
    '네가 응원해주니까 자신감이 생겨!',
    '같이 힘내자!',
  ],
};

export function getEncouragementResponse(personaType: PersonaType): string {
  const templates = ENCOURAGEMENT_RESPONSES[personaType];
  return templates[Math.floor(Math.random() * templates.length)];
}
