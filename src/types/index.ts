export type UserRole = 'student' | 'parent';

export interface User {
    role: UserRole;
    name: string;
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

export type SubjectId = 'math' | 'science' | 'social' | 'english' | 'telugu';

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
    notes?: string;
}

export interface Settings {
    examDate: string;
    studentName: string;
}
