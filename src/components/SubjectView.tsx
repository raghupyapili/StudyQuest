import type { Subject } from '../data/syllabus';
import { CheckCircle2, Circle } from 'lucide-react';
import { cn } from '../lib/utils';

interface SubjectViewProps {
    subject: Subject;
    completedIds: string[];
    onToggleChapter: (id: string, reward: number) => void;
    onSelectChapter: (chapter: Subject['chapters'][number]) => void;
}

export function SubjectView({ subject, completedIds, onToggleChapter, onSelectChapter }: SubjectViewProps) {
    const completedCount = subject.chapters.filter(c => completedIds.includes(c.id)).length;
    const progress = Math.round((completedCount / subject.chapters.length) * 100);

    return (
        <>
            <div className="p-8 animate-in slide-in-from-right-10 duration-500">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className={cn(
                            "text-3xl font-bold mb-2",
                            subject.color,
                            subject.id === 'telugu' && "font-telugu"
                        )}>
                            {subject.name}
                        </h1>
                        <p className="text-muted-foreground">{subject.chapters.length} Quests Available</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">{progress}%</div>
                        <div className="text-sm text-muted-foreground">Complete</div>
                    </div>
                </header>

                {/* Progress Bar */}
                <div className="w-full bg-zinc-800 h-2 rounded-full mb-10 overflow-hidden">
                    <div
                        className={cn("h-full transition-all duration-1000", subject.color.replace('text-', 'bg-'))}
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {subject.chapters.map((chapter) => {
                        const isCompleted = completedIds.includes(chapter.id);
                        return (
                            <div
                                key={chapter.id}
                                className={cn(
                                    "group relative overflow-hidden p-4 rounded-xl border transition-all duration-200 flex items-center justify-between",
                                    isCompleted
                                        ? "bg-zinc-900/30 border-primary/20"
                                        : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900"
                                )}
                            >
                                <div
                                    className="flex items-center gap-4 relative z-10 flex-1 cursor-pointer"
                                    onClick={() => onSelectChapter(chapter)}
                                >
                                    <div className="hover:scale-110 transition-transform" onClick={(e) => { e.stopPropagation(); onToggleChapter(chapter.id, chapter.xpReward); }}>
                                        <div className={cn(
                                            "transition-colors duration-300",
                                            isCompleted ? "text-green-500" : "text-zinc-600 group-hover:text-zinc-400"
                                        )}>
                                            {isCompleted ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className={cn(
                                            "font-medium transition-all duration-300",
                                            isCompleted ? "text-muted-foreground line-through decoration-primary/50" : "text-foreground",
                                            subject.id === 'telugu' && "font-telugu"
                                        )}>
                                            {chapter.name}
                                        </h3>
                                        <div className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                                            {chapter.subtopics ? `${chapter.subtopics.length} Sub-topics` : 'No sub-topics'}
                                            <span className="w-1 h-1 rounded-full bg-zinc-700" />
                                            Click to plan
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 relative z-10 pointer-events-none">
                                    <span className={cn(
                                        "text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1",
                                        isCompleted ? "bg-zinc-800 text-zinc-500" : "bg-yellow-500/10 text-yellow-500"
                                    )}>
                                        {isCompleted ? 'Done' : `+${chapter.xpReward} XP`}
                                    </span>
                                </div>

                                {/* Completion Glow Effect */}
                                {isCompleted && (
                                    <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}
