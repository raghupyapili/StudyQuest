import { useMemo } from 'react';
import { type Subject } from '../data/syllabus';
import { Flame, Target, Star, Sword, Zap, Shield, Sparkles, Calendar, TrendingUp, Award } from 'lucide-react';
import { differenceInDays, format } from 'date-fns';
import { cn } from '../lib/utils';
import { getGradeTheme, getRank, getUnlockedElement } from '../lib/themes';
import type { User, GameState } from '../types';

interface DashboardProps {
    state: GameState;
    user: User | null;
    currentSyllabus: Subject[];
    onSelectChapter: (chapter: any) => void;
    onUpdateSettings: (settings: any) => void;
}

const WACKY_TITLES = ['Super', 'Elite', 'Legendary', 'Master', 'Sparkling', 'Cosmic', 'Hyper', 'Turbo', 'Mega', 'Ultra', 'Giga', 'Zenith'];

export function Dashboard({ state, user, currentSyllabus, onSelectChapter, onUpdateSettings }: DashboardProps) {
    const currentGrade = state.settings.grade || '10';
    const theme = getGradeTheme(currentGrade);

    const diff = differenceInDays(new Date(state.settings.examDate), new Date());
    const daysUntilExam = diff < 0 ? 0 : diff;

    const getWackyName = (name: string) => {
        const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const title = WACKY_TITLES[hash % WACKY_TITLES.length];
        return `${title} ${name}`;
    };

    const stats = useMemo(() => {
        let totalWeight = 0;
        let completedWeight = 0;
        let totalChapters = 0;
        let completedCount = 0;
        const subjectProgress: Record<string, number> = {};

        currentSyllabus.forEach(sub => {
            let subTotalWeight = 0;
            let subCompletedWeight = 0;

            sub.chapters.forEach(ch => {
                totalChapters++;
                if (state.completedChapterIds.includes(ch.id)) {
                    completedCount++;
                }

                if (ch.subtopics && ch.subtopics.length > 0) {
                    const chTotalSub = ch.subtopics.length;
                    const chCompletedSub = ch.subtopics.filter((st: any) => state.completedSubTopicIds.includes(st.id)).length;
                    const effectiveCompletedSub = state.completedChapterIds.includes(ch.id) ? chTotalSub : chCompletedSub;

                    totalWeight += chTotalSub;
                    completedWeight += effectiveCompletedSub;
                    subTotalWeight += chTotalSub;
                    subCompletedWeight += effectiveCompletedSub;
                } else {
                    totalWeight += 1;
                    subTotalWeight += 1;
                    if (state.completedChapterIds.includes(ch.id)) {
                        completedWeight += 1;
                        subCompletedWeight += 1;
                    }
                }
            });

            subjectProgress[sub.id] = subTotalWeight === 0 ? 0 : Math.round((subCompletedWeight / subTotalWeight) * 100);
        });

        return {
            total: totalChapters,
            completed: completedCount,
            percentage: totalWeight === 0 ? 0 : Math.round((completedWeight / totalWeight) * 100),
            subjectProgress
        };
    }, [state.completedChapterIds, state.completedSubTopicIds, currentSyllabus]);

    const xpProgress = (state.xp % 500) / 500 * 100;
    const currentRank = getRank(theme, stats.percentage);

    const recommendedQuests = useMemo(() => {
        const incomplete = currentSyllabus.flatMap(s => s.chapters.map(c => ({ ...c, subject: s })))
            .filter(c => !state.completedChapterIds.includes(c.id));
        return [...incomplete].sort(() => Math.random() - 0.5).slice(0, 3);
    }, [state.completedChapterIds, currentSyllabus]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-black font-outfit uppercase tracking-tight">
                        {user ? getWackyName(user.name) : 'Training Log'}
                    </h1>
                    <p className="text-zinc-500 font-medium italic">
                        Class {currentGrade} • {theme.title}
                        {state.settings.secondLanguage && ` • ${state.settings.secondLanguage}`}
                    </p>
                </div>
                <div className="text-right group relative">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-black leading-none mb-1">Board Exam Window</div>
                    <div className="flex items-center justify-end gap-3">
                        <div className="text-4xl font-black text-white italic tracking-tighter drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                            {daysUntilExam} DAYS
                        </div>
                        <div className="relative">
                            <input
                                type="date"
                                className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                onChange={(e) => e.target.value && onUpdateSettings({ examDate: new Date(e.target.value).toISOString() })}
                            />
                            <Calendar className="w-5 h-5 text-primary opacity-40 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={cn("glass-card p-6 rounded-[2rem] border-l-4 relative overflow-hidden group", currentGrade === '10' ? "border-orange-500" : "border-primary")}>
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Sword className="w-20 h-20" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">Current Status</h3>
                                <div className={cn("text-3xl font-black italic tracking-tighter uppercase", theme.secondaryColor)}>
                                    {currentRank.rank}
                                </div>
                            </div>
                            <div className="text-4xl filter drop-shadow-md">{currentRank.icon}</div>
                        </div>
                        <p className="text-xs text-zinc-400 font-medium italic mb-4">
                            "{currentRank.description}"
                        </p>
                        <div className="w-full bg-zinc-800/50 h-2.5 rounded-full overflow-hidden border border-white/5">
                            <div
                                className={cn("h-full transition-all duration-1000 bg-gradient-to-r", theme.accentColor)}
                                style={{ width: `${stats.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div className="glass-card p-6 rounded-[2rem] flex items-center gap-6 group hover:border-orange-500/20 transition-all">
                    <div className="p-4 bg-orange-500/10 rounded-2xl text-orange-500 group-hover:scale-110 transition-transform shadow-inner">
                        <Flame className="w-8 h-8" />
                    </div>
                    <div>
                        <div className="text-4xl font-black font-outfit tracking-tighter">{state.streak}</div>
                        <div className="text-zinc-500 text-[10px] uppercase font-black tracking-widest leading-none">Days Active</div>
                        <div className="text-[10px] text-orange-400 font-black uppercase mt-1 tracking-wider">Unstoppable</div>
                    </div>
                </div>

                <div className="glass-card p-6 rounded-[2rem] relative overflow-hidden group border-zinc-800/50">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-3xl font-black font-outfit tracking-tighter">LVL {state.level}</div>
                            <div className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Mastery Level</div>
                        </div>
                    </div>
                    <div className="w-full bg-zinc-800/50 h-2.5 rounded-full overflow-hidden mb-2 border border-white/5">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-1000 shadow-lg shadow-yellow-500/20"
                            style={{ width: `${xpProgress}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-[9px] font-black text-zinc-500 uppercase tracking-widest">
                        <span>{state.xp % 500} XP</span>
                        <span>{500 - (state.xp % 500)} XP TO UPGRADE</span>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-black mb-6 flex items-center gap-2 font-outfit uppercase tracking-tight">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Special Techniques
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {currentSyllabus.map(subject => {
                        const style = theme.subjectStyles[subject.id];
                        const progress = stats.subjectProgress[subject.id];
                        const unlockedElement = getUnlockedElement(theme, subject.id, progress);

                        return (
                            <div key={subject.id} className="glass-card p-5 rounded-[1.5rem] border border-white/5 relative overflow-hidden group hover:border-white/10 transition-all">
                                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:opacity-20 transition-all duration-700 pointer-events-none">
                                    <Sparkles className={cn("w-24 h-24 opacity-10", subject.color)} />
                                </div>
                                <div className={cn("text-[10px] font-black mb-2 uppercase tracking-[0.15em]", subject.color)}>
                                    {subject.name}
                                </div>
                                <div className="text-sm font-black mb-0.5 text-zinc-100 tracking-tight">{style?.name || 'Path of Wisdom'}</div>
                                <div className="text-[10px] text-zinc-500 mb-4 font-bold uppercase tracking-wider">{style?.character || 'The Master'}</div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                                        <span className="text-zinc-500">Mastery</span>
                                        <span className="text-zinc-200">{progress}%</span>
                                    </div>
                                    <div className="w-full bg-zinc-800/50 h-1.5 rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className={cn("h-full transition-all duration-1000", subject.color.replace('text-', 'bg-'))}
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {unlockedElement && (
                                    <div className="mt-4 p-2.5 bg-gradient-to-br from-white/[0.03] to-white/[0.08] rounded-xl border border-white/5 animate-in slide-in-from-bottom-2 duration-500">
                                        <div className="text-[8px] uppercase font-black text-primary mb-1 tracking-[0.2em]">Unlocked Form</div>
                                        <div className="text-[11px] font-black text-zinc-200 leading-tight uppercase tracking-tight">{unlockedElement}</div>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                </div>
            </div>

            <div>
                <h2 className="text-xl font-black mb-6 flex items-center gap-2 font-outfit uppercase tracking-tight text-orange-500">
                    <Shield className="w-5 h-5" />
                    {theme.commandLabel}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(state.chapterPlans)
                        .filter(([_, plan]) => plan.parentTargetDate && !state.completedChapterIds.includes(plan.chapterId))
                        .map(([chapterId, plan]) => {
                            const chapter = currentSyllabus.flatMap(s => s.chapters.map(c => ({ ...c, subject: s }))).find(c => c.id === chapterId);
                            if (!chapter) return null;
                            const daysLeft = differenceInDays(new Date(plan.parentTargetDate!), new Date());

                            return (
                                <div
                                    key={chapterId}
                                    onClick={() => onSelectChapter(chapter)}
                                    className="glass-card p-6 rounded-[2rem] border-l-4 border-orange-500 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer group shadow-xl bg-orange-500/5"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <span className={cn("text-[9px] font-black px-2.5 py-1 rounded-lg bg-zinc-800/80 uppercase tracking-widest", chapter.subject.color)}>
                                            {chapter.subject.name}
                                        </span>
                                        <span className="text-[10px] text-orange-500 font-black uppercase tracking-widest flex items-center gap-1">
                                            PRIORITY ALPHA <Shield className="w-3.5 h-3.5 fill-orange-500" />
                                        </span>
                                    </div>
                                    <h3 className={cn(
                                        "text-lg font-black mb-1 group-hover:text-primary transition-colors line-clamp-1 font-outfit tracking-tight leading-tight",
                                        chapter.id.startsWith('t') && "font-telugu"
                                    )}>
                                        {chapter.name}
                                    </h3>
                                    <div className="flex items-center justify-between mt-4">
                                        <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {format(new Date(plan.parentTargetDate!), 'MMM dd')}
                                        </div>
                                        <div className={cn(
                                            "text-[9px] font-black uppercase px-2 py-1 rounded-md",
                                            daysLeft < 0 ? "bg-red-500/20 text-red-500" : "bg-orange-500/20 text-orange-500"
                                        )}>
                                            {daysLeft < 0 ? "OVERDUE" : `${daysLeft}d LEFT`}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    {Object.values(state.chapterPlans).filter(p => p.parentTargetDate && !state.completedChapterIds.includes(p.chapterId)).length === 0 && (
                        <div className="col-span-full py-8 text-center glass-card rounded-[2rem] border-dashed border-2 border-white/5 opacity-50">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">No active parental directives</p>
                        </div>
                    )}
                </div>
            </div>

            <div>
                <h2 className="text-xl font-black mb-6 flex items-center gap-2 font-outfit uppercase tracking-tight">
                    <Target className="w-5 h-5 text-primary" />
                    Recommended Missions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recommendedQuests.map((quest) => (
                        <div key={quest.id} className="glass-card p-6 rounded-[2rem] border border-white/5 hover:border-primary/30 transition-all cursor-pointer group shadow-xl">
                            <div className="flex justify-between items-start mb-4">
                                <span className={cn("text-[9px] font-black px-2.5 py-1 rounded-lg bg-zinc-800/80 uppercase tracking-widest group-hover:bg-zinc-700 transition-colors", quest.subject.color)}>
                                    {quest.subject.name}
                                </span>
                                <span className="text-[10px] text-yellow-500 flex items-center gap-1 bg-yellow-500/10 px-2.5 py-1 rounded-full font-black uppercase tracking-widest border border-yellow-500/10">
                                    +{quest.xpReward} XP <Star className="w-3.5 h-3.5 fill-yellow-500" />
                                </span>
                            </div>
                            <h3 className={cn(
                                "text-lg font-black mb-1 group-hover:text-primary transition-colors line-clamp-1 font-outfit tracking-tight leading-tight",
                                quest.id.startsWith('t') && "font-telugu"
                            )}>
                                {quest.name}
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-black uppercase tracking-[0.2em]">
                                <Sword className="w-3.5 h-3.5" />
                                Battle Mission
                            </div>
                        </div>
                    ))}
                    {currentSyllabus.every(s => s.chapters.every(c => state.completedChapterIds.includes(c.id))) && (
                        <div className="col-span-3 text-center py-16 text-zinc-400 glass-card rounded-[3rem] border-dashed border-2 border-white/5">
                            <Sparkles className="w-12 h-12 mx-auto mb-4 text-yellow-500 opacity-50" />
                            <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">Curriculum Complete!</h3>
                            <p className="text-sm font-medium mt-2">You have mastered Class {currentGrade}! Moving to next level...</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Rank Progression Path */}
            <section className="glass-card p-10 rounded-[3rem] shadow-2xl relative overflow-hidden mb-12 border border-white/5">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-2xl font-black font-outfit uppercase tracking-tighter italic flex items-center gap-4 text-white">
                        <Award className="w-8 h-8 text-yellow-500" />
                        Rank Progression Path
                    </h2>
                    <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Global Standing</div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center justify-between relative px-4">
                    {/* Progress Line */}
                    <div className="absolute top-[24px] left-[5%] right-[5%] h-1 bg-zinc-800 hidden md:block z-0"></div>
                    <div
                        className="absolute top-[24px] left-[5%] h-1 bg-primary z-0 transition-all duration-1000 hidden md:block"
                        style={{ width: `${Math.max(0, Math.min(90, stats.percentage))}%` }}
                    ></div>

                    {theme.ranks.map((r, i) => {
                        const isReached = stats.percentage >= r.minProgress;
                        const isNext = !isReached && (i === 0 || stats.percentage >= theme.ranks[i - 1].minProgress);

                        return (
                            <div key={r.rank} className="relative z-10 flex flex-col items-center gap-3">
                                <div className={cn(
                                    "w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-2xl transition-all duration-500 border-2",
                                    isReached ? "bg-primary border-primary text-white scale-110" : (isNext ? "bg-zinc-800 border-primary/50 text-zinc-400 animate-pulse" : "bg-zinc-900 border-white/5 text-zinc-600 scale-90")
                                )}>
                                    {r.icon}
                                </div>
                                <div className="text-center">
                                    <div className={cn(
                                        "text-[10px] font-black uppercase tracking-widest leading-none",
                                        isReached ? "text-primary" : "text-zinc-500"
                                    )}>
                                        {r.rank}
                                    </div>
                                    <div className="text-[8px] text-zinc-700 font-bold uppercase mt-1">
                                        {r.minProgress}% Req
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
            {/* Hierarchy Map Section */}
            <section className="glass-card p-10 rounded-[3rem] shadow-2xl relative overflow-hidden mb-12 border-t-8 border-primary">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-3xl font-black font-outfit uppercase tracking-tighter italic flex items-center gap-4">
                        <TrendingUp className="w-8 h-8 text-yellow-500" />
                        Battle Progression Map
                    </h2>
                    <div className="text-[12px] font-black text-zinc-500 underline decoration-primary/50 underline-offset-8 uppercase tracking-widest">Victory Roadmap</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Visual Connector Path */}
                    <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[4px] bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 z-0 opacity-20"></div>

                    {[
                        { step: "01", label: 'Sub-Topic Drill', xp: '+20 XP', desc: 'Click sub-units inside any chapter. Every mark adds power.', icon: <Target className="w-6 h-6" />, color: 'text-blue-400', border: 'border-blue-500/20' },
                        { step: "02", label: 'Unit Mastery', xp: '+100 XP', desc: 'Secure all sub-units or toggle the Chapter Shield to finish.', icon: <Shield className="w-6 h-6" />, color: 'text-purple-400', border: 'border-purple-500/20' },
                        { step: "03", label: 'Mock Battles', xp: '+200 XP', desc: 'Conquer practice papers in the side menu to reach Rank S.', icon: <Sword className="w-6 h-6" />, color: 'text-orange-400', border: 'border-orange-500/20' }
                    ].map((step, i) => (
                        <div key={i} className={cn("relative z-10 bg-zinc-950/80 backdrop-blur-md border-2 p-8 rounded-[2.5rem] text-center group hover:bg-zinc-900 transition-all duration-500", step.border)}>
                            <div className="absolute -top-4 -left-4 w-10 h-10 bg-zinc-900 border border-white/10 rounded-full flex items-center justify-center text-[10px] font-black text-zinc-500 group-hover:bg-primary group-hover:text-white transition-colors">{step.step}</div>
                            <div className={cn("w-16 h-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-6 transition-all", step.color)}>
                                {step.icon}
                            </div>
                            <h4 className="text-lg font-black text-white uppercase tracking-tight mb-2">{step.label}</h4>
                            <div className={cn("text-[12px] font-black uppercase mb-4", step.color)}>{step.xp}</div>
                            <p className="text-[10px] text-zinc-400 font-bold uppercase tracking-widest leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
