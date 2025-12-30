import { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw, Zap, Shield, Swords } from 'lucide-react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { cn } from '../lib/utils';
import confetti from 'canvas-confetti';

export function GrindMode() {
    const [isActive, setIsActive] = useState(false);
    const [minutes, setMinutes] = useState(25);
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [mode] = useState<'focus' | 'break'>('focus');

    useEffect(() => {
        let interval: any = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0 && isActive) {
            setIsActive(false);
            if (mode === 'focus') {
                confetti({
                    particleCount: 150,
                    spread: 80,
                    origin: { y: 0.6 },
                    colors: ['#a855f7', '#ec4899', '#3b82f6']
                });
            }
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, mode]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(minutes * 60);
    };

    const setTime = (mins: number) => {
        setMinutes(mins);
        setTimeLeft(mins * 60);
        setIsActive(false);
    };

    const percentage = (timeLeft / (minutes * 60)) * 100;

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center animate-in fade-in duration-700 p-8 relative overflow-hidden">
            {/* Background Atmosphere */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="text-center mb-12 relative z-10">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="h-0.5 w-12 bg-gradient-to-r from-transparent to-primary"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary drop-shadow-sm">Inner Focus</span>
                    <div className="h-0.5 w-12 bg-gradient-to-l from-transparent to-primary"></div>
                </div>
                <h1 className="text-6xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 mb-2 italic tracking-tighter uppercase">
                    Grind Mode
                </h1>
                <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Total concentration. Constant progress.</p>
            </div>

            <div className="w-96 h-96 mb-12 relative group">
                {/* Outer Ring Decoration */}
                <div className={cn(
                    "absolute -inset-8 rounded-full border-2 border-dashed border-white/5 animate-spin-slow transition-opacity",
                    isActive ? "opacity-100" : "opacity-0"
                )}></div>

                <CircularProgressbarWithChildren
                    value={percentage}
                    styles={buildStyles({
                        pathColor: mode === 'focus' ? '#a855f7' : '#10b981',
                        trailColor: 'rgba(255,255,255,0.03)',
                        strokeLinecap: 'butt',
                        pathTransitionDuration: 1,
                    })}
                >
                    <div className="text-center relative z-10">
                        <div className="text-8xl font-black font-outfit tracking-tighter italic text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.3)]">
                            {formatTime(timeLeft)}
                        </div>
                        <div className="flex flex-col items-center mt-4">
                            <span className={cn(
                                "text-[10px] font-black uppercase tracking-[0.3em] transition-all",
                                isActive ? "text-primary animate-pulse" : "text-zinc-600"
                            )}>
                                {isActive ? 'Protocol Active' : 'Standby Mode'}
                            </span>
                            <div className="mt-2 flex gap-1">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className={cn("h-1 w-4 rounded-full", isActive ? "bg-primary" : "bg-zinc-800")}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CircularProgressbarWithChildren>
            </div>

            <div className="flex items-center gap-8 mb-12 relative z-10">
                <button
                    onClick={resetTimer}
                    className="h-14 w-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center hover:bg-zinc-800 transition-all group active:scale-95"
                    title="Reset Focus"
                >
                    <RefreshCw className="w-6 h-6 text-zinc-500 group-hover:text-white transition-colors" />
                </button>

                <button
                    onClick={toggleTimer}
                    className={cn(
                        "w-24 h-24 rounded-[2.5rem] flex items-center justify-center transition-all shadow-2xl active:scale-90 group relative overflow-hidden",
                        isActive
                            ? "bg-zinc-900 border-2 border-primary/50 text-primary shadow-primary/20"
                            : "bg-primary text-white shadow-primary/40 hover:scale-105"
                    )}
                >
                    {isActive ? <Pause className="w-8 h-8 fill-primary" /> : <Play className="w-8 h-8 fill-white ml-1" />}
                </button>

                <div className="flex flex-col gap-3">
                    <div className="h-14 w-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center opacity-40 cursor-not-allowed">
                        <Shield className="w-6 h-6 text-zinc-500" />
                    </div>
                </div>
            </div>

            <div className="flex gap-3 bg-zinc-900/50 p-2 rounded-[2rem] border border-white/5 backdrop-blur-xl relative z-10">
                {[15, 25, 45, 60].map(m => (
                    <button
                        key={m}
                        onClick={() => setTime(m)}
                        className={cn(
                            "px-6 py-3 rounded-[1.5rem] text-xs font-black uppercase tracking-widest transition-all",
                            minutes === m
                                ? "bg-primary text-white shadow-lg shadow-primary/20"
                                : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                        )}
                    >
                        {m}m
                    </button>
                ))}
            </div>

            {/* Visual Accents */}
            <div className="absolute bottom-10 left-10 flex gap-4 opacity-10 pointer-events-none">
                <Zap className="w-12 h-12" />
                <Swords className="w-12 h-12" />
            </div>
            <div className="absolute top-10 right-10 flex gap-4 opacity-10 pointer-events-none">
                <Shield className="w-12 h-12" />
            </div>
        </div>
    );
}
