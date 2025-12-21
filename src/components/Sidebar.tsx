import React from 'react';
import { syllabusData } from '../data/syllabus';
import { cn } from '../lib/utils';
import { LayoutDashboard, BookOpen, Calculator, FlaskConical, Globe, Feather, Timer, LogOut, FileText } from 'lucide-react';

interface SidebarProps {
    currentView: string;
    setView: (view: string) => void;
    onLogout: () => void;
}

const iconMap: Record<string, React.ElementType> = {
    Calculator,
    FlaskConical,
    Globe,
    BookOpen,
    Feather
};

export function Sidebar({ currentView, setView, onLogout }: SidebarProps) {
    return (
        <div className="w-64 border-r border-border h-full bg-card/50 backdrop-blur-xl flex flex-col p-4">
            <div className="mb-8 flex items-center gap-2 px-2">
                <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                    <BookOpen className="text-white h-5 w-5" />
                </div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                    StudyQuest
                </h1>
            </div>

            <div className="space-y-2 flex-1">
                <button
                    onClick={() => setView('dashboard')}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                        currentView === 'dashboard'
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    )}
                >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                </button>

                <button
                    onClick={() => setView('grind')}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                        currentView === 'grind'
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    )}
                >
                    <Timer className="h-5 w-5" />
                    Grind Mode
                </button>

                <button
                    onClick={() => setView('practice')}
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                        currentView === 'practice'
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    )}
                >
                    <FileText className="h-5 w-5" />
                    Practice Papers
                </button>

                <div className="pt-4 pb-2 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Syllabus
                </div>

                {syllabusData.map((subject) => {
                    const Icon = iconMap[subject.icon] || BookOpen;
                    return (
                        <button
                            key={subject.id}
                            onClick={() => setView(subject.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                                currentView === subject.id
                                    ? "bg-white/5 text-foreground font-medium shadow-[0_0_15px_rgba(0,0,0,0.2)] border border-white/5"
                                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                            )}
                        >
                            <Icon className={cn("h-5 w-5", subject.color)} />
                            {subject.name}
                        </button>
                    );
                })}
            </div>

            <div className="space-y-3">
                <div className="p-4 bg-gradient-to-br from-primary/20 to-purple-500/10 rounded-2xl border border-primary/20">
                    <h3 className="text-sm font-semibold text-primary mb-1">Daily Tip</h3>
                    <p className="text-xs text-muted-foreground">
                        Consistency is key. Even 30 mins a day adds up!
                    </p>
                </div>

                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-colors text-sm text-muted-foreground hover:text-foreground"
                >
                    <LogOut className="h-4 w-4" />
                    Logout
                </button>
            </div>
        </div>
    );
}
