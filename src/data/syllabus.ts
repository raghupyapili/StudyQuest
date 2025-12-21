export type SubjectId = 'math' | 'science' | 'social' | 'english' | 'telugu';

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
}

export const syllabusData: Subject[] = [
    {
        id: 'math',
        name: 'Mathematics',
        color: 'text-blue-500',
        icon: 'Calculator',
        chapters: [
            {
                id: 'm1',
                name: 'Real Numbers',
                isCompleted: false,
                xpReward: 100,
                subtopics: [
                    { id: 'm1-1', name: 'Fundamental Theorem of Arithmetic' },
                    { id: 'm1-2', name: 'Revisiting Irrational Numbers' },
                    { id: 'm1-3', name: 'Proof of Irrationality (√2, √3)' }
                ]
            },
            {
                id: 'm2',
                name: 'Polynomials',
                isCompleted: false,
                xpReward: 120,
                subtopics: [
                    { id: 'm2-1', name: 'Geometrical Meaning of Zeros' },
                    { id: 'm2-2', name: 'Relationship between Zeros and Coefficients' }
                ]
            },
            {
                id: 'm3',
                name: 'Pair of Linear Equations in Two Variables',
                isCompleted: false,
                xpReward: 150,
                subtopics: [
                    { id: 'm3-1', name: 'Graphical Method of Solution' },
                    { id: 'm3-2', name: 'Substitution Method' },
                    { id: 'm3-3', name: 'Elimination Method' }
                ]
            },
            {
                id: 'm4',
                name: 'Quadratic Equations',
                isCompleted: false,
                xpReward: 150,
                subtopics: [
                    { id: 'm4-1', name: 'Standard Form' },
                    { id: 'm4-2', name: 'Solution by Factorization' },
                    { id: 'm4-3', name: 'Nature of Roots' }
                ]
            },
            {
                id: 'm5',
                name: 'Arithmetic Progressions',
                isCompleted: false,
                xpReward: 130,
                subtopics: [
                    { id: 'm5-1', name: 'nth Term of an AP' },
                    { id: 'm5-2', name: 'Sum of First n Terms' }
                ]
            },
            {
                id: 'm6',
                name: 'Triangles',
                isCompleted: false,
                xpReward: 200,
                subtopics: [
                    { id: 'm6-1', name: 'Similar Figures' },
                    { id: 'm6-2', name: 'Similarity of Triangles' },
                    { id: 'm6-3', name: 'BPT (Thales Theorem)' },
                    { id: 'm6-4', name: 'Criteria for Similarity' }
                ]
            },
            {
                id: 'm7',
                name: 'Coordinate Geometry',
                isCompleted: false,
                xpReward: 110,
                subtopics: [
                    { id: 'm7-1', name: 'Distance Formula' },
                    { id: 'm7-2', name: 'Section Formula' }
                ]
            },
            {
                id: 'm8',
                name: 'Introduction to Trigonometry',
                isCompleted: false,
                xpReward: 180,
                subtopics: [
                    { id: 'm8-1', name: 'Trigonometric Ratios' },
                    { id: 'm8-2', name: 'Trigonometric Ratios of Specific Angles' },
                    { id: 'm8-3', name: 'Trigonometric Identities' }
                ]
            },
            {
                id: 'm9',
                name: 'Some Applications of Trigonometry',
                isCompleted: false,
                xpReward: 140,
                subtopics: [
                    { id: 'm9-1', name: 'Heights and Distances' }
                ]
            },
            {
                id: 'm10',
                name: 'Circles',
                isCompleted: false,
                xpReward: 160,
                subtopics: [
                    { id: 'm10-1', name: 'Tangent to a Circle' },
                    { id: 'm10-2', name: 'Number of Tangents from a Point' }
                ]
            },
            {
                id: 'm11',
                name: 'Areas Related to Circles',
                isCompleted: false,
                xpReward: 130,
                subtopics: [
                    { id: 'm11-1', name: 'Area of Sector and Segment' }
                ]
            },
            {
                id: 'm12',
                name: 'Surface Areas and Volumes',
                isCompleted: false,
                xpReward: 170,
                subtopics: [
                    { id: 'm12-1', name: 'Surface Area of Combined Solids' },
                    { id: 'm12-2', name: 'Volume of Combined Solids' }
                ]
            },
            {
                id: 'm13',
                name: 'Statistics',
                isCompleted: false,
                xpReward: 150,
                subtopics: [
                    { id: 'm13-1', name: 'Mean of Grouped Data' },
                    { id: 'm13-2', name: 'Mode of Grouped Data' },
                    { id: 'm13-3', name: 'Median of Grouped Data' }
                ]
            },
            {
                id: 'm14',
                name: 'Probability',
                isCompleted: false,
                xpReward: 100,
                subtopics: [
                    { id: 'm14-1', name: 'Theoretical Probability' }
                ]
            },
        ]
    },
    {
        id: 'science',
        name: 'Science',
        color: 'text-emerald-500',
        icon: 'FlaskConical',
        chapters: [
            {
                id: 's1',
                name: 'Chemical Reactions and Equations',
                isCompleted: false,
                xpReward: 120,
                subtopics: [
                    { id: 's1-1', name: 'Chemical Equations' },
                    { id: 's1-2', name: 'Types of Chemical Reactions' },
                    { id: 's1-3', name: 'Oxidation and Reduction' }
                ]
            },
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
            {
                id: 'ss1',
                name: 'History: The Rise of Nationalism in Europe',
                isCompleted: false,
                xpReward: 150,
                subtopics: [
                    { id: 'ss1-1', name: 'Key Concepts' },
                    { id: 'ss1-2', name: 'Important Events & Dates' },
                    { id: 'ss1-3', name: 'Long Answer Topics' },
                    { id: 'ss1-4', name: 'Map Skills' }
                ]
            },
            {
                id: 'ss2',
                name: 'History: Nationalism in India',
                isCompleted: false,
                xpReward: 150,
                subtopics: [
                    { id: 'ss2-1', name: 'Key Concepts' },
                    { id: 'ss2-2', name: 'Important Events & Dates' },
                    { id: 'ss2-3', name: 'Long Answer Topics' },
                    { id: 'ss2-4', name: 'Map Skills' }
                ]
            },
            {
                id: 'ss3',
                name: 'History: The Making of a Global World',
                isCompleted: false,
                xpReward: 130,
                subtopics: [
                    { id: 'ss3-1', name: 'Key Concepts' },
                    { id: 'ss3-2', name: 'Important Events & Dates' },
                    { id: 'ss3-3', name: 'Long Answer Topics' }
                ]
            },
            {
                id: 'ss4',
                name: 'History: Print Culture and the Modern World',
                isCompleted: false,
                xpReward: 120,
                subtopics: [
                    { id: 'ss4-1', name: 'Key Concepts' },
                    { id: 'ss4-2', name: 'Important Events & Dates' },
                    { id: 'ss4-3', name: 'Long Answer Topics' }
                ]
            },
            {
                id: 'ss5',
                name: 'Geography: Resources and Development',
                isCompleted: false,
                xpReward: 110,
                subtopics: [
                    { id: 'ss5-1', name: 'Key Concepts' },
                    { id: 'ss5-2', name: 'Resource Classification' },
                    { id: 'ss5-3', name: 'Map Skills' }
                ]
            },
            {
                id: 'ss6',
                name: 'Geography: Forest and Wildlife Resources',
                isCompleted: false,
                xpReward: 100,
                subtopics: [
                    { id: 'ss6-1', name: 'Key Concepts' },
                    { id: 'ss6-2', name: 'Conservation Methods' },
                    { id: 'ss6-3', name: 'Map Skills' }
                ]
            },
            {
                id: 'ss7',
                name: 'Geography: Water Resources',
                isCompleted: false,
                xpReward: 100,
                subtopics: [
                    { id: 'ss7-1', name: 'Key Concepts' },
                    { id: 'ss7-2', name: 'Dams and Conservation' },
                    { id: 'ss7-3', name: 'Map Skills' }
                ]
            },
            {
                id: 'ss8',
                name: 'Geography: Agriculture',
                isCompleted: false,
                xpReward: 130,
                subtopics: [
                    { id: 'ss8-1', name: 'Types of Farming' },
                    { id: 'ss8-2', name: 'Major Crops' },
                    { id: 'ss8-3', name: 'Map Skills' }
                ]
            },
            {
                id: 'ss9',
                name: 'Geography: Minerals and Energy Resources',
                isCompleted: false,
                xpReward: 120,
                subtopics: [
                    { id: 'ss9-1', name: 'Classification of Minerals' },
                    { id: 'ss9-2', name: 'Conventional/Non-Conventional Energy' },
                    { id: 'ss9-3', name: 'Map Skills' }
                ]
            },
            {
                id: 'ss10',
                name: 'Geography: Manufacturing Industries',
                isCompleted: false,
                xpReward: 130,
                subtopics: [
                    { id: 'ss10-1', name: 'Importance of Manufacturing' },
                    { id: 'ss10-2', name: 'Industrial Pollution' },
                    { id: 'ss10-3', name: 'Map Skills' }
                ]
            },
            {
                id: 'ss11',
                name: 'Geography: Lifelines of National Economy',
                isCompleted: false,
                xpReward: 120,
                subtopics: [
                    { id: 'ss11-1', name: 'Transport & Communication' },
                    { id: 'ss11-2', name: 'Trade & Tourism' },
                    { id: 'ss11-3', name: 'Map Skills' }
                ]
            },
            {
                id: 'ss12',
                name: 'Pol. Sci: Power Sharing',
                isCompleted: false,
                xpReward: 100,
                subtopics: [
                    { id: 'ss12-1', name: 'Case Studies: Belgium & Sri Lanka' },
                    { id: 'ss12-2', name: 'Forms of Power Sharing' }
                ]
            },
            {
                id: 'ss13',
                name: 'Pol. Sci: Federalism',
                isCompleted: false,
                xpReward: 110,
                subtopics: [
                    { id: 'ss13-1', name: 'What is Federalism?' },
                    { id: 'ss13-2', name: 'Decentralization in India' }
                ]
            },
            {
                id: 'ss14',
                name: 'Pol. Sci: Gender, Religion and Caste',
                isCompleted: false,
                xpReward: 120,
                subtopics: [
                    { id: 'ss14-1', name: 'Gender & Politics' },
                    { id: 'ss14-2', name: 'Religion, Communalism & Politics' },
                    { id: 'ss14-3', name: 'Caste & Politics' }
                ]
            },
            {
                id: 'ss15',
                name: 'Pol. Sci: Political Parties',
                isCompleted: false,
                xpReward: 130,
                subtopics: [
                    { id: 'ss15-1', name: 'Need for Political Parties' },
                    { id: 'ss15-2', name: 'National & State Parties' },
                    { id: 'ss15-3', name: 'Challenges to Parties' }
                ]
            },
            {
                id: 'ss16',
                name: 'Pol. Sci: Outcomes of Democracy',
                isCompleted: false,
                xpReward: 110,
                subtopics: [
                    { id: 'ss16-1', name: 'Accountable Government' },
                    { id: 'ss16-2', name: 'Economic Growth & Development' },
                    { id: 'ss16-3', name: 'Dignity of Citizens' }
                ]
            },
            {
                id: 'ss17',
                name: 'Economics: Development',
                isCompleted: false,
                xpReward: 120,
                subtopics: [
                    { id: 'ss17-1', name: 'What Development Promises' },
                    { id: 'ss17-2', name: 'Income and Other Goals' },
                    { id: 'ss17-3', name: 'Sustainability of Development' }
                ]
            },
            {
                id: 'ss18',
                name: 'Economics: Sectors of the Indian Economy',
                isCompleted: false,
                xpReward: 130,
                subtopics: [
                    { id: 'ss18-1', name: 'Primary, Secondary, Tertiary' },
                    { id: 'ss18-2', name: 'Organized vs Unorganized' },
                    { id: 'ss18-3', name: 'Public vs Private' }
                ]
            },
            {
                id: 'ss19',
                name: 'Economics: Money and Credit',
                isCompleted: false,
                xpReward: 130,
                subtopics: [
                    { id: 'ss19-1', name: 'Double Coincidence of Wants' },
                    { id: 'ss19-2', name: 'Terms of Credit' },
                    { id: 'ss19-3', name: 'Self Help Groups' }
                ]
            },
            {
                id: 'ss20',
                name: 'Economics: Globalization and the Indian Economy',
                isCompleted: false,
                xpReward: 140,
                subtopics: [
                    { id: 'ss20-1', name: 'MNCs and Interlinking Production' },
                    { id: 'ss20-2', name: 'Factors Enabling Globalization' },
                    { id: 'ss20-3', name: 'Impact of Globalization' }
                ]
            },
        ]
    },
    {
        id: 'english',
        name: 'English',
        color: 'text-rose-500',
        icon: 'BookOpen',
        chapters: [
            {
                id: 'e1',
                name: 'A Letter to God',
                isCompleted: false,
                xpReward: 100,
                subtopics: [
                    { id: 'e1-1', name: 'Summary & Plot' },
                    { id: 'e1-2', name: 'Character Sketches' },
                    { id: 'e1-3', name: 'Themes & Values' },
                    { id: 'e1-4', name: 'Textbook Questions' }
                ]
            },
            {
                id: 'e2',
                name: 'Nelson Mandela: Long Walk to Freedom',
                isCompleted: false,
                xpReward: 110,
                subtopics: [
                    { id: 'e2-1', name: 'Summary & Context' },
                    { id: 'e2-2', name: 'Character Sketches' },
                    { id: 'e2-3', name: 'Themes of Freedom' },
                    { id: 'e2-4', name: 'Textbook Questions' }
                ]
            },
            {
                id: 'e3',
                name: 'Two Stories about Flying',
                isCompleted: false,
                xpReward: 100,
                subtopics: [
                    { id: 'e3-1', name: 'His First Flight' },
                    { id: 'e3-2', name: 'The Black Aeroplane' },
                    { id: 'e3-3', name: 'Themes: Courage & Fear' }
                ]
            },
            {
                id: 'e4',
                name: 'From the Diary of Anne Frank',
                isCompleted: false,
                xpReward: 110,
                subtopics: [
                    { id: 'e4-1', name: 'Summary & Plot' },
                    { id: 'e4-2', name: 'Character Sketch: Anne' },
                    { id: 'e4-3', name: 'Themes & Values' }
                ]
            },
            { id: 'e5', name: 'Glimpses of India', isCompleted: false, xpReward: 100, subtopics: [{ id: 'e5-1', name: 'A Baker from Goa' }, { id: 'e5-2', name: 'Coorg' }, { id: 'e5-3', name: 'Tea from Assam' }] },
            { id: 'e6', name: 'Mijbil the Otter', isCompleted: false, xpReward: 110, subtopics: [{ id: 'e6-1', name: 'Summary & Plot' }, { id: 'e6-2', name: 'Character Sketches' }, { id: 'e6-3', name: 'Questions' }] },
            { id: 'e7', name: 'Madam Rides the Bus', isCompleted: false, xpReward: 110, subtopics: [{ id: 'e7-1', name: 'Summary & Plot' }, { id: 'e7-2', name: 'Character Sketches' }, { id: 'e7-3', name: 'Questions' }] },
            { id: 'e8', name: 'The Sermon at Benares', isCompleted: false, xpReward: 120, subtopics: [{ id: 'e8-1', name: 'Summary & Plot' }, { id: 'e8-2', name: 'Life of Buddha' }, { id: 'e8-3', name: 'Themes of Death & Grief' }] },
            { id: 'e9', name: 'The Proposal', isCompleted: false, xpReward: 130, subtopics: [{ id: 'e9-1', name: 'Summary & Plot' }, { id: 'e9-2', name: 'Character Sketches' }, { id: 'e9-3', name: 'Humour & Satire' }] },
            { id: 'e10', name: 'Dust of Snow (Poem)', isCompleted: false, xpReward: 80, subtopics: [{ id: 'e10-1', name: 'Poem Summary' }, { id: 'e10-2', name: 'Literary Devices' }, { id: 'e10-3', name: 'Questions' }] },
            { id: 'e11', name: 'Fire and Ice (Poem)', isCompleted: false, xpReward: 80, subtopics: [{ id: 'e11-1', name: 'Poem Summary' }, { id: 'e11-2', name: 'Literary Devices' }, { id: 'e11-3', name: 'Questions' }] },
            { id: 'e12', name: 'A Tiger in the Zoo (Poem)', isCompleted: false, xpReward: 80, subtopics: [{ id: 'e12-1', name: 'Poem Summary' }, { id: 'e12-2', name: 'Literary Devices' }, { id: 'e12-3', name: 'Questions' }] },
            { id: 'e13', name: 'How to Tell Wild Animals (Poem)', isCompleted: false, xpReward: 90, subtopics: [{ id: 'e13-1', name: 'Poem Summary' }, { id: 'e13-2', name: 'Literary Devices' }, { id: 'e13-3', name: 'Questions' }] },
            { id: 'e14', name: 'The Ball Poem', isCompleted: false, xpReward: 90, subtopics: [{ id: 'e14-1', name: 'Poem Summary' }, { id: 'e14-2', name: 'Literary Devices' }, { id: 'e14-3', name: 'Theme of Loss' }] },
            { id: 'e15', name: 'Amanda! (Poem)', isCompleted: false, xpReward: 80, subtopics: [{ id: 'e15-1', name: 'Poem Summary' }, { id: 'e15-2', name: 'Literary Devices' }, { id: 'e15-3', name: 'Questions' }] },
            { id: 'e16', name: 'Triumph of Surgery', isCompleted: false, xpReward: 100, subtopics: [{ id: 'e16-1', name: 'Summary & Plot' }, { id: 'e16-2', name: 'Character Sketches' }, { id: 'e16-3', name: 'Questions' }] },
            { id: 'e17', name: 'The Thief\'s Story', isCompleted: false, xpReward: 110, subtopics: [{ id: 'e17-1', name: 'Summary & Plot' }, { id: 'e17-2', name: 'Character Sketches' }, { id: 'e17-3', name: 'Values' }] },
            { id: 'e18', name: 'The Midnight Visitor', isCompleted: false, xpReward: 110, subtopics: [{ id: 'e18-1', name: 'Summary & Plot' }, { id: 'e18-2', name: 'Character Sketches' }, { id: 'e18-3', name: 'Questions' }] },
            { id: 'e19', name: 'A Question of Trust', isCompleted: false, xpReward: 110, subtopics: [{ id: 'e19-1', name: 'Summary & Plot' }, { id: 'e19-2', name: 'Character Sketches' }, { id: 'e19-3', name: 'Questions' }] },
            { id: 'e20', name: 'Footprints without Feet', isCompleted: false, xpReward: 110, subtopics: [{ id: 'e20-1', name: 'Summary & Plot' }, { id: 'e20-2', name: 'Character Sketches' }, { id: 'e20-3', name: 'Questions' }] },
        ]
    },
    {
        id: 'telugu',
        name: 'తెలుగు (Telugu)',
        color: 'text-purple-500',
        icon: 'Feather',
        chapters: [
            {
                id: 't1',
                name: 'మాతృభూమి (Matrubhumi)',
                isCompleted: false,
                xpReward: 120,
                subtopics: [{ id: 't1-1', name: 'పాఠం ఉద్దేశం' }, { id: 't1-2', name: 'పదజాలం' }, { id: 't1-3', name: 'ప్రశ్నలు' }]
            },
            {
                id: 't2',
                name: 'జానపద కళలు (Janapada Kalalu)',
                isCompleted: false,
                xpReward: 110,
                subtopics: [{ id: 't2-1', name: 'పాఠం ఉద్దేశం' }, { id: 't2-2', name: 'పదజాలం' }, { id: 't2-3', name: 'ప్రశ్నలు' }]
            },
            {
                id: 't3',
                name: 'ధన్యుడు (Dhanyudu)',
                isCompleted: false,
                xpReward: 110,
                subtopics: [{ id: 't3-1', name: 'పాఠం ఉద్దేశం' }, { id: 't3-2', name: 'పదజాలం' }, { id: 't3-3', name: 'ప్రశ్నలు' }]
            },
            {
                id: 't4',
                name: 'మా ప్రయత్నం (Ma Prayatnam)',
                isCompleted: false,
                xpReward: 100,
                subtopics: [{ id: 't4-1', name: 'పాఠం ఉద్దేశం' }, { id: 't4-2', name: 'పదజాలం' }, { id: 't4-3', name: 'ప్రశ్నలు' }]
            },
            {
                id: 't5',
                name: 'గోరంత దీపాలు (Goranta Deepalu)',
                isCompleted: false,
                xpReward: 110,
                subtopics: [{ id: 't5-1', name: 'పాఠం ఉద్దేశం' }, { id: 't5-2', name: 'పదజాలం' }, { id: 't5-3', name: 'ప్రశ్నలు' }]
            },
            {
                id: 't6',
                name: 'దానశీలం (Danashilam)',
                isCompleted: false,
                xpReward: 130,
                subtopics: [{ id: 't6-1', name: 'కవి పరిచయం' }, { id: 't6-2', name: 'పదజాలం' }, { id: 't6-3', name: 'వ్యాకరణం' }]
            },
            {
                id: 't7',
                name: 'ఎవరి భాష వారికి వినసొంపు (Evari Bhasha)',
                isCompleted: false,
                xpReward: 120,
                subtopics: [{ id: 't7-1', name: 'కవి పరిచయం' }, { id: 't7-2', name: 'పదజాలం' }, { id: 't7-3', name: 'వ్యాకరణం' }]
            },
            {
                id: 't8',
                name: 'మాణిక్య వీణ (Manikya Veena)',
                isCompleted: false,
                xpReward: 120,
                subtopics: [{ id: 't8-1', name: 'కవి పరిచయం' }, { id: 't8-2', name: 'పదజాలం' }, { id: 't8-3', name: 'వ్యాకరణం' }]
            },
            {
                id: 't9',
                name: 'లక్ష్య సిద్ధి (Lakshya Siddhi)',
                isCompleted: false,
                xpReward: 130,
                subtopics: [{ id: 't9-1', name: 'కవి పరిచయం' }, { id: 't9-2', name: 'పదజాలం' }, { id: 't9-3', name: 'వ్యాకరణం' }]
            },
            {
                id: 't10',
                name: 'శతక మధురిమ (Shataka Madhurima)',
                isCompleted: false,
                xpReward: 140,
                subtopics: [{ id: 't10-1', name: 'కవి పరిచయం' }, { id: 't10-2', name: 'పదజాలం' }, { id: 't10-3', name: 'వ్యాకరణం' }]
            },
            {
                id: 't11',
                name: 'రామాయణం - బాల కాండం',
                isCompleted: false,
                xpReward: 150,
                subtopics: [{ id: 't11-1', name: 'కథా సారాంశం' }, { id: 't11-2', name: 'ముఖ్య ఘట్టాలు' }, { id: 't11-3', name: 'ప్రశ్నలు' }]
            },
            {
                id: 't12',
                name: 'రామాయణం - అయోధ్య కాండం',
                isCompleted: false,
                xpReward: 150,
                subtopics: [{ id: 't12-1', name: 'కథా సారాంశం' }, { id: 't12-2', name: 'ముఖ్య ఘట్టాలు' }, { id: 't12-3', name: 'ప్రశ్నలు' }]
            },
            {
                id: 't13',
                name: 'రామాయణం - అరణ్య కాండం',
                isCompleted: false,
                xpReward: 150,
                subtopics: [{ id: 't13-1', name: 'కథా సారాంశం' }, { id: 't13-2', name: 'ముఖ్య ఘట్టాలు' }, { id: 't13-3', name: 'ప్రశ్నలు' }]
            },
            {
                id: 't14',
                name: 'పఠన అవగాహన (Reading Comprehension)',
                isCompleted: false,
                xpReward: 90,
                subtopics: [{ id: 't14-1', name: 'అభ్యాస పత్రం 1' }, { id: 't14-2', name: 'అభ్యాస పత్రం 2' }]
            },
            {
                id: 't15',
                name: 'వ్యాస రచన (Essay Writing)',
                isCompleted: false,
                xpReward: 100,
                subtopics: [{ id: 't15-1', name: 'సాధారణ అంశాలు' }, { id: 't15-2', name: 'ప్రస్తుత అంశాలు' }]
            },
            {
                id: 't16',
                name: 'తెలుగు వ్యాకరణం (Telugu Grammar)',
                isCompleted: false,
                xpReward: 160,
                subtopics: [{ id: 't16-1', name: 'సంధులు' }, { id: 't16-2', name: 'సమాసాలు' }, { id: 't16-3', name: 'అలంకారాలు' }]
            },
        ]
    }
];
