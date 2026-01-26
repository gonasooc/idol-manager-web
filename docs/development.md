# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+
- npm 8+
- Modern browser (Chrome, Safari, Firefox, Edge)

### Installation

1. **Clone/Download the project**
   ```bash
   cd idol-manager-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start dev server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   ```
   http://localhost:5173
   ```

---

## Available Scripts

### Development
```bash
npm run dev
# Starts Vite dev server with HMR
# Opens at http://localhost:5173
# Hot reload enabled
```

### Build
```bash
npm run build
# TypeScript compilation
# Vite production build
# Output: dist/
```

### Preview
```bash
npm run preview
# Preview production build locally
# Useful for testing before deployment
```

### Type Check
```bash
npx tsc --noEmit
# Check TypeScript errors without emitting files
# Should return 0 errors
```

### Lint
```bash
npm run lint
# Run ESLint (if configured)
```

---

## Project Structure

```
idol-manager-web/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── store/          # Jotai atoms
│   ├── types/          # TypeScript types
│   ├── utils/          # Helper functions
│   ├── App.tsx         # Root component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── dist/               # Build output (gitignored)
├── docs/               # Documentation
├── node_modules/       # Dependencies
├── package.json        # Project config
├── tsconfig.json       # TypeScript config
├── vite.config.ts      # Vite config
└── tailwind.config.js  # Tailwind config
```

---

## Development Workflow

### 1. Create New Component

**Location**: `src/components/`

**Template**:
```typescript
import { motion } from 'framer-motion'

interface MyComponentProps {
  title: string
  onAction: () => void
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 bg-white rounded-lg"
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <button onClick={onAction}>Click me</button>
    </motion.div>
  )
}
```

### 2. Create New Atom

**Location**: `src/store/atoms.ts`

**Template**:
```typescript
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// Persistent atom (localStorage)
export const myDataAtom = atomWithStorage<MyData>('my-data-key', defaultValue)

// Derived atom (computed)
export const myComputedAtom = atom((get) => {
  const data = get(myDataAtom)
  return computeValue(data)
})

// Write-only atom (helper)
export const updateMyDataAtom = atom(
  null,
  (get, set, update: Partial<MyData>) => {
    const current = get(myDataAtom)
    set(myDataAtom, { ...current, ...update })
  }
)
```

### 3. Add New Route

**Location**: `src/App.tsx`

```typescript
<Route path="/my-page" element={<MyPage />} />
```

### 4. Style with Tailwind

**Example**:
```tsx
<div className="flex flex-col gap-4 p-6 bg-gradient-to-br from-purple-500 to-pink-500">
  <h1 className="text-3xl font-bold text-white">Title</h1>
  <button className="px-4 py-2 bg-white text-purple-600 rounded-lg hover:bg-purple-100 transition">
    Action
  </button>
</div>
```

**Custom animations** (add to `tailwind.config.js`):
```javascript
animation: {
  'my-animation': 'my-keyframe 1s ease-in-out'
},
keyframes: {
  'my-keyframe': {
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.1)' },
    '100%': { transform: 'scale(1)' }
  }
}
```

---

## Testing

### Manual Testing

#### Test Onboarding
1. Clear localStorage: `localStorage.clear()` in console
2. Refresh page → Should redirect to `/onboarding`
3. Answer all 10 questions
4. Check result screen shows correct stats
5. Click "시작하기" → Should go to `/chat`

#### Test Chat
1. Send a message
2. Check AI response appears
3. Check stats update in top bar
4. Check floating text animation appears
5. Refresh page → Messages should persist

#### Test Report
1. Have multiple chat interactions (to build history)
2. Navigate to `/report`
3. Check charts display correctly
4. Check stats summary is accurate
5. Check persona timeline

#### Test Debut Card
1. Navigate to `/debut`
2. Enter idol name
3. Check card design matches current stats
4. Test "이미지로 저장" → PNG downloads
5. Test "공유하기" → Share dialog opens (mobile) or copy (desktop)

### Reset Onboarding
```typescript
// In browser console
resetOnboarding()
// Or
localStorage.removeItem('idol-onboarding-completed')
location.reload()
```

### View All State
```typescript
// In browser console
console.log('Bond Level:', localStorage.getItem('idol-bond-level'))
console.log('Personality:', localStorage.getItem('idol-personality-score'))
console.log('Messages:', localStorage.getItem('idol-messages'))
console.log('History:', localStorage.getItem('idol-history'))
```

---

## Debugging

### Common Issues

#### 1. TypeScript Errors
```bash
npx tsc --noEmit
# Shows all type errors
# Fix before committing
```

#### 2. Build Errors
```bash
npm run build
# If fails, check:
# - Missing imports
# - Type errors
# - Asset paths
```

#### 3. localStorage Not Working
- Check browser privacy settings
- Try incognito mode
- Clear cache and retry

#### 4. Animations Janky
- Check if too many components re-rendering
- Use React DevTools Profiler
- Add `React.memo` if needed

#### 5. Stats Not Updating
- Check Jotai atom subscriptions
- Verify `set` function called correctly
- Check localStorage permissions

---

## Performance Optimization

### Code Splitting
```typescript
// Lazy load routes
const MyPage = lazy(() => import('./pages/MyPage'))

<Route path="/my-page" element={
  <Suspense fallback={<div>Loading...</div>}>
    <MyPage />
  </Suspense>
} />
```

### Memo Components
```typescript
import { memo } from 'react'

export const MyComponent = memo(({ data }: Props) => {
  // Only re-renders if data changes
})
```

### Optimize Images
```bash
# Use WebP format
# Compress before adding to public/
# Use `loading="lazy"` for images
```

---

## Backend Integration (Future)

### API Client Setup

1. **Install axios**
   ```bash
   npm install axios
   ```

2. **Create client**
   ```typescript
   // src/utils/api.ts
   import axios from 'axios'

   const api = axios.create({
     baseURL: import.meta.env.VITE_API_URL,
     headers: {
       'Content-Type': 'application/json'
     }
   })

   export default api
   ```

3. **Use in components**
   ```typescript
   import api from '@/utils/api'

   const response = await api.post('/chat', { message })
   ```

### Environment Variables

Create `.env.local`:
```bash
VITE_API_URL=http://localhost:8000
VITE_OPENAI_API_KEY=sk-...
```

Access in code:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## Deployment

### Build for Production

```bash
npm run build
# Output: dist/
```

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   # Follow prompts
   ```

3. **Custom domain** (optional)
   ```bash
   vercel domains add yourdomain.com
   ```

### Deploy to Netlify

1. **Install Netlify CLI**
   ```bash
   npm i -g netlify-cli
   ```

2. **Deploy**
   ```bash
   netlify deploy --prod
   # Select dist/ as publish directory
   ```

### Deploy to GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add scripts to package.json**
   ```json
   {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Configure base path** in `vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/idol-manager-web/'
   })
   ```

---

## Code Style

### TypeScript
- Always type props and state
- Use interfaces over types for objects
- Avoid `any` (use `unknown` if needed)
- Enable strict mode

### React
- Functional components only
- Use hooks (useState, useEffect, useMemo, etc.)
- Destructure props
- Keep components small (<200 lines)

### Naming
- Components: PascalCase (`MyComponent.tsx`)
- Atoms: camelCase + Atom suffix (`myDataAtom`)
- Utils: camelCase (`calculateStats.ts`)
- Types: PascalCase (`MyType`)

### File Organization
```
MyComponent/
├── MyComponent.tsx     # Main component
├── MyComponent.test.tsx # Tests (optional)
├── index.ts            # Export
└── types.ts            # Component-specific types
```

---

## Git Workflow

### Branches
```bash
main        # Production-ready code
develop     # Development branch
feature/x   # New features
fix/x       # Bug fixes
```

### Commit Messages
```
feat: Add debut card generation
fix: Correct stat calculation
docs: Update README
style: Format code
refactor: Simplify persona logic
test: Add onboarding tests
```

### Before Commit
```bash
npm run build      # Ensure builds
npx tsc --noEmit   # No type errors
npm run lint       # No lint errors
```

---

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 5173
lsof -ti:5173 | xargs kill -9

# Or change port
npm run dev -- --port 3000
```

### Module Not Found
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
```

### Build Fails
```bash
# Check Node version
node -v  # Should be 18+

# Update dependencies
npm update

# Clear dist
rm -rf dist
npm run build
```

---

## Resources

### Documentation
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Jotai](https://jotai.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)
- [Recharts](https://recharts.org/)

### Tools
- [React DevTools](https://react.dev/learn/react-developer-tools)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

---

## FAQ

### How do I add a new stat?
1. Add to `PersonalityScore` type
2. Add atom in `atoms.ts`
3. Create gauge component
4. Add to `StatsBar`
5. Update calculation logic

### How do I change persona conditions?
Edit the logic in `currentPersonaAtom` (derived atom).

### How do I add more questions?
Edit `src/utils/questions.ts` and adjust the calculation in `calculateInitialStats.ts`.

### How do I customize colors?
Edit `tailwind.config.js` theme colors.

### How do I add a new page?
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add navigation link

---

**Happy coding!**
