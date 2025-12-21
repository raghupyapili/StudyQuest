export interface SlayerRank {
    rank: string;
    description: string;
    minProgress: number;
    icon: string;
}

export const SLAYER_RANKS: SlayerRank[] = [
    { rank: 'Mizunoto', description: 'The lowest rank. Start your training!', minProgress: 0, icon: '⚔️' },
    { rank: 'Mizunoe', description: 'Gaining some basic skills.', minProgress: 10, icon: '🌊' },
    { rank: 'Kanoto', description: 'You can handle common demons now.', minProgress: 20, icon: '🪵' },
    { rank: 'Kanoe', description: 'Your breathing technique is improving.', minProgress: 30, icon: '🌫️' },
    { rank: 'Tsuchinoto', description: 'Becoming a reliable slayer.', minProgress: 40, icon: '🏔️' },
    { rank: 'Tsuchinoe', description: 'Mastering the basics of your style.', minProgress: 50, icon: '⚡' },
    { rank: 'Hinoto', description: 'Gaining recognition from the Corps.', minProgress: 60, icon: '🔥' },
    { rank: 'Hinoe', description: 'Developing your own powerful forms.', minProgress: 70, icon: '☀️' },
    { rank: 'Kinoto', description: 'Close to reaching the elite level.', minProgress: 80, icon: '🌸' },
    { rank: 'Kinoe', description: 'The highest rank below Hashira.', minProgress: 90, icon: '🦋' },
    { rank: 'Hashira', description: 'A Pillar of the Demon Slayer Corps!', minProgress: 98, icon: '👑' },
];

export interface breathingStyle {
    subjectId: string;
    style: string;
    character: string;
    forms: string[];
}

export const BREATHING_STYLES: Record<string, breathingStyle> = {
    math: {
        subjectId: 'math',
        style: 'Thunder Breathing',
        character: 'Zenitsu Agatsuma',
        forms: [
            'First Form: Thunderclap and Flash',
            'Second Form: Rice Spirit',
            'Third Form: Thunder Swarm',
            'Fourth Form: Distant Thunder',
            'Fifth Form: Heat Lightning',
            'Sixth Form: Rumble and Flash',
            'Seventh Form: Honoikazuchi no Kami'
        ]
    },
    science: {
        subjectId: 'science',
        style: 'Insect Breathing',
        character: 'Shinobu Kocho',
        forms: [
            'Butterfly Dance: Caprice',
            'Dance of the Bee Sting: True Flutter',
            'Dance of the Dragonfly: Compound Eye Hexagon',
            'Dance of the Centipede: Hundred-Legged Zigzag'
        ]
    },
    social: {
        subjectId: 'social',
        style: 'Stone Breathing',
        character: 'Gyomei Himejima',
        forms: [
            'First Form: Serpentinite Bipolar',
            'Second Form: Upper Smash',
            'Third Form: Stone Skin',
            'Fourth Form: Volcanic Rock, Rapid Conquest',
            'Fifth Form: Arcs of Justice'
        ]
    },
    english: {
        subjectId: 'english',
        style: 'Sound Breathing',
        character: 'Tengen Uzui',
        forms: [
            'First Form: Roar',
            'Fourth Form: Constant Resonating Slashes',
            'Fifth Form: String Performance'
        ]
    },
    telugu: {
        subjectId: 'telugu',
        style: 'Sun Breathing',
        character: 'Tanjiro Kamado',
        forms: [
            'Dance: Waltz',
            'Blue Heaven',
            'Raging Sun',
            'Fake Rainbow',
            'Fire Wheel',
            'Burning Bones, Summer Sun',
            'Sunflower Thrust',
            'Solar Heat Haze',
            'Setting Sun Transformation',
            'Beneficent Radiance',
            'Dragon Sun Halo Dance',
            'Flame Dance'
        ]
    }
};

export function getRank(progress: number): SlayerRank {
    return [...SLAYER_RANKS].reverse().find(r => progress >= r.minProgress) || SLAYER_RANKS[0];
}

export function getUnlockedForm(subjectId: string, progress: number): string | null {
    const style = BREATHING_STYLES[subjectId];
    if (!style) return null;

    const count = style.forms.length;
    const unlockedCount = Math.floor((progress / 100) * count);

    if (unlockedCount === 0) return null;
    return style.forms[unlockedCount - 1];
}
