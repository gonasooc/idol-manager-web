# Architecture

## Project Structure

```
src/
├── components/
│   ├── Onboarding/          # Phase 2: Onboarding flow
│   │   ├── OnboardingPage.tsx
│   │   ├── QuestionCard.tsx
│   │   ├── ProgressBar.tsx
│   │   ├── ResultScreen.tsx
│   │   └── index.ts
│   ├── Chat/                # Phase 3: Chat system
│   │   ├── ChatPage.tsx
│   │   ├── MessageList.tsx
│   │   ├── ChatInput.tsx
│   │   └── index.ts
│   ├── Report/              # Phase 4: Report & Debut
│   │   ├── ReportPage.tsx
│   │   ├── DebutPage.tsx
│   │   ├── DebutCard.tsx
│   │   ├── DebutCardModal.tsx
│   │   └── Navigation.tsx
│   ├── StatsBar.tsx         # Phase 1: Stats display
│   ├── StatChangeAnimation.tsx
│   ├── BondLevelBar.tsx
│   ├── PersonalityGauge.tsx
│   └── DemoControls.tsx
├── pages/
│   └── MainPage.tsx
├── utils/
│   ├── questions.ts
│   ├── calculateInitialStats.ts
│   └── resetOnboarding.ts
├── store/
│   ├── atoms.ts             # Core state
│   └── historyAtoms.ts      # History tracking
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## State Management (Jotai)

### Core Atoms

#### Bond Level
```typescript
// bondLevelAtom: 0 ~ 100 (친밀도)
atomWithStorage('idol-bond-level', 50)
```

#### Personality Scores
```typescript
// personalityScoreAtom: { kindness, confidence }
// kindness: -100 ~ 100 (다정함 ↔ 냉철함)
// confidence: -100 ~ 100 (자신감 ↔ 신중함)
atomWithStorage('idol-personality-score', { kindness: 0, confidence: 0 })
```

#### Persona (Derived)
```typescript
// currentPersonaAtom: Calculated from personality scores
atom((get) => {
  const { kindness, confidence } = get(personalityScoreAtom)
  // Logic determines: gentle-confident, gentle-shy, cold-confident, cold-shy, balanced
})
```

#### Messages
```typescript
// messagesAtom: Chat history
atomWithStorage('idol-messages', [])
```

#### History
```typescript
// historyAtom: Stat snapshots for charts
atomWithStorage('idol-history', [])
```

### Helper Atoms

```typescript
updateBondLevelAtom      // Update bond + create log
updatePersonalityAtom    // Update personality + create log
addStatChangeAtom        // Add floating text animation
addHistorySnapshotAtom   // Save current stats to history
```

## Persona System

### 5 Persona Types

| Persona | Emoji | Conditions |
|---------|-------|------------|
| 다정한 리더 | 🌟 | kindness > 0 && confidence > 0 |
| 햇살 같은 동료 | 🌻 | kindness > 0 && confidence <= 0 |
| 독기 있는 연습생 | 🔥 | kindness <= 0 && confidence > 0 |
| 조용한 프로 | 🌙 | kindness <= 0 && confidence <= 0 |
| 균형잡힌 아이돌 | ⚖️ | abs(kindness) < 20 && abs(confidence) < 20 |

### Persona Features
- Automatic calculation based on personality scores
- Visual representation (emoji + title)
- Affects AI response tone (Phase 3)
- Displayed on Debut Card (Phase 4)

## Routing

```
/ → Conditional redirect
    ├─ onboarding incomplete → /onboarding
    └─ onboarding complete → /chat

/onboarding → 10 questions
/chat → Main chat interface (default)
/report → Growth report with charts
/debut → Debut card generation
```

### Route Protection
- `/chat`, `/report`, `/debut` require `onboardingCompleted === true`
- Otherwise redirect to `/onboarding`

## Data Flow

### Onboarding Flow
```
[Start] → [10 Questions] → [Calculate Stats] → [Save to atoms] → [/chat]
```

### Chat Flow (Phase 3)
```
[User Input] → [Mock API] → [Response + Stat Changes] → [Update atoms] → [Floating Animation]
```

### Report Flow (Phase 4)
```
[History Atom] → [Process Data] → [Recharts] → [Display]
```

### Debut Card Flow (Phase 4)
```
[Current Stats] → [Calculate Grade] → [Generate Card] → [html2canvas] → [PNG Download]
```

## Component Communication

### Parent-Child
- Props for static data (questions, options)
- Callbacks for events (onAnswer, onComplete)

### Global State
- Jotai atoms for shared state
- No prop drilling

### Side Effects
- Automatic localStorage sync via `atomWithStorage`
- Automatic history snapshots on stat changes

## Animation System

### Framer Motion
- Page transitions: slide left/right
- Component mounting: fade in
- Stat changes: scale + glow

### Tailwind Animations
- Custom animations in `tailwind.config.js`:
  - `pulse-glow`: Bond level milestones
  - `float-up`: Floating stat change text
  - Gradient animations: Debut card backgrounds

### Performance
- GPU acceleration via `transform` properties
- Cleanup via `AnimatePresence` exit animations
- 2s auto-remove for floating texts

## Storage Strategy

### localStorage Keys
```
idol-bond-level           # number
idol-personality-score    # { kindness, confidence }
idol-onboarding-completed # boolean
idol-messages             # Message[]
idol-history              # HistorySnapshot[]
```

### Persistence
- Automatic save on atom change
- Page refresh preserves state
- No manual save/load logic needed

## Color System

### Bond Level Colors
| Range | Color | Meaning |
|-------|-------|---------|
| 0-29 | Red | 낯선 관계 |
| 30-59 | Orange | 연습생 |
| 60-89 | Gold | 준비생 |
| 90-100 | Yellow | 데뷔 예정 |

### Persona Colors
- 🌟 Gentle Leader: Rose-Pink-Gold
- 🌻 Sunny Peer: Orange-Amber-Yellow
- 🔥 Fierce Trainee: Red-Orange-DarkRed
- 🌙 Quiet Pro: Blue-Indigo-Purple
- ⚖️ Balanced: Green-Teal-Emerald

## Build Configuration

### Vite
- Fast dev server with HMR
- TypeScript + React plugin
- Tailwind PostCSS processing

### Bundle Output
```
dist/
├── index.html (0.47 kB)
├── assets/
│   ├── index-[hash].css (3.17 kB)
│   └── index-[hash].js (395.18 kB)
```

### Optimization
- Tree shaking
- Code splitting (dynamic imports for routes)
- Minification
- Gzip compression ready
