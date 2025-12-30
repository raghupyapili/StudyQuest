import { useState } from 'react';
import { Lock } from 'lucide-react';
import { cn } from '../lib/utils';
import type { User as UserType } from '../types';

interface LoginPageProps {
    onLogin: (username: string, password: string) => boolean;
    onSignup: (user: Omit<UserType, 'id'>) => UserType;
    onCreateChild: (parentId: string, childData: any) => void;
}

export function LoginPage({ onLogin, onSignup, onCreateChild }: LoginPageProps) {
    const [mode, setMode] = useState<'login' | 'signup'>('login');
    const [selectedRole, setSelectedRole] = useState<'student' | 'parent' | null>(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [grade, setGrade] = useState('10');
    const [secondLanguage, setSecondLanguage] = useState<'Hindi' | 'Telugu'>('Telugu');
    const [error, setError] = useState('');
    const [statePreference, setStatePreference] = useState<'TS' | 'AP'>('TS');
    const [kids, setKids] = useState<{
        name: string,
        username: string,
        password: string,
        email?: string,
        grade: string,
        secondLanguage: 'Hindi' | 'Telugu',
        statePreference: 'TS' | 'AP'
    }[]>([]);
    const [showForgot, setShowForgot] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (mode === 'login') {
            if (!username || !password) {
                setError('Credentials required');
                return;
            }
            const success = onLogin(username, password);
            if (!success) {
                setError('Invalid username or password');
                setPassword('');
            }
        } else {
            if (!selectedRole) {
                setError('Please select a role');
                return;
            }
            if (!name || !email || !username || !password) {
                setError('Please fill all mandatory fields');
                return;
            }

            try {
                const newUser = onSignup({
                    username,
                    password,
                    role: selectedRole,
                    name,
                    email: email || undefined,
                    grade: selectedRole === 'student' ? grade : undefined,
                    secondLanguage: selectedRole === 'student' ? secondLanguage : undefined,
                    statePreference: selectedRole === 'student' ? statePreference : undefined
                });

                // If parent, create kid profiles too
                if (selectedRole === 'parent' && kids.length > 0) {
                    kids.forEach(kid => {
                        onCreateChild(newUser.id, kid);
                    });
                }
            } catch (err: any) {
                setError(err.message || 'Signup failed');
            }
        }
    };

    const addKidField = () => {
        setKids([...kids, {
            name: '',
            username: '',
            password: '',
            email: '',
            grade: '10',
            secondLanguage: 'Telugu',
            statePreference: 'TS'
        }]);
    };

    const updateKid = (index: number, field: string, value: string) => {
        const newKids = [...kids] as any;
        newKids[index][field] = value;
        setKids(newKids);
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>

            <div className="relative w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-zinc-900/50 backdrop-blur-3xl rounded-[2.5rem] border border-white/5 shadow-2xl overflow-hidden">
                {/* Visual Side */}
                <div className="p-12 bg-gradient-to-br from-primary/20 to-purple-600/20 flex flex-col justify-between border-r border-white/5">
                    <div>
                        <h1 className="text-5xl font-black text-white italic tracking-tighter mb-6">STUDY<br />QUEST</h1>
                        <p className="text-zinc-400 font-medium leading-relaxed">
                            The ultimate training ground for the next generation of scholars. Master your curriculum, unlock legendary ranks, and conquer your exams.
                        </p>
                    </div>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-4 w-4 rounded-full bg-primary shadow-[0_0_15px_rgba(168,85,247,0.5)]"></div>
                            <span className="text-xs font-black text-zinc-300 uppercase tracking-widest">Global Specialization Level</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-4 w-4 rounded-full bg-orange-500 shadow-[0_0_15_rgba(249,115,22,0.5)]"></div>
                            <span className="text-xs font-black text-zinc-300 uppercase tracking-widest">Parental Guidance System</span>
                        </div>
                    </div>
                </div>

                {/* Form Side */}
                <div className="p-10 max-h-[90vh] overflow-y-auto no-scrollbar">
                    <div className="flex items-center justify-between mb-10">
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">
                            {mode === 'login' ? 'Welcome Back' : 'Initialize Profile'}
                        </h2>
                        <button
                            onClick={() => {
                                setMode(mode === 'login' ? 'signup' : 'login');
                                setError('');
                            }}
                            className="text-[10px] font-black text-primary uppercase tracking-widest hover:text-white transition-colors"
                        >
                            {mode === 'login' ? 'Create New' : 'Have Account?'}
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {mode === 'signup' && (
                            <div className="flex p-1 bg-zinc-800/50 rounded-2xl mb-4">
                                <button
                                    type="button"
                                    onClick={() => setSelectedRole('student')}
                                    className={cn(
                                        "flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                        selectedRole === 'student' ? "bg-primary text-white shadow-lg" : "text-zinc-500 hover:text-white"
                                    )}
                                >
                                    Student
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setSelectedRole('parent')}
                                    className={cn(
                                        "flex-1 py-3 px-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                                        selectedRole === 'parent' ? "bg-orange-500 text-white shadow-lg" : "text-zinc-500 hover:text-white"
                                    )}
                                >
                                    Parent
                                </button>
                            </div>
                        )}

                        <div className="space-y-4">
                            {mode === 'signup' && (
                                <>
                                    <div>
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 block mb-2">Display Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full bg-zinc-800/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 block mb-2">Email Identity</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-zinc-800/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                            placeholder="yourname@sector.com"
                                        />
                                    </div>
                                </>
                            )}
                            <div>
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 block mb-2">Identification (Username)</label>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="w-full bg-zinc-800/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    placeholder="Unique ID"
                                />
                            </div>
                            <div>
                                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 block mb-2">Access Key (Password)</label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-zinc-800/40 border border-white/5 rounded-2xl pl-14 pr-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {mode === 'signup' && selectedRole === 'student' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 block mb-2">Current Class</label>
                                            <select
                                                value={grade}
                                                onChange={(e) => setGrade(e.target.value)}
                                                className="w-full bg-zinc-800/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none"
                                            >
                                                <option value="6">Class 6</option>
                                                <option value="7">Class 7</option>
                                                <option value="8">Class 8</option>
                                                <option value="9">Class 9</option>
                                                <option value="10">Class 10</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 block mb-2">2nd Language</label>
                                            <select
                                                value={secondLanguage}
                                                onChange={(e) => setSecondLanguage(e.target.value as 'Hindi' | 'Telugu')}
                                                className="w-full bg-zinc-800/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none"
                                            >
                                                <option value="Hindi">Hindi</option>
                                                <option value="Telugu">Telugu</option>
                                            </select>
                                        </div>
                                    </div>
                                    {secondLanguage === 'Telugu' && (
                                        <div>
                                            <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1 block mb-2">Syllabus Region (Telugu)</label>
                                            <select
                                                value={statePreference}
                                                onChange={(e) => setStatePreference(e.target.value as 'TS' | 'AP')}
                                                className="w-full bg-zinc-800/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none"
                                            >
                                                <option value="TS">Telangana (TS)</option>
                                                <option value="AP">Andhra Pradesh (AP)</option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            )}

                            {mode === 'signup' && selectedRole === 'parent' && (
                                <div className="space-y-4 pt-4 border-t border-white/5">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Kid Profiles</label>
                                        <button
                                            type="button"
                                            onClick={addKidField}
                                            className="text-[10px] font-black text-primary uppercase"
                                        >
                                            + Add Child
                                        </button>
                                    </div>
                                    {kids.map((kid, i) => (
                                        <div key={i} className="p-4 bg-zinc-800/20 rounded-2xl border border-white/5 space-y-3">
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Child's Name"
                                                    value={kid.name}
                                                    onChange={(e) => updateKid(i, 'name', e.target.value)}
                                                    className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-2 text-xs"
                                                />
                                                <select
                                                    value={kid.grade}
                                                    onChange={(e) => updateKid(i, 'grade', e.target.value)}
                                                    className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-2 text-xs"
                                                >
                                                    <option value="6">Class 6</option>
                                                    <option value="7">Class 7</option>
                                                    <option value="8">Class 8</option>
                                                    <option value="9">Class 9</option>
                                                    <option value="10">Class 10</option>
                                                </select>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                <input
                                                    type="text"
                                                    placeholder="Kid Username"
                                                    value={kid.username}
                                                    onChange={(e) => updateKid(i, 'username', e.target.value)}
                                                    className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-2 text-xs"
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="Kid Password"
                                                    value={kid.password}
                                                    onChange={(e) => updateKid(i, 'password', e.target.value)}
                                                    className="bg-zinc-900/50 border border-white/5 rounded-xl px-3 py-2 text-xs"
                                                />
                                            </div>
                                            <input
                                                type="email"
                                                placeholder="Kid Email (optional)"
                                                value={kid.email}
                                                onChange={(e) => updateKid(i, 'email', e.target.value)}
                                                className="w-full bg-zinc-900/50 border border-white/5 rounded-xl px-4 py-2 text-xs"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-red-500 text-[10px] font-black uppercase tracking-widest animate-shake">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            className={cn(
                                "w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl active:scale-95",
                                (mode === 'signup' && selectedRole === 'parent') ? "bg-orange-500 text-white shadow-orange-500/20" : "bg-primary text-white shadow-primary/20"
                            )}
                        >
                            {mode === 'login' ? 'Confirm Authorization' : 'Initialize Mission'}
                        </button>
                    </form>

                    <p className="mt-8 text-center text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                        Deployment Status: <span className="text-green-500">Online</span> • Sector: <span className="text-white">Live</span>
                    </p>
                </div>
            </div>

            {/* Forgot Credentials Modal */}
            {showForgot && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                    <div className="bg-zinc-900 border border-white/10 p-8 rounded-[2.5rem] max-w-sm w-full space-y-6 text-center shadow-2xl">
                        <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">Security Protocol</h3>
                        <p className="text-sm text-zinc-400 font-medium">
                            To reset your credentials, please contact your commanding officer (Parent) or reach out to our support channel at <span className="text-primary">support@studyquest.com</span>.
                        </p>
                        <button
                            onClick={() => setShowForgot(false)}
                            className="w-full py-4 bg-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-zinc-700"
                        >
                            Back to Access
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
