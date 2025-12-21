import { useState, useEffect } from 'react';
import { Play, Pause, RefreshCw } from 'lucide-react';
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
            // Play sound or notify
            if (mode === 'focus') {
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: { y: 0.6 }
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
        <div className="p-8 h-full flex flex-col items-center justify-center animate-in zoom-in-95 duration-500">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-2">
                    Grind Mode
                </h1>
                <p className="text-muted-foreground">Focus on the task at hand. No distractions.</p>
            </div>

            <div className="w-80 h-80 mb-8 relative">
                <CircularProgressbarWithChildren
                    value={percentage}
                    styles={buildStyles({
                        pathColor: mode === 'focus' ? '#7c3aed' : '#10b981',
                        trailColor: '#18181b', // zinc-900
                        strokeLinecap: 'round',
                    })}
                >
                    <div className="text-center">
                        <div className="text-6xl font-mono font-bold tracking-tighter">
                            {formatTime(timeLeft)}
                        </div>
                        <div className="text-sm uppercase tracking-widest text-muted-foreground mt-2 font-medium">
                            {isActive ? 'Grinding...' : 'Ready'}
                        </div>
                    </div>
                </CircularProgressbarWithChildren>
            </div>

            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={toggleTimer}
                    className="w-16 h-16 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                >
                    {isActive ? <Pause className="fill-white text-white" /> : <Play className="fill-white text-white ml-1" />}
                </button>
                <button
                    onClick={resetTimer}
                    className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors"
                >
                    <RefreshCw className="w-5 h-5" />
                </button>
            </div>

            <div className="flex gap-2">
                {[15, 25, 45, 60].map(m => (
                    <button
                        key={m}
                        onClick={() => setTime(m)}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-colors border",
                            minutes === m
                                ? "bg-primary/10 border-primary text-primary"
                                : "bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-muted-foreground"
                        )}
                    >
                        {m}m
                    </button>
                ))}
            </div>
        </div>
    );
}
