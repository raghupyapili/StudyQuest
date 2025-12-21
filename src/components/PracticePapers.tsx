import React from 'react';
import { FileText, ExternalLink, Download, BookOpen, Calendar } from 'lucide-react';

interface PracticePaper {
    title: string;
    year?: string;
    subject: string;
    type: 'sample' | 'previous';
    url: string;
}

const practicePapers: PracticePaper[] = [
    // Mathematics
    { title: 'Mathematics Sample Paper 1', subject: 'Mathematics', type: 'sample', url: 'https://www.selfstudys.com/books/cbse-prev-paper/mathematics/10' },
    { title: 'Mathematics Sample Paper 2', subject: 'Mathematics', type: 'sample', url: 'https://www.cbse.gov.in/cbsenew/question-paper.html' },
    { title: 'Mathematics 2024', year: '2024', subject: 'Mathematics', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/mathematics/10' },
    { title: 'Mathematics 2023', year: '2023', subject: 'Mathematics', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/mathematics/10' },

    // Science
    { title: 'Science Sample Paper 1', subject: 'Science', type: 'sample', url: 'https://www.selfstudys.com/books/cbse-prev-paper/science/10' },
    { title: 'Science Sample Paper 2', subject: 'Science', type: 'sample', url: 'https://www.cbse.gov.in/cbsenew/question-paper.html' },
    { title: 'Science 2024', year: '2024', subject: 'Science', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/science/10' },
    { title: 'Science 2023', year: '2023', subject: 'Science', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/science/10' },

    // Social Science
    { title: 'Social Science Sample Paper 1', subject: 'Social Science', type: 'sample', url: 'https://www.selfstudys.com/books/cbse-prev-paper/social-science/10' },
    { title: 'Social Science Sample Paper 2', subject: 'Social Science', type: 'sample', url: 'https://www.cbse.gov.in/cbsenew/question-paper.html' },
    { title: 'Social Science 2024', year: '2024', subject: 'Social Science', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/social-science/10' },
    { title: 'Social Science 2023', year: '2023', subject: 'Social Science', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/social-science/10' },

    // English
    { title: 'English Sample Paper 1', subject: 'English', type: 'sample', url: 'https://www.selfstudys.com/books/cbse-prev-paper/english/10' },
    { title: 'English Sample Paper 2', subject: 'English', type: 'sample', url: 'https://www.cbse.gov.in/cbsenew/question-paper.html' },
    { title: 'English 2024', year: '2024', subject: 'English', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/english/10' },
    { title: 'English 2023', year: '2023', subject: 'English', type: 'previous', url: 'https://www.selfstudys.com/books/cbse-prev-paper/english/10' },
];

export function PracticePapers() {
    const subjects = ['All', ...new Set(practicePapers.map(p => p.subject))];
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
                    <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400 mb-2">
                        Practice Papers
                    </h1>
                    <p className="text-muted-foreground">
                        Sample papers and previous year question papers for board exam preparation
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <a
                        href="https://www.selfstudys.com/books/cbse-prev-paper"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Self Study
                    </a>
                    <a
                        href="https://www.cbse.gov.in/cbsenew/question-paper.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg transition-colors text-sm"
                    >
                        <ExternalLink className="w-4 h-4" />
                        CBSE Official
                    </a>
                </div>
            </div>

            {/* Filters */}
            <div className="glass-card p-4 rounded-xl">
                <div className="flex flex-wrap gap-4">
                    {/* Subject Filter */}
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                            Subject
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
                                Sample Papers
                            </button>
                            <button
                                onClick={() => setSelectedType('previous')}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${selectedType === 'previous'
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                                    : 'bg-zinc-800 text-muted-foreground hover:bg-zinc-700'
                                    }`}
                            >
                                Previous Years
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Papers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPapers.map((paper, index) => (
                    <a
                        key={index}
                        href={paper.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass-card p-5 rounded-xl hover:shadow-xl hover:shadow-primary/10 transition-all duration-200 group border border-zinc-800 hover:border-primary/50"
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
                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>

                        <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">
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

                        <div className="mt-3 pt-3 border-t border-zinc-800">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${paper.type === 'sample'
                                ? 'bg-green-500/10 text-green-400'
                                : 'bg-orange-500/10 text-orange-400'
                                }`}>
                                <Download className="w-3 h-3" />
                                {paper.type === 'sample' ? 'Sample Paper' : 'Previous Year'}
                            </span>
                        </div>
                    </a>
                ))}
            </div>

            {filteredPapers.length === 0 && (
                <div className="glass-card p-12 rounded-xl text-center">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
                    <p className="text-muted-foreground">No papers found for the selected filters</p>
                </div>
            )}

            {/* Info Card */}
            <div className="glass-card p-6 rounded-xl border-l-4 border-primary">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-primary" />
                    How to Use Practice Papers
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span><strong>Sample Papers:</strong> Practice with these to understand the exam pattern and question types</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span><strong>Previous Years:</strong> Solve these to get familiar with actual board exam questions</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span><strong>Time Yourself:</strong> Practice under exam conditions (3 hours for most papers)</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span><strong>Review Mistakes:</strong> Analyze incorrect answers to improve understanding</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
