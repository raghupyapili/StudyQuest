import { useState, useEffect } from 'react';
import { differenceInDays, differenceInHours, differenceInMinutes } from 'date-fns';
import { Timer, Edit2, Save, X } from 'lucide-react';
import { useGameState } from '../hooks/useGameState';

export function CountdownTimer() {
    const { state, updateSettings } = useGameState();
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const [editDate, setEditDate] = useState(state.settings.examDate.split('T')[0]);

    useEffect(() => {
        const target = new Date(state.settings.examDate);

        const calculateTime = () => {
            const now = new Date();
            if (now > target) return { days: 0, hours: 0, minutes: 0 };

            const days = differenceInDays(target, now);
            const hours = differenceInHours(target, now) % 24;
            const minutes = differenceInMinutes(target, now) % 60;
            return { days, hours, minutes };
        };

        setTimeLeft(calculateTime());
        const interval = setInterval(() => {
            setTimeLeft(calculateTime());
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [state.settings.examDate]);

    const handleSave = () => {
        const newDate = new Date(editDate);
        if (!isNaN(newDate.getTime())) {
            updateSettings({ examDate: newDate.toISOString() });
            setIsEditing(false);
        }
    };

    return (
        <div className="glass-card p-6 rounded-2xl relative group animate-in fade-in zoom-in duration-500 delay-100">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-primary font-semibold">
                    <Timer className="w-5 h-5" />
                    <span>Countdown to Victory</span>
                </div>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 hover:bg-white/5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                >
                    <Edit2 className="w-4 h-4" />
                </button>
            </div>

            {isEditing ? (
                <div className="flex items-center gap-2">
                    <input
                        type="date"
                        value={editDate}
                        onChange={(e) => setEditDate(e.target.value)}
                        className="bg-zinc-800 border border-zinc-700 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-primary w-full"
                    />
                    <button onClick={handleSave} className="p-1.5 bg-green-500/10 text-green-500 rounded hover:bg-green-500/20"><Save className="w-4 h-4" /></button>
                    <button onClick={() => setIsEditing(false)} className="p-1.5 bg-red-500/10 text-red-500 rounded hover:bg-red-500/20"><X className="w-4 h-4" /></button>
                </div>
            ) : (
                <div className="flex gap-4">
                    <div className="text-center">
                        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-400">
                            {timeLeft.days}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Days</div>
                    </div>
                    <div className="text-3xl font-light text-zinc-600">:</div>
                    <div className="text-center">
                        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-400">
                            {timeLeft.hours}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Hours</div>
                    </div>
                    <div className="text-3xl font-light text-zinc-600">:</div>
                    <div className="text-center">
                        <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-zinc-400">
                            {timeLeft.minutes}
                        </div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Mins</div>
                    </div>
                </div>
            )}

            <div className="mt-4 text-xs text-center text-muted-foreground bg-white/5 py-1 rounded">
                Target: {new Date(state.settings.examDate).toLocaleDateString()}
            </div>
        </div>
    );
}
