import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { onboardingCompletedAtom } from './store/atoms';
import { OnboardingPage } from './components/Onboarding/OnboardingPage';
import { MainPage } from './pages/MainPage';
import { ReportPage } from './pages/ReportPage';
import { DebutPage } from './pages/DebutPage';
import { Navigation } from './components/Navigation';

// localStorage에서 온보딩 완료 여부 직접 확인 (Jotai atomWithStorage는 JSON으로 저장)
function getStoredOnboardingCompleted(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem('idol-onboarding-completed');
    if (stored === null) return false;
    // Jotai atomWithStorage는 JSON.stringify로 저장하므로 JSON.parse 필요
    return JSON.parse(stored) === true;
  } catch {
    return false;
  }
}

function App() {
  // 초기값을 localStorage에서 직접 읽어옴 (Jotai hydration 대기 불필요)
  const [onboardingCompleted, setOnboardingCompleted] = useState(getStoredOnboardingCompleted);
  const atomOnboardingCompleted = useAtomValue(onboardingCompletedAtom);

  // Jotai atom이 true가 되면 상태 동기화 (false로는 덮어쓰지 않음)
  useEffect(() => {
    if (atomOnboardingCompleted) {
      setOnboardingCompleted(true);
    }
  }, [atomOnboardingCompleted]);

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
