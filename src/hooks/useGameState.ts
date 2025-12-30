import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import type { ChapterPlan, Settings } from '../types';
import { syllabusData } from '../data/syllabus';

interface GameState {
    xp: number;
    level: number;
    completedChapterIds: string[];
    completedSubTopicIds: string[];
    completedPracticePaperIds: string[];
    streak: number;
    lastActiveDate: string;
    settings: Settings;
    chapterPlans: Record<string, ChapterPlan>;
}

const STORAGE_KEY = 'study-quest-state-v4';

const INITIAL_STATE: GameState = {
    xp: 0,
    level: 1,
    completedChapterIds: [],
    completedSubTopicIds: [],
    completedPracticePaperIds: [],
    streak: 0,
    lastActiveDate: new Date().toISOString(), // Changed from lastLoginDate
    settings: {
        examDate: '2026-02-17T09:00:00', // Updated examDate to 2026
        grade: '10',
        statePreference: 'TS' // Added statePreference
    },
    chapterPlans: {}
};

export function useGameState(userId?: string, initialSettings?: Partial<Settings>) {
    const storageKey = userId ? `study-quest-state-${userId}` : STORAGE_KEY;

    const loadState = () => {
        const stored = localStorage.getItem(storageKey);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (!parsed.settings) parsed.settings = {};

                return {
                    ...INITIAL_STATE,
                    ...parsed,
                    settings: {
                        ...INITIAL_STATE.settings,
                        ...(parsed.settings || {}),
                        ...(initialSettings || {}) // initialSettings passed from App (based on user profile) should override stored if they differ (e.g. after a profile edit or fresh login)
                    },
                    chapterPlans: parsed.chapterPlans || {}
                };
            } catch (e) {
                return INITIAL_STATE;
            }
        }

        return {
            ...INITIAL_STATE,
            settings: {
                ...INITIAL_STATE.settings,
                ...initialSettings
            }
        };
    };

    const [state, setState] = useState<GameState>(loadState);

    // Sync state when userId/storageKey changes
    useEffect(() => {
        setState(loadState());
    }, [storageKey]);

    useEffect(() => {
        if (!userId && storageKey === STORAGE_KEY) return; // Don't save default state to global key if possible
        localStorage.setItem(storageKey, JSON.stringify(state));
    }, [state, storageKey, userId]);

    useEffect(() => {
        const lastActiveDateStr = state.lastActiveDate;
        if (!lastActiveDateStr) return;

        const lastActive = new Date(lastActiveDateStr);
        const today = new Date();
        const lastDate = new Date(lastActive.getFullYear(), lastActive.getMonth(), lastActive.getDate());
        const currDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        const diffTime = currDate.getTime() - lastDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            setState(prev => ({ ...prev, streak: prev.streak + 1, lastActiveDate: today.toISOString() }));
        } else if (diffDays > 1) {
            setState(prev => ({ ...prev, streak: 1, lastActiveDate: today.toISOString() }));
        }
    }, [state.lastActiveDate]);

    const calculateLevel = (xp: number) => 1 + Math.floor(xp / 500);
    const getNextLevelXp = (level: number) => level * 500;

    const triggerConfetti = (major: boolean) => {
        if (major) {
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#a855f7', '#ec4899', '#3b82f6'] });
        } else {
            confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 }, colors: ['#a855f7', '#ec4899'] });
        }
    }

    const getCurrentSyllabus = () => {
        const baseSyllabus = syllabusData[state.settings.grade] || syllabusData["10"];
        return baseSyllabus.map(subject => ({
            ...subject,
            chapters: [...subject.chapters, ...(state.settings.customChapters?.[subject.id] || [])]
        }));
    };

    const completeChapter = (chapterId: string, xpReward: number) => {
        if (state.completedChapterIds.includes(chapterId)) return;

        let subTopicIds: string[] = [];
        const currentSyllabus = getCurrentSyllabus();
        for (const subject of currentSyllabus) {
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
            triggerConfetti(true);
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
        let subTopicIds: string[] = [];
        const currentSyllabus = getCurrentSyllabus();
        for (const subject of currentSyllabus) {
            const chapter = subject.chapters.find(c => c.id === chapterId);
            if (chapter && chapter.subtopics) {
                subTopicIds = chapter.subtopics.map(st => st.id);
                break;
            }
        }
        setState(prev => {
            const newXp = Math.max(0, prev.xp - xpReward);
            return {
                ...prev,
                completedChapterIds: prev.completedChapterIds.filter(id => id !== chapterId),
                completedSubTopicIds: prev.completedSubTopicIds.filter(id => !subTopicIds.includes(id)),
                xp: newXp,
                level: calculateLevel(newXp)
            }
        })
    }

    const toggleSubTopic = (subTopicId: string) => {
        const isCompleted = state.completedSubTopicIds.includes(subTopicId);
        const subTopicXp = 20;
        const currentSyllabus = getCurrentSyllabus();

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

            let parentChapter = null;
            for (const subject of currentSyllabus) {
                for (const chapter of subject.chapters) {
                    if (chapter.subtopics?.some(st => st.id === subTopicId)) {
                        parentChapter = chapter; break;
                    }
                }
                if (parentChapter) break;
            }

            if (parentChapter && parentChapter.subtopics) {
                const allSubtopicsCompleted = parentChapter.subtopics.every(st => newIds.includes(st.id));
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

            return { ...prev, completedSubTopicIds: newIds, completedChapterIds: newCompletedChapterIds, xp: newXp, level: calculateLevel(newXp) }
        });
    };

    const completePracticePaper = (paperId: string) => {
        if (state.completedPracticePaperIds.includes(paperId)) return;
        const reward = 200;
        setState(prev => {
            const newXp = prev.xp + reward;
            const newLevel = calculateLevel(newXp);
            triggerConfetti(newLevel > prev.level);
            return { ...prev, completedPracticePaperIds: [...prev.completedPracticePaperIds, paperId], xp: newXp, level: newLevel }
        });
    }

    const updateSettings = (newSettings: Partial<Settings>) => {
        setState(prev => ({ ...prev, settings: { ...prev.settings, ...newSettings } }));
    };

    const updateChapterPlan = (chapterId: string, plan: Partial<ChapterPlan>) => {
        setState(prev => {
            const currentPlan = prev.chapterPlans[chapterId] || { chapterId, tasks: [] };
            return { ...prev, chapterPlans: { ...prev.chapterPlans, [chapterId]: { ...currentPlan, ...plan } } };
        });
    };

    const addPlanTask = (chapterId: string, taskText: string, type: any) => {
        const newTask = { id: crypto.randomUUID(), text: taskText, isCompleted: false, type };
        setState(prev => {
            const currentPlan = prev.chapterPlans[chapterId] || { chapterId, tasks: [] };
            return { ...prev, chapterPlans: { ...prev.chapterPlans, [chapterId]: { ...currentPlan, tasks: [...currentPlan.tasks, newTask] } } };
        });
    };

    const togglePlanTask = (chapterId: string, taskId: string) => {
        setState(prev => {
            const currentPlan = prev.chapterPlans[chapterId];
            if (!currentPlan) return prev;
            return { ...prev, chapterPlans: { ...prev.chapterPlans, [chapterId]: { ...currentPlan, tasks: currentPlan.tasks.map(t => t.id === taskId ? { ...t, isCompleted: !t.isCompleted } : t) } } };
        });
    };

    const deletePlanTask = (chapterId: string, taskId: string) => {
        setState(prev => {
            const currentPlan = prev.chapterPlans[chapterId];
            if (!currentPlan) return prev;
            return { ...prev, chapterPlans: { ...prev.chapterPlans, [chapterId]: { ...currentPlan, tasks: currentPlan.tasks.filter(t => t.id !== taskId) } } };
        });
    };

    const addCustomChapter = (subjectId: string, name: string) => {
        const newChapter = {
            id: `custom-${crypto.randomUUID()}`,
            name,
            isCompleted: false,
            xpReward: 150,
            subtopics: []
        };
        setState(prev => ({
            ...prev,
            settings: {
                ...prev.settings,
                customChapters: {
                    ...prev.settings.customChapters,
                    [subjectId]: [...(prev.settings.customChapters?.[subjectId] || []), newChapter]
                }
            }
        }));
    };

    const deleteCustomChapter = (subjectId: string, chapterId: string) => {
        setState(prev => ({
            ...prev,
            settings: {
                ...prev.settings,
                customChapters: {
                    ...prev.settings.customChapters,
                    [subjectId]: (prev.settings.customChapters?.[subjectId] || []).filter(c => c.id !== chapterId)
                }
            }
        }));
    };

    const toggleCriticalSubTopic = (subTopicId: string) => {
        setState(prev => {
            const current = prev.settings.criticalSubTopicIds || [];
            const isCritical = current.includes(subTopicId);
            return {
                ...prev,
                settings: {
                    ...prev.settings,
                    criticalSubTopicIds: isCritical
                        ? current.filter(id => id !== subTopicId)
                        : [...current, subTopicId]
                }
            };
        });
    };

    const addCustomSubTopic = (chapterId: string, name: string) => {
        const newSubTopic = { id: `custom-st-${crypto.randomUUID()}`, name };
        setState(prev => ({
            ...prev,
            settings: {
                ...prev.settings,
                customSubTopics: {
                    ...prev.settings.customSubTopics,
                    [chapterId]: [...(prev.settings.customSubTopics?.[chapterId] || []), newSubTopic]
                },
                criticalSubTopicIds: [...(prev.settings.criticalSubTopicIds || []), newSubTopic.id] // Mark as critical by default as requested
            }
        }));
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
        deletePlanTask,
        addCustomChapter,
        deleteCustomChapter,
        toggleCriticalSubTopic,
        addCustomSubTopic
    };
}
