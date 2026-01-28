/**
 * Development utility to reset onboarding state
 * Usage: Import and call this function to restart the onboarding flow
 */
export function resetOnboarding() {
  localStorage.removeItem('idol-onboarding-completed');
  localStorage.removeItem('idol-bond-level');
  localStorage.removeItem('idol-personality-score');
  localStorage.removeItem('idol-messages');
  localStorage.removeItem('idol-history');
  window.location.href = '/';
}

// Make it available in browser console for easy testing
if (typeof window !== 'undefined') {
  (window as any).resetOnboarding = resetOnboarding;
}
