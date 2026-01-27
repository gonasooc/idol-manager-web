import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { onboardingCompletedAtom } from './store/atoms';
import { OnboardingPage } from './components/Onboarding/OnboardingPage';
import { MainPage } from './pages/MainPage';
import { ReportPage } from './pages/ReportPage';
import { DebutPage } from './pages/DebutPage';
import { Navigation } from './components/Navigation';

// localStorage에서 초기값 직접 확인 (SSR 안전)
function getInitialHydratedState(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem('idol-onboarding-completed');
    return stored !== null;
  } catch {
    return false;
  }
}

function App() {
  // localStorage 확인 완료 여부 (첫 렌더링 시 동기적으로 확인)
  const [isHydrated, setIsHydrated] = useState(getInitialHydratedState);
  const onboardingCompleted = useAtomValue(onboardingCompletedAtom);

  // 클라이언트에서 마운트 후 하이드레이션 완료 처리
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // 하이드레이션 전에는 로딩 표시
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-retro-cream">
        <div className="font-pixel text-sm text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            onboardingCompleted ? (
              <Navigate to="/main" replace />
            ) : (
              <Navigate to="/onboarding" replace />
            )
          }
        />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route
          path="/main"
          element={
            onboardingCompleted ? (
              <>
                <MainPage />
                <Navigation />
              </>
            ) : (
              <Navigate to="/onboarding" replace />
            )
          }
        />
        <Route
          path="/report"
          element={
            onboardingCompleted ? (
              <>
                <ReportPage />
                <Navigation />
              </>
            ) : (
              <Navigate to="/onboarding" replace />
            )
          }
        />
        <Route
          path="/debut"
          element={
            onboardingCompleted ? (
              <>
                <DebutPage />
                <Navigation />
              </>
            ) : (
              <Navigate to="/onboarding" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
