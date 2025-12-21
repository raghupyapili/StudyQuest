import { syllabusData } from '../data/syllabus';
import { BarChart3, CheckCircle2, Clock, TrendingUp, Calendar } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { differenceInDays, format } from 'date-fns';

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
    const totalChapters = syllabusData.reduce((sum, subject) => sum + subject.chapters.length, 0);
    const completedChapters = completedChapterIds.length;

    syllabusData.forEach(sub => {
        sub.chapters.forEach(ch => {
            if (ch.subtopics && ch.subtopics.length > 0) {
                totalWeight += ch.subtopics.length;
                completedWeight += ch.subtopics.filter(st => completedSubTopicIds.includes(st.id)).length;
            } else {
                totalWeight += 1;
                if (completedChapterIds.includes(ch.id)) {
                    completedWeight += 1;
                }
            }
        });
    });

    const overallProgress = totalWeight === 0 ? 0 : Math.round((completedWeight / totalWeight) * 100);

    const totalSubTopics = syllabusData.reduce((sum, subject) =>
        sum + subject.chapters.reduce((chSum, ch) => chSum + (ch.subtopics?.length || 0), 0), 0
    );
    const completedSubTopics = completedSubTopicIds.length;

    const daysUntilExam = differenceInDays(new Date(examDate), new Date());

    // Subject-wise progress
    const subjectProgress = syllabusData.map(subject => {
        const total = subject.chapters.length;
        const completed = subject.chapters.filter(ch => completedChapterIds.includes(ch.id)).length;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
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
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-amber-400">
                        Parent Dashboard
                    </h1>
                    <p className="text-muted-foreground mt-1">Monitor your child's study progress</p>
                </div>
                <div className="text-right">
                    <div className="text-sm text-muted-foreground">Exam in</div>
                    <div className="text-3xl font-bold text-orange-500">{daysUntilExam} days</div>
                </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-sm text-muted-foreground">Overall Progress</div>
                    </div>
                    <div className="text-3xl font-bold">{overallProgress}%</div>
                    <div className="text-xs text-muted-foreground mt-1">
                        {completedChapters} of {totalChapters} chapters
                    </div>
                </div>

                <div className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-green-500" />
                        </div>
                        <div className="text-sm text-muted-foreground">Level & XP</div>
                    </div>
                    <div className="text-3xl font-bold">Level {level}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                        {xp} XP earned
                    </div>
                </div>

                <div className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-blue-500" />
                        </div>
                        <div className="text-sm text-muted-foreground">Sub-Topics</div>
                    </div>
                    <div className="text-3xl font-bold">{completedSubTopics}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                        of {totalSubTopics} completed
                    </div>
                </div>

                <div className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-amber-500/10 rounded-lg">
                            <Clock className="w-5 h-5 text-amber-500" />
                        </div>
                        <div className="text-sm text-muted-foreground">Study Streak</div>
                    </div>
                    <div className="text-3xl font-bold">{streak}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                        consecutive days
                    </div>
                </div>
            </div>

            {/* Subject-wise Progress */}
            <div className="glass-card p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Subject-wise Progress
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                    {subjectProgress.map(subject => (
                        <div key={subject.id} className="text-center">
                            <div className="w-24 h-24 mx-auto mb-3">
                                <CircularProgressbar
                                    value={subject.percentage}
                                    text={`${subject.percentage}%`}
                                    styles={buildStyles({
                                        pathColor: subject.percentage === 100 ? '#10b981' : '#7c3aed',
                                        textColor: '#fff',
                                        trailColor: '#27272a',
                                        textSize: '20px'
                                    })}
                                />
                            </div>
                            <div className="font-semibold text-sm">{subject.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                                {subject.completed}/{subject.total} chapters
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Upcoming Deadlines */}
            {upcomingDeadlines.length > 0 && (
                <div className="glass-card p-6 rounded-xl">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-orange-500" />
                        Upcoming Deadlines
                    </h2>
                    <div className="space-y-3">
                        {upcomingDeadlines.map(deadline => (
                            <div
                                key={deadline.chapterId}
                                className="flex items-center justify-between p-3 bg-zinc-900/50 rounded-lg border border-zinc-800"
                            >
                                <div>
                                    <div className="font-medium">{deadline.chapterName}</div>
                                    <div className="text-xs text-muted-foreground">
                                        Target: {format(new Date(deadline.targetDate), 'MMM dd, yyyy')}
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${deadline.daysLeft < 0
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
                <h2 className="text-xl font-bold mb-4">Pending Chapters by Subject</h2>
                <div className="space-y-4">
                    {subjectProgress
                        .filter(s => s.completed < s.total)
                        .map(subject => {
                            const pendingChapters = subject.chapters.filter(
                                ch => !completedChapterIds.includes(ch.id)
                            );
                            return (
                                <div key={subject.id} className="border-l-4 border-primary pl-4">
                                    <div className="font-semibold text-lg mb-2">{subject.name}</div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        {pendingChapters.map(chapter => (
                                            <div
                                                key={chapter.id}
                                                className="text-sm p-2 bg-zinc-900/30 rounded border border-zinc-800/50"
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
