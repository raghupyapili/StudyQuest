import { useState } from 'react';
import type { Chapter } from '../data/syllabus';
import type { StudyTask } from '../types';
import { CheckSquare, Square, Plus, Trash2, Calendar, FileText, Video, BookOpen, PenTool } from 'lucide-react';
import { cn } from '../lib/utils';
import { useGameState } from '../hooks/useGameState';

interface ChapterDetailProps {
    chapter: Chapter;
    onClose: () => void;
}

export function ChapterDetail({ chapter, onClose }: ChapterDetailProps) {
    const { state, toggleSubTopic, addPlanTask, togglePlanTask, deletePlanTask, updateChapterPlan } = useGameState();
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-zinc-900 border border-zinc-800 w-full max-w-2xl max-h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="p-6 border-b border-zinc-800 bg-zinc-900/50 flex items-start justify-between">
                    <div>
                        <h2 className={cn(
                            "text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400",
                            chapter.id.startsWith('t') && "font-telugu"
                        )}>
                            {chapter.name}
                        </h2>
                        <p className="text-muted-foreground text-sm mt-1">
                            Planning & Progress
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                        <span className="sr-only">Close</span>
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-8">

                    {/* Subtopics Section */}
                    <section>
                        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                            <CheckSquare className="w-5 h-5 text-primary" />
                            Sub-Topics
                        </h3>
                        {subtopics.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {subtopics.map(sub => {
                                    const isDone = state.completedSubTopicIds.includes(sub.id);
                                    return (
                                        <button
                                            key={sub.id}
                                            onClick={() => toggleSubTopic(sub.id)}
                                            className={cn(
                                                "flex items-center gap-3 p-3 rounded-lg border text-left transition-all",
                                                isDone
                                                    ? "bg-primary/10 border-primary/50 text-foreground"
                                                    : "bg-zinc-800/50 border-zinc-800 hover:bg-zinc-800 text-muted-foreground"
                                            )}
                                        >
                                            {isDone ? <CheckSquare className="w-4 h-4 text-primary shrink-0" /> : <Square className="w-4 h-4 shrink-0" />}
                                            <span className={cn(
                                                "text-sm",
                                                isDone && "line-through opacity-70",
                                                chapter.id.startsWith('t') && "font-telugu"
                                            )}>{sub.name}</span>
                                        </button>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="p-4 bg-zinc-800/30 rounded-lg text-sm text-muted-foreground text-center">
                                No specific sub-topics listed. Mark the chapter as complete when done.
                            </div>
                        )}
                    </section>

                    {/* Study Plan Section */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-orange-500" />
                                Study Plan
                            </h3>
                            <span className="text-xs text-muted-foreground bg-zinc-800 px-2 py-1 rounded">
                                {plan.tasks.filter(t => t.isCompleted).length}/{plan.tasks.length} Done
                            </span>
                        </div>

                        {/* Target Date Input */}
                        <div className="mb-4 bg-zinc-800/30 p-3 rounded-lg border border-zinc-800/50">
                            <label className="block text-xs font-medium mb-1.5 text-muted-foreground uppercase tracking-wider">Target Completion</label>
                            <input
                                type="datetime-local"
                                value={plan.targetDate || ''}
                                onChange={(e) => updateChapterPlan(chapter.id, { targetDate: e.target.value })}
                                className="bg-zinc-900 border-zinc-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full sm:w-auto text-zinc-200"
                            />
                        </div>

                        {/* Add Task Form */}
                        <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
                            <select
                                value={newTaskType}
                                onChange={(e) => setNewTaskType(e.target.value as any)}
                                className="bg-zinc-800 border-zinc-700 rounded-lg text-sm px-3 focus:outline-none focus:ring-1 focus:ring-primary"
                            >
                                <option value="read">Read</option>
                                <option value="video">Video</option>
                                <option value="practice">Practice</option>
                                <option value="notes">Notes</option>
                                <option value="other">Other</option>
                            </select>
                            <input
                                type="text"
                                value={newTaskText}
                                onChange={(e) => setNewTaskText(e.target.value)}
                                placeholder="Add a task (e.g., Read Pages 20-25)..."
                                className="flex-1 bg-zinc-800 border-zinc-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                            />
                            <button
                                type="submit"
                                disabled={!newTaskText.trim()}
                                className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg disabled:opacity-50 transition-colors"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </form>

                        {/* Task List */}
                        <div className="space-y-2">
                            {plan.tasks.map(task => (
                                <div key={task.id} className="group flex items-center gap-3 p-3 bg-zinc-800/30 rounded-lg border border-transparent hover:border-zinc-700 transition-colors">
                                    <button onClick={() => togglePlanTask(chapter.id, task.id)}>
                                        {task.isCompleted
                                            ? <CheckSquare className="w-5 h-5 text-green-500" />
                                            : <Square className="w-5 h-5 text-zinc-500 hover:text-foreground" />
                                        }
                                    </button>
                                    <div className="flex items-center gap-2 flex-1">
                                        {getTaskIcon(task.type)}
                                        <span className={cn("text-sm", task.isCompleted && "line-through text-muted-foreground")}>
                                            {task.text}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => deletePlanTask(chapter.id, task.id)}
                                        className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-red-400 transition-opacity p-1"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            {plan.tasks.length === 0 && (
                                <div className="text-center py-8 border border-dashed border-zinc-800 rounded-lg text-muted-foreground text-sm">
                                    Create your battle plan for this chapter!
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Notes Section */}
                    <section>
                        <label className="block text-sm font-medium mb-2 text-muted-foreground">Quick Notes</label>
                        <textarea
                            value={plan.notes || ''}
                            onChange={(e) => updateChapterPlan(chapter.id, { notes: e.target.value })}
                            placeholder="Jot down formulas or key points..."
                            className="w-full h-32 bg-zinc-800/50 border border-zinc-800 rounded-lg p-3 text-sm focus:outline-none focus:border-primary resize-none"
                        />
                    </section>

                </div>
            </div>
        </div>
    );
}
