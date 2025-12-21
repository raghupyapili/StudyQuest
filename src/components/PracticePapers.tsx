import React from 'react';
import { FileText, ExternalLink, BookOpen, Calendar, CheckCircle2 } from 'lucide-react';

interface PracticePaper {
    id: string;
    title: string;
    year?: string;
    subject: string;
    type: 'sample' | 'previous';
    url: string;
}

interface PracticePapersProps {
    completedIds: string[];
    onComplete: (id: string) => void;
}

const practicePapers: PracticePaper[] = [
    // Mathematics
    { id: 'math-s1', title: 'Mathematics Sample Paper 1', subject: 'Mathematics', type: 'sample', url: 'https://www.selfstudys.com/books/cbse-prev-paper/mathematics/10' },
    { id: 'math-s2', title: 'Mathematics Sample Paper 2', subject: 'Mathematics', type: 'sample', url: 'https://www.cbse.gov.in/cbsenew/question-paper.html' },
    { id: 'math-24', title: 'Mathematics 2024', year: '2024', subject: 'Mathematics', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/mathematics/10' },
    { id: 'math-23', title: 'Mathematics 2023', year: '2023', subject: 'Mathematics', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/mathematics/10' },

    // Science
    { id: 'sci-s1', title: 'Science Sample Paper 1', subject: 'Science', type: 'sample', url: 'https://www.selfstudys.com/books/cbse-prev-paper/science/10' },
    { id: 'sci-s2', title: 'Science Sample Paper 2', subject: 'Science', type: 'sample', url: 'https://www.cbse.gov.in/cbsenew/question-paper.html' },
    { id: 'sci-24', title: 'Science 2024', year: '2024', subject: 'Science', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/science/10' },
    { id: 'sci-23', title: 'Science 2023', year: '2023', subject: 'Science', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/science/10' },

    // Social Science
    { id: 'soc-s1', title: 'Social Science Sample Paper 1', subject: 'Social Science', type: 'sample', url: 'https://www.selfstudys.com/books/cbse-prev-paper/social-science/10' },
    { id: 'soc-s2', title: 'Social Science Sample Paper 2', subject: 'Social Science', type: 'sample', url: 'https://www.cbse.gov.in/cbsenew/question-paper.html' },
    { id: 'soc-24', title: 'Social Science 2024', year: '2024', subject: 'Social Science', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/social-science/10' },
    { id: 'soc-23', title: 'Social Science 2023', year: '2023', subject: 'Social Science', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/social-science/10' },

    // English
    { id: 'eng-s1', title: 'English Sample Paper 1', subject: 'English', type: 'sample', url: 'https://www.selfstudys.com/books/cbse-prev-paper/english/10' },
    { id: 'eng-s2', title: 'English Sample Paper 2', subject: 'English', type: 'sample', url: 'https://www.cbse.gov.in/cbsenew/question-paper.html' },
    { id: 'eng-24', title: 'English 2024', year: '2024', subject: 'English', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/english/10' },
    { id: 'eng-23', title: 'English 2023', year: '2023', subject: 'English', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/english/10' },
];

export function PracticePapers({ completedIds, onComplete }: PracticePapersProps) {
    const subjects = ['All', ...Array.from(new Set(practicePapers.map(p => p.subject)))];
    const [selectedSubject, setSelectedSubject] = React.useState('All');
    const [selectedType, setSelectedType] = React.useState<'all' | 'sample' | 'previous'>('all');

    const filteredPapers = practicePapers.filter(paper => {
        const subjectMatch = selectedSubject === 'All' || paper.subject === selectedSubject;
        const typeMatch = selectedType === 'all' || paper.type === selectedType;
        return subjectMatch && typeMatch;
    });

    return (
        <div className="p-8 space-y-6 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-2 font-outfit">
                        Slayer Mock Exams
                    </h1>
                    <p className="text-muted-foreground font-medium">
                        Sharpen your techniques with official board archives
                    </p>
                    <div className="mt-2 text-xs font-bold text-yellow-500 flex items-center gap-1 uppercase tracking-widest">
                        <CheckCircle2 className="w-3 h-3" /> Extra +200 XP for every mocked exam
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <a
                        href="https://www.selfstudys.com/books/cbse-prev-paper"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-bold uppercase tracking-wider"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Archives
                    </a>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-card p-4 rounded-xl">
                <div className="flex flex-wrap gap-4">
                    {/* Subject Filter */}
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                            Subject Archive
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {subjects.map(subject => (
                                <button
                                    key={subject}
                                    onClick={() => setSelectedSubject(subject)}
                                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedSubject === subject
                                        ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                        : 'bg-zinc-800 text-muted-foreground hover:bg-zinc-700'
                                        }`}
                                >
                                    {subject}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Type Filter */}
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                            Paper Type
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setSelectedType('all')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedType === 'all'
                                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                                    : 'bg-zinc-800 text-muted-foreground hover:bg-zinc-700'
                                    }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setSelectedType('sample')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedType === 'sample'
                                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
                                    : 'bg-zinc-800 text-muted-foreground hover:bg-zinc-700'
                                    }`}
                            >
                                Sample
                            </button>
                            <button
                                onClick={() => setSelectedType('previous')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedType === 'previous'
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                    : 'bg-zinc-800 text-muted-foreground hover:bg-zinc-700'
                                    }`}
                            >
                                Previous
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Papers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPapers.map((paper) => {
                    const isCompleted = completedIds.includes(paper.id);
                    return (
                        <div
                            key={paper.id}
                            className={`glass-card p-5 rounded-xl transition-all duration-200 group border relative overflow-hidden ${isCompleted ? 'border-green-500/50 bg-green-500/5' : 'border-zinc-800 hover:border-primary/50'
                                }`}
                        >
                            <div className="flex items-start justify-between mb-3">
                                <div className={`p-2 rounded-lg ${paper.type === 'sample'
                                    ? 'bg-green-500/10'
                                    : 'bg-orange-500/10'
                                    }`}>
                                    {paper.type === 'sample' ? (
                                        <FileText className={`w-5 h-5 ${paper.type === 'sample' ? 'text-green-500' : 'text-orange-500'
                                            }`} />
                                    ) : (
                                        <Calendar className="w-5 h-5 text-orange-500" />
                                    )}
                                </div>
                                {isCompleted ? (
                                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                                ) : (
                                    <a href={paper.url} target="_blank" rel="noopener noreferrer">
                                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </a>
                                )}
                            </div>

                            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors line-clamp-1">
                                {paper.title}
                            </h3>

                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <BookOpen className="w-3 h-3" />
                                <span>{paper.subject}</span>
                                {paper.year && (
                                    <>
                                        <span>•</span>
                                        <span>{paper.year}</span>
                                    </>
                                )}
                            </div>

                            <div className="mt-4 flex flex-col gap-2">
                                <a
                                    href={paper.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full text-center py-2 bg-zinc-900 hover:bg-zinc-800 rounded-lg text-xs font-bold uppercase transition-colors"
                                >
                                    Access Mission
                                </a>

                                {!isCompleted && (
                                    <button
                                        onClick={() => onComplete(paper.id)}
                                        className="w-full py-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 rounded-lg text-xs font-bold uppercase border border-yellow-500/20 transition-all"
                                    >
                                        Mark Attempted (+200 XP)
                                    </button>
                                )}
                                {isCompleted && (
                                    <div className="w-full py-2 bg-green-500/20 text-green-400 rounded-lg text-xs font-bold uppercase text-center flex items-center justify-center gap-1">
                                        <CheckCircle2 className="w-3 h-3" /> Technique Mastered
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {filteredPapers.length === 0 && (
                <div className="glass-card p-12 rounded-xl text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No archives found for the selected filters</p>
                </div>
            )}
        </div>
    );
}
