import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { StudyTask, ChapterPlan, Settings } from '../types';
import { syllabusData } from '../data/syllabus';

interface GameState {
    xp: number;
    level: number;
    completedChapterIds: string[];
    completedSubTopicIds: string[];
    completedPracticePaperIds: string[]; // NEW
    streak: number;
    lastLoginDate: string;
    settings: Settings;
    chapterPlans: Record<string, ChapterPlan>;
}

const STORAGE_KEY = 'study-quest-state-v3'; // Bumped version for new schema

const DEFAULT_EXAM_DATE = '2026-02-17T00:00:00.000Z';

const INITIAL_STATE: GameState = {
    xp: 0,
    level: 1,
    completedChapterIds: [],
    completedSubTopicIds: [],
    completedPracticePaperIds: [],
    streak: 0,
    lastLoginDate: new Date().toISOString(),
    settings: {
        examDate: DEFAULT_EXAM_DATE,
        studentName: 'Scholar'
    },
    chapterPlans: {}
};

export function useGameState() {
    const [state, setState] = useState<GameState>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                return {
                    ...INITIAL_STATE,
                    ...parsed,
                    settings: { ...INITIAL_STATE.settings, ...(parsed.settings || {}) },
                    chapterPlans: parsed.chapterPlans || {}
                };
            } catch (e) {
                return INITIAL_STATE;
            }
        }
        return INITIAL_STATE;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    useEffect(() => {
        const lastLoginStr = state.lastLoginDate;
        if (!lastLoginStr) return;

        const lastLogin = new Date(lastLoginStr);
        const today = new Date();
        const lastDate = new Date(lastLogin.getFullYear(), lastLogin.getMonth(), lastLogin.getDate());
        const currDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const diffTime = currDate.getTime() - lastDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            setState(prev => ({ ...prev, streak: prev.streak + 1, lastLoginDate: today.toISOString() }));
        } else if (diffDays > 1) {
            setState(prev => ({ ...prev, streak: 1, lastLoginDate: today.toISOString() }));
        } else if (diffDays === 0) {
            // Already logged in today
        } else {
            // Clock skew?
            setState(prev => ({ ...prev, lastLoginDate: today.toISOString() }));
        }
    }, []);

    const calculateLevel = (xp: number) => 1 + Math.floor(xp / 500);

    const getNextLevelXp = (level: number) => level * 500;

    const triggerConfetti = (major: boolean) => {
        if (major) {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#a855f7', '#ec4899', '#3b82f6']
            });
        } else {
            confetti({
                particleCount: 50,
                spread: 50,
                origin: { y: 0.7 },
                colors: ['#a855f7', '#ec4899']
            });
        }
    }

    const completeChapter = (chapterId: string, xpReward: number) => {
        if (state.completedChapterIds.includes(chapterId)) return;

        // Find subtopics for this chapter to mark them as complete too
        let subTopicIds: string[] = [];
        for (const subject of syllabusData) {
            const chapter = subject.chapters.find(c => c.id === chapterId);
            if (chapter && chapter.subtopics) {
                subTopicIds = chapter.subtopics.map(st => st.id);
                break;
            }
        }

        setState(prev => {
            const newCompletedSubTopicIds = Array.from(new Set([...prev.completedSubTopicIds, ...subTopicIds]));
            const newXp = prev.xp + xpReward;
            const newLevel = calculateLevel(newXp);
            const levelUp = newLevel > prev.level;

            triggerConfetti(levelUp || true); // Always major for chapter completion

            return {
                ...prev,
                completedChapterIds: [...prev.completedChapterIds, chapterId],
                completedSubTopicIds: newCompletedSubTopicIds,
                xp: newXp,
                level: newLevel
            };
        });
    };

    const uncompleteChapter = (chapterId: string, xpReward: number) => {
        if (!state.completedChapterIds.includes(chapterId)) return;

        // Find subtopics to remove them as well
        let subTopicIds: string[] = [];
        for (const subject of syllabusData) {
            const chapter = subject.chapters.find(c => c.id === chapterId);
            if (chapter && chapter.subtopics) {
                subTopicIds = chapter.subtopics.map(st => st.id);
                break;
            }
        }

        setState(prev => {
            const newXp = Math.max(0, prev.xp - xpReward);
            const newCompletedSubTopicIds = prev.completedSubTopicIds.filter(id => !subTopicIds.includes(id));

            return {
                ...prev,
                completedChapterIds: prev.completedChapterIds.filter(id => id !== chapterId),
                completedSubTopicIds: newCompletedSubTopicIds,
                xp: newXp,
                level: calculateLevel(newXp)
            }
        })
    }

    const toggleSubTopic = (subTopicId: string) => {
        const isCompleted = state.completedSubTopicIds.includes(subTopicId);
        const subTopicXp = 20;

        setState(prev => {
            let newIds = [...prev.completedSubTopicIds];
            let newXp = prev.xp;
            let newCompletedChapterIds = [...prev.completedChapterIds];

            if (isCompleted) {
                newIds = newIds.filter(id => id !== subTopicId);
                newXp = Math.max(0, prev.xp - subTopicXp);
            } else {
                newIds.push(subTopicId);
                newXp = prev.xp + subTopicXp;
                triggerConfetti(false);
            }

            // Find parent chapter
            let parentChapter = null;
            for (const subject of syllabusData) {
                for (const chapter of subject.chapters) {
                    if (chapter.subtopics?.some(st => st.id === subTopicId)) {
                        parentChapter = chapter;
                        break;
                    }
                }
                if (parentChapter) break;
            }

            // Sync with parent chapter
            if (parentChapter && parentChapter.subtopics) {
                const allSubtopicsCompleted = parentChapter.subtopics.every(st =>
                    newIds.includes(st.id)
                );

                if (allSubtopicsCompleted) {
                    if (!newCompletedChapterIds.includes(parentChapter.id)) {
                        newCompletedChapterIds.push(parentChapter.id);
                        newXp += parentChapter.xpReward;
                        triggerConfetti(true);
                    }
                } else {
                    if (newCompletedChapterIds.includes(parentChapter.id)) {
                        newCompletedChapterIds = newCompletedChapterIds.filter(id => id !== parentChapter.id);
                        newXp = Math.max(0, newXp - parentChapter.xpReward);
                    }
                }
            }

            return {
                ...prev,
                completedSubTopicIds: newIds,
                completedChapterIds: newCompletedChapterIds,
                xp: newXp,
                level: calculateLevel(newXp)
            }
        });
    };

    const completePracticePaper = (paperId: string) => {
        if (state.completedPracticePaperIds.includes(paperId)) return;
        const reward = 200; // Bonus XP for practice papers

        setState(prev => {
            const newXp = prev.xp + reward;
            const newLevel = calculateLevel(newXp);
            triggerConfetti(newLevel > prev.level);

            return {
                ...prev,
                completedPracticePaperIds: [...prev.completedPracticePaperIds, paperId],
                xp: newXp,
                level: newLevel
            }
        });
    }

    const updateSettings = (newSettings: Partial<Settings>) => {
        setState(prev => ({
            ...prev,
            settings: { ...prev.settings, ...newSettings }
        }));
    };

    const updateChapterPlan = (chapterId: string, plan: Partial<ChapterPlan>) => {
        setState(prev => {
            const currentPlan = prev.chapterPlans[chapterId] || { chapterId, tasks: [] };
            return {
                ...prev,
                chapterPlans: {
                    ...prev.chapterPlans,
                    [chapterId]: { ...currentPlan, ...plan }
                }
            };
        });
    };

    const addPlanTask = (chapterId: string, taskText: string, type: StudyTask['type']) => {
        const newTask: StudyTask = {
            id: crypto.randomUUID(),
            text: taskText,
            isCompleted: false,
            type
        };

        setState(prev => {
            const currentPlan = prev.chapterPlans[chapterId] || { chapterId, tasks: [] };
            return {
                ...prev,
                chapterPlans: {
                    ...prev.chapterPlans,
                    [chapterId]: {
                        ...currentPlan,
                        tasks: [...currentPlan.tasks, newTask]
                    }
                }
            }
        });
    };

    const togglePlanTask = (chapterId: string, taskId: string) => {
        setState(prev => {
            const currentPlan = prev.chapterPlans[chapterId];
            if (!currentPlan) return prev;

            const newTasks = currentPlan.tasks.map(t =>
                t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t
            );

            return {
                ...prev,
                chapterPlans: {
                    ...prev.chapterPlans,
                    [chapterId]: { ...currentPlan, tasks: newTasks }
                }
            }
        });
    };

    const deletePlanTask = (chapterId: string, taskId: string) => {
        setState(prev => {
            const currentPlan = prev.chapterPlans[chapterId];
            if (!currentPlan) return prev;
            return {
                ...prev,
                chapterPlans: {
                    ...prev.chapterPlans,
                    [chapterId]: { ...currentPlan, tasks: currentPlan.tasks.filter(t => t.id !== taskId) }
                }
            }
        });
    };

    return {
        state,
        completeChapter,
        uncompleteChapter,
        getNextLevelXp,
        toggleSubTopic,
        completePracticePaper,
        updateSettings,
        updateChapterPlan,
        addPlanTask,
        togglePlanTask,
        deletePlanTask
    };
}
