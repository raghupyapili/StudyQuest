export type UserRole = 'student' | 'parent';

export interface StudyNotification {
    id: string;
    type: 'completion' | 'reminder' | 'summary';
    message: string;
    timestamp: string;
    isRead: boolean;
    childName?: string;
}

export interface User {
    id: string;
    username: string;
    password: string;
    role: UserRole;
    name: string;
    email?: string;
    grade?: string;
    avatar?: string;
    secondLanguage?: 'Hindi' | 'Telugu';
    statePreference?: 'TS' | 'AP';
    childIds?: string[];
    parentId?: string;
    notificationFrequency?: 'Daily' | 'Weekly' | 'Monthly';
    notifications?: StudyNotification[];
    themePreference?: 'dark' | 'light';
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

export type SubjectId = 'math' | 'science' | 'social' | 'english' | 'telugu' | 'hindi' | 'sanskrit' | 'computer' | 'ai';

export interface StudyTask {
    id: string;
    text: string;
    isCompleted: boolean;
    type: 'read' | 'video' | 'practice' | 'notes' | 'other';
}

export interface ChapterPlan {
    chapterId: string;
    tasks: StudyTask[];
    targetDate?: string;
    parentTargetDate?: string;
    notes?: string;
}

export interface Settings {
    examDate: string;
    grade: string;
    statePreference: 'TS' | 'AP';
    secondLanguage?: 'Hindi' | 'Telugu';
    customChapters?: Record<string, { id: string; name: string; isCompleted: boolean; xpReward: number; subtopics: any[] }[]>;
    criticalSubTopicIds?: string[];
    customSubTopics?: Record<string, { id: string; name: string }[]>;
}

export interface GameState {
    xp: number;
    level: number;
    streak: number;
    completedChapterIds: string[];
    completedSubTopicIds: string[];
    completedPracticePaperIds: string[];
    settings: Settings;
    chapterPlans: Record<string, ChapterPlan>;
}
