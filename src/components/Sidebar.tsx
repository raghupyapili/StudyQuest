import React from 'react';
import { syllabusData } from '../data/syllabus';
import { cn } from '../lib/utils';
import { LayoutDashboard, BookOpen, Calculator, FlaskConical, Globe, Feather, Timer, LogOut, FileText, Settings } from 'lucide-react';

interface SidebarProps {
    currentView: string;
    setView: (view: string) => void;
    onLogout: () => void;
    onOpenSettings: () => void;
    grade: string;
}

const iconMap: Record<string, React.ElementType> = {
    Calculator,
    FlaskConical,
    Globe,
    BookOpen,
    Feather
};

export function Sidebar({ currentView, setView, onLogout, onOpenSettings, grade }: SidebarProps) {
    const currentSyllabus = syllabusData[grade] || syllabusData['10'];

    return (
        <div className="w-64 border-r border-white/5 h-full bg-[#0d0d0d] flex flex-col p-4 shadow-2xl">
            <div className="mb-8 flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 overflow-hidden">
                        <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                    </div>
                    <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
                        <BookOpen className="text-white h-5 w-5" />
                    </div>
                    <h1 className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 uppercase tracking-tighter">
                        StudyQuest
                    </h1>
                </div>
            </div>

            <div className="space-y-1.5 flex-1 overflow-y-auto no-scrollbar">
                <button
                    onClick={() => setView('dashboard')}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                        currentView === 'dashboard'
                            ? "bg-primary text-white font-bold shadow-lg shadow-primary/20"
                            : "text-zinc-500 hover:bg-white/5 hover:text-white"
                    )}
                >
                    <LayoutDashboard className={cn("h-5 w-5 transition-transform group-hover:scale-110", currentView === 'dashboard' ? "text-white" : "text-zinc-500")} />
                    Dashboard
                </button>

                <button
                    onClick={() => setView('grind')}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                        currentView === 'grind'
                            ? "bg-primary text-white font-bold shadow-lg shadow-primary/20"
                            : "text-zinc-500 hover:bg-white/5 hover:text-white"
                    )}
                >
                    <Timer className={cn("h-5 w-5 transition-transform group-hover:scale-110", currentView === 'grind' ? "text-white" : "text-zinc-500")} />
                    Grind Mode
                </button>

                {grade === '10' && (
                    <button
                        onClick={() => setView('practice')}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                            currentView === 'practice'
                                ? "bg-primary text-white font-bold shadow-lg shadow-primary/20"
                                : "text-zinc-500 hover:bg-white/5 hover:text-white"
                        )}
                    >
                        <FileText className={cn("h-5 w-5 transition-transform group-hover:scale-110", currentView === 'practice' ? "text-white" : "text-zinc-500")} />
                        Practice Papers
                    </button>
                )}

                <div className="pt-6 pb-2 px-4 text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                    Syllabus
                </div>

                {currentSyllabus.map((subject) => {
                    const Icon = iconMap[subject.icon] || BookOpen;
                    return (
                        <button
                            key={subject.id}
                            onClick={() => setView(subject.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group border border-transparent",
                                currentView === subject.id
                                    ? "bg-zinc-800 text-white font-bold border-white/10"
                                    : "text-zinc-500 hover:bg-white/5 hover:text-white focus:bg-white/5"
                            )}
                        >
                            <Icon className={cn("h-5 w-5 transition-transform group-hover:scale-110", currentView === subject.id ? subject.color : "text-zinc-500")} />
                            {subject.name}
                        </button>
                    );
                })}
            </div>

            <div className="mt-auto pt-6 space-y-4">
                <div className="p-4 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 rounded-2xl border border-white/5 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 blur-2xl rounded-full -mr-8 -mt-8 group-hover:bg-primary/20 transition-colors"></div>
                    <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-1">Knowledge Drop</h3>
                    <p className="text-[11px] text-zinc-400 font-medium leading-relaxed">
                        Consistency beats intensity. Set your pace, win the race.
                    </p>
                </div>

                <button
                    onClick={onOpenSettings}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 hover:bg-white/5 text-zinc-400 hover:text-white rounded-xl transition-all text-xs font-bold border border-white/5"
                >
                    <Settings className="h-4 w-4" />
                    System Settings
                </button>

                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-900 hover:bg-red-500/10 hover:text-red-500 rounded-xl transition-all text-xs font-bold text-zinc-500 border border-white/5"
                >
                    <LogOut className="h-4 w-4" />
                    Secure Logout
                </button>

                <div className="text-[9px] text-zinc-700 flex items-center justify-center gap-1.5 uppercase tracking-[0.25em] font-black pb-2">
                    <img src="/logo.png" alt="" className="w-3 h-3 grayscale opacity-40" />
                    StudyQuest v3.0.0 Stable
                </div>
            </div>
        </div>
    );
}
