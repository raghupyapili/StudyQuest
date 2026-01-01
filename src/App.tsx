import { useState, useEffect } from 'react';
import { LogOut, Settings as SettingsIcon, Bell } from 'lucide-react';
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
import { SettingsModal } from './components/SettingsModal';
import { syllabusData } from './data/syllabus';
import { getGradeTheme } from './lib/themes';
import type { Chapter, Subject } from './data/syllabus';
import { differenceInDays, isAfter } from 'date-fns';
import { cn } from './lib/utils';

function App() {
  const {
    isAuthenticated, user, login, logout, signup, users, createChild,
    requestPasswordReset, resetPasswordByOTP, updateUserSettings,
    addNotification, markNotificationRead
  } = useAuth();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  // Use the logged in user's ID for students, or selected child's ID for parents
  const linkedKids = users.filter(u => u.parentId === user?.id);
  const targetUserId = user?.role === 'student' ? user.id : (selectedChildId || linkedKids[0]?.id);
  const targetUser = user?.id === targetUserId ? user : users.find(u => u.id === targetUserId);

  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [showSettings, setShowSettings] = useState(false);

  const {
    state, completeChapter, uncompleteChapter, completePracticePaper,
    updateSettings, updateChapterPlan, addCustomChapter, deleteCustomChapter,
    toggleSubTopic, toggleCriticalSubTopic, addPlanTask, togglePlanTask, deletePlanTask,
    addCustomSubTopic
  } = useGameState(targetUserId, targetUser ? {
    grade: targetUser.grade,
    statePreference: targetUser.statePreference,
    secondLanguage: targetUser.secondLanguage
  } : undefined);

  const [showStudentNotice, setShowStudentNotice] = useState(false);

  // Apply theme preference
  useEffect(() => {
    if (user?.themePreference === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [user?.themePreference]);

  const currentGrade = state.settings.grade || '10';
  const baseSyllabus = (syllabusData[currentGrade] || syllabusData['10']).filter(sub => {
    // Check for 2nd Language (Hindi vs Telugu)
    if (state.settings.secondLanguage) {
      if (sub.id === 'hindi' && state.settings.secondLanguage === 'Telugu') return false;
      if (sub.id === 'telugu' && state.settings.secondLanguage === 'Hindi') return false;
    }
    // Check for Telugu State
    if (sub.id === 'telugu' && sub.state) {
      return sub.state === (state.settings.statePreference || 'TS');
    }
    return true;
  });

  const currentSyllabus = baseSyllabus.map(subject => ({
    ...subject,
    chapters: [...subject.chapters, ...(state.settings.customChapters?.[subject.id] || [])].map(ch => ({
      ...ch,
      isCompleted: state.completedChapterIds.includes(ch.id),
      subtopics: [...(ch.subtopics || []), ...(state.settings.customSubTopics?.[ch.id] || [])]
    }))
  })) as Subject[];

  // Monitor completions for parent notifications
  useEffect(() => {
    if (user?.role === 'student' && user.parentId && state.completedChapterIds.length > 0) {
      const lastCompletedId = state.completedChapterIds[state.completedChapterIds.length - 1];
      const plan = state.chapterPlans[lastCompletedId];
      if (plan?.parentTargetDate) {
        // Find chapter name for message
        const chapter = currentSyllabus.flatMap(s => s.chapters).find(c => c.id === lastCompletedId);
        addNotification(user.parentId, {
          type: 'completion',
          message: `Mission Accomplished: ${user.name} completed "${chapter?.name || lastCompletedId}" (Parental Priority ALPHA).`,
          childName: user.name
        });
      }
    }
  }, [state.completedChapterIds, user?.id]);

  // Show student reminders on login
  useEffect(() => {
    if (user?.role === 'student') {
      const hasUnread = user.notifications?.some(n => !n.isRead && n.type === 'reminder');
      if (hasUnread) setShowStudentNotice(true);
    }
  }, [user?.id]);

  const theme = getGradeTheme(currentGrade);

  const handleToggleChapter = (id: string, reward: number) => {
    if (user?.role === 'parent') return; // Read-only for parents
    if (state.completedChapterIds.includes(id)) {
      uncompleteChapter(id, reward);
    } else {
      completeChapter(id, reward);
    }
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return (
      <LoginPage
        onLogin={login}
        onSignup={signup}
        onCreateChild={createChild}
        onRequestReset={requestPasswordReset}
        onResetPassword={resetPasswordByOTP}
      />
    );
  }

  // Parent view - read-only dashboard
  if (user?.role === 'parent') {

    return (
      <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
        <header className="border-b border-white/5 bg-zinc-900/50 backdrop-blur-3xl sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 overflow-hidden">
                  <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                </div>
                <h1 className="text-2xl font-black italic tracking-tighter text-white">
                  STUDY<span className="text-orange-500">QUEST</span>
                </h1>
              </div>
              <div className="h-8 w-px bg-white/10"></div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Active Ward:</span>
                <select
                  value={targetUserId}
                  onChange={(e) => setSelectedChildId(e.target.value)}
                  className="bg-zinc-800 border border-white/10 rounded-lg px-3 py-1 text-sm font-bold text-white outline-none focus:ring-2 focus:ring-orange-500/50"
                >
                  {linkedKids.length > 0 ? linkedKids.map(k => (
                    <option key={k.id} value={k.id}>{k.name} (Class {k.grade})</option>
                  )) : <option>No linked profiles</option>}
                </select>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Parent Gateway</p>
                <p className="text-sm font-black text-white">{user.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowSettings(true)}
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all border border-white/5 text-zinc-400 hover:text-white"
                  title="System Configuration"
                >
                  <SettingsIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={logout}
                  className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl transition-all border border-white/5 text-zinc-400 hover:text-white"
                  title="Secure Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </header>

        <ParentDashboard
          state={state}
          examDate={state.settings.examDate}
          chapterPlans={state.chapterPlans}
          grade={currentGrade}
          onUpdateChapterPlan={updateChapterPlan}
          user={targetUser || null}
          onUpdateFrequency={(f) => updateUserSettings(user.id, { notificationFrequency: f })}
          onMarkNotificationRead={(id) => markNotificationRead(user.id, id)}
          onAddCustomChapter={addCustomChapter}
          onDeleteCustomChapter={deleteCustomChapter}
          toggleCriticalSubTopic={toggleCriticalSubTopic}
          addCustomSubTopic={addCustomSubTopic}
          customChapters={state.settings.customChapters}
        />
        {showSettings && (
          <SettingsModal
            user={user}
            children={linkedKids}
            onClose={() => setShowSettings(false)}
            onUpdateSettings={(settings) => updateUserSettings(user.id, settings)}
            onUpdateChildSettings={updateUserSettings}
            onCreateChild={createChild}
          />
        )}
      </div>
    );
  }

  // Student view - full access
  const renderContent = () => {
    if (currentView === 'dashboard') {
      return <Dashboard
        state={state}
        user={targetUser || null}
        currentSyllabus={currentSyllabus}
        onSelectChapter={setSelectedChapter}
        onUpdateSettings={updateSettings}
      />;
    }

    if (currentView === 'grind') {
      return <GrindMode />;
    }

    if (currentView === 'practice') {
      if (currentGrade === '10') {
        return <PracticePapers
          completedIds={state.completedPracticePaperIds}
          onComplete={completePracticePaper}
        />;
      } else {
        return (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-card rounded-3xl border border-white/5 shadow-2xl">
            <div className="h-20 w-20 bg-zinc-800 rounded-2xl flex items-center justify-center mb-6">
              <SettingsIcon className="w-10 h-10 text-zinc-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Internal Assessments Only</h2>
            <p className="text-muted-foreground max-w-md">
              Class {currentGrade} does not have standard Board Exam practice papers. Focus on mastering your chapters!
            </p>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="mt-8 px-6 py-2 bg-primary text-white rounded-xl font-bold hover:opacity-90 transition-opacity"
            >
              Back to Dashboard
            </button>
          </div>
        );
      }
    }

    const subject = currentSyllabus.find(s => s.id === currentView);
    if (subject) {
      return (
        <SubjectView
          subject={subject}
          completedIds={state.completedChapterIds}
          onToggleChapter={handleToggleChapter}
          onSelectChapter={setSelectedChapter}
          onAddCustomChapter={addCustomChapter}
          onDeleteCustomChapter={deleteCustomChapter}
        />
      );
    }

    return <Dashboard
      state={state}
      user={targetUser || null}
      currentSyllabus={currentSyllabus}
      onSelectChapter={setSelectedChapter}
      onUpdateSettings={updateSettings}
    />;
  };

  const daysRemaining = differenceInDays(new Date(state.settings.examDate), new Date());
  const isExamPassed = isAfter(new Date(), new Date(state.settings.examDate));

  return (
    <div className="flex h-screen bg-background text-foreground font-sans overflow-hidden">
      <div className="flex-shrink-0">
        <Sidebar
          currentView={currentView}
          setView={setCurrentView}
          onLogout={logout}
          onOpenSettings={() => setShowSettings(true)}
          grade={currentGrade}
        />
      </div>

      <main className="flex-1 overflow-y-auto relative bg-background">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

        <div className="max-w-7xl mx-auto min-h-full relative z-10 pb-20">
          {/* Dynamic Theme Header */}
          <div className="relative h-56 w-full overflow-hidden mb-6 rounded-b-[3rem] border-b border-white/5 shadow-2xl">
            <div
              className="absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-700"
              style={{ backgroundImage: `url("${theme.bgImage}")` }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>

            {/* Animated Glow */}
            <div className={cn(
              "absolute -top-24 -left-24 w-64 h-64 blur-[100px] opacity-20 bg-primary rounded-full",
              currentGrade === '6' && "bg-yellow-500",
              currentGrade === '7' && "bg-green-500",
              currentGrade === '8' && "bg-orange-500",
              currentGrade === '9' && "bg-blue-500"
            )}></div>

            <div className="absolute top-8 left-10 flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <span className={cn(
                  "px-3 py-1 text-white text-[11px] font-black uppercase tracking-[0.2em] rounded-md shadow-lg bg-gradient-to-r",
                  theme.accentColor
                )}>
                  {theme.title}
                </span>
                <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-widest bg-black/60 px-3 py-1 rounded-md backdrop-blur-md border border-white/5">
                  {theme.subtitle}
                </span>
              </div>
              <h1 className="text-white/20 text-6xl font-black italic tracking-tighter mt-2 pointer-events-none">CLASS {currentGrade}</h1>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center pt-8">
              <div className="text-[11px] font-black text-primary uppercase tracking-[0.5em] mb-2 drop-shadow-sm flex items-center gap-2">
                <span className="h-1 w-12 bg-primary/30 rounded-full"></span>
                {theme.unitLabel}
                <span className="h-1 w-12 bg-primary/30 rounded-full"></span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-8xl font-black font-outfit text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] leading-none italic tracking-tighter">
                  {isExamPassed ? '0' : daysRemaining}
                </span>
                <div className="flex flex-col">
                  <span className="text-2xl font-black font-outfit text-primary drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] uppercase leading-none">Days</span>
                  <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest">Left</span>
                </div>
              </div>
            </div>

            {/* User Profile Quick Badge */}
            <div className="absolute top-8 right-10 flex items-center gap-4">
              <div className="text-right">
                <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-none">Scholar</p>
                <p className="text-sm font-black text-white">{user?.name}</p>
              </div>
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center text-xl shadow-xl">
                {user?.avatar || '👤'}
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
            {renderContent()}
          </div>

          {/* Student Notification Modal */}
          {showStudentNotice && user?.role === 'student' && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl">
              <div className="bg-zinc-900 border border-primary/20 p-8 rounded-[2.5rem] max-w-md w-full space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <SettingsIcon className="w-32 h-32 text-primary" />
                </div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                  <Bell className="w-6 h-6 text-primary" />
                  Directive Received
                </h3>
                <div className="space-y-4">
                  {user.notifications?.filter(n => !n.isRead && n.type === 'reminder').map(n => (
                    <div key={n.id} className="p-4 bg-primary/5 border border-primary/10 rounded-2xl">
                      <p className="text-sm text-zinc-300 font-medium leading-relaxed">{n.message}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setShowStudentNotice(false);
                    user.notifications?.filter(n => !n.isRead && n.type === 'reminder').forEach(n => markNotificationRead(user.id, n.id));
                  }}
                  className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20"
                >
                  Acknowledge Directive
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {selectedChapter && (
        <ChapterDetail
          chapter={selectedChapter}
          state={state}
          toggleSubTopic={toggleSubTopic}
          addPlanTask={addPlanTask}
          togglePlanTask={togglePlanTask}
          deletePlanTask={deletePlanTask}
          updateChapterPlan={updateChapterPlan}
          onClose={() => setSelectedChapter(null)}
        />
      )}
      {showSettings && (
        <SettingsModal
          user={user}
          children={linkedKids}
          onClose={() => setShowSettings(false)}
          onUpdateSettings={(settings) => updateUserSettings(user!.id, settings)}
          onUpdateChildSettings={updateUserSettings}
          onCreateChild={createChild}
        />
      )}
    </div>
  );
}

export default App;
