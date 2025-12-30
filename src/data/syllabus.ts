export type SubjectId = 'math' | 'science' | 'social' | 'english' | 'telugu' | 'hindi' | 'sanskrit' | 'computer' | 'ai';

export interface SubTopic {
    id: string;
    name: string;
}

export interface Chapter {
    id: string;
    name: string;
    isCompleted: boolean;
    xpReward: number;
    subtopics?: SubTopic[];
}

export interface Subject {
    id: SubjectId;
    name: string;
    color: string;
    icon: string;
    chapters: Chapter[];
    state?: 'TS' | 'AP';
}

export interface GradeSyllabus {
    [grade: string]: Subject[];
}

export const syllabusData: GradeSyllabus = {
    "10": [
        {
            id: 'math',
            name: 'Mathematics',
            color: 'text-blue-500',
            icon: 'Calculator',
            chapters: [
                { id: 'm1', name: 'Real Numbers', isCompleted: false, xpReward: 100, subtopics: [{ id: 'm1-1', name: 'Fundamental Theorem of Arithmetic' }, { id: 'm1-2', name: 'Revisiting Irrational Numbers' }, { id: 'm1-3', name: 'Proof of Irrationality (√2, √3)' }] },
                { id: 'm2', name: 'Polynomials', isCompleted: false, xpReward: 120, subtopics: [{ id: 'm2-1', name: 'Geometrical Meaning of Zeros' }, { id: 'm2-2', name: 'Relationship between Zeros and Coefficients' }] },
                { id: 'm3', name: 'Pair of Linear Equations in Two Variables', isCompleted: false, xpReward: 150, subtopics: [{ id: 'm3-1', name: 'Graphical Method of Solution' }, { id: 'm3-2', name: 'Substitution Method' }, { id: 'm3-3', name: 'Elimination Method' }] },
                { id: 'm4', name: 'Quadratic Equations', isCompleted: false, xpReward: 150, subtopics: [{ id: 'm4-1', name: 'Standard Form' }, { id: 'm4-2', name: 'Solution by Factorization' }, { id: 'm4-3', name: 'Nature of Roots' }] },
                { id: 'm5', name: 'Arithmetic Progressions', isCompleted: false, xpReward: 130, subtopics: [{ id: 'm5-1', name: 'nth Term of an AP' }, { id: 'm5-2', name: 'Sum of First n Terms' }] },
                { id: 'm6', name: 'Triangles', isCompleted: false, xpReward: 200, subtopics: [{ id: 'm6-1', name: 'Similar Figures' }, { id: 'm6-2', name: 'Similarity of Triangles' }, { id: 'm6-3', name: 'BPT (Thales Theorem)' }, { id: 'm6-4', name: 'Criteria for Similarity' }] },
                { id: 'm7', name: 'Coordinate Geometry', isCompleted: false, xpReward: 110, subtopics: [{ id: 'm7-1', name: 'Distance Formula' }, { id: 'm7-2', name: 'Section Formula' }] },
                { id: 'm8', name: 'Introduction to Trigonometry', isCompleted: false, xpReward: 180, subtopics: [{ id: 'm8-1', name: 'Trigonometric Ratios' }, { id: 'm8-2', name: 'Trigonometric Ratios of Specific Angles' }, { id: 'm8-3', name: 'Trigonometric Identities' }] },
                { id: 'm9', name: 'Some Applications of Trigonometry', isCompleted: false, xpReward: 140, subtopics: [{ id: 'm9-1', name: 'Heights and Distances' }] },
                { id: 'm10', name: 'Circles', isCompleted: false, xpReward: 160, subtopics: [{ id: 'm10-1', name: 'Tangent to a Circle' }, { id: 'm10-2', name: 'Number of Tangents from a Point' }] },
                { id: 'm11', name: 'Areas Related to Circles', isCompleted: false, xpReward: 130, subtopics: [{ id: 'm11-1', name: 'Area of Sector and Segment' }] },
                { id: 'm12', name: 'Surface Areas and Volumes', isCompleted: false, xpReward: 170, subtopics: [{ id: 'm12-1', name: 'Surface Area of Combined Solids' }, { id: 'm12-2', name: 'Volume of Combined Solids' }] },
                { id: 'm13', name: 'Statistics', isCompleted: false, xpReward: 150, subtopics: [{ id: 'm13-1', name: 'Mean of Grouped Data' }, { id: 'm13-2', name: 'Mode of Grouped Data' }, { id: 'm13-3', name: 'Median of Grouped Data' }] },
                { id: 'm14', name: 'Probability', isCompleted: false, xpReward: 100, subtopics: [{ id: 'm14-1', name: 'Theoretical Probability' }] },
            ]
        },
        {
            id: 'science',
            name: 'Science',
            color: 'text-emerald-500',
            icon: 'FlaskConical',
            chapters: [
                { id: 's1', name: 'Chemical Reactions and Equations', isCompleted: false, xpReward: 120, subtopics: [{ id: 's1-1', name: 'Chemical Equations' }, { id: 's1-2', name: 'Types of Chemical Reactions' }, { id: 's1-3', name: 'Oxidation and Reduction' }] },
                { id: 's2', name: 'Acids, Bases and Salts', isCompleted: false, xpReward: 130, subtopics: [{ id: 's2-1', name: 'Chemical Properties' }, { id: 's2-2', name: 'pH Scale' }, { id: 's2-3', name: 'Salts' }] },
                { id: 's3', name: 'Metals and Non-metals', isCompleted: false, xpReward: 140, subtopics: [{ id: 's3-1', name: 'Physical Properties' }, { id: 's3-2', name: 'Chemical Properties' }, { id: 's3-3', name: 'Occurrence of Metals' }] },
                { id: 's4', name: 'Carbon and its Compounds', isCompleted: false, xpReward: 160, subtopics: [{ id: 's4-1', name: 'Bonding in Carbon' }, { id: 's4-2', name: 'Versatile Nature' }, { id: 's4-3', name: 'Chemical Properties' }] },
                { id: 's5', name: 'Life Processes', isCompleted: false, xpReward: 180, subtopics: [{ id: 's5-1', name: 'Nutrition' }, { id: 's5-2', name: 'Respiration' }, { id: 's5-3', name: 'Transportation' }, { id: 's5-4', name: 'Excretion' }] },
                { id: 's6', name: 'Control and Coordination', isCompleted: false, xpReward: 150, subtopics: [{ id: 's6-1', name: 'Nervous System' }, { id: 's6-2', name: 'Reflex Action' }, { id: 's6-3', name: 'Hormones in Animals' }] },
                { id: 's7', name: 'How do Organisms Reproduce?', isCompleted: false, xpReward: 150, subtopics: [{ id: 's7-1', name: 'Asexual Reproduction' }, { id: 's7-2', name: 'Sexual Reproduction' }] },
                { id: 's8', name: 'Heredity', isCompleted: false, xpReward: 140, subtopics: [{ id: 's8-1', name: 'Accumulation of Variation' }, { id: 's8-2', name: 'Heredity' }, { id: 's8-3', name: 'Sex Determination' }] },
                { id: 's9', name: 'Light – Reflection and Refraction', isCompleted: false, xpReward: 170, subtopics: [{ id: 's9-1', name: 'Reflection of Light' }, { id: 's9-2', name: 'Spherical Mirrors' }, { id: 's9-3', name: 'Refraction of Light' }, { id: 's9-4', name: 'Lenses' }] },
                { id: 's10', name: 'The Human Eye and the Colourful World', isCompleted: false, xpReward: 120, subtopics: [{ id: 's10-1', name: 'Human Eye' }, { id: 's10-2', name: 'Defects of Vision' }, { id: 's10-3', name: 'Prism & Dispersion' }] },
                { id: 's11', name: 'Electricity', isCompleted: false, xpReward: 180, subtopics: [{ id: 's11-1', name: 'Current and Circuit' }, { id: 's11-2', name: 'Ohm\'s Law' }, { id: 's11-3', name: 'Resistance' }, { id: 's11-4', name: 'Heating Effect' }] },
                { id: 's12', name: 'Magnetic Effects of Electric Current', isCompleted: false, xpReward: 160, subtopics: [{ id: 's12-1', name: 'Magnetic Field' }, { id: 's12-2', name: 'Field Lines' }, { id: 's12-3', name: 'Force on Conductor' }] },
                { id: 's13', name: 'Our Environment', isCompleted: false, xpReward: 100, subtopics: [{ id: 's13-1', name: 'Ecosystem' }, { id: 's13-2', name: 'Food Chains' }, { id: 's13-3', name: 'Ozone Layer' }] },
            ]
        },
        {
            id: 'social',
            name: 'Social Science',
            color: 'text-amber-500',
            icon: 'Globe',
            chapters: [
                { id: 'ss1', name: 'History: Rise of Nationalism in Europe', isCompleted: false, xpReward: 150, subtopics: [{ id: 'ss1-1', name: 'Key Concepts' }, { id: 'ss1-2', name: 'Events & Dates' }] },
                { id: 'ss2', name: 'History: Nationalism in India', isCompleted: false, xpReward: 150, subtopics: [{ id: 'ss2-1', name: 'Key Concepts' }, { id: 'ss2-2', name: 'Events & Dates' }] },
                { id: 'ss3', name: 'Geography: Resources and Development', isCompleted: false, xpReward: 110, subtopics: [{ id: 'ss3-1', name: 'Classification' }] },
                { id: 'ss4', name: 'Pol. Sci: Power Sharing', isCompleted: false, xpReward: 100, subtopics: [{ id: 'ss4-1', name: 'Belgium & Sri Lanka' }] },
                { id: 'ss5', name: 'Economics: Development', isCompleted: false, xpReward: 120, subtopics: [{ id: 'ss5-1', name: 'Income and Goals' }] },
            ]
        },
        {
            id: 'english',
            name: 'English',
            color: 'text-rose-500',
            icon: 'BookOpen',
            chapters: [
                { id: 'e1', name: 'A Letter to God', isCompleted: false, xpReward: 100 },
                { id: 'e2', name: 'Nelson Mandela: Long Walk to Freedom', isCompleted: false, xpReward: 110 },
                { id: 'e3', name: 'Two Stories About Flying', isCompleted: false, xpReward: 120 },
                { id: 'e4', name: 'From the Diary of Anne Frank', isCompleted: false, xpReward: 120 },
                { id: 'e5', name: 'Glimpses of India', isCompleted: false, xpReward: 130 },
                { id: 'e6', name: 'Mijbil the Otter', isCompleted: false, xpReward: 110 },
                { id: 'e7', name: 'Madam Rides the Bus', isCompleted: false, xpReward: 120 },
                { id: 'e8', name: 'The Sermon at Benares', isCompleted: false, xpReward: 110 },
                { id: 'e9', name: 'The Proposal', isCompleted: false, xpReward: 130 },
                { id: 'e10', name: 'A Triumph of Surgery', isCompleted: false, xpReward: 100 },
                { id: 'e11', name: 'The Thief\'s Story', isCompleted: false, xpReward: 100 },
                { id: 'e12', name: 'Footprints without Feet', isCompleted: false, xpReward: 110 },
                { id: 'e13', name: 'The Making of a Scientist', isCompleted: false, xpReward: 120 },
                { id: 'e14', name: 'The Necklace', isCompleted: false, xpReward: 110 },
                { id: 'e15', name: 'Bholi', isCompleted: false, xpReward: 110 },
                { id: 'e16', name: 'The Book That Saved the Earth', isCompleted: false, xpReward: 120 },
            ]
        },
        {
            id: 'telugu',
            name: 'తెలుగు (Telugu - TS)',
            state: 'TS',
            color: 'text-purple-500',
            icon: 'Feather',
            chapters: [
                { id: 't1-ts', name: 'మాతృభూమి (Matrubhumi)', isCompleted: false, xpReward: 120 },
                { id: 't2-ts', name: 'ధన్యుడు (Dhanudu)', isCompleted: false, xpReward: 120 },
                { id: 't3-ts', name: 'వీర తెలంగాణ (Veera Telangana)', isCompleted: false, xpReward: 130 },
                { id: 't4-ts', name: 'కొత్తపాళీ (Kothapali)', isCompleted: false, xpReward: 110 },
                { id: 't5-ts', name: 'శతక మధురిమ (Shathaka Madhurima)', isCompleted: false, xpReward: 140 },
                { id: 't6-ts', name: 'నగర గీతం (Nagara Geetham)', isCompleted: false, xpReward: 120 },
                { id: 't7-ts', name: 'భాగ్యోదయం (Bhagyaodayam)', isCompleted: false, xpReward: 120 },
                { id: 't8-ts', name: 'లక్ష్యసిద్ధి (Lakshyasiddhi)', isCompleted: false, xpReward: 130 },
                { id: 't9-ts', name: 'జీవన భాష్యం (Jeevana Bashyam)', isCompleted: false, xpReward: 120 },
                { id: 't10-ts', name: 'గోల్కొండ పట్టణం (Golkonda Pattanam)', isCompleted: false, xpReward: 130 },
                { id: 't11-ts', name: 'భిక్ష (Bhiksha)', isCompleted: false, xpReward: 140 },
                { id: 't12-ts', name: 'చిత్రగ్రీవం (Chitragreevam)', isCompleted: false, xpReward: 150 },
            ]
        },
        {
            id: 'telugu',
            name: 'తెలుగు (Telugu - AP)',
            state: 'AP',
            color: 'text-purple-500',
            icon: 'Feather',
            chapters: [
                { id: 't1-ap', name: 'మాతృభూమి (Matrubhumi)', isCompleted: false, xpReward: 120 },
                { id: 't2-ap', name: 'అమరావతి (Amaravathi)', isCompleted: false, xpReward: 130 },
                { id: 't3-ap', name: 'జానపదుని జాబు (Janapadhuni Jabu)', isCompleted: false, xpReward: 120 },
                { id: 't4-ap', name: 'ధన్యజీవులు (Dhanya Jeevulu)', isCompleted: false, xpReward: 120 },
                { id: 't5-ap', name: 'శతక మధురిమ (Shathaka Madhurima)', isCompleted: false, xpReward: 140 },
                { id: 't6-ap', name: 'మా పల్లె (Ma Palle)', isCompleted: false, xpReward: 110 },
                { id: 't7-ap', name: 'సముద్ర లంఘనం (Samudra Langanam)', isCompleted: false, xpReward: 140 },
                { id: 't8-ap', name: 'చిత్రగ్రీవం (Chitragreevam)', isCompleted: false, xpReward: 150 },
            ]
        },
        {
            id: 'hindi',
            name: 'Hindi (Course A)',
            color: 'text-orange-600',
            icon: 'FileText',
            chapters: [
                { id: 'h1', name: 'क्षितिज: सूरदास के पद', isCompleted: false, xpReward: 100 },
                { id: 'h2', name: 'तुलसीदास: राम-लक्ष्मण-परशुराम संवाद', isCompleted: false, xpReward: 110 },
                { id: 'h3', name: 'जयशंकर प्रसाद: आत्मकथ्य', isCompleted: false, xpReward: 100 },
                { id: 'h4', name: 'सूर्यकांत त्रिपाठी \'निराला\': उत्साह, अट नहीं रही है', isCompleted: false, xpReward: 110 },
                { id: 'h5', name: 'नेताजी का चश्मा', isCompleted: false, xpReward: 100 },
                { id: 'h6', name: 'बालगोबिन भगत', isCompleted: false, xpReward: 100 },
                { id: 'h7', name: 'लखनवी अंदाज़', isCompleted: false, xpReward: 100 },
                { id: 'h8', name: 'माता का अँचल', isCompleted: false, xpReward: 110 },
            ]
        },
        {
            id: 'sanskrit',
            name: 'Sanskrit (Shemushi)',
            color: 'text-yellow-600',
            icon: 'Feather',
            chapters: [
                { id: 'san1', name: 'शुचिपर्यावरणम्', isCompleted: false, xpReward: 100 },
                { id: 'san2', name: 'बुद्धिर्बलवती सदा', isCompleted: false, xpReward: 110 },
                { id: 'san3', name: 'जननी तुल्यवत्सला', isCompleted: false, xpReward: 100 },
                { id: 'san4', name: 'सुभाषितानि', isCompleted: false, xpReward: 120 },
                { id: 'san5', name: 'सौहार्दं प्रकृतेः शोभा', isCompleted: false, xpReward: 110 },
            ]
        },
        {
            id: 'computer',
            name: 'Computer Applications',
            color: 'text-cyan-500',
            icon: 'Monitor',
            chapters: [
                { id: 'ca1', name: 'Networking', isCompleted: false, xpReward: 150 },
                { id: 'ca2', name: 'HTML - I', isCompleted: false, xpReward: 120 },
                { id: 'ca3', name: 'HTML - II', isCompleted: false, xpReward: 130 },
                { id: 'ca4', name: 'Cyber Ethics', isCompleted: false, xpReward: 140 },
            ]
        },
        {
            id: 'ai',
            name: 'Artificial Intelligence',
            color: 'text-indigo-500',
            icon: 'Cpu',
            chapters: [
                { id: 'ai1', name: 'Introduction to AI', isCompleted: false, xpReward: 100 },
                { id: 'ai2', name: 'AI Project Cycle', isCompleted: false, xpReward: 120 },
                { id: 'ai3', name: 'Advance Python', isCompleted: false, xpReward: 150 },
                { id: 'ai4', name: 'Data Science', isCompleted: false, xpReward: 130 },
                { id: 'ai5', name: 'Computer Vision', isCompleted: false, xpReward: 140 },
                { id: 'ai6', name: 'Natural Language Processing', isCompleted: false, xpReward: 140 },
                { id: 'ai7', name: 'Evaluation', isCompleted: false, xpReward: 110 },
            ]
        }
    ],
    "9": [
        {
            id: 'math',
            name: 'Mathematics',
            color: 'text-blue-500',
            icon: 'Calculator',
            chapters: [
                { id: 'm9-1', name: 'Number Systems', isCompleted: false, xpReward: 100, subtopics: [{ id: 'm9-1-1', name: 'Real Numbers and Operations' }, { id: 'm9-1-2', name: 'Laws of Exponents' }, { id: 'm9-1-3', name: 'Rationalization' }] },
                { id: 'm9-2', name: 'Polynomials', isCompleted: false, xpReward: 120, subtopics: [{ id: 'm9-2-1', name: 'Zeros of a Polynomial' }, { id: 'm9-2-2', name: 'Remainder and Factor Theorem' }, { id: 'm9-2-3', name: 'Algebraic Identities' }] },
                { id: 'm9-3', name: 'Coordinate Geometry', isCompleted: false, xpReward: 110, subtopics: [{ id: 'm9-3-1', name: 'Cartesian Plane' }, { id: 'm9-3-2', name: 'Plotting Points' }] },
                { id: 'm9-4', name: 'Linear Equations in Two Variables', isCompleted: false, xpReward: 130, subtopics: [{ id: 'm9-4-1', name: 'Standard Form ax+by+c=0' }, { id: 'm9-4-2', name: 'Solutions of Linear Equations' }] },
                { id: 'm9-5', name: 'Introduction to Euclid\'s Geometry', isCompleted: false, xpReward: 90, subtopics: [{ id: 'm9-5-1', name: 'Definitions, Axioms and Postulates' }] },
                { id: 'm9-6', name: 'Lines and Angles', isCompleted: false, xpReward: 140, subtopics: [{ id: 'm9-6-1', name: 'Basic Terms and Definitions' }, { id: 'm9-6-2', name: 'Pairs of Angles' }, { id: 'm9-6-3', name: 'Parallel Lines and Transversals' }] },
                { id: 'm9-7', name: 'Triangles', isCompleted: false, xpReward: 150, subtopics: [{ id: 'm9-7-1', name: 'Congruence of Triangles' }, { id: 'm9-7-2', name: 'Criteria for Congruence' }, { id: 'm9-7-3', name: 'Properties of Triangles' }] },
                { id: 'm9-8', name: 'Quadrilaterals', isCompleted: false, xpReward: 140, subtopics: [{ id: 'm9-8-1', name: 'Properties of Parallelograms' }, { id: 'm9-8-2', name: 'Mid-point Theorem' }] },
                { id: 'm9-9', name: 'Circles', isCompleted: false, xpReward: 160, subtopics: [{ id: 'm9-9-1', name: 'Angle Subtended by a Chord' }, { id: 'm9-9-2', name: 'Perpendicular from Center' }, { id: 'm9-9-3', name: 'Cyclic Quadrilaterals' }] },
                { id: 'm9-10', name: 'Heron\'s Formula', isCompleted: false, xpReward: 110, subtopics: [{ id: 'm9-10-1', name: 'Area of a Triangle' }] },
                { id: 'm9-11', name: 'Surface Areas and Volumes', isCompleted: false, xpReward: 170, subtopics: [{ id: 'm9-11-1', name: 'Surface Area of Cone and Sphere' }, { id: 'm9-11-2', name: 'Volume of Cone and Sphere' }] },
                { id: 'm9-12', name: 'Statistics', isCompleted: false, xpReward: 130, subtopics: [{ id: 'm9-12-1', name: 'Bar Graphs and Histograms' }, { id: 'm9-12-2', name: 'Frequency Polygons' }] },
            ]
        },
        {
            id: 'science',
            name: 'Science',
            color: 'text-emerald-500',
            icon: 'FlaskConical',
            chapters: [
                { id: 's9-1', name: 'Matter in Our Surroundings', isCompleted: false, xpReward: 110, subtopics: [{ id: 's9-1-1', name: 'Physical Nature of Matter' }, { id: 's9-1-2', name: 'States of Matter' }, { id: 's9-1-3', name: 'Evaporation' }] },
                { id: 's9-2', name: 'Is Matter Around Us Pure', isCompleted: false, xpReward: 120, subtopics: [{ id: 's9-2-1', name: 'Mixtures and Solutions' }, { id: 's9-2-2', name: 'Colloids and Suspensions' }, { id: 's9-2-3', name: 'Physical and Chemical Changes' }] },
                { id: 's9-3', name: 'Atoms and Molecules', isCompleted: false, xpReward: 150, subtopics: [{ id: 's9-3-1', name: 'Laws of Chemical Combination' }, { id: 's9-3-2', name: 'Writing Chemical Formulae' }, { id: 's9-3-3', name: 'Mole Concept' }] },
                { id: 's9-4', name: 'Structure of the Atom', isCompleted: false, xpReward: 140, subtopics: [{ id: 's9-4-1', name: 'Thomson and Rutherford Models' }, { id: 's9-4-2', name: 'Bohr\'s Model' }, { id: 's9-4-3', name: 'Valency and Isotopes' }] },
                { id: 's9-5', name: 'The Fundamental Unit of Life', isCompleted: false, xpReward: 130, subtopics: [{ id: 's9-5-1', name: 'Cell Organelles' }, { id: 's9-5-2', name: 'Nucleus and Chromosomes' }] },
                { id: 's9-6', name: 'Tissues', isCompleted: false, xpReward: 140, subtopics: [{ id: 's9-6-1', name: 'Plant Tissues' }, { id: 's9-6-2', name: 'Animal Tissues' }] },
                { id: 's9-7', name: 'Motion', isCompleted: false, xpReward: 150, subtopics: [{ id: 's9-7-1', name: 'Uniform and Non-uniform Motion' }, { id: 's9-7-2', name: 'Equations of Motion' }, { id: 's9-7-3', name: 'Circular Motion' }] },
                { id: 's9-8', name: 'Force and Laws of Motion', isCompleted: false, xpReward: 150, subtopics: [{ id: 's9-8-1', name: 'First Law of Motion' }, { id: 's9-8-2', name: 'Second Law (F=ma)' }, { id: 's9-8-3', name: 'Third Law and Momentum' }] },
                { id: 's9-9', name: 'Gravitation', isCompleted: false, xpReward: 140, subtopics: [{ id: 's9-9-1', name: 'Universal Law of Gravitation' }, { id: 's9-9-2', name: 'Free Fall and Mass/Weight' }] },
                { id: 's9-10', name: 'Work and Energy', isCompleted: false, xpReward: 140, subtopics: [{ id: 's9-10-1', name: 'Work Done by Force' }, { id: 's9-10-2', name: 'Kinetic and Potential Energy' }, { id: 's9-10-3', name: 'Law of Conservation of Energy' }] },
                { id: 's9-11', name: 'Sound', isCompleted: false, xpReward: 130, subtopics: [{ id: 's9-11-1', name: 'Production and Propagation' }, { id: 's9-11-2', name: 'Reflection and Echo' }] },
                { id: 's9-12', name: 'Improvement in Food Resources', isCompleted: false, xpReward: 110, subtopics: [{ id: 's9-12-1', name: 'Crop Variety Improvement' }, { id: 's9-12-2', name: 'Animal Husbandry' }] },
            ]
        },
        {
            id: 'social',
            name: 'Social Science',
            color: 'text-amber-500',
            icon: 'Globe',
            chapters: [
                { id: 'ss9-1', name: 'French Revolution', isCompleted: false, xpReward: 140 },
                { id: 'ss9-2', name: 'Socialism in Europe', isCompleted: false, xpReward: 140 },
                { id: 'ss9-3', name: 'Nazism and the Rise of Hitler', isCompleted: false, xpReward: 140 },
                { id: 'ss9-4', name: 'India - Size and Location', isCompleted: false, xpReward: 100 },
                { id: 'ss9-5', name: 'Physical Features of India', isCompleted: false, xpReward: 120 },
            ]
        },
        {
            id: 'english',
            name: 'English',
            color: 'text-rose-500',
            icon: 'BookOpen',
            chapters: [
                { id: 'e9-1', name: 'The Fun They Had', isCompleted: false, xpReward: 100 },
                { id: 'e9-2', name: 'The Sound of Music', isCompleted: false, xpReward: 110 },
                { id: 'e9-3', name: 'The Little Girl', isCompleted: false, xpReward: 100 },
                { id: 'e9-4', name: 'A Truly Beautiful Mind', isCompleted: false, xpReward: 110 },
                { id: 'e9-5', name: 'The Snake and the Mirror', isCompleted: false, xpReward: 120 },
                { id: 'e9-6', name: 'My Childhood', isCompleted: false, xpReward: 110 },
                { id: 'e9-7', name: 'Reach for the Top', isCompleted: false, xpReward: 120 },
                { id: 'e9-8', name: 'Kathmandu', isCompleted: false, xpReward: 110 },
                { id: 'e9-9', name: 'If I Were You', isCompleted: false, xpReward: 120 },
                { id: 'e9-10', name: 'The Lost Child', isCompleted: false, xpReward: 100 },
                { id: 'e9-11', name: 'The Adventures of Toto', isCompleted: false, xpReward: 110 },
                { id: 'e9-12', name: 'Iswaran the Storyteller', isCompleted: false, xpReward: 110 },
                { id: 'e9-13', name: 'In the Kingdom of Fools', isCompleted: false, xpReward: 120 },
                { id: 'e9-14', name: 'The Happy Prince', isCompleted: false, xpReward: 110 },
                { id: 'e9-15', name: 'The Last Leaf', isCompleted: false, xpReward: 130 },
                { id: 'e9-16', name: 'A House Is Not a Home', isCompleted: false, xpReward: 120 },
                { id: 'e9-17', name: 'The Beggar', isCompleted: false, xpReward: 110 },
            ]
        },
        {
            id: 'telugu',
            name: 'తెలుగు (Telugu - TS)',
            state: 'TS',
            color: 'text-purple-500',
            icon: 'Feather',
            chapters: [
                { id: 't9-1ts', name: 'ధర్మార్జునులు (Dharmarjunulu)', isCompleted: false, xpReward: 120 },
                { id: 't9-2ts', name: 'స్వభాష (Swabhasha)', isCompleted: false, xpReward: 120 },
                { id: 't9-3ts', name: 'వలయాలు (Valayalu)', isCompleted: false, xpReward: 110 },
                { id: 't9-4ts', name: 'ప్రేరణ (Prerana)', isCompleted: false, xpReward: 130 },
                { id: 't9-5ts', name: 'శతక మధురిమ (Shathaka Madhurima)', isCompleted: false, xpReward: 140 },
                { id: 't9-6ts', name: 'తీయని పలకరింపు (Teeyani Palakarimpu)', isCompleted: false, xpReward: 120 },
                { id: 't9-7ts', name: 'ఆత్మరక్షణ (Atma Rakshana)', isCompleted: false, xpReward: 110 },
                { id: 't9-8ts', name: 'భాగ్యోదయం (Bhagyaodayam)', isCompleted: false, xpReward: 130 },
            ]
        },
        {
            id: 'telugu',
            name: 'తెలుగు (Telugu - AP)',
            state: 'AP',
            color: 'text-purple-500',
            icon: 'Feather',
            chapters: [
                { id: 't9-1ap', name: 'శివతాండవం (Shiva Tandavam)', isCompleted: false, xpReward: 140 },
                { id: 't9-2ap', name: 'ఋణానుబంధం (Runanubandham)', isCompleted: false, xpReward: 120 },
                { id: 't9-3ap', name: 'స్వభాష (Swabhasha)', isCompleted: false, xpReward: 120 },
                { id: 't9-4ap', name: 'ప్రేరణ (Prerana)', isCompleted: false, xpReward: 130 },
                { id: 't9-5ap', name: 'శతక మధురిమ (Shathaka Madhurima)', isCompleted: false, xpReward: 140 },
            ]
        },
    ],
    "8": [
        {
            id: 'math',
            name: 'Mathematics',
            color: 'text-blue-500',
            icon: 'Calculator',
            chapters: [
                { id: 'm8-1', name: 'Rational Numbers', isCompleted: false, xpReward: 100 },
                { id: 'm8-2', name: 'Linear Equations in One Variable', isCompleted: false, xpReward: 120 },
                { id: 'm8-3', name: 'Understanding Quadrilaterals', isCompleted: false, xpReward: 110 },
                { id: 'm8-4', name: 'Data Handling', isCompleted: false, xpReward: 110 },
                { id: 'm8-5', name: 'Squares and Square Roots', isCompleted: false, xpReward: 120 },
                { id: 'm8-6', name: 'Cubes and Cube Roots', isCompleted: false, xpReward: 120 },
                { id: 'm8-7', name: 'Comparing Quantities', isCompleted: false, xpReward: 130 },
                { id: 'm8-8', name: 'Algebraic Expressions and Identities', isCompleted: false, xpReward: 140 },
                { id: 'm8-9', name: 'Mensuration', isCompleted: false, xpReward: 150 },
                { id: 'm8-10', name: 'Exponents and Powers', isCompleted: false, xpReward: 110 },
                { id: 'm8-11', name: 'Direct and Inverse Proportions', isCompleted: false, xpReward: 120 },
                { id: 'm8-12', name: 'Factorisation', isCompleted: false, xpReward: 140 },
                { id: 'm8-13', name: 'Introduction to Graphs', isCompleted: false, xpReward: 110 },
            ]
        },
        {
            id: 'science',
            name: 'Science',
            color: 'text-emerald-500',
            icon: 'FlaskConical',
            chapters: [
                { id: 's8-1', name: 'Crop Production and Management', isCompleted: false, xpReward: 110 },
                { id: 's8-2', name: 'Microorganisms: Friend and Foe', isCompleted: false, xpReward: 120 },
                { id: 's8-3', name: 'Coal and Petroleum', isCompleted: false, xpReward: 110 },
                { id: 's8-4', name: 'Combustion and Flame', isCompleted: false, xpReward: 110 },
                { id: 's8-5', name: 'Conservation of Plants and Animals', isCompleted: false, xpReward: 120 },
                { id: 's8-6', name: 'Reproduction in Animals', isCompleted: false, xpReward: 130 },
                { id: 's8-7', name: 'Reaching the Age of Adolescence', isCompleted: false, xpReward: 140 },
                { id: 's8-8', name: 'Force and Pressure', isCompleted: false, xpReward: 130 },
                { id: 's8-9', name: 'Friction', isCompleted: false, xpReward: 120 },
                { id: 's8-10', name: 'Sound', isCompleted: false, xpReward: 130 },
                { id: 's8-11', name: 'Chemical Effects of Electric Current', isCompleted: false, xpReward: 140 },
                { id: 's8-12', name: 'Some Natural Phenomena', isCompleted: false, xpReward: 120 },
                { id: 's8-13', name: 'Light', isCompleted: false, xpReward: 130 },
            ]
        },
        {
            id: 'social',
            name: 'Social Science',
            color: 'text-amber-500',
            icon: 'Globe',
            chapters: [
                { id: 'ss8-1', name: 'How, When and Where', isCompleted: false, xpReward: 100 },
                { id: 'ss8-2', name: 'From Trade to Territory', isCompleted: false, xpReward: 120 },
                { id: 'ss8-3', name: 'Ruling the Countryside', isCompleted: false, xpReward: 110 },
                { id: 'ss8-4', name: 'Tribals, Dikus and the Vision of a Golden Age', isCompleted: false, xpReward: 120 },
                { id: 'ss8-5', name: 'The Indian Constitution', isCompleted: false, xpReward: 130 },
            ]
        },
        {
            id: 'english',
            name: 'English',
            color: 'text-rose-500',
            icon: 'BookOpen',
            chapters: [
                { id: 'e8-1', name: 'The Best Christmas Present in the World', isCompleted: false, xpReward: 100 },
                { id: 'e8-2', name: 'The Tsunami', isCompleted: false, xpReward: 110 },
            ]
        },
        {
            id: 'telugu',
            name: 'తెలుగు (Telugu)',
            color: 'text-purple-500',
            icon: 'Feather',
            chapters: [
                { id: 't8-1', name: 'మానేటి కిరీటం', isCompleted: false, xpReward: 120 },
            ]
        },
        {
            id: 'hindi',
            name: 'Hindi',
            color: 'text-orange-600',
            icon: 'FileText',
            chapters: [{ id: 'h8-1', name: 'Vasant Chapter 1', isCompleted: false, xpReward: 100 }]
        },
        {
            id: 'sanskrit',
            name: 'Sanskrit',
            color: 'text-yellow-600',
            icon: 'Feather',
            chapters: [{ id: 'san8-1', name: 'Ruchira Chapter 1', isCompleted: false, xpReward: 100 }]
        },
        {
            id: 'computer',
            name: 'Computer',
            color: 'text-cyan-500',
            icon: 'Monitor',
            chapters: [{ id: 'ca8-1', name: 'Networking Basics', isCompleted: false, xpReward: 100 }]
        },
        {
            id: 'ai',
            name: 'AI',
            color: 'text-indigo-500',
            icon: 'Cpu',
            chapters: [{ id: 'ai8-1', name: 'Intro to AI', isCompleted: false, xpReward: 100 }]
        },
    ],
    "7": [
        {
            id: 'math',
            name: 'Mathematics',
            color: 'text-blue-500',
            icon: 'Calculator',
            chapters: [
                { id: 'm7-1', name: 'Integers', isCompleted: false, xpReward: 100 },
                { id: 'm7-2', name: 'Fractions and Decimals', isCompleted: false, xpReward: 120 },
                { id: 'm7-3', name: 'Data Handling', isCompleted: false, xpReward: 110 },
                { id: 'm7-4', name: 'Simple Equations', isCompleted: false, xpReward: 120 },
                { id: 'm7-5', name: 'Lines and Angles', isCompleted: false, xpReward: 130 },
                { id: 'm7-6', name: 'The Triangle and its Properties', isCompleted: false, xpReward: 140 },
                { id: 'm7-7', name: 'Comparing Quantities', isCompleted: false, xpReward: 130 },
                { id: 'm7-8', name: 'Rational Numbers', isCompleted: false, xpReward: 110 },
                { id: 'm7-9', name: 'Perimeter and Area', isCompleted: false, xpReward: 140 },
                { id: 'm7-10', name: 'Algebraic Expressions', isCompleted: false, xpReward: 130 },
                { id: 'm7-11', name: 'Exponents and Powers', isCompleted: false, xpReward: 120 },
                { id: 'm7-12', name: 'Symmetry', isCompleted: false, xpReward: 100 },
                { id: 'm7-13', name: 'Visualising Solid Shapes', isCompleted: false, xpReward: 100 },
            ]
        },
        {
            id: 'science',
            name: 'Science',
            color: 'text-emerald-500',
            icon: 'FlaskConical',
            chapters: [
                { id: 's7-1', name: 'Nutrition in Plants', isCompleted: false, xpReward: 110 },
                { id: 's7-2', name: 'Nutrition in Animals', isCompleted: false, xpReward: 120 },
                { id: 's7-3', name: 'Heat', isCompleted: false, xpReward: 110 },
                { id: 's7-4', name: 'Acids, Bases and Salts', isCompleted: false, xpReward: 120 },
                { id: 's7-5', name: 'Physical and Chemical Changes', isCompleted: false, xpReward: 130 },
                { id: 's7-6', name: 'Respiration in Organisms', isCompleted: false, xpReward: 130 },
                { id: 's7-7', name: 'Transportation in Animals and Plants', isCompleted: false, xpReward: 140 },
                { id: 's7-8', name: 'Reproduction in Plants', isCompleted: false, xpReward: 130 },
                { id: 's7-9', name: 'Motion and Time', isCompleted: false, xpReward: 140 },
                { id: 's7-10', name: 'Electric Current and its Effects', isCompleted: false, xpReward: 150 },
                { id: 's7-11', name: 'Light', isCompleted: false, xpReward: 130 },
                { id: 's7-12', name: 'Forests: Our Lifeline', isCompleted: false, xpReward: 110 },
                { id: 's7-13', name: 'Wastewater Story', isCompleted: false, xpReward: 100 },
            ]
        },
        {
            id: 'social',
            name: 'Social Science',
            color: 'text-amber-500',
            icon: 'Globe',
            chapters: [
                { id: 'ss7-1', name: 'Tracing Changes Through a Thousand Years', isCompleted: false, xpReward: 110 },
                { id: 'ss7-2', name: 'Kings and Kingdoms', isCompleted: false, xpReward: 120 },
                { id: 'ss7-3', name: 'Delhi: 12th to 15th Century', isCompleted: false, xpReward: 120 },
                { id: 'ss7-4', name: 'The Mughals', isCompleted: false, xpReward: 130 },
                { id: 'ss7-5', name: 'Environment', isCompleted: false, xpReward: 100 },
            ]
        },
        {
            id: 'english',
            name: 'English',
            color: 'text-rose-500',
            icon: 'BookOpen',
            chapters: [
                { id: 'e7-1', name: 'Three Questions', isCompleted: false, xpReward: 100 },
                { id: 'e7-2', name: 'A Gift of Chappals', isCompleted: false, xpReward: 110 },
            ]
        },
        {
            id: 'telugu',
            name: 'తెలుగు (Telugu)',
            color: 'text-purple-500',
            icon: 'Feather',
            chapters: [
                { id: 't7-1', name: 'చదువు', isCompleted: false, xpReward: 120 },
            ]
        }
    ],
    "6": [
        {
            id: 'math',
            name: 'Mathematics',
            color: 'text-blue-500',
            icon: 'Calculator',
            chapters: [
                { id: 'm6-1', name: 'Knowing Our Numbers', isCompleted: false, xpReward: 100 },
                { id: 'm6-2', name: 'Whole Numbers', isCompleted: false, xpReward: 110 },
                { id: 'm6-3', name: 'Playing With Numbers', isCompleted: false, xpReward: 120 },
                { id: 'm6-4', name: 'Basic Geometrical Ideas', isCompleted: false, xpReward: 110 },
                { id: 'm6-5', name: 'Understanding Elementary Shapes', isCompleted: false, xpReward: 120 },
                { id: 'm6-6', name: 'Integers', isCompleted: false, xpReward: 130 },
                { id: 'm6-7', name: 'Fractions', isCompleted: false, xpReward: 120 },
                { id: 'm6-8', name: 'Decimals', isCompleted: false, xpReward: 120 },
                { id: 'm6-9', name: 'Data Handling', isCompleted: false, xpReward: 110 },
                { id: 'm6-10', name: 'Mensuration', isCompleted: false, xpReward: 140 },
                { id: 'm6-11', name: 'Algebra', isCompleted: false, xpReward: 130 },
                { id: 'm6-12', name: 'Ratio and Proportion', isCompleted: false, xpReward: 130 },
            ]
        },
        {
            id: 'science',
            name: 'Science',
            color: 'text-emerald-500',
            icon: 'FlaskConical',
            chapters: [
                { id: 's6-1', name: 'Components of Food', isCompleted: false, xpReward: 110 },
                { id: 's6-2', name: 'Sorting Materials into Groups', isCompleted: false, xpReward: 110 },
                { id: 's6-3', name: 'Separation of Substances', isCompleted: false, xpReward: 120 },
                { id: 's6-4', name: 'Getting to Know Plants', isCompleted: false, xpReward: 130 },
                { id: 's6-5', name: 'Body Movements', isCompleted: false, xpReward: 130 },
                { id: 's6-6', name: 'The Living Organisms and Their Surroundings', isCompleted: false, xpReward: 140 },
                { id: 's6-7', name: 'Motion and Measurement of Distances', isCompleted: false, xpReward: 130 },
                { id: 's6-8', name: 'Light, Shadows and Reflections', isCompleted: false, xpReward: 130 },
                { id: 's6-9', name: 'Electricity and Circuits', isCompleted: false, xpReward: 140 },
                { id: 's6-10', name: 'Fun with Magnets', isCompleted: false, xpReward: 120 },
                { id: 's6-11', name: 'Air Around Us', isCompleted: false, xpReward: 110 },
            ]
        },
        {
            id: 'social',
            name: 'Social Science',
            color: 'text-amber-500',
            icon: 'Globe',
            chapters: [
                { id: 'ss6-1', name: 'What, Where, How and When?', isCompleted: false, xpReward: 100 },
                { id: 'ss6-2', name: 'From Hunting-Gathering to Growing Food', isCompleted: false, xpReward: 110 },
                { id: 'ss6-3', name: 'In the Earliest Cities', isCompleted: false, xpReward: 120 },
                { id: 'ss6-4', name: 'What Books and Burials Tell Us', isCompleted: false, xpReward: 110 },
                { id: 'ss6-5', name: 'The Earth in the Solar System', isCompleted: false, xpReward: 100 },
            ]
        },
        {
            id: 'english',
            name: 'English',
            color: 'text-rose-500',
            icon: 'BookOpen',
            chapters: [
                { id: 'e6-1', name: 'Who Did Patrick\'s Homework?', isCompleted: false, xpReward: 100 },
                { id: 'e6-2', name: 'How the Dog Found Himself a New Master!', isCompleted: false, xpReward: 110 },
            ]
        },
        {
            id: 'telugu',
            name: 'తెలుగు (Telugu)',
            color: 'text-purple-500',
            icon: 'Feather',
            chapters: [
                { id: 't6-1', name: 'అభినందన', isCompleted: false, xpReward: 120 },
            ]
        }
    ]
};
