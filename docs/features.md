# Features

## Phase 1: Stats System

### Stats Bar
**Location**: Top of screen (sticky)

**Components**:
- Bond Level Progress Bar (0-100)
- Kindness Gauge (-100 to 100)
- Confidence Gauge (-100 to 100)
- Current Persona Display

**Features**:
- Real-time updates
- Color transitions at milestones (30, 60, 90)
- Glow effects on level-ups
- Smooth animations via Framer Motion

### Floating Stat Changes
**Visual Feedback**:
- `+5 친밀도` appears on bond increase
- `-2 다정함` appears on kindness decrease
- Auto-removes after 2 seconds
- Offsets to prevent overlap (max 3 simultaneous)

### Persona System
**5 Types**:
1. **🌟 다정한 리더** (Gentle Leader)
   - High kindness + High confidence
   - Warm but authoritative tone

2. **🌻 햇살 같은 동료** (Sunny Peer)
   - High kindness + Low confidence
   - Sweet and humble tone

3. **🔥 독기 있는 연습생** (Fierce Trainee)
   - Low kindness + High confidence
   - Ambitious and intense tone

4. **🌙 조용한 프로** (Quiet Pro)
   - Low kindness + Low confidence
   - Reserved and professional tone

5. **⚖️ 균형잡힌 아이돌** (Balanced Idol)
   - Neutral kindness + Neutral confidence
   - Balanced and mature tone

---

## Phase 2: Onboarding

### 10-Question Quiz
**Question Topics**:
1. Training style preference
2. Feedback handling
3. Team vs solo preference
4. Stage confidence
5. Competition mindset
6. Work-life balance
7. Success definition
8. Failure response
9. Leadership style
10. Long-term goals

**Each Question**:
- 3 answer options
- Weighted scoring (-10 to +10)
- Affects kindness AND confidence
- Animated transitions

### Progress Tracking
- Visual progress bar (1/10 → 10/10)
- Current question number display
- Smooth slide transitions

### Initial Stat Calculation
**Algorithm**:
```
kindness = sum of kindness weights (-100 to +100)
confidence = sum of confidence weights (-100 to +100)
bondLevel = 50 (default starting point)
persona = determined by kindness/confidence quadrant
```

### Result Screen
**Displays**:
- Your initial persona (emoji + title)
- Bond level bar (starting at 50)
- Kindness gauge (with calculated value)
- Confidence gauge (with calculated value)
- Animated reveal with staggered delays

**Animation**:
- Fade in title
- Scale in persona card
- Fill stat bars sequentially (0.3s ~ 0.7s delays)

---

## Phase 3: Chat System

### Chat Interface
**Layout**:
- Top: StatsBar (always visible)
- Center: Message list (scrollable)
- Bottom: Input field + send button

**Message Types**:
- User messages (right-aligned, purple background)
- AI responses (left-aligned, white background)
- System messages (centered, gray)

### Mock API Responses
**Current Implementation**:
- Predefined responses based on persona
- Simulated typing delay
- Returns: `{ message, bondDelta, kindnessDelta, confidenceDelta }`

**Response Variations**:
- 🌟 Gentle Leader: Encouraging, uses "우리"
- 🌻 Sunny Peer: Cheerful, uses "😊"
- 🔥 Fierce Trainee: Direct, uses "!"
- 🌙 Quiet Pro: Brief, professional
- ⚖️ Balanced: Neutral, thoughtful

### Stat Changes from Chat
**Trigger**: After each AI response
**Updates**:
- Bond level ± (0-10)
- Kindness ± (0-5)
- Confidence ± (0-5)

**Visual Feedback**:
- Stat bars animate
- Floating text appears
- Persona may change

### Message Persistence
- Saved to `messagesAtom` (localStorage)
- Loads on page refresh
- Infinite scroll support

---

## Phase 4: Report & Debut Card

### Growth Report Page (`/report`)

#### Current Stats Card
**Displays**:
- Current persona
- Current bond level
- Current kindness
- Current confidence

#### Statistics Panel
**Metrics**:
- Total snapshots recorded
- Highest bond level reached
- Lowest bond level
- Most common persona

#### Bond Level Chart
**Type**: Line chart (Recharts)
**X-Axis**: Snapshot index (1, 2, 3, ...)
**Y-Axis**: Bond level (0-100)
**Features**:
- Color zones (red/orange/gold/yellow)
- Tooltip on hover
- Smooth curves

#### Personality Chart
**Type**: Line chart (Recharts)
**Lines**:
- Kindness (blue)
- Confidence (purple)
**Range**: -100 to 100
**Features**:
- Dual Y-axis labels
- Zero reference line
- Tooltip shows both values

#### Persona Timeline
**Display**:
- List of persona changes
- Timestamp for each
- Snapshot index reference

**Example**:
```
🌻 햇살 같은 동료 → 1/20 10:30 (1번째)
🌟 다정한 리더    → 1/21 14:20 (5번째)
🔥 독기 있는 연습생 → 1/22 09:15 (12번째)
```

---

### Debut Card Page (`/debut`)

#### Card Generation Modal
**Input**:
- Idol name (text field)
- Current stats automatically pulled

**Output**:
- Visual card with:
  - Grade badge (S/A/B/C)
  - Persona emoji
  - Idol name
  - Three stat bars (bond, kindness, confidence)
  - Debut date
  - Gradient background based on persona

#### Card Grades
| Grade | Bond Level | Style |
|-------|------------|-------|
| S | 90-100 | Gold border + sparkle animation |
| A | 70-89 | Silver border |
| B | 50-69 | Bronze border |
| C | 0-49 | Standard border |

#### Export Options
1. **Save as Image**
   - Uses `html2canvas` library
   - 2x resolution for quality
   - Downloads as PNG file

2. **Share**
   - Uses Web Share API (mobile-friendly)
   - Fallback to clipboard copy (desktop)
   - Shares image + custom text

#### Gradient Backgrounds
- 🌟 Gentle Leader: Rose → Pink → Gold
- 🌻 Sunny Peer: Orange → Amber → Yellow
- 🔥 Fierce Trainee: Red → Orange → DarkRed
- 🌙 Quiet Pro: Blue → Indigo → Purple
- ⚖️ Balanced: Green → Teal → Emerald

---

### Navigation Bar
**Location**: Bottom of screen (fixed)

**Tabs**:
- 💬 대화 (`/chat`)
- 📊 리포트 (`/report`)
- 🎴 데뷔 카드 (`/debut`)

**Features**:
- Active tab highlight
- Smooth transitions
- Touch-friendly sizing
- Always accessible

---

## History Tracking

### Automatic Snapshots
**Trigger**: After each chat interaction
**Saved Data**:
```typescript
{
  timestamp: number,
  bondLevel: number,
  kindness: number,
  confidence: number,
  persona: PersonaType
}
```

**Storage**: `idol-history` localStorage key

### Usage
- Powers report page charts
- Enables persona timeline
- Tracks growth statistics

---

## Planned Features (Future)

### Gamification
- Achievement system (badges)
- Milestone notifications
- Level-up celebrations

### Social
- Share report summary
- Compare with friends
- Leaderboards (optional)

### Customization
- Multiple idol profiles
- Custom card templates
- Theme selection (dark mode)

### Advanced Analytics
- Time-based filters (7 days, 30 days, all time)
- Persona distribution pie chart
- Interaction heatmap
- CSV export

### AI Enhancements
- Real LLM integration (OpenAI/Anthropic)
- Image generation for idol avatar
- Voice synthesis for responses
- Multi-language support
