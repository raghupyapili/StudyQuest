import { useState } from 'react';
import { Lock, BookOpen, X, ChevronRight, Info } from 'lucide-react';
import { cn } from '../lib/utils';
import type { User as UserType } from '../types';

interface LoginPageProps {
    onLogin: (username: string, password: string) => boolean;
    onSignup: (user: Omit<UserType, 'id'>) => UserType;
    onCreateChild: (parentId: string, childData: any) => void;
    onRequestReset: (email: string) => string | null;
    onResetPassword: (email: string, newPass: string) => void;
}

export function LoginPage({ onLogin, onSignup, onCreateChild, onRequestReset, onResetPassword }: LoginPageProps) {
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
    const [showGuide, setShowGuide] = useState(false);

    // Password Reset State
    const [resetStep, setResetStep] = useState<'request' | 'otp' | 'newPassword'>('request');
    const [resetEmail, setResetEmail] = useState('');
    const [resetOTP, setResetOTP] = useState('');
    const [generatedOTP, setGeneratedOTP] = useState('');
    const [resetNewPass, setResetNewPass] = useState('');
    const [resetError, setResetError] = useState('');
    const [isResetLoading, setIsResetLoading] = useState(false);

    const GUIDE_CONTENT = {
        title: "⚔️ StudyQuest: Tactical Education Command Guide",
        intro: "Welcome to StudyQuest, a gamified strategic learning platform designed to turn academic study into a high-stakes mission. Whether you are class 6 or class 10, your curriculum is now your battlefield.",
        sections: [
            {
                title: "🚀 1. Deployment (Getting Started)",
                items: [
                    "Access the Link: Open the Vercel link shared with you.",
                    "Enlist (Sign Up):",
                    "For Parents: Choose the \"Parent\" role. You will be prompted to create your account and then set up a Child Profile. This is where you define your kid's Grade (6-10), State Preference (TS/AP), and Second Language (Hindi/Telugu).",
                    "For Students: Your parent can create your account for you, or you can sign up as a \"Student\" directly.",
                    "Strategic Synchronization: Once logged in, the app automatically loads the curriculum based on the selected Grade."
                ]
            },
            {
                title: "🎖️ 2. The Hero's Path (Student Dashboard)",
                items: [
                    "The student's view is designed like a tactical RPG.",
                    "Rank Progression: You start as a Recruit (Class 9) or Mizunoto (Class 10). As you complete sub-units and chapters, your mastery percentage increases, unlocking new Ranks like Avenger or Hashira.",
                    "XP & Levels: Every action (marking a sub-topic done, completing a chapter) earns XP. Level up to show your dedication.",
                    "Battle Missions: The center of the dashboard shows your current subjects. Each subject is themed (e.g., Math is Thunder Breathing if you're in Class 10).",
                    "Chapter Details: Click any chapter to enter the Battle Plan view:",
                    "- Sub-topics: Mark individual units as \"Secured\" to gain progress.",
                    "- Critical Units: Look for the pulsating CRITICAL badge. These are priority targets set by your parent.",
                    "- Battle Tasks: Create your own checklist (e.g., \"Watch YouTube video\", \"Solve exercise 2.1\").",
                    "Grind Mode: Use the built-in Pomodoro Timer to stay focused during intense study sessions.",
                    "Battle Resources: Access practice papers in the side menu to test your power."
                ]
            },
            {
                title: "🛰️ 3. The Command Center (Parent Dashboard)",
                items: [
                    "The parent's view provides high-level intelligence and tactical control.",
                    "Monitoring Station: See real-time progress bars for every subject.",
                    "Strategic Deadlines: Click on any chapter to set a Target Date. This creates a countdown for your child and marks it as a \"Parental Priority ALPHA\" mission.",
                    "Tactical Overrides (Inject Module): If your child has extra school work or a specific project, use the \"+\" button on any subject to \"Inject\" a custom module.",
                    "Inject Tactical Sub-Units: Inside any chapter, you can add custom sub-topics to track specific school assignments.",
                    "Prioritization (Star Icon): Click the Star icon next to any sub-topic to mark it as CRITICAL. This highlights the topic in orange and makes it blink on the student's dashboard—ensuring they don't miss the most important parts.",
                    "Logistics Intelligence: You will receive notifications on your dashboard when your child completes modules or reaches milestones."
                ]
            },
            {
                title: "🎨 4. Grade-Specific Themes",
                items: [
                    "The app transforms based on the student's grade:",
                    "Class 10: Demon Slayer (Breathing Techniques & Hashira Ranks)",
                    "Class 9: Avengers Initiative (S.H.I.E.L.D Ranks & Stark Tech)",
                    "Class 8: Konoha Ninja Academy (Jutsu Mastery & Hokage Ranks)",
                    "Class 7: Omnitrix Hero (Alien Transformations & Plumber Ranks)",
                    "Class 6: Dholakpur Heroes (Laddo Power & Village Guardian Ranks)"
                ]
            },
            {
                title: "💡 Tips for Testing",
                items: [
                    "Try Marking Progress: As a student, mark 4-5 sub-topics in a chapter and notice how the Circular Progress bar on the main dashboard updates.",
                    "Set a Deadline: As a parent, set a deadline for tomorrow and see the \"Critical Targets\" section show \"1d REMAINING\" with a red alert.",
                    "Toggle Critical: Mark a sub-topic as critical in the Parent view, then switch to the Student view (or refresh) to see the orange \"CRITICAL\" badge."
                ]
            }
        ]
    };

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
                        <div className="flex items-center gap-4 mb-8">
                            <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20 border border-white/10 overflow-hidden">
                                <img src="/logo.png" alt="StudyQuest Logo" className="w-full h-full object-cover" />
                            </div>
                            <div className="h-12 w-12 bg-primary rounded-2xl flex items-center justify-center shadow-2xl shadow-primary/20 border border-white/10">
                                <BookOpen className="text-white h-6 w-6" />
                            </div>
                        </div>
                        <h1 className="text-5xl font-black text-white italic tracking-tighter mb-6 leading-none">STUDY<br /><span className="text-primary not-italic">QUEST</span></h1>
                        <p className="text-zinc-400 font-medium leading-relaxed">
                            The ultimate training ground for the next generation of scholars. Master your curriculum, unlock legendary ranks, and conquer your exams.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowGuide(true)}
                        className="mt-8 flex items-center gap-3 p-4 bg-primary/10 border border-primary/20 rounded-2xl group hover:bg-primary/20 transition-all text-left"
                    >
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <Info className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <div className="text-[10px] font-black text-primary uppercase tracking-widest">Awaiting Intel?</div>
                            <div className="text-sm font-bold text-white">Read the Tactical Guide</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-primary ml-auto group-hover:translate-x-1 transition-transform" />
                    </button>
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
                                {mode === 'login' && (
                                    <div className="flex justify-end mt-1 px-1">
                                        <button
                                            type="button"
                                            onClick={() => setShowForgot(true)}
                                            className="text-[9px] font-black text-primary/60 hover:text-primary uppercase tracking-[0.2em] transition-colors"
                                        >
                                            Forgot Access Key?
                                        </button>
                                    </div>
                                )}
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

                    <div className="mt-8 space-y-2 text-center">
                        <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">
                            Deployment Status: <span className="text-green-500">Online</span> • Sector: <span className="text-white">Live</span>
                        </p>
                        <div className="text-zinc-700 text-[9px] font-black uppercase tracking-[0.25em] flex items-center justify-center gap-1.5 opacity-50">
                            <img src="/logo.png" alt="" className="w-3 h-3 grayscale" />
                            StudyQuest v3.0.0 Stable
                        </div>
                    </div>
                </div>
            </div>

            {/* Forgot Credentials Modal */}
            {showForgot && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
                    <div className="bg-zinc-900 border border-white/10 p-8 rounded-[2.5rem] max-w-sm w-full space-y-6 text-center shadow-2xl">
                        <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                            <Lock className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                            {resetStep === 'request' ? 'Reset Protocol' : resetStep === 'otp' ? 'Verification' : 'Update Access Key'}
                        </h3>

                        {resetStep === 'request' ? (
                            <div className="space-y-4">
                                <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl">
                                    <p className="text-xs text-orange-500 font-black uppercase tracking-widest text-center mb-1">Attention Students</p>
                                    <p className="text-[11px] text-zinc-400 font-medium leading-relaxed text-center">
                                        For security reasons, your parents must reset your Access Key from their Command Center.
                                    </p>
                                </div>
                                <div className="h-px bg-white/5 my-2"></div>
                                <p className="text-sm text-zinc-400 font-medium leading-relaxed text-center">
                                    Parents: Enter your registered mail identity to receive a reset OTP.
                                </p>
                                <input
                                    type="email"
                                    placeholder="yourname@sector.com"
                                    value={resetEmail}
                                    onChange={(e) => setResetEmail(e.target.value)}
                                    className="w-full bg-zinc-800/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                {resetError && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest text-center">{resetError}</p>}
                                <button
                                    disabled={isResetLoading}
                                    onClick={() => {
                                        if (!resetEmail) {
                                            setResetError('Mail identity required');
                                            return;
                                        }
                                        setIsResetLoading(true);
                                        setResetError('');

                                        // Simulate network delay
                                        setTimeout(() => {
                                            const otp = onRequestReset(resetEmail);
                                            setIsResetLoading(false);
                                            if (otp) {
                                                setGeneratedOTP(otp);
                                                setResetStep('otp');
                                            } else {
                                                setResetError('Email not identified as Parent');
                                            }
                                        }, 1500);
                                    }}
                                    className={cn(
                                        "w-full py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2",
                                        isResetLoading && "opacity-50 cursor-not-allowed"
                                    )}
                                >
                                    {isResetLoading ? (
                                        <>
                                            <div className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Transmitting OTP...
                                        </>
                                    ) : (
                                        'Request OTP'
                                    )}
                                </button>
                            </div>
                        ) : resetStep === 'otp' ? (
                            <div className="space-y-4">
                                <p className="text-sm text-zinc-400 font-medium leading-relaxed">
                                    Enter the 4-digit code sent to your sector mail identity.
                                </p>
                                <input
                                    type="text"
                                    maxLength={4}
                                    placeholder="0000"
                                    value={resetOTP}
                                    onChange={(e) => setResetOTP(e.target.value)}
                                    className="w-full bg-zinc-800/40 border border-white/5 rounded-2xl px-5 py-4 text-center text-2xl font-black tracking-[1em] focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                {resetError && <p className="text-[10px] font-black text-red-500 uppercase tracking-widest">{resetError}</p>}
                                <button
                                    onClick={() => {
                                        if (resetOTP === generatedOTP) {
                                            setResetError('');
                                            setResetStep('newPassword');
                                        } else {
                                            setResetError('Invalid Protocol Code');
                                        }
                                    }}
                                    className="w-full py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    Verify OTP
                                </button>
                                <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest italic">
                                    Simulation: Check browser console for OTP
                                </p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-sm text-zinc-400 font-medium leading-relaxed">
                                    Define your new secure access protocol.
                                </p>
                                <input
                                    type="password"
                                    placeholder="New Access Key"
                                    value={resetNewPass}
                                    onChange={(e) => setResetNewPass(e.target.value)}
                                    className="w-full bg-zinc-800/40 border border-white/5 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                />
                                <button
                                    onClick={() => {
                                        onResetPassword(resetEmail, resetNewPass);
                                        setShowForgot(false);
                                        setResetStep('request');
                                        setResetEmail('');
                                        setResetOTP('');
                                        setResetNewPass('');
                                        setError('Password Reset Successful');
                                    }}
                                    className="w-full py-4 bg-primary text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    Finalize Reset
                                </button>
                            </div>
                        )}

                        <button
                            onClick={() => {
                                setShowForgot(false);
                                setResetStep('request');
                                setResetError('');
                            }}
                            className="w-full py-4 bg-zinc-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-colors"
                        >
                            Abort Protocol
                        </button>
                    </div>
                </div>
            )}
            {/* User Guide Modal */}
            {showGuide && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="bg-zinc-900 border border-white/10 p-10 rounded-[3rem] max-w-2xl w-full max-h-[85vh] overflow-y-auto no-scrollbar space-y-8 shadow-2xl relative">
                        <button
                            onClick={() => setShowGuide(false)}
                            className="absolute top-8 right-8 p-3 bg-zinc-800 rounded-full text-zinc-400 hover:text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 bg-primary rounded-xl flex items-center justify-center shadow-lg overflow-hidden shrink-0">
                                    <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                                </div>
                                <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">
                                    {GUIDE_CONTENT.title}
                                </h2>
                            </div>
                            <div className="h-1.5 w-32 bg-primary rounded-full"></div>
                            <p className="text-sm font-bold text-zinc-400 leading-relaxed uppercase tracking-widest italic">{(GUIDE_CONTENT as any).intro}</p>
                        </div>

                        <div className="grid gap-8">
                            {GUIDE_CONTENT.sections.map((section, idx) => (
                                <div key={idx} className="space-y-4">
                                    <h3 className="text-lg font-black text-primary uppercase tracking-wider flex items-center gap-3">
                                        {section.title}
                                    </h3>
                                    <div className="space-y-3">
                                        {section.items.map((item, i) => (
                                            <div key={i} className="flex gap-4 p-4 bg-zinc-800/40 rounded-2xl border border-white/5">
                                                <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2"></div>
                                                <p className="text-sm font-medium text-zinc-300 leading-relaxed">{item}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => setShowGuide(false)}
                            className="w-full py-6 bg-primary text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-sm shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            I am Ready to Enlist
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
