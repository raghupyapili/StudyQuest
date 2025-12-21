import { syllabusData } from '../data/syllabus';
import { BarChart3, Clock, TrendingUp, Calendar, Sword, Sparkles, Shield } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { differenceInDays, format } from 'date-fns';
import { cn } from '../lib/utils';
import { getRank, getUnlockedForm, BREATHING_STYLES } from '../lib/demonSlayer';

interface ParentDashboardProps {
    completedChapterIds: string[];
    completedSubTopicIds: string[];
    xp: number;
    level: number;
    streak: number;
    examDate: string;
    chapterPlans: Record<string, any>;
}

export function ParentDashboard({
    completedChapterIds,
    completedSubTopicIds,
    xp,
    level,
    streak,
    examDate,
    chapterPlans
}: ParentDashboardProps) {

    // Calculate overall statistics
    let totalWeight = 0;
    let completedWeight = 0;

    // Subject specific progress
    const subjectProgressRaw: Record<string, number> = {};

    syllabusData.forEach(sub => {
        let subTotalWeight = 0;
        let subCompletedWeight = 0;

        sub.chapters.forEach(ch => {
            if (ch.subtopics && ch.subtopics.length > 0) {
                const cw = ch.subtopics.filter(st => completedSubTopicIds.includes(st.id)).length;
                totalWeight += ch.subtopics.length;
                completedWeight += cw;
                subTotalWeight += ch.subtopics.length;
                subCompletedWeight += cw;
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
    const currentSlayerRank = getRank(overallProgress);

    const totalSubTopics = syllabusData.reduce((sum, subject) =>
        sum + subject.chapters.reduce((chSum, ch) => chSum + (ch.subtopics?.length || 0), 0), 0
    );
    const completedSubTopics = completedSubTopicIds.length;

    const daysUntilExam = differenceInDays(new Date(examDate), new Date());

    // Subject-wise progress objects
    const subjectProgress = syllabusData.map(subject => {
        const total = subject.chapters.length;
        const completed = subject.chapters.filter(ch => completedChapterIds.includes(ch.id)).length;
        const percentage = subjectProgressRaw[subject.id];
        return { ...subject, total, completed, percentage };
    });

    // Upcoming deadlines
    const upcomingDeadlines = Object.entries(chapterPlans)
        .filter(([_, plan]) => plan.targetDate && !completedChapterIds.includes(plan.chapterId))
        .map(([chapterId, plan]) => {
            const chapter = syllabusData
                .flatMap(s => s.chapters)
                .find(ch => ch.id === chapterId);
            return {
                chapterId,
                chapterName: chapter?.name || 'Unknown',
                targetDate: plan.targetDate,
                daysLeft: differenceInDays(new Date(plan.targetDate), new Date())
            };
        })
        .sort((a, b) => a.daysLeft - b.daysLeft)
        .slice(0, 5);

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-400 font-outfit">
                        Slayer Monitoring
                    </h1>
                    <p className="text-muted-foreground mt-1">Tracking your child's journey to Hashira rank</p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-muted-foreground uppercase tracking-widest font-bold">Countdown to Victory</div>
                    <div className="text-3xl font-bold text-orange-500">{daysUntilExam} days</div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Corps Rank Card */}
                <div className="glass-card p-6 rounded-xl border-l-4 border-primary">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Sword className="w-5 h-5 text-primary" />
                            </div>
                            <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Corps Rank</div>
                        </div>
                        <div className="text-xl">{currentSlayerRank.icon}</div>
                    </div>
                    <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
                        {currentSlayerRank.rank}
                    </div>
                    <div className="text-xs text-muted-foreground mt-1 italic">
                        {overallProgress}% Total Mastery
                    </div>
                </div>

                <div className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Power Level</div>
                    </div>
                    <div className="text-2xl font-bold">Level {level}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                        {xp} XP Accumulation
                    </div>
                </div>

                <div className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Techniques</div>
                    </div>
                    <div className="text-2xl font-bold">{completedSubTopics}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                        of {totalSubTopics} Sub-topics
                    </div>
                </div>

                <div className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-amber-500/10 rounded-lg">
                            <Clock className="w-5 h-5 text-amber-500" />
                        </div>
                        <div className="text-sm text-muted-foreground uppercase tracking-wider font-medium">Training Streak</div>
                    </div>
                    <div className="text-2xl font-bold">{streak}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                        Focus Breathing (Days)
                    </div>
                </div>
            </div>

            {/* Subject-wise Progress */}
            <div className="glass-card p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2 font-outfit">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Breathing Style Mastery
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {subjectProgress.map(subject => {
                        const style = BREATHING_STYLES[subject.id];
                        const unlockedForm = getUnlockedForm(subject.id, subject.percentage);

                        return (
                            <div key={subject.id} className="text-center group">
                                <div className="w-24 h-24 mx-auto mb-3 relative">
                                    <CircularProgressbar
                                        value={subject.percentage}
                                        text={`${subject.percentage}%`}
                                        styles={buildStyles({
                                            pathColor: subject.percentage === 100 ? '#10b981' : (subject.color === 'text-purple-500' ? '#a855f7' : '#7c3aed'),
                                            textColor: '#fff',
                                            trailColor: '#27272a',
                                            textSize: '20px'
                                        })}
                                    />
                                    {subject.percentage === 100 && (
                                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-zinc-900 shadow-lg">
                                            <Shield className="w-3 h-3 text-white" />
                                        </div>
                                    )}
                                </div>
                                <div className={cn(
                                    "font-bold text-sm mb-1",
                                    subject.id === 'telugu' && "font-telugu"
                                )}>
                                    {subject.name}
                                </div>
                                <div className="text-[11px] text-muted-foreground font-medium uppercase tracking-tighter mb-2">
                                    {style?.style}
                                </div>
                                {unlockedForm && (
                                    <div className="text-[10px] bg-white/5 py-1 px-2 rounded-md border border-white/5 mx-auto max-w-[100px] truncate">
                                        {unlockedForm}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Upcoming Deadlines */}
            {upcomingDeadlines.length > 0 && (
                <div className="glass-card p-6 rounded-xl border-l-4 border-orange-500">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 font-outfit">
                        <Calendar className="w-5 h-5 text-orange-500" />
                        Missions Due
                    </h2>
                    <div className="space-y-3">
                        {upcomingDeadlines.map(deadline => (
                            <div
                                key={deadline.chapterId}
                                className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800"
                            >
                                <div>
                                    <div className={cn(
                                        "font-medium",
                                        deadline.chapterId.startsWith('t') && "font-telugu"
                                    )}>
                                        {deadline.chapterName}
                                    </div>
                                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                                        Deadline: {format(new Date(deadline.targetDate), 'MMM dd, yyyy')}
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${deadline.daysLeft < 0
                                    ? 'bg-red-500/20 text-red-400'
                                    : deadline.daysLeft <= 3
                                        ? 'bg-orange-500/20 text-orange-400'
                                        : 'bg-blue-500/20 text-blue-400'
                                    }`}>
                                    {deadline.daysLeft < 0 ? 'Overdue' : `${deadline.daysLeft}d left`}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Pending Chapters */}
            <div className="glass-card p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4 font-outfit">Untrained Techniques by Subject</h2>
                <div className="space-y-6">
                    {subjectProgress
                        .filter(s => s.completed < s.total)
                        .map(subject => {
                            const pendingChapters = subject.chapters.filter(
                                ch => !completedChapterIds.includes(ch.id)
                            );
                            return (
                                <div key={subject.id} className="border-l-2 border-zinc-800 pl-4">
                                    <div className={cn(
                                        "font-bold text-lg mb-3 flex items-center gap-2",
                                        subject.color,
                                        subject.id === 'telugu' && "font-telugu"
                                    )}>
                                        <div className={cn("w-2 h-2 rounded-full", subject.color.replace('text-', 'bg-'))} />
                                        {subject.name}
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                        {pendingChapters.map(chapter => (
                                            <div
                                                key={chapter.id}
                                                className={cn(
                                                    "text-sm p-3 bg-zinc-900/30 rounded-xl border border-zinc-800/50 hover:bg-zinc-900 transition-colors",
                                                    chapter.id.startsWith('t') && "font-telugu"
                                                )}
                                            >
                                                {chapter.name}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
