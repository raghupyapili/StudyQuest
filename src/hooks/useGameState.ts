import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { StudyTask, ChapterPlan, Settings } from '../types';
import { syllabusData } from '../data/syllabus';

interface GameState {
    xp: number;
    level: number;
    completedChapterIds: string[];
    completedSubTopicIds: string[];
    streak: number;
    lastLoginDate: string;
    settings: Settings;
    chapterPlans: Record<string, ChapterPlan>; // chapterId -> Plan
}

const STORAGE_KEY = 'study-quest-state-v2';

// 2026-02-17
const DEFAULT_EXAM_DATE = '2026-02-17T00:00:00.000Z';

const INITIAL_STATE: GameState = {
    xp: 0,
    level: 1,
    completedChapterIds: [],
    completedSubTopicIds: [],
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
            const parsed = JSON.parse(stored);
            // Migration support: add new fields if missing
            return {
                ...INITIAL_STATE,
                ...parsed,
                settings: { ...INITIAL_STATE.settings, ...(parsed.settings || {}) },
                chapterPlans: parsed.chapterPlans || {}
            };
        }
        return INITIAL_STATE;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    useEffect(() => {
        const lastLogin = new Date(state.lastLoginDate);
        const today = new Date();
        const lastDate = new Date(lastLogin.getFullYear(), lastLogin.getMonth(), lastLogin.getDate());
        const currDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const diffTime = Math.abs(currDate.getTime() - lastDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            setState(prev => ({ ...prev, streak: prev.streak + 1, lastLoginDate: today.toISOString() }));
        } else if (diffDays > 1) {
            setState(prev => ({ ...prev, streak: 1, lastLoginDate: today.toISOString() }));
        } else {
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

        setState(prev => {
            const newXp = prev.xp + xpReward;
            const newLevel = calculateLevel(newXp);
            const levelUp = newLevel > prev.level;

            triggerConfetti(levelUp);

            return {
                ...prev,
                completedChapterIds: [...prev.completedChapterIds, chapterId],
                xp: newXp,
                level: newLevel
            };
        });
    };

    const uncompleteChapter = (chapterId: string, xpReward: number) => {
        if (!state.completedChapterIds.includes(chapterId)) return;
        setState(prev => {
            const newXp = Math.max(0, prev.xp - xpReward);
            return {
                ...prev,
                completedChapterIds: prev.completedChapterIds.filter(id => id !== chapterId),
                xp: newXp,
                level: calculateLevel(newXp)
            }
        })
    }

    const toggleSubTopic = (subTopicId: string) => {
        const isCompleted = state.completedSubTopicIds.includes(subTopicId);
        const xpValue = 20; // Fixed small XP for subtopics

        setState(prev => {
            let newIds = [...prev.completedSubTopicIds];
            let newXp = prev.xp;
            let newCompletedChapterIds = [...prev.completedChapterIds];

            if (isCompleted) {
                newIds = newIds.filter(id => id !== subTopicId);
                newXp = Math.max(0, prev.xp - xpValue);
            } else {
                newIds.push(subTopicId);
                newXp = prev.xp + xpValue;
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

            // Check completion status of parent chapter
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
        updateSettings,
        updateChapterPlan,
        addPlanTask,
        togglePlanTask,
        deletePlanTask
    };
}
