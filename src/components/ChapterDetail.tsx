import { useState } from 'react';
import type { Chapter } from '../data/syllabus';
import type { StudyTask, GameState } from '../types';
import { CheckSquare, Plus, Trash2, Calendar, FileText, Video, BookOpen, PenTool, X, Target, Info, Shield, Star } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../lib/utils';

interface ChapterDetailProps {
    chapter: Chapter;
    state: GameState;
    toggleSubTopic: (id: string) => void;
    addPlanTask: (chapterId: string, text: string, type: any) => void;
    togglePlanTask: (chapterId: string, taskId: string) => void;
    deletePlanTask: (chapterId: string, taskId: string) => void;
    updateChapterPlan: (chapterId: string, plan: any) => void;
    onClose: () => void;
}

export function ChapterDetail({
    chapter, state, toggleSubTopic, addPlanTask, togglePlanTask,
    deletePlanTask, updateChapterPlan, onClose
}: ChapterDetailProps) {
    const [newTaskText, setNewTaskText] = useState('');
    const [newTaskType, setNewTaskType] = useState<StudyTask['type']>('read');

    const plan = state.chapterPlans[chapter.id] || { chapterId: chapter.id, tasks: [] };
    const subtopics = chapter.subtopics || [];

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        addPlanTask(chapter.id, newTaskText, newTaskType);
        setNewTaskText('');
    };

    const getTaskIcon = (type: StudyTask['type']) => {
        switch (type) {
            case 'read': return <BookOpen className="w-4 h-4 text-blue-400" />;
            case 'video': return <Video className="w-4 h-4 text-red-400" />;
            case 'practice': return <PenTool className="w-4 h-4 text-yellow-400" />;
            case 'notes': return <FileText className="w-4 h-4 text-green-400" />;
            default: return <FileText className="w-4 h-4" />;
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-[#0f0f0f] border border-white/10 w-full max-w-2xl max-h-[90vh] rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 relative">

                {/* Visual Flair */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-purple-500 to-orange-500"></div>
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

                {/* Header */}
                <div className="p-8 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-inner">
                            <Target className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className={cn(
                                "text-2xl font-black uppercase tracking-tighter italic",
                                chapter.id.startsWith('t') && "font-telugu"
                            )}>
                                {chapter.name}
                            </h2>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Mission Protocol</span>
                                <span className="w-1 h-1 rounded-full bg-zinc-700"></span>
                                <span className="text-[10px] font-black text-primary uppercase tracking-widest">Active Status</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="h-10 w-10 flex items-center justify-center bg-zinc-800/50 hover:bg-zinc-800 rounded-xl transition-all border border-white/5 group"
                    >
                        <X className="w-5 h-5 text-zinc-500 group-hover:text-white transition-colors" />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-10 no-scrollbar">

                    {/* Sub-Units Mapping */}
                    <section>
                        <div className="flex items-center justify-between mb-5">
                            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Info className="w-4 h-4 text-primary" />
                                Critical Sub-Units
                            </h3>
                            <span className="text-[10px] font-black text-zinc-600 bg-white/5 px-2 py-1 rounded-lg border border-white/5 uppercase tracking-widest">
                                {subtopics.filter(s => state.completedSubTopicIds.includes(s.id)).length}/{subtopics.length} Mastered
                            </span>
                        </div>
                        {subtopics.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {subtopics.map(sub => {
                                    const isDone = state.completedSubTopicIds.includes(sub.id);
                                    const isCritical = state.settings.criticalSubTopicIds?.includes(sub.id);
                                    return (
                                        <button
                                            key={sub.id}
                                            onClick={() => toggleSubTopic(sub.id)}
                                            className={cn(
                                                "flex items-center justify-between p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden group/sub",
                                                isDone
                                                    ? "bg-primary/5 border-primary/20 text-white shadow-inner"
                                                    : (isCritical ? "bg-orange-500/5 border-orange-500/20 text-orange-100" : "bg-zinc-900/40 border-white/5 hover:border-white/10 text-zinc-400 hover:text-zinc-200")
                                            )}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={cn(
                                                    "h-6 w-6 rounded-lg flex items-center justify-center border-2 transition-all",
                                                    isDone ? "bg-primary border-primary text-white" : (isCritical ? "border-orange-500/50" : "border-zinc-700")
                                                )}>
                                                    {isDone && <CheckSquare className="w-4 h-4" />}
                                                </div>
                                                <span className={cn(
                                                    "text-sm font-bold tracking-tight",
                                                    isDone && "opacity-60",
                                                    chapter.id.startsWith('t') && "font-telugu"
                                                )}>{sub.name}</span>
                                            </div>
                                            {isCritical && !isDone && (
                                                <div className="flex items-center gap-1 text-[8px] font-black text-orange-500 bg-orange-500/10 px-1.5 py-0.5 rounded border border-orange-500/20 animate-pulse">
                                                    <Star className="w-2.5 h-2.5 fill-orange-500" />
                                                    CRITICAL
                                                </div>
                                            )}
                                            {isDone && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary/30"></div>}
                                        </button>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="p-8 bg-zinc-900/40 rounded-[2rem] border-2 border-dashed border-white/5 text-center">
                                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest leading-loose">
                                    No granular data available for this sector.<br />Focus on overall module completion.
                                </p>
                            </div>
                        )}
                    </section>

                    {/* Battle Plan Construction */}
                    <section>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-orange-500" />
                                Strategic Roadmap
                            </h3>
                            <span className="text-[10px] font-black text-orange-500 bg-orange-500/10 px-3 py-1 rounded-xl border border-orange-500/20 uppercase tracking-[0.1em]">
                                Phase {plan.tasks.filter(t => t.isCompleted).length + 1}
                            </span>
                        </div>

                        <div className="space-y-6">
                            {/* Deadline Module */}
                            <div className="space-y-4">
                                {plan.parentTargetDate && (
                                    <div className="bg-orange-500/10 p-5 rounded-3xl border border-orange-500/20 shadow-xl relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4 opacity-10">
                                            <Shield className="w-12 h-12 text-orange-500" />
                                        </div>
                                        <label className="block text-[9px] font-black text-orange-500 uppercase tracking-[0.2em] mb-2 ml-1">Parental Objective (Directive Alpha)</label>
                                        <div className="text-sm font-black text-white flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-orange-500" />
                                            {format(new Date(plan.parentTargetDate), 'PPPP')}
                                        </div>
                                        <p className="text-[10px] text-zinc-500 mt-2 font-black uppercase tracking-widest">Mandatory mission completion target assigned by parent.</p>
                                    </div>
                                )}

                                <div className="bg-zinc-900/40 p-5 rounded-3xl border border-white/5 shadow-xl">
                                    <label className="block text-[9px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2.5 ml-1">Mission Deadline (ETA)</label>
                                    <input
                                        type="datetime-local"
                                        value={plan.targetDate || ''}
                                        onChange={(e) => updateChapterPlan(chapter.id, { targetDate: e.target.value })}
                                        className="bg-black/40 border border-white/5 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 w-full text-zinc-300 font-bold uppercase tracking-widest"
                                    />
                                </div>
                            </div>

                            {/* Task Factory */}
                            <form onSubmit={handleAddTask} className="flex gap-3 bg-zinc-900/40 p-2 rounded-[1.5rem] border border-white/5">
                                <select
                                    value={newTaskType}
                                    onChange={(e) => setNewTaskType(e.target.value as any)}
                                    className="bg-zinc-800/80 border-none rounded-xl text-[10px] font-black uppercase tracking-widest pl-3 pr-8 focus:ring-0 cursor-pointer hover:bg-zinc-700 transition-colors"
                                >
                                    <option value="read">READ</option>
                                    <option value="video">VIEW</option>
                                    <option value="practice">DRILL</option>
                                    <option value="notes">NOTES</option>
                                    <option value="other">MISC</option>
                                </select>
                                <input
                                    type="text"
                                    value={newTaskText}
                                    onChange={(e) => setNewTaskText(e.target.value)}
                                    placeholder="Define new task..."
                                    className="flex-1 bg-transparent border-none px-2 py-3 text-sm font-bold focus:ring-0 placeholder:text-zinc-600"
                                />
                                <button
                                    type="submit"
                                    disabled={!newTaskText.trim()}
                                    className="bg-primary hover:bg-primary-hover text-white h-10 w-10 rounded-xl disabled:opacity-30 transition-all flex items-center justify-center shadow-lg shadow-primary/20"
                                >
                                    <Plus className="w-6 h-6" />
                                </button>
                            </form>

                            {/* Manifest */}
                            <div className="space-y-3">
                                {plan.tasks.map(task => (
                                    <div key={task.id} className="group flex items-center gap-4 p-4 bg-zinc-900/20 rounded-2xl border border-white/[0.03] hover:border-white/10 transition-all shadow-md">
                                        <button
                                            onClick={() => togglePlanTask(chapter.id, task.id)}
                                            className={cn(
                                                "h-6 w-6 rounded-lg flex items-center justify-center transition-all",
                                                task.isCompleted ? "bg-green-500 scale-110" : "bg-zinc-800 hover:bg-zinc-700"
                                            )}
                                        >
                                            {task.isCompleted ? <CheckSquare className="w-4 h-4 text-white" /> : <div className="h-2 w-2 rounded-full bg-zinc-600"></div>}
                                        </button>
                                        <div className="flex items-center gap-3 flex-1">
                                            {getTaskIcon(task.type)}
                                            <span className={cn("text-sm font-bold tracking-tight uppercase", task.isCompleted ? "text-zinc-600 line-through" : "text-zinc-300")}>
                                                {task.text}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => deletePlanTask(chapter.id, task.id)}
                                            className="opacity-0 group-hover:opacity-100 h-8 w-8 flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Field Notes Area */}
                    <section className="pb-8">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3 block ml-1">Tactical Observations</label>
                        <div className="relative group">
                            <textarea
                                value={plan.notes || ''}
                                onChange={(e) => updateChapterPlan(chapter.id, { notes: e.target.value })}
                                placeholder="Capture key insights or formulas..."
                                className="w-full h-40 bg-zinc-900/40 border border-white/5 rounded-3xl p-5 text-sm font-medium focus:outline-none focus:border-primary/50 transition-all resize-none shadow-inner text-zinc-300"
                            />
                            <div className="absolute top-4 right-4 text-zinc-700 group-hover:text-primary/30 transition-colors">
                                <PenTool className="w-5 h-5" />
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </div>
    );
}
