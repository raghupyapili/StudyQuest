import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { SubjectView } from './components/SubjectView';
import { GrindMode } from './components/GrindTimer';
import { ChapterDetail } from './components/ChapterDetail';
import { LoginPage } from './components/LoginPage';
import { ParentDashboard } from './components/ParentDashboard';
import { PracticePapers } from './components/PracticePapers';
import { useGameState } from './hooks/useGameState';
import { useAuth } from './hooks/useAuth';
import { syllabusData } from './data/syllabus';
import type { Chapter } from './data/syllabus';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const { state, completeChapter, uncompleteChapter, completePracticePaper } = useGameState();
  const { isAuthenticated, user, login, logout } = useAuth();

  const handleToggleChapter = (id: string, reward: number) => {
    if (state.completedChapterIds.includes(id)) {
      uncompleteChapter(id, reward);
    } else {
      completeChapter(id, reward);
    }
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage onLogin={login} />;
  }

  // Parent view - read-only dashboard
  if (user?.role === 'parent') {
    return (
      <div className="min-h-screen bg-background text-foreground font-sans">
        {/* Parent Header */}
        <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-sm sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-400">
                StudyQuest
              </h1>
              <span className="px-2 py-1 bg-orange-500/10 text-orange-500 text-xs font-semibold rounded">
                Parent View
              </span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </header>

        <ParentDashboard
          completedChapterIds={state.completedChapterIds}
          completedSubTopicIds={state.completedSubTopicIds}
          xp={state.xp}
          level={state.level}
          streak={state.streak}
          examDate={state.settings.examDate}
          chapterPlans={state.chapterPlans}
        />
      </div>
    );
  }

  // Student view - full access
  const renderContent = () => {
    if (currentView === 'dashboard') {
      return <Dashboard state={state} />;
    }

    if (currentView === 'grind') {
      return <GrindMode />;
    }

    if (currentView === 'practice') {
      return <PracticePapers
        completedIds={state.completedPracticePaperIds}
        onComplete={completePracticePaper}
      />;
    }

    const subject = syllabusData.find(s => s.id === currentView);
    if (subject) {
      return (
        <SubjectView
          subject={subject}
          completedIds={state.completedChapterIds}
          onToggleChapter={handleToggleChapter}
          onSelectChapter={setSelectedChapter}
        />
      );
    }

    return <Dashboard state={state} />;
  };

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
      {/* Sidebar - Fixed width */}
      <div className="flex-shrink-0">
        <Sidebar currentView={currentView} setView={setCurrentView} onLogout={logout} />
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto min-h-full relative z-10">
          {/* Elite Slayer Header */}
          <div className="relative h-40 w-full overflow-hidden mb-2 rounded-b-[2rem] border-b border-primary/20 shadow-2xl">
            <div
              className="absolute inset-0 bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: 'url("/slayer-bg.png")' }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"></div>
            <div className="absolute bottom-6 left-8">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 bg-primary text-white text-[10px] font-bold uppercase tracking-[0.2em] rounded">
                  Corps Training Grounds
                </span>
                <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-widest bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">Wisteria Forest Area</span>
              </div>
              <h2 className="text-3xl font-bold font-outfit text-white drop-shadow-lg">Elite Slayer Dashboard</h2>
            </div>
          </div>

          <div className="px-4 pb-8">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Chapter Detail Modal */}
      {selectedChapter && (
        <ChapterDetail
          chapter={selectedChapter}
          onClose={() => setSelectedChapter(null)}
        />
      )}
    </div>
  );
}

export default App;
