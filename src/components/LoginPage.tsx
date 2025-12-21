import { useState } from 'react';
import { LogIn, User, Lock } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoginPageProps {
    onLogin: (role: 'student' | 'parent', password: string) => boolean;
}

export function LoginPage({ onLogin }: LoginPageProps) {
    const [selectedRole, setSelectedRole] = useState<'student' | 'parent' | null>(null);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedRole) {
            setError('Please select a role');
            return;
        }

        const success = onLogin(selectedRole, password);
        if (!success) {
            setError('Incorrect password');
            setPassword('');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <div className="relative w-full max-w-md">
                {/* Logo/Header */}
                <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-pink-400 mb-2">
                        StudyQuest
                    </h1>
                    <p className="text-muted-foreground">Level Up Your Learning</p>
                </div>

                {/* Login Card */}
                <div className="glass-card rounded-2xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
                    <div className="flex items-center gap-2 mb-6">
                        <LogIn className="w-6 h-6 text-primary" />
                        <h2 className="text-2xl font-bold">Sign In</h2>
                    </div>

                    {/* Role Selection */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <button
                            onClick={() => {
                                setSelectedRole('student');
                                setError('');
                            }}
                            className={cn(
                                "p-4 rounded-xl border-2 transition-all duration-200",
                                selectedRole === 'student'
                                    ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                                    : "border-zinc-800 hover:border-zinc-700 bg-zinc-900/50"
                            )}
                        >
                            <User className={cn(
                                "w-8 h-8 mx-auto mb-2",
                                selectedRole === 'student' ? "text-primary" : "text-zinc-500"
                            )} />
                            <div className={cn(
                                "font-semibold",
                                selectedRole === 'student' ? "text-primary" : "text-zinc-400"
                            )}>
                                Student
                            </div>
                        </button>

                        <button
                            onClick={() => {
                                setSelectedRole('parent');
                                setError('');
                            }}
                            className={cn(
                                "p-4 rounded-xl border-2 transition-all duration-200",
                                selectedRole === 'parent'
                                    ? "border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20"
                                    : "border-zinc-800 hover:border-zinc-700 bg-zinc-900/50"
                            )}
                        >
                            <User className={cn(
                                "w-8 h-8 mx-auto mb-2",
                                selectedRole === 'parent' ? "text-orange-500" : "text-zinc-500"
                            )} />
                            <div className={cn(
                                "font-semibold",
                                selectedRole === 'parent' ? "text-orange-500" : "text-zinc-400"
                            )}>
                                Parent
                            </div>
                        </button>
                    </div>

                    {/* Password Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2 text-muted-foreground">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError('');
                                    }}
                                    placeholder="Enter password"
                                    className="w-full pl-11 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                    disabled={!selectedRole}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm animate-in fade-in slide-in-from-top-2 duration-200">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!selectedRole || !password}
                            className={cn(
                                "w-full py-3 rounded-lg font-semibold transition-all duration-200",
                                selectedRole && password
                                    ? "bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30 hover:shadow-primary/50"
                                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                            )}
                        >
                            Sign In
                        </button>
                    </form>

                    {/* Helper Text */}
                    <div className="mt-6 p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                        <p className="text-xs text-muted-foreground text-center">
                            <span className="font-semibold text-primary">Student:</span> study2025 •
                            <span className="font-semibold text-orange-500 ml-2">Parent:</span> parent2025
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
