import { useState, useEffect } from 'react';
import type { AuthState, User, StudyNotification } from '../types';

const AUTH_STORAGE_KEY = 'study-quest-auth-v2';
const USERS_STORAGE_KEY = 'study-quest-users';

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

    const [users, setUsers] = useState<User[]>(() => {
        const stored = localStorage.getItem(USERS_STORAGE_KEY);
        if (stored) return JSON.parse(stored);

        // Migration from legacy keys if they exist
        const v1Users = localStorage.getItem('study-quest-users-v1');
        if (v1Users) {
            const parsed = JSON.parse(v1Users);
            localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(parsed));
            return parsed;
        }

        return [];
    });

    useEffect(() => {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));
    }, [authState]);

    useEffect(() => {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    }, [users]);

    const login = (username: string, password: string): boolean => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            setAuthState({ isAuthenticated: true, user });
            return true;
        }
        return false;
    };

    const signup = (userData: Omit<User, 'id'>) => {
        // Prevent duplicate usernames
        if (users.some(u => u.username === userData.username)) {
            throw new Error('Username already exists');
        }

        const newUser: User = {
            ...userData,
            id: crypto.randomUUID(),
            avatar: userData.avatar || (userData.role === 'student' ? '👨‍🎓' : '🧙‍♂️'),
            childIds: userData.role === 'parent' ? [] : undefined
        };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        setAuthState({ isAuthenticated: true, user: newUser });
        return newUser;
    };

    const createChild = (parentId: string, childData: Omit<User, 'id' | 'role' | 'parentId' | 'childIds'>) => {
        const childId = crypto.randomUUID();
        const newChild: User = {
            ...childData,
            id: childId,
            role: 'student',
            parentId: parentId,
            avatar: '👨‍🎓'
        };

        setUsers(prev => {
            const updated = [...prev, newChild].map(u => {
                if (u.id === parentId) {
                    const existingChildren = u.childIds || [];
                    return { ...u, childIds: Array.from(new Set([...existingChildren, childId])) };
                }
                return u;
            });
            return updated;
        });

        // Sync auth state if current user is the parent
        if (authState.user?.id === parentId) {
            setAuthState(prev => {
                if (!prev.user) return prev;
                return {
                    ...prev,
                    user: {
                        ...prev.user,
                        childIds: Array.from(new Set([...(prev.user.childIds || []), childId]))
                    }
                };
            });
        }
    };

    const addNotification = (userId: string, notification: Omit<StudyNotification, 'id' | 'timestamp' | 'isRead'>) => {
        const newNotif: StudyNotification = {
            ...notification,
            id: crypto.randomUUID(),
            timestamp: new Date().toISOString(),
            isRead: false
        };

        setUsers(prev => prev.map(u => {
            if (u.id === userId) {
                return { ...u, notifications: [newNotif, ...(u.notifications || [])] };
            }
            return u;
        }));
    };

    const markNotificationRead = (userId: string, notifId: string) => {
        setUsers(prev => prev.map(u => {
            if (u.id === userId) {
                const updatedNotifs = u.notifications?.map(n => n.id === notifId ? { ...n, isRead: true } : n);
                return { ...u, notifications: updatedNotifs };
            }
            return u;
        }));

        if (authState.user?.id === userId) {
            setAuthState(prev => ({
                ...prev,
                user: {
                    ...prev.user!,
                    notifications: prev.user!.notifications?.map(n => n.id === notifId ? { ...n, isRead: true } : n)
                }
            }));
        }
    };

    const updateUserSettings = (userId: string, settings: Partial<User>) => {
        setUsers(prev => prev.map(u => u.id === userId ? { ...u, ...settings } : u));
        if (authState.user?.id === userId) {
            setAuthState(prev => ({ ...prev, user: { ...prev.user!, ...settings } }));
        }
    };

    const requestPasswordReset = (email: string): string | null => {
        const user = users.find(u => u.email === email && u.role === 'parent');
        if (user) {
            // In a real app, this would send an email. For simulation, we return it.
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            console.log(`[SIMULATION] OTP for ${email}: ${otp}`);
            return otp;
        }
        return null;
    };

    const resetPasswordByOTP = (email: string, newPassword: string) => {
        setUsers(prev => prev.map(u => {
            if (u.email === email && u.role === 'parent') {
                return { ...u, password: newPassword };
            }
            return u;
        }));
    };

    const logout = () => {
        setAuthState({ isAuthenticated: false, user: null });
    };

    return {
        ...authState,
        users,
        login,
        signup,
        createChild,
        addNotification,
        markNotificationRead,
        updateUserSettings,
        requestPasswordReset,
        resetPasswordByOTP,
        logout
    };
}
