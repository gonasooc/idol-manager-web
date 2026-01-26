import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { onboardingCompletedAtom } from './store/atoms';
import { OnboardingPage } from './components/Onboarding/OnboardingPage';
import { MainPage } from './pages/MainPage';
import { ReportPage } from './pages/ReportPage';
import { DebutPage } from './pages/DebutPage';
import { Navigation } from './components/Navigation';

function App() {
  const onboardingCompleted = useAtomValue(onboardingCompletedAtom);

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
