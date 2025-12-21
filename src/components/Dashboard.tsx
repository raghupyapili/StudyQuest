import { useMemo } from 'react';
import { syllabusData } from '../data/syllabus';
import { Flame, Target, Star, Sword, Zap, Shield, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { CountdownTimer } from './CountdownTimer';
import { getRank, getUnlockedForm, BREATHING_STYLES } from '../lib/demonSlayer';

interface DashboardProps {
    state: {
        xp: number;
        level: number;
        completedChapterIds: string[];
        completedSubTopicIds: string[];
        completedPracticePaperIds: string[];
        streak: number;
    };
}

export function Dashboard({ state }: DashboardProps) {
    const stats = useMemo(() => {
        let totalWeight = 0;
        let completedWeight = 0;
        let totalChapters = 0;
        let completedCount = 0;

        // Subject specific progress for breathing styles
        const subjectProgress: Record<string, number> = {};

        syllabusData.forEach(sub => {
            let subTotalWeight = 0;
            let subCompletedWeight = 0;

            sub.chapters.forEach(ch => {
                totalChapters++;
                if (state.completedChapterIds.includes(ch.id)) {
                    completedCount++;
                }

                if (ch.subtopics && ch.subtopics.length > 0) {
                    const chTotalSub = ch.subtopics.length;
                    const chCompletedSub = ch.subtopics.filter(st => state.completedSubTopicIds.includes(st.id)).length;

                    // Support cases where chapter is manually marked complete but subtopics aren't perfectly synced
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
    }, [state.completedChapterIds, state.completedSubTopicIds]);

    const xpProgress = (state.xp % 500) / 500 * 100;
    const currentSlayerRank = getRank(stats.percentage);

    // Randomize recommended training for variety
    const recommendedQuests = useMemo(() => {
        const incomplete = syllabusData.flatMap(s => s.chapters.map(c => ({ ...c, subject: s })))
            .filter(c => !state.completedChapterIds.includes(c.id));

        // Shuffle and pick 3
        return [...incomplete]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);
    }, [state.completedChapterIds]);

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold font-outfit">Welcome back, Slayer!</h1>
                    <p className="text-muted-foreground">The Demon Slayer Corps is counting on your preparation.</p>
                </div>
                <div className="w-full md:w-auto">
                    <CountdownTimer />
                </div>
            </header>

            {/* Main Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Slayer Rank Card */}
                <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border-l-4 border-primary">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Sword className="w-20 h-20" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Corps Rank</h3>
                                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
                                    {currentSlayerRank.rank}
                                </div>
                            </div>
                            <div className="text-3xl">{currentSlayerRank.icon}</div>
                        </div>
                        <p className="text-xs text-muted-foreground italic mb-4">
                            "{currentSlayerRank.description}"
                        </p>
                        <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-primary to-purple-500 transition-all duration-1000"
                                style={{ width: `${stats.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {/* Streak Card */}
                <div className="glass-card p-6 rounded-2xl flex items-center gap-6 group hover:border-orange-500/50 transition-colors">
                    <div className="p-4 bg-orange-500/10 rounded-2xl text-orange-500 group-hover:scale-110 transition-transform">
                        <Flame className="w-8 h-8 animate-pulse-slow" />
                    </div>
                    <div>
                        <div className="text-3xl font-bold">{state.streak}</div>
                        <div className="text-muted-foreground text-sm uppercase tracking-wide font-medium font-outfit">Day Streak</div>
                        <div className="text-[10px] text-orange-400 font-bold uppercase mt-1">Total Focus Breathing</div>
                    </div>
                </div>

                {/* Level Card */}
                <div className="glass-card p-6 rounded-2xl relative overflow-hidden group border-zinc-800">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-500">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-bold">Lvl {state.level}</div>
                            <div className="text-xs text-muted-foreground">Mastery Level</div>
                        </div>
                    </div>
                    <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden mb-2">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-1000"
                            style={{ width: `${xpProgress}%` }}
                        ></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>{state.xp % 500} XP</span>
                        <span>{500 - (state.xp % 500)} XP to Next Level</span>
                    </div>
                </div>
            </div>

            {/* Breathing Styles Grid */}
            <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 font-outfit">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Techniques Mastered
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {syllabusData.map(subject => {
                        const style = BREATHING_STYLES[subject.id];
                        const progress = stats.subjectProgress[subject.id];
                        const unlockedForm = getUnlockedForm(subject.id, progress);

                        return (
                            <div key={subject.id} className="glass-card p-4 rounded-xl border border-zinc-800 relative overflow-hidden group">
                                <div className="absolute -right-2 -bottom-2 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Shield className="w-16 h-16" />
                                </div>
                                <div className={cn("text-xs font-bold mb-2 uppercase tracking-wider", subject.color)}>
                                    {subject.name}
                                </div>
                                <div className="text-sm font-bold mb-1">{style.style}</div>
                                <div className="text-[10px] text-muted-foreground mb-3 italic">via {style.character}</div>

                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px]">
                                        <span className="text-muted-foreground">Mastery</span>
                                        <span className="font-bold">{progress}%</span>
                                    </div>
                                    <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                                        <div
                                            className={cn("h-full transition-all duration-1000", subject.color.replace('text-', 'bg-'))}
                                            style={{ width: `${progress}%` }}
                                        ></div>
                                    </div>
                                </div>

                                {unlockedForm && (
                                    <div className="mt-3 p-2 bg-white/5 rounded-lg border border-white/5 animate-in slide-in-from-bottom-2">
                                        <div className="text-[9px] uppercase font-bold text-primary mb-0.5">Unlocked Form</div>
                                        <div className="text-[10px] font-medium leading-tight">{unlockedForm}</div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Suggested Quests / Next Up */}
            <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 font-outfit">
                    <Target className="w-5 h-5 text-primary" />
                    Recommended Training
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {recommendedQuests.map((quest) => (
                        <div key={quest.id} className="glass-card p-4 rounded-xl border border-zinc-800 hover:border-primary/50 transition-colors cursor-pointer group">
                            <div className="flex justify-between items-start mb-3">
                                <span className={cn("text-[10px] font-bold px-2 py-1 rounded-md bg-zinc-800 uppercase tracking-wider", quest.subject.color)}>
                                    {quest.subject.name}
                                </span>
                                <span className="text-[10px] text-yellow-500 flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-full font-bold">
                                    +{quest.xpReward} XP <Star className="w-3 h-3 fill-yellow-500" />
                                </span>
                            </div>
                            <h3 className={cn(
                                "font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1 font-outfit",
                                quest.id.startsWith('t') && "font-telugu"
                            )}>
                                {quest.name}
                            </h3>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                                <Sword className="w-3 h-3" />
                                Slayer Mission
                            </div>
                        </div>
                    ))
                    }
                    {syllabusData.every(s => s.chapters.every(c => state.completedChapterIds.includes(c.id))) && (
                        <div className="col-span-3 text-center py-10 text-muted-foreground glass-card rounded-2xl">
                            <Sparkles className="w-10 h-10 mx-auto mb-4 text-yellow-500" />
                            <h3 className="text-lg font-bold">Final Selection Completed!</h3>
                            <p>You have become a Hashira of all subjects!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
