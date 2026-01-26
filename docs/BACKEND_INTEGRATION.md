# Backend API Integration Guide

## Overview

This document describes the backend API integration for the Idol Manager Web application. The frontend now supports both real backend API and mock API fallback for offline development.

## Changes Made

### 1. Environment Configuration

**Files Created:**
- `.env` - Local environment variables (gitignored)
- `.env.example` - Example environment configuration

**Configuration:**
```env
VITE_API_URL=http://localhost:8000
```

### 2. API Service Layer

**File:** `src/services/api.ts`

**Exports:**
- `sendChatMessage(request: ChatRequest)` - Send chat message to backend
- `checkHealth()` - Check backend connectivity
- `getHealthStatus()` - Get detailed health status

**Request/Response Types:**
```typescript
interface ChatRequest {
  message: string;
  stats: {
    bondLevel: number;
    kindness: number;
    confidence: number;
  };
  persona: string;
}

interface ChatResponse {
  response: string;
  statChanges: {
    bond: number;
    kindness: number;
    confidence: number;
  };
}
```

### 3. Connection Status Component

**File:** `src/components/UI/ConnectionStatus.tsx`

Visual indicator showing backend connection status:
- 🟢 **Green**: Backend connected
- 🟡 **Yellow**: Checking connection
- 🔴 **Red**: Offline mode (Mock API)

### 4. Chat Container Updates

**File:** `src/components/Chat/ChatContainer.tsx`

**Key Features:**
- Health check on component mount
- Automatic fallback to Mock API if backend fails
- Real-time connection status display
- Graceful error handling

**Logic Flow:**
```
1. Check backend health on mount
2. On message send:
   - If online: Try real API
   - If real API fails: Fallback to Mock
   - If offline: Use Mock directly
3. Update connection status on failure
```

### 5. Documentation Updates

**Files Updated:**
- `README.md` - Added backend integration section
- `.gitignore` - Added `.env` files

## Usage

### Development (Offline Mode)

```bash
# Frontend only - uses Mock API
npm run dev
```

Connection status will show: 🔴 **오프라인 모드 (Mock API)**

### Production (With Backend)

**Step 1: Start Backend**
```bash
cd /Users/joel/Desktop/idol-manager-backend
uvicorn app.main:app --reload
```

**Step 2: Configure Frontend**
```bash
# .env file already created with:
VITE_API_URL=http://localhost:8000
```

**Step 3: Start Frontend**
```bash
npm run dev
```

Connection status will show: 🟢 **백엔드 연결됨**

## API Endpoints

### POST /api/chat
Send chat message and receive AI response with stat changes.

**Request:**
```json
{
  "message": "오늘 연습 어땠어?",
  "stats": {
    "bondLevel": 65,
    "kindness": 30,
    "confidence": -10
  },
  "persona": "gentle-confident"
}
```

**Response:**
```json
{
  "response": "오늘 연습 정말 열심히 했어! 고마워~",
  "statChanges": {
    "bond": 5,
    "kindness": 3,
    "confidence": 0
  }
}
```

### GET /api/health
Check backend and Ollama server health.

**Response:**
```json
{
  "status": "ok",
  "backend": "running",
  "ollama": "connected"
}
```

## Fallback Behavior

The application gracefully handles backend unavailability:

1. **Initial Load**: Checks backend health
2. **Connection Lost**: Automatically switches to Mock API
3. **User Experience**: Clear status indicator shows current mode
4. **No Interruption**: Chat continues working in offline mode

## Testing

### Test Offline Mode
1. Don't start backend server
2. Run frontend: `npm run dev`
3. Verify status shows: 🔴 **오프라인 모드**
4. Chat should work with mock responses

### Test Online Mode
1. Start backend: `uvicorn app.main:app --reload`
2. Run frontend: `npm run dev`
3. Verify status shows: 🟢 **백엔드 연결됨**
4. Chat should use real AI responses

### Test Fallback
1. Start both frontend and backend
2. Verify status is green (connected)
3. Stop backend server
4. Send a chat message
5. Verify status turns red and uses mock API

## Troubleshooting

### Connection Status Stuck on Yellow
- Check if backend is running on correct port (8000)
- Verify `VITE_API_URL` in `.env` matches backend URL
- Check browser console for CORS or network errors

### API Calls Failing
- Ensure backend CORS is configured to allow frontend origin
- Check backend logs for errors
- Verify request/response formats match schemas

### Mock API Always Used
- Check browser console for connection errors
- Verify backend `/api/health` endpoint is accessible
- Ensure no firewall blocking localhost:8000

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8000` | Backend API base URL |

## Files Added/Modified

### Added
- `/src/services/api.ts` - Backend API service
- `/src/components/UI/ConnectionStatus.tsx` - Status indicator
- `/.env` - Environment variables (gitignored)
- `/.env.example` - Environment template
- `/BACKEND_INTEGRATION.md` - This document

### Modified
- `/src/components/Chat/ChatContainer.tsx` - API integration
- `/README.md` - Documentation updates
- `/.gitignore` - Added `.env` files

## Next Steps

1. Test with real Ollama backend
2. Monitor API response times
3. Add retry logic for transient failures
4. Implement connection recovery notifications
5. Add API request/response logging for debugging
