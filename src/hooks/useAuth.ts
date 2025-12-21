import { useState, useEffect } from 'react';
import type { AuthState } from '../types';

const AUTH_STORAGE_KEY = 'study-quest-auth';

// Simple credentials - in production, use proper authentication
const CREDENTIALS = {
    student: { password: 'study2025', name: 'Student' },
    parent: { password: 'parent2025', name: 'Parent' }
};

export function useAuth() {
    const [authState, setAuthState] = useState<AuthState>(() => {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
            try {
                return JSON.parse(stored);
            } catch {
                return { isAuthenticated: false, user: null };
            }
        }
        return { isAuthenticated: false, user: null };
    });

    useEffect(() => {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    }, [authState]);

    const login = (role: 'student' | 'parent', password: string): boolean => {
        const credential = CREDENTIALS[role];
        if (credential.password === password) {
            setAuthState({
                isAuthenticated: true,
                user: { role, name: credential.name }
            });
            return true;
        }
        return false;
    };

    const logout = () => {
        setAuthState({ isAuthenticated: false, user: null });
    };

    return {
        ...authState,
        login,
        logout
    };
}
