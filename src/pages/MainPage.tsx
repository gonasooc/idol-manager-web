import { StatsBar } from '@/components/StatsBar';
import { StatChangeAnimation } from '@/components/StatChangeAnimation';
import { ChatContainer } from '@/components/Chat';

export function MainPage() {
  return (
    <div className="h-dvh flex flex-col pb-16 bg-retro-bg overflow-hidden">
      {/* Mobile-first container with max-width for PC */}
      <div className="w-full max-w-md mx-auto flex flex-col h-full">
        <StatChangeAnimation />
        <StatsBar />

        <main className="flex-1 flex flex-col overflow-hidden mx-2 mb-2">
          {/* Retro Window for Chat */}
          <div className="retro-window flex-1 flex flex-col overflow-hidden">
            <ChatContainer />
          </div>
        </main>
      </div>
    </div>
  );
}
