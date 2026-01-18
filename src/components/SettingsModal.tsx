import { useState } from 'react';
import { X, Moon, Sun, Plus, Shield, Laptop, GraduationCap } from 'lucide-react';
import type { User } from '../types';
import { cn } from '../lib/utils';

interface SettingsModalProps {
    user: User | null;
    children?: User[];
    onClose: () => void;
    onUpdateSettings: (settings: Partial<User>) => void;
    onUpdateChildSettings: (childId: string, settings: Partial<User>) => void;
    onCreateChild: (parentId: string, childData: any) => void;
}

export function SettingsModal({ user, children = [], onClose, onUpdateSettings, onUpdateChildSettings, onCreateChild }: SettingsModalProps) {
    const [newChild, setNewChild] = useState({
        name: '',
        username: '',
        password: '',
        grade: '10',
        secondLanguage: 'Telugu' as 'Hindi' | 'Telugu',
        statePreference: 'TS' as 'TS' | 'AP'
    });
    const [showAddChild, setShowAddChild] = useState(false);
    const [resettingChildId, setResettingChildId] = useState<string | null>(null);
    const [tempChildPass, setTempChildPass] = useState('');
    const [resetSuccessId, setResetSuccessId] = useState<string | null>(null);

    if (!user) return null;

    const handleAddChild = (e: React.FormEvent) => {
        e.preventDefault();
        onCreateChild(user.id, newChild);
        setNewChild({
            name: '',
            username: '',
            password: '',
            grade: '10',
            secondLanguage: 'Telugu',
            statePreference: 'TS'
        });
        setShowAddChild(false);
    };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
            <div className="bg-zinc-900 border border-white/10 p-8 rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto no-scrollbar space-y-8 shadow-2xl relative">
                <button onClick={onClose} className="absolute top-6 right-6 p-2 text-zinc-500 hover:text-white transition-colors">
                    <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4 border-b border-white/5 pb-6">
                    <div className="p-3 bg-primary/10 rounded-2xl">
                        <Laptop className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">System Configuration</h2>
                        <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest">Adjust your tactical environment</p>
                    </div>
                </div>

                {/* Theme Selection */}
                <div className="space-y-4">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Visual Interface</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => onUpdateSettings({ themePreference: 'dark' })}
                            className={cn(
                                "flex items-center justify-between p-4 rounded-2xl border-2 transition-all",
                                user.themePreference !== 'light' ? "bg-primary/10 border-primary text-white" : "bg-zinc-800/50 border-white/5 text-zinc-500 hover:border-white/10"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Moon className="w-5 h-5" />
                                <span className="font-bold">Dark Protocol</span>
                            </div>
                            {user.themePreference !== 'light' && <Shield className="w-4 h-4 text-primary" />}
                        </button>
                        <button
                            onClick={() => onUpdateSettings({ themePreference: 'light' })}
                            className={cn(
                                "flex items-center justify-between p-4 rounded-2xl border-2 transition-all",
                                user.themePreference === 'light' ? "bg-primary/10 border-primary text-zinc-900" : "bg-zinc-800/50 border-white/5 text-zinc-500 hover:border-white/10"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <Sun className="w-5 h-5 text-amber-500" />
                                <span className="font-bold">Light Protocol</span>
                            </div>
                            {user.themePreference === 'light' && <Shield className="w-4 h-4 text-primary" />}
                        </button>
                    </div>
                </div>

                {/* Parent Specific: Child Management */}
                {user.role === 'parent' && (
                    <div className="space-y-6 pt-6 border-t border-white/5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Tactical Assets (Children)</h3>
                            <button
                                onClick={() => setShowAddChild(!showAddChild)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 rounded-xl text-[10px] font-black uppercase transition-all"
                            >
                                <Plus className="w-3 h-3" />
                                Deploy New Asset
                            </button>
                        </div>

                        {showAddChild && (
                            <form onSubmit={handleAddChild} className="bg-zinc-800/40 p-6 rounded-3xl border border-white/5 space-y-4 animate-in slide-in-from-top-4 duration-300">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">Asset Name</label>
                                        <input
                                            required
                                            type="text"
                                            value={newChild.name}
                                            onChange={(e) => setNewChild({ ...newChild, name: e.target.value })}
                                            className="w-full bg-zinc-900 border-none rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-primary/50 outline-none"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">Grade Designation</label>
                                        <select
                                            value={newChild.grade}
                                            onChange={(e) => setNewChild({ ...newChild, grade: e.target.value })}
                                            className="w-full bg-zinc-900 border-none rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-primary/50 outline-none"
                                        >
                                            {['6', '7', '8', '9', '10', '11', '12'].map(g => <option key={g} value={g}>Class {g}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">Username (Codename)</label>
                                        <input
                                            required
                                            type="text"
                                            value={newChild.username}
                                            onChange={(e) => setNewChild({ ...newChild, username: e.target.value })}
                                            className="w-full bg-zinc-900 border-none rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-primary/50 outline-none"
                                            placeholder="john_v3"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest ml-1">Access Protocol (Password)</label>
                                        <input
                                            required
                                            type="password"
                                            value={newChild.password}
                                            onChange={(e) => setNewChild({ ...newChild, password: e.target.value })}
                                            className="w-full bg-zinc-900 border-none rounded-xl p-3 text-sm text-white focus:ring-1 focus:ring-primary/50 outline-none"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="w-full py-3 bg-primary text-white rounded-xl font-black uppercase text-[10px] tracking-widest shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                                    Initiate Deployment
                                </button>
                            </form>
                        )}

                        <div className="grid gap-3">
                            {children.map(child => (
                                <div key={child.id} className="space-y-3 p-4 bg-zinc-900/40 rounded-2xl border border-white/5">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 bg-zinc-800 rounded-xl text-lg">
                                                <GraduationCap className="w-5 h-5 text-zinc-400" />
                                            </div>
                                            <div>
                                                <div className="text-[11px] font-black text-white uppercase tracking-tight">{child.name}</div>
                                                <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">Class {child.grade} • {child.username}</div>
                                            </div>
                                        </div>

                                        {resetSuccessId === child.id ? (
                                            <div className="px-3 py-1.5 bg-green-500/10 text-green-500 rounded-xl text-[8px] font-black uppercase tracking-widest animate-in fade-in zoom-in duration-300">
                                                Key Updated
                                            </div>
                                        ) : resettingChildId !== child.id && (
                                            <button
                                                onClick={() => setResettingChildId(child.id)}
                                                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-[8px] font-black text-zinc-400 hover:text-white uppercase tracking-widest transition-all"
                                            >
                                                Reset Access Key
                                            </button>
                                        )}
                                    </div>

                                    {resettingChildId === child.id && (
                                        <div className="flex gap-2 animate-in slide-in-from-top-2 duration-200">
                                            <input
                                                autoFocus
                                                type="text"
                                                placeholder="Enter New Access Key"
                                                value={tempChildPass}
                                                onChange={(e) => setTempChildPass(e.target.value)}
                                                className="flex-1 bg-zinc-900 border-none rounded-xl px-4 py-2 text-xs text-white focus:ring-1 focus:ring-primary/50 outline-none"
                                            />
                                            <button
                                                onClick={() => {
                                                    if (tempChildPass) {
                                                        onUpdateChildSettings(child.id, { password: tempChildPass });
                                                        setResetSuccessId(child.id);
                                                        setResettingChildId(null);
                                                        setTempChildPass('');
                                                        setTimeout(() => setResetSuccessId(null), 3000);
                                                    }
                                                }}
                                                className="px-4 py-2 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary/20"
                                            >
                                                Save
                                            </button>
                                            <button
                                                onClick={() => {
                                                    setResettingChildId(null);
                                                    setTempChildPass('');
                                                }}
                                                className="px-4 py-2 bg-zinc-800 text-zinc-500 rounded-xl text-[10px] font-black uppercase tracking-widest"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                            {children.length === 0 && (
                                <div className="text-center py-6 bg-zinc-900/20 rounded-2xl border border-dashed border-white/5">
                                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest leading-loose text-center">No assets currently deployed to the field.</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="pt-6 border-t border-white/5 flex gap-4">
                    <button onClick={onClose} className="flex-1 py-4 bg-zinc-800 text-zinc-400 hover:text-white rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all">
                        Cancel
                    </button>
                    <button onClick={onClose} className="flex-1 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                        Save Config
                    </button>
                </div>
            </div>
        </div>
    );
}
