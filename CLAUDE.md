# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Interactive idol management simulation web app (Korean: "아이돌 매니저 웹"). Users train a virtual idol through chat interactions, watching stats evolve based on their choices. Features retro 8-bit Windows 95/98 aesthetic.

## Development Commands

```bash
npm run dev      # Start Vite dev server at http://localhost:5173
npm run build    # TypeScript check + production build
npm run lint     # ESLint for all TS/TSX files
npm run preview  # Preview production build locally
```

### Backend Integration (Optional)

```bash
# Terminal 1: Ollama LLM server
ollama serve

# Terminal 2: FastAPI backend (separate repo: idol-manager-backend)
cd ../idol-manager-backend && source .venv/bin/activate
uvicorn app.main:app --reload

# Terminal 3: Frontend
npm run dev
```

Connection status indicator: 🟢 backend connected, 🟡 checking, 🔴 offline (mock API)

### Debug Commands (Browser Console)

```javascript
resetOnboarding()           // Reset onboarding quiz
localStorage.clear()        // Full data reset
```

## Architecture

### Tech Stack
- **Framework**: React 19 + TypeScript + Vite
- **State**: Jotai with `atomWithStorage` (auto-persists to localStorage)
- **Styling**: Tailwind CSS with custom retro 8-bit theme
- **Animation**: Framer Motion
- **Charts**: Recharts (growth reports)
- **Routing**: React Router v7
- **Backend**: FastAPI + Ollama (optional, falls back to mock API)

### State Management (Jotai)

Core atoms in `src/store/atoms.ts`:
- `bondLevelAtom` (0-100): Intimacy level
- `personalityScoreAtom` ({ kindness, confidence }): Each ranges -100 to 100
- `currentPersonaAtom`: Derived from personality scores, determines 1 of 5 persona types
- `messagesAtom`: Chat history with SSE streaming support
- `onboardingCompletedAtom`: Gates access to main app

Helper atoms handle stat updates and automatically log changes for floating animations and history snapshots.

### localStorage Keys
```
idol-bond-level, idol-personality-score, idol-onboarding-completed,
idol-messages, idol-history
```

### Routing Flow
```
/             → Redirects based on onboarding status
/onboarding   → 10-question personality quiz (sets initial stats)
/chat         → Main chat interface (requires completed onboarding)
/report       → Growth charts over time
/debut        → Export idol stats as downloadable card image
```

### Persona System

5 personas determined by kindness/confidence quadrants:
| Persona | Condition |
|---------|-----------|
| 다정한 리더 (🌟) | kindness > 0 && confidence > 0 |
| 햇살 같은 동료 (🌻) | kindness > 0 && confidence <= 0 |
| 독기 있는 연습생 (🔥) | kindness <= 0 && confidence > 0 |
| 조용한 프로 (🌙) | kindness <= 0 && confidence <= 0 |
| 균형잡힌 아이돌 (⚖️) | abs(kindness) < 20 && abs(confidence) < 20 |

Speech style varies by intimacy level: 존댓말 (0-30) → 반존댓말 (31-60) → 반말 (61-100)

### API Layer

`src/services/api.ts` provides:
- `sendChatMessage()`: Standard POST request
- `sendChatMessageStream()`: SSE streaming for real-time responses
- `checkHealth()`, `getHealthStatus()`: Backend connectivity

Falls back to `src/services/mockChatApi.ts` when backend unavailable.

### Environment Variables

```env
VITE_API_URL=http://localhost:8000
```

## Design System

Custom Tailwind theme with:
- Pixel fonts: Press Start 2P, VT323
- Windows 95 3D bevel borders
- Bond level color progression: red (0-29) → orange (30-59) → gold (60-89) → yellow (90-100)
- Custom animations: `float-up`, `pulse-glow`, `scanline`, `sparkle`

## Key Directories

- `src/components/Onboarding/`: 10-question quiz flow
- `src/components/Chat/`: Chat UI with SSE streaming
- `src/components/DebutCard/`: Stat card generation + html2canvas export
- `src/utils/speechStyles.ts`: Persona-specific dialogue patterns
- `src/utils/questions.ts`: Onboarding quiz questions with stat impacts
