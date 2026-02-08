# 🎤 아이돌 매니저 (Idol Manager)

> **"당신의 선택이 아이돌의 운명을 결정합니다!"**

**아이돌 매니저**는 사용자가 신입 아이돌의 담당 매니저가 되어, 대화를 통해 아이돌의 성격을 형성하고 데뷔까지 이끄는 **인터랙티브 육성 시뮬레이션 웹 애플리케이션**입니다.
**Neo-Retro / Y2K Pop** 감성의 디자인과 실시간 LLM(Large Language Model) 기반의 자연스러운 대화 경험을 제공합니다.

---

## ✨ 주요 기능

### 1. 🎯 온보딩 & 성향 분석
- **10가지 심리 테스트**: 사용자의 매니지먼트 스타일을 분석하여 아이돌의 초기 성격(다정함/냉철함, 자신감/소심함)을 결정합니다.
- **다양한 페르소나**: 분석 결과에 따라 '다정한 리더', '독기 있는 연습생', '햇살 같은 동료' 등 5가지 고유 페르소나가 부여됩니다.

### 2. 💬 실시간 AI 채팅
- **자연스러운 대화**: AI 아이돌과 일상, 고민, 연습 스케줄 등에 대해 자유롭게 대화할 수 있습니다.
- **기억 시스템**: 아이돌은 과거의 대화 내용과 매니저의 조언을 기억하고 반응합니다.
- **상태 반영**: 대화 중 오고가는 말에 따라 아이돌의 감정과 태도가 실시간으로 변합니다.

### 3. 📊 실시간 육성 시스템
- **동적 스탯 변화**: 대화의 선택지와 뉘앙스에 따라 **친밀도(Bond)**, **다정함(Kindness)**, **자신감(Confidence)** 수치가 실시간으로 오르내립니다.
- **시각적 피드백**: 레트로 스타일의 게이지와 애니메이션으로 성장 과정을 직관적으로 확인할 수 있습니다.
- **말투 변화**: 친밀도가 쌓이면 아이돌의 말투가 점점 친근하게 바뀝니다 (존댓말 → 반존댓말 → 반말).

### 4. 📈 성장 리포트 & 데뷔 카드
- **성장 리포트**: 아이돌의 성격 변화 추이를 그래프로 한눈에 볼 수 있습니다.
- **데뷔 카드 발급**: 육성이 완료되면 최종 성적표인 '데뷔 카드'를 발급받을 수 있습니다. (이미지 저장 기능 포함)

---

## 🎨 디자인 컨셉: Neo-Retro / Y2K Pop

2000년대 초반의 감성을 현대적으로 재해석한 **Neo-Retro** 디자인을 적용했습니다.

- **Vivid & High Contrast**: Hot Pink(#ff0080), Deep Purple(#7928ca), Cyan(#00ffff) 등 강렬한 컬러 팔레트 사용.
- **Pixel Art Typography**: `Press Start 2P`, `VT323` 폰트를 사용하여 고전 게임의 느낌 구현.
- **Retro UI Elements**: 윈도우 95/98 스타일의 창, 픽셀 아이콘, 글리치 효과, 스캔라인 등을 활용한 몰입감 있는 UI.

---

## 🛠 기술 스택 (Tech Stack)

### Frontend
- **Framework**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4, Vanilla CSS (Variables)
- **State Management**: Jotai (Atom 기반, localStorage 자동 연동)
- **Animation**: Framer Motion
- **Visualization**: Recharts (차트), html2canvas (이미지 저장)

### Backend (External)
- **API Server**: Python FastAPI (별도 리포지토리)
- **AI Model**: Ollama (LLM) 기반 로컬 구동 또는 외부 API 연동

---

## 🚀 설치 및 실행 방법

### 사전 요구사항
- Node.js (v18 이상 권장)
- npm 또는 yarn

### 1. 프로젝트 클론
```bash
git clone https://github.com/gonasooc/idol-manager-web.git
cd idol-manager-web
```

### 2. 의존성 패키지 설치
```bash
npm install
```

### 3. 환경 변수 설정
최상위 디렉토리에 `.env` 파일을 생성하고 백엔드 API 주소를 설정하세요.
```env
VITE_API_URL=http://localhost:8000
```

### 4. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 `http://localhost:5173`으로 접속하여 확인합니다.

---

## 📂 프로젝트 구조

```
src/
├── components/
│   ├── Chat/           # 채팅 관련 컴포넌트 (입력창, 말풍선 등)
│   ├── DebutCard/      # 데뷔 카드 생성 및 모달
│   ├── Onboarding/     # 성향 테스트 (질문 카드, 결과 화면)
│   └── ...             # 공통 UI (스탯바, 네비게이션 등)
├── pages/
│   ├── MainPage.tsx    # 메인 채팅 화면
│   ├── ReportPage.tsx  # 성장 리포트 화면
│   └── DebutPage.tsx   # 데뷔 카드 발급 화면
├── services/           # API 통신 로직
├── store/              # Jotai 상태 관리 (Atoms)
├── utils/              # 유틸리티 함수 (질문 데이터, 스탯 계산 등)
└── index.css           # 전역 스타일 및 Tailwind 설정
```
