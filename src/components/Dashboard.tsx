import { useMemo } from 'react';
import { syllabusData } from '../data/syllabus';
import { Trophy, Flame, Target, Star, Book } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { cn } from '../lib/utils';
import { CountdownTimer } from './CountdownTimer';

interface DashboardProps {
    state: {
        xp: number;
        level: number;
        completedChapterIds: string[];
        completedSubTopicIds: string[];
        streak: number;
    };
}

export function Dashboard({ state }: DashboardProps) {
    const stats = useMemo(() => {
        let totalWeight = 0;
        let completedWeight = 0;
        let totalChapters = 0;
        let completedCount = 0;

        syllabusData.forEach(sub => {
            sub.chapters.forEach(ch => {
                totalChapters++;
                if (state.completedChapterIds.includes(ch.id)) {
                    completedCount++;
                }

                if (ch.subtopics && ch.subtopics.length > 0) {
                    const chTotalSub = ch.subtopics.length;
                    const chCompletedSub = ch.subtopics.filter(st => state.completedSubTopicIds.includes(st.id)).length;

                    totalWeight += chTotalSub;
                    completedWeight += chCompletedSub;
                } else {
                    // If no subtopics, the chapter counts as 1 weight unit
                    totalWeight += 1;
                    if (state.completedChapterIds.includes(ch.id)) {
                        completedWeight += 1;
                    }
                }
            });
        });

        return {
            total: totalChapters,
            completed: completedCount,
            percentage: totalWeight === 0 ? 0 : Math.round((completedWeight / totalWeight) * 100)
        };
    }, [state.completedChapterIds, state.completedSubTopicIds]);

    // Recalculate based on the formula used in hooked: 1 + floor(xp/500). So every 500 xp is a level.
    // Level 1: 0-499. Level 2: 500-999.
    // XP Progress %: (xp % 500) / 500 * 100
    const xpProgress = (state.xp % 500) / 500 * 100;

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-500">
            <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Welcome back, Scholar!</h1>
                    <p className="text-muted-foreground">Your journey to 10th Grade victory continues.</p>
                </div>
                <div className="w-full md:w-auto">
                    <CountdownTimer />
                </div>
            </header>

            {/* Main Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Level Card */}
                <div className="glass-card p-6 rounded-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Trophy className="w-24 h-24" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-end gap-2 mb-2">
                            <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                Lvl {state.level}
                            </span>
                            <span className="text-sm text-muted-foreground mb-1.5">Rank: Novice</span>
                        </div>

                        <div className="w-full bg-zinc-800 h-3 rounded-full overflow-hidden mb-2">
                            <div
                                className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-1000 ease-out"
                                style={{ width: `${xpProgress}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>{state.xp % 500} XP</span>
                            <span>500 XP</span>
                        </div>
                    </div>
                </div>

                {/* Streak Card */}
                <div className="glass-card p-6 rounded-2xl flex items-center gap-6">
                    <div className="p-4 bg-orange-500/10 rounded-full text-orange-500">
                        <Flame className="w-8 h-8 animate-pulse-slow" />
                    </div>
                    <div>
                        <div className="text-3xl font-bold">{state.streak}</div>
                        <div className="text-muted-foreground text-sm uppercase tracking-wide font-medium">Day Streak</div>
                    </div>
                </div>

                {/* Completion Card */}
                <div className="glass-card p-6 rounded-2xl flex items-center gap-6">
                    <div className="w-16 h-16">
                        <CircularProgressbar
                            value={stats.percentage}
                            text={`${stats.percentage}%`}
                            styles={buildStyles({
                                pathColor: `rgba(124, 58, 237, ${stats.percentage / 100})`,
                                textColor: '#fff',
                                trailColor: '#27272a',
                                backgroundColor: '#3e98c7',
                            })}
                        />
                    </div>
                    <div>
                        <div className="text-xl font-bold">{stats.completed} / {stats.total}</div>
                        <div className="text-muted-foreground text-sm">Chapters Completed</div>
                    </div>
                </div>
            </div>

            {/* Suggested Quests / Next Up */}
            <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Recommended Quests
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {syllabusData.flatMap(s => s.chapters.map(c => ({ ...c, subject: s })))
                        .filter(c => !state.completedChapterIds.includes(c.id))
                        .slice(0, 3)
                        .map((quest) => (
                            <div key={quest.id} className="glass-card p-4 rounded-xl border border-zinc-800 hover:border-primary/50 transition-colors cursor-pointer group">
                                <div className="flex justify-between items-start mb-3">
                                    <span className={cn("text-xs font-semibold px-2 py-1 rounded-md bg-zinc-800", quest.subject.color)}>
                                        {quest.subject.name}
                                    </span>
                                    <span className="text-xs text-yellow-500 flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-full">
                                        +{quest.xpReward} XP <Star className="w-3 h-3 fill-yellow-500" />
                                    </span>
                                </div>
                                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">{quest.name}</h3>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                    <Book className="w-3 h-3" />
                                    Chapter
                                </div>
                            </div>
                        ))
                    }
                    {syllabusData.every(s => s.chapters.every(c => state.completedChapterIds.includes(c.id))) && (
                        <div className="col-span-3 text-center py-10 text-muted-foreground">
                            No quests available! You are a master!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
