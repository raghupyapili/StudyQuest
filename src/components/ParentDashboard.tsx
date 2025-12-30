import { useState } from 'react';
import { syllabusData } from '../data/syllabus';
import {
    Star, Sword, Shield, Sparkles, Calendar, TrendingUp,
    Plus, Trash2, X, ChevronDown, Clock, Bell,
    BarChart3, CheckCircle2, ChevronUp
} from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { differenceInDays, format } from 'date-fns';
import { cn } from '../lib/utils';
import { getGradeTheme, getRank, getUnlockedElement } from '../lib/themes';
import type { User, GameState, ChapterPlan } from '../types';

interface ParentDashboardProps {
    state: GameState;
    examDate: string;
    chapterPlans: Record<string, ChapterPlan>;
    grade: string;
    onUpdateChapterPlan: (chapterId: string, plan: Partial<ChapterPlan>) => void;
    user: User | null;
    onUpdateFrequency: (f: 'Daily' | 'Weekly' | 'Monthly') => void;
    onMarkNotificationRead: (id: string) => void;
    onAddCustomChapter: (subjectId: string, name: string) => void;
    onDeleteCustomChapter: (subjectId: string, chapterId: string) => void;
    toggleCriticalSubTopic?: (id: string) => void;
    addCustomSubTopic?: (chapterId: string, name: string) => void;
    customChapters?: Record<string, any[]>;
}

export function ParentDashboard({
    state, examDate, chapterPlans, grade: currentGrade = '10', onUpdateChapterPlan,
    user, onUpdateFrequency, onMarkNotificationRead, onAddCustomChapter,
    onDeleteCustomChapter, toggleCriticalSubTopic, addCustomSubTopic, customChapters
}: ParentDashboardProps) {
    const { xp, level, streak, completedChapterIds, completedSubTopicIds } = state;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeSubjectId, setActiveSubjectId] = useState<string | null>(null);
    const [newModuleName, setNewModuleName] = useState('');
    const [expandedChapterId, setExpandedChapterId] = useState<string | null>(null);

    const baseSyllabus = syllabusData[currentGrade] || syllabusData['10'];
    const currentSyllabus = baseSyllabus.map(subject => ({
        ...subject,
        chapters: [...subject.chapters, ...(customChapters?.[subject.id] || [])]
    }));
    const theme = getGradeTheme(currentGrade);

    // Calculate overall statistics
    let totalWeight = 0;
    let completedWeight = 0;

    // Subject specific progress
    const subjectProgressRaw: Record<string, number> = {};

    currentSyllabus.forEach(sub => {
        let subTotalWeight = 0;
        let subCompletedWeight = 0;

        sub.chapters.forEach((ch: any) => {
            if (ch.subtopics && ch.subtopics.length > 0) {
                const totalSub = ch.subtopics.length;
                const completedSub = ch.subtopics.filter((st: any) => completedSubTopicIds.includes(st.id)).length;
                const effectiveCompletedSub = completedChapterIds.includes(ch.id) ? totalSub : completedSub;

                totalWeight += totalSub;
                completedWeight += effectiveCompletedSub;
                subTotalWeight += totalSub;
                subCompletedWeight += effectiveCompletedSub;
            } else {
                totalWeight += 1;
                subTotalWeight += 1;
                if (completedChapterIds.includes(ch.id)) {
                    completedWeight += 1;
                    subCompletedWeight += 1;
                }
            }
        });
        subjectProgressRaw[sub.id] = subTotalWeight === 0 ? 0 : Math.round((subCompletedWeight / subTotalWeight) * 100);
    });

    const overallProgress = totalWeight === 0 ? 0 : Math.round((completedWeight / totalWeight) * 100);
    const currentRank = getRank(theme, overallProgress);

    const totalSubTopics = currentSyllabus.reduce((sum: number, subject: any) =>
        sum + subject.chapters.reduce((chSum: number, ch: any) => chSum + (ch.subtopics?.length || 0), 0), 0
    );
    const completedSubTopics = completedSubTopicIds.filter(id =>
        currentSyllabus.some(sub => sub.chapters.some((ch: any) => ch.subtopics?.some((st: any) => st.id === id)))
    ).length;

    const diff = differenceInDays(new Date(examDate), new Date());
    const daysUntilExam = diff < 0 ? 0 : diff;

    // Subject-wise progress objects
    const subjectProgress = currentSyllabus.map(subject => {
        const total = subject.chapters.length;
        const completed = subject.chapters.filter(ch => completedChapterIds.includes(ch.id)).length;
        const percentage = subjectProgressRaw[subject.id];
        return { ...subject, total, completed, percentage };
    });

    // Upcoming deadlines (including parent targets)
    const upcomingDeadlines = Object.entries(chapterPlans)
        .filter(([_, plan]) => (plan.targetDate || plan.parentTargetDate) && !completedChapterIds.includes(plan.chapterId))
        .map(([chapterId, plan]) => {
            const chapter = currentSyllabus
                .flatMap(s => s.chapters)
                .find(ch => ch.id === chapterId);
            const targetDate = plan.parentTargetDate || plan.targetDate;
            if (!targetDate) return null;
            return {
                chapterId,
                chapterName: chapter?.name || 'Unknown',
                targetDate,
                isParentSet: !!plan.parentTargetDate,
                daysLeft: differenceInDays(new Date(targetDate), new Date())
            };
        })
        .filter((d): d is any => d !== null && d.chapterName !== 'Unknown')
        .sort((a, b) => a.daysLeft - b.daysLeft)
        .slice(0, 5);

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-zinc-200 to-zinc-500 font-outfit uppercase tracking-tighter">
                        Monitoring Station
                    </h1>
                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mt-1">Supervising Mission Progress • Class {currentGrade}</p>
                </div>
                <div className="text-right">
                    <div className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] font-black">Strategic Window</div>
                    <div className="text-3xl font-black text-white italic tracking-tighter">{daysUntilExam} DAYS LEFT</div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="glass-card p-6 rounded-[2rem] border-l-4 border-primary shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-primary/10 rounded-xl">
                                <Sword className="w-5 h-5 text-primary" />
                            </div>
                            <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Global Rank</div>
                        </div>
                        <div className="text-2xl">{currentRank.icon}</div>
                    </div>
                    <div className={cn("text-2xl font-black italic tracking-tighter uppercase", theme.secondaryColor)}>
                        {currentRank.rank}
                    </div>
                    <div className="text-[10px] text-zinc-500 mt-1 font-bold uppercase tracking-widest">
                        {overallProgress}% MISSION SUCCESS
                    </div>
                </div>

                <div className="glass-card p-6 rounded-[2rem] shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-green-500/10 rounded-xl">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Experience</div>
                    </div>
                    <div className="text-3xl font-black tracking-tighter">LVL {level}</div>
                    <div className="text-[10px] text-zinc-500 mt-1 font-bold uppercase tracking-widest">
                        {xp} TOTAL XP GAINED
                    </div>
                </div>

                <div className="glass-card p-6 rounded-[2rem] shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-blue-500/10 rounded-xl">
                            <BarChart3 className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Components</div>
                    </div>
                    <div className="text-3xl font-black tracking-tighter">{completedSubTopics}</div>
                    <div className="text-[10px] text-zinc-500 mt-1 font-bold uppercase tracking-widest">
                        OF {totalSubTopics} UNITS MASTERED
                    </div>
                </div>

                <div className="glass-card p-6 rounded-[2rem] shadow-xl">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-amber-500/10 rounded-xl">
                            <Clock className="w-5 h-5 text-amber-500" />
                        </div>
                        <div className="text-[10px] text-zinc-500 font-black uppercase tracking-widest">Consistency</div>
                    </div>
                    <div className="text-3xl font-black tracking-tighter">{streak} DAYS</div>
                    <div className="text-[10px] text-zinc-500 mt-1 font-bold uppercase tracking-widest">
                        CONSECUTIVE TRAINING
                    </div>
                </div>
            </div>

            {/* Subject-wise Progress */}
            <div className="glass-card p-8 rounded-[3rem] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                <h2 className="text-xl font-black mb-10 flex items-center gap-3 font-outfit uppercase tracking-tight">
                    <Sparkles className="w-6 h-6 text-primary" />
                    Specialization Mastery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                    {subjectProgress.map(subject => {
                        const style = theme.subjectStyles[subject.id];
                        const unlockedElement = getUnlockedElement(theme, subject.id, subject.percentage);

                        return (
                            <div key={subject.id} className="text-center group">
                                <div className="w-28 h-28 mx-auto mb-5 relative group-hover:scale-105 transition-transform duration-500">
                                    <CircularProgressbar
                                        value={subject.percentage}
                                        text={`${subject.percentage}% `}
                                        styles={buildStyles({
                                            pathColor: subject.percentage === 100 ? '#10b981' : '#7c3aed',
                                            textColor: '#fff',
                                            trailColor: '#18181b',
                                            textSize: '22px'
                                        })}
                                    />
                                    {subject.percentage === 100 && (
                                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1.5 border-4 border-zinc-900 shadow-xl">
                                            <Shield className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className={cn(
                                    "font-black text-sm mb-1 uppercase tracking-tight",
                                    subject.id === 'telugu' && "font-telugu"
                                )}>
                                    {subject.name}
                                </div>
                                <div className="text-[10px] text-zinc-500 font-black uppercase tracking-wider mb-3">
                                    {style?.name || 'Academic Path'}
                                </div>
                                {unlockedElement && (
                                    <div className="text-[9px] font-black bg-zinc-800/50 py-1.5 px-3 rounded-xl border border-white/5 mx-auto max-w-[110px] truncate text-zinc-400 uppercase tracking-tight">
                                        {unlockedElement}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Secondary Sections */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                    <h2 className="text-xl font-black mb-6 flex items-center gap-2 font-outfit uppercase tracking-tight">
                        <Bell className="w-5 h-5 text-primary" />
                        Logistics Intelligence
                    </h2>
                    <div className="glass-card p-6 rounded-[2rem] border border-white/5 space-y-4">
                        <div className="flex items-center justify-between pb-4 border-b border-white/5">
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Report Frequency</span>
                            <div className="flex bg-black/40 p-1 rounded-xl">
                                {(['Daily', 'Weekly', 'Monthly'] as const).map(f => (
                                    <button
                                        key={f}
                                        onClick={() => onUpdateFrequency(f)}
                                        className={cn(
                                            "px-3 py-1.5 text-[9px] font-black uppercase tracking-tighter rounded-lg transition-all",
                                            user?.notificationFrequency === f ? "bg-primary text-white" : "text-zinc-500 hover:text-white"
                                        )}
                                    >
                                        {f}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto no-scrollbar space-y-3">
                            {user?.notifications && user.notifications.length > 0 ? (
                                user.notifications.map(notif => (
                                    <div
                                        key={notif.id}
                                        className={cn(
                                            "p-4 rounded-2xl border transition-all flex items-start gap-3",
                                            notif.isRead ? "bg-zinc-900/40 border-white/5 opacity-60" : "bg-primary/5 border-primary/20 shadow-lg"
                                        )}
                                    >
                                        <div className={cn(
                                            "mt-1 w-2 h-2 rounded-full",
                                            notif.type === 'completion' ? "bg-green-500" : "bg-primary"
                                        )} />
                                        <div className="flex-1">
                                            <p className="text-[11px] font-black text-white uppercase tracking-tight leading-tight">{notif.message}</p>
                                            <p className="text-[9px] text-zinc-500 mt-1 font-bold uppercase tracking-widest">{format(new Date(notif.timestamp), 'MMM dd, HH:mm')}</p>
                                        </div>
                                        {!notif.isRead && (
                                            <button
                                                onClick={() => onMarkNotificationRead(notif.id)}
                                                className="text-primary hover:text-white transition-colors"
                                            >
                                                <CheckCircle2 className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-8 opacity-40">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-relaxed">No new signals detected in the network.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Upcoming Deadlines */}
                <div className="glass-card p-6 rounded-[2.5rem] border-l-4 border-orange-500 shadow-xl">
                    <h2 className="text-xl font-black mb-6 flex items-center gap-3 font-outfit uppercase tracking-tight">
                        <Calendar className="w-6 h-6 text-orange-500" />
                        Critical Targets
                    </h2>
                    <div className="space-y-4">
                        {upcomingDeadlines.length > 0 ? upcomingDeadlines.map((deadline: any) => (
                            <div
                                key={deadline.chapterId}
                                className="flex items-center justify-between p-4 bg-zinc-900/40 rounded-2xl border border-white/5 group hover:bg-zinc-900/60 transition-colors"
                            >
                                <div>
                                    <div className={cn(
                                        "font-black text-sm uppercase tracking-tight flex items-center gap-2",
                                        deadline.chapterId.startsWith('t') && "font-telugu"
                                    )}>
                                        {deadline.chapterName}
                                        {deadline.isParentSet && <Shield className="w-3 h-3 text-orange-500" />}
                                    </div>
                                    <div className="text-[9px] text-zinc-500 uppercase tracking-widest font-black mt-1">
                                        ETA: {format(new Date(deadline.targetDate), 'MMM dd, yyyy')}
                                        {deadline.isParentSet && " (Parent Assigned)"}
                                    </div>
                                </div>
                                <div className={cn(
                                    "px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest",
                                    deadline.daysLeft < 0 ? 'bg-red-500/10 text-red-500' :
                                        deadline.daysLeft <= 3 ? 'bg-orange-500/10 text-orange-500' :
                                            'bg-primary/10 text-primary'
                                )}>
                                    {deadline.daysLeft < 0 ? 'LATENCY DETECTED' : `${deadline.daysLeft}d REMAINING`}
                                </div>
                            </div>
                        )) : (
                            <div className="text-center py-10 text-zinc-500 font-bold uppercase tracking-widest text-[10px]">No pending critical targets</div>
                        )}
                    </div>
                </div>

                {/* Strategy Gap Analysis */}
                <div className="glass-card p-6 rounded-[2.5rem] shadow-xl">
                    <h2 className="text-xl font-black mb-6 font-outfit uppercase tracking-tight">Command Directive</h2>
                    <p className="text-[10px] text-zinc-500 font-black uppercase mb-6 tracking-widest px-1">Select a unit to assign a completion target date or expand for sub-topic intel.</p>
                    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
                        {currentSyllabus.map(subject => {
                            return (
                                <div key={subject.id} className="border-l-2 border-zinc-800 pl-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className={cn(
                                            "font-black text-xs uppercase tracking-widest flex items-center gap-2",
                                            subject.color,
                                            subject.id === 'telugu' && "font-telugu"
                                        )}>
                                            <div className={cn("w-1.5 h-1.5 rounded-full", subject.color.replace('text-', 'bg-').replace('500', '500'))} />
                                            {subject.name}
                                        </div>
                                        <button
                                            onClick={() => { setActiveSubjectId(subject.id); setIsModalOpen(true); }}
                                            className="p-1.5 rounded-lg bg-zinc-800 text-zinc-500 hover:text-primary transition-colors hover:bg-zinc-700"
                                            title="Inject Module"
                                        >
                                            <Plus className="w-3 h-3" />
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                        {subject.chapters.filter(ch => !completedChapterIds.includes(ch.id)).map((chapter: any) => {
                                            const plan = chapterPlans[chapter.id];
                                            const isExpanded = expandedChapterId === chapter.id;
                                            const completedSubs = chapter.subtopics?.filter((st: any) => completedSubTopicIds.includes(st.id)).length || 0;
                                            const totalSubs = chapter.subtopics?.length || 0;
                                            const isCustom = chapter.id.startsWith('custom-');

                                            return (
                                                <div key={chapter.id} className="space-y-2">
                                                    <div
                                                        className={cn(
                                                            "flex items-center justify-between p-3 bg-zinc-900/20 rounded-xl border transition-all",
                                                            isExpanded ? "border-primary/30 ring-1 ring-primary/20 shadow-lg shadow-primary/5" : "border-white/[0.03] group hover:bg-zinc-900/40"
                                                        )}
                                                    >
                                                        <div
                                                            className="flex items-center gap-3 flex-1 cursor-pointer"
                                                            onClick={() => setExpandedChapterId(isExpanded ? null : chapter.id)}
                                                        >
                                                            <div className={cn(
                                                                "text-[11px] font-bold text-zinc-400 capitalize flex flex-col",
                                                                chapter.id.startsWith('t') && "font-telugu"
                                                            )}>
                                                                <span>{chapter.name}</span>
                                                                {totalSubs > 0 && (
                                                                    <span className="text-[8px] text-zinc-600 font-black uppercase tracking-tight">
                                                                        {completedSubs} / {totalSubs} SUB-UNITS
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {isExpanded ? <ChevronUp className="w-3 h-3 text-zinc-600" /> : <ChevronDown className="w-3 h-3 text-zinc-600 opacity-0 group-hover:opacity-100" />}
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            {isCustom && (
                                                                <button
                                                                    onClick={() => onDeleteCustomChapter?.(subject.id, chapter.id)}
                                                                    className="p-1.5 text-zinc-600 hover:text-red-500 transition-colors"
                                                                >
                                                                    <Trash2 className="w-3 h-3" />
                                                                </button>
                                                            )}
                                                            <input
                                                                type="date"
                                                                min={new Date().toISOString().split('T')[0]}
                                                                value={plan?.parentTargetDate?.split('T')[0] || ''}
                                                                onChange={(e) => onUpdateChapterPlan(chapter.id, { parentTargetDate: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
                                                                className="bg-zinc-800/50 rounded-lg px-2 py-1 text-[9px] text-orange-500 font-black uppercase outline-none focus:ring-1 focus:ring-orange-500/50 cursor-pointer"
                                                            />
                                                        </div>
                                                    </div>
                                                    {isExpanded && chapter.subtopics && (
                                                        <div className="ml-4 pl-4 border-l border-zinc-800 py-2 space-y-2 animate-in slide-in-from-top-2 duration-300">
                                                            {chapter.subtopics.map((st: any) => {
                                                                const isDone = completedSubTopicIds.includes(st.id);
                                                                const isCritical = state.settings.criticalSubTopicIds?.includes(st.id);
                                                                return (
                                                                    <div key={st.id} className="flex items-center justify-between group/st">
                                                                        <div className="flex items-center gap-2">
                                                                            <div className={cn(
                                                                                "w-1.5 h-1.5 rounded-full shadow-lg",
                                                                                isDone ? "bg-green-500 shadow-green-500/20" : "bg-zinc-800"
                                                                            )} />
                                                                            <span className={cn(
                                                                                "text-[10px] uppercase tracking-tight",
                                                                                isDone ? "text-zinc-600 line-through decoration-zinc-800" : (isCritical ? "text-orange-400 font-black" : "text-zinc-500 font-bold")
                                                                            )}>
                                                                                {st.name}
                                                                                {isCritical && <span className="ml-2 text-[8px] bg-orange-500/10 text-orange-500 px-1 rounded">CRITICAL</span>}
                                                                            </span>
                                                                        </div>
                                                                        <button
                                                                            onClick={() => toggleCriticalSubTopic?.(st.id)}
                                                                            className={cn(
                                                                                "p-1 rounded-md transition-all opacity-0 group-hover/st:opacity-100",
                                                                                isCritical ? "text-orange-500 bg-orange-500/10 opacity-100" : "text-zinc-700 hover:text-orange-500 hover:bg-orange-500/5"
                                                                            )}
                                                                        >
                                                                            <Star className={cn("w-3 h-3", isCritical && "fill-orange-500")} />
                                                                        </button>
                                                                    </div>
                                                                );
                                                            })}
                                                            <button
                                                                onClick={() => {
                                                                    const name = prompt('Enter sub-unit designation:');
                                                                    if (name) addCustomSubTopic?.(chapter.id, name);
                                                                }}
                                                                className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-dashed border-white/10 text-[9px] text-zinc-600 hover:text-primary hover:border-primary/30 transition-all uppercase font-black tracking-widest"
                                                            >
                                                                <Plus className="w-3 h-3" />
                                                                Inject Tactical Sub-Unit
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Injection Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-zinc-900 border border-white/10 p-8 rounded-[2.5rem] max-w-md w-full space-y-6 shadow-2xl relative">
                        <button onClick={() => { setIsModalOpen(false); setActiveSubjectId(null); }} className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                        <div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Inject Syllabus Module</h3>
                            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Parental Override: Adding content to curriculum.</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Module Designation</label>
                            <input
                                autoFocus
                                type="text"
                                value={newModuleName}
                                onChange={(e) => setNewModuleName(e.target.value)}
                                placeholder="Enter chapter name..."
                                className="w-full bg-zinc-800 border-none rounded-2xl p-4 text-white font-bold placeholder:text-zinc-600 focus:ring-2 focus:ring-primary/50 outline-none"
                            />
                        </div>
                        <button
                            onClick={() => {
                                if (newModuleName.trim() && activeSubjectId) {
                                    onAddCustomChapter?.(activeSubjectId, newModuleName.trim());
                                    setNewModuleName('');
                                    setActiveSubjectId(null);
                                    setIsModalOpen(false);
                                }
                            }}
                            className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            Confirm Injection
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
