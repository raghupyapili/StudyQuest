import { useState } from 'react';
import type { Subject } from '../data/syllabus';
import { CheckCircle2, Circle, Sparkles, BookOpen, Plus, Trash2, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface SubjectViewProps {
    subject: Subject;
    completedIds: string[];
    onToggleChapter: (id: string, reward: number) => void;
    onSelectChapter: (chapter: Subject['chapters'][number]) => void;
    onAddCustomChapter?: (subjectId: string, name: string) => void;
    onDeleteCustomChapter?: (subjectId: string, chapterId: string) => void;
}

export function SubjectView({
    subject,
    completedIds,
    onToggleChapter,
    onSelectChapter,
    onAddCustomChapter,
    onDeleteCustomChapter
}: SubjectViewProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newModuleName, setNewModuleName] = useState('');

    const completedCount = subject.chapters.filter(c => completedIds.includes(c.id)).length;
    const progress = subject.chapters.length === 0 ? 0 : Math.round((completedCount / subject.chapters.length) * 100);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
            <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                    <div className={cn("h-16 w-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl rotate-3 group-hover:rotate-0 transition-transform", subject.color.replace('text-', 'bg-').replace('500', '500/10'))}>
                        <BookOpen className={cn("w-8 h-8", subject.color)} />
                    </div>
                    <div>
                        <h1 className={cn(
                            "text-4xl font-black uppercase tracking-tighter italic",
                            subject.color,
                            subject.id === 'telugu' && "font-telugu"
                        )}>
                            {subject.name}
                        </h1>
                        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mt-1">Specialization Path • {subject.chapters.length} Modules</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="flex items-baseline justify-end gap-2">
                        <span className="text-4xl font-black font-outfit tracking-tighter">{progress}%</span>
                        <span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Mastery</span>
                    </div>
                </div>
            </header>

            {/* Premium Progress Bar */}
            <div className="w-full bg-zinc-900/50 h-3 rounded-full mb-12 overflow-hidden border border-white/5 relative shadow-inner">
                <div
                    className={cn("h-full transition-all duration-1000 relative shadow-[0_0_20px_rgba(0,0,0,0.5)]", subject.color.replace('text-', 'bg-'))}
                    style={{ width: `${progress}%` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {subject.chapters.map((chapter) => {
                    const isCompleted = completedIds.includes(chapter.id);
                    const isCustom = chapter.id.startsWith('custom-');
                    return (
                        <div
                            key={chapter.id}
                            className={cn(
                                "group relative overflow-hidden p-6 rounded-[2rem] border-2 transition-all duration-300 flex flex-col justify-between h-48",
                                isCompleted
                                    ? "bg-zinc-900/20 border-green-500/20 shadow-inner"
                                    : "bg-zinc-900/40 border-white/5 hover:border-white/10 hover:bg-zinc-900/60 shadow-xl"
                            )}
                        >
                            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Sparkles className="w-24 h-24" />
                            </div>

                            <div className="flex justify-between items-start relative z-10">
                                <div
                                    className="cursor-pointer group/btn"
                                    onClick={(e) => { e.stopPropagation(); onToggleChapter(chapter.id, chapter.xpReward); }}
                                >
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                                        isCompleted
                                            ? "bg-green-500 border-green-400 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                                            : "border-zinc-700 text-zinc-600 group-hover:border-zinc-500 group-hover:text-zinc-400"
                                    )}>
                                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    {isCustom && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onDeleteCustomChapter?.(subject.id, chapter.id); }}
                                            className="p-1.5 rounded-lg bg-red-500/10 text-red-500 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                    <span className={cn(
                                        "text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-xl border",
                                        isCompleted ? "bg-zinc-800 text-zinc-500 border-white/5" : "bg-yellow-500/10 text-yellow-500 border-yellow-500/10"
                                    )}>
                                        {isCompleted ? 'Module Deciphered' : `+${chapter.xpReward} XP Reward`}
                                    </span>
                                </div>
                            </div>

                            <div className="relative z-10 cursor-pointer" onClick={() => onSelectChapter(chapter)}>
                                <h3 className={cn(
                                    "text-xl font-black tracking-tight leading-tight uppercase transition-all duration-300 group-hover:translate-x-1",
                                    isCompleted ? "text-zinc-500 line-through decoration-zinc-700/50" : "text-zinc-100",
                                    subject.id === 'telugu' && "font-telugu"
                                )}>
                                    {chapter.name}
                                </h3>
                                <div className="text-[10px] text-zinc-500 mt-2 font-black uppercase tracking-[0.2em] flex items-center gap-2">
                                    {chapter.subtopics?.length ? `${chapter.subtopics.length} SUB-UNITS` : 'SOLO MODULE'}
                                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                                    STRATEGIZE MISSION
                                </div>
                            </div>

                            {/* Hover Status Bar */}
                            <div className={cn(
                                "absolute bottom-0 left-0 h-1 transition-all duration-500",
                                isCompleted ? "bg-green-500 w-full" : "bg-primary w-0 group-hover:w-full"
                            )}></div>
                        </div>
                    );
                })}

                {/* Module Injector */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative overflow-hidden p-6 rounded-[2rem] border-2 border-dashed border-white/10 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-primary/50 transition-all flex flex-col items-center justify-center gap-3 h-48"
                >
                    <div className="p-4 bg-zinc-800 rounded-2xl group-hover:bg-primary/10 transition-colors">
                        <Plus className="w-8 h-8 text-zinc-500 group-hover:text-primary" />
                    </div>
                    <div className="text-center">
                        <div className="text-sm font-black text-white uppercase tracking-tight">Inject Module</div>
                        <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Expansion Protocol</div>
                    </div>
                </button>
            </div>

            {/* Injection Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-zinc-900 border border-white/10 p-8 rounded-[2.5rem] max-w-md w-full space-y-6 shadow-2xl relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                        <div>
                            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Inject Syllabus Module</h3>
                            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Adding intelligence to {subject.name} database.</p>
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
                                if (newModuleName.trim()) {
                                    onAddCustomChapter?.(subject.id, newModuleName.trim());
                                    setNewModuleName('');
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
