export interface Rank {
    rank: string;
    description: string;
    minProgress: number;
    icon: string;
}

export interface SubjectStyle {
    subjectId: string;
    name: string; // e.g. "Thunder Breathing", "Omnitrix Alien", etc.
    character: string;
    elements: string[]; // e.g. "First Form...", "Heatblast", etc.
}

export interface Theme {
    grade: string;
    title: string;
    subtitle: string;
    bgImage: string;
    accentColor: string;
    secondaryColor: string;
    ranks: Rank[];
    subjectStyles: Record<string, SubjectStyle>;
    unitLabel: string;
    commandLabel: string;
}

export const THEMES: Record<string, Theme> = {
    "10": {
        grade: "10",
        title: "Demon Slayer Corps",
        subtitle: "Wisteria Sector",
        bgImage: "/slayer-bg.png",
        accentColor: "from-orange-600 to-red-600",
        secondaryColor: "text-orange-500",
        unitLabel: "Distance to Final Selection",
        commandLabel: "Commands from the Corps",
        ranks: [
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
        ],
        subjectStyles: {
            math: { subjectId: 'math', name: 'Thunder Breathing', character: 'Zenitsu', elements: ['Thunderclap and Flash', 'Rice Spirit', 'Thunder Swarm', 'Distant Thunder', 'Heat Lightning', 'Rumble and Flash'] },
            science: { subjectId: 'science', name: 'Insect Breathing', character: 'Shinobu', elements: ['Butterfly Dance', 'Bee Sting', 'Dragonfly Dance', 'Centipede Dance'] },
            social: { subjectId: 'social', name: 'Stone Breathing', character: 'Gyomei', elements: ['Serpentinite Bipolar', 'Upper Smash', 'Stone Skin', 'Volcanic Rock', 'Arcs of Justice'] },
            english: { subjectId: 'english', name: 'Sound Breathing', character: 'Tengen', elements: ['Roar', 'Constant Resonating Slashes', 'String Performance'] },
            telugu: { subjectId: 'telugu', name: 'Sun Breathing', character: 'Tanjiro', elements: ['Waltz', 'Blue Heaven', 'Raging Sun', 'Fake Rainbow', 'Fire Wheel', 'Sunflower Thrust'] },
            hindi: { subjectId: 'hindi', name: 'Love Breathing', character: 'Mitsuri', elements: ['Shivers of Love', 'Love Pangs', 'Catlove Shower', 'Swaying Love'] },
            sanskrit: { subjectId: 'sanskrit', name: 'Serpent Breathing', character: 'Obanai', elements: ['Winding Serpent Slash', 'Venom Fangs', 'Coil Choke'] },
            computer: { subjectId: 'computer', name: 'Mist Breathing', character: 'Muichiro', elements: ['Distant Haze', 'Eight-Layered Mist', 'Lunar Dispersing Mist'] },
            ai: { subjectId: 'ai', name: 'Wind Breathing', character: 'Sanemi', elements: ['Dust Whirlwind', 'Claws-Purifying Wind', 'Rising Dust Storm', 'Cold Mountain Wind'] },
        }
    },
    "9": {
        grade: "9",
        title: "Avengers Initiative",
        subtitle: "S.H.I.E.L.D HQ",
        bgImage: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&q=80",
        accentColor: "from-blue-600 to-indigo-600",
        secondaryColor: "text-blue-500",
        unitLabel: "Days to Assemble",
        commandLabel: "Orders from SHIELD",
        ranks: [
            { rank: 'Recruit', description: 'Welcome to S.H.I.E.L.D.', minProgress: 0, icon: '🛡️' },
            { rank: 'Agent', description: 'Operational ready.', minProgress: 20, icon: '🔫' },
            { rank: 'Specialist', description: 'Master of your field.', minProgress: 40, icon: '🎯' },
            { rank: 'Avenger', description: 'Earth\'s mightiest hero.', minProgress: 70, icon: '🅰️' },
            { rank: 'Legend', description: 'A true hero of the universe.', minProgress: 95, icon: '💫' },
        ],
        subjectStyles: {
            math: { subjectId: 'math', name: 'Iron Man Armor', character: 'Tony Stark', elements: ['Mark I', 'Mark VII', 'Hulkbuster', 'Nanotech Suit'] },
            science: { subjectId: 'science', name: 'Gamma Research', character: 'Bruce Banner', elements: ['Serum Analysis', 'Gamma Burst', 'World Breaker'] },
            social: { subjectId: 'social', name: 'Tactical Leadership', character: 'Captain America', elements: ['Shield Toss', 'Brooklyn Brawler', 'Lead by Example'] },
            english: { subjectId: 'english', name: 'Communication HUD', character: 'Jarvis', elements: ['Protocol Alpha', 'Strategic Uplink', 'Global Network'] },
            telugu: { subjectId: 'telugu', name: 'Asgardian Lore', character: 'Thor', elements: ['Mjolnir Toss', 'Thunder Strike', 'God of Thunder'] },
            hindi: { subjectId: 'hindi', name: 'Spycraft Tactics', character: 'Black Widow', elements: ['Stealth Takedown', 'Widow\'s Bite', 'Red Room Training'] },
            sanskrit: { subjectId: 'sanskrit', name: 'Archery Precision', character: 'Hawkeye', elements: ['Sky Shot', 'Trick Arrow', 'Blind Spot'] },
            computer: { subjectId: 'computer', name: 'Spider-Sense Coding', character: 'Spider-Man', elements: ['Web Shooter', 'Wall Crawl', 'Iron Spider HUD'] },
            ai: { subjectId: 'ai', name: 'Mind Stone Processing', character: 'Vision', elements: ['Density Control', 'Solar Beam', 'Logic Synthesis'] },
        }
    },
    "8": {
        grade: "8",
        title: "Konoha Ninja Academy",
        subtitle: "Leaf Village",
        bgImage: "https://images.unsplash.com/photo-1614850523296-e8c041de2394?auto=format&fit=crop&q=80",
        accentColor: "from-orange-500 to-yellow-500",
        secondaryColor: "text-orange-400",
        unitLabel: "Days to Chunin Exams",
        commandLabel: "Scrolls from the Hokage",
        ranks: [
            { rank: 'Academy Student', description: 'Start your ninja path.', minProgress: 0, icon: '🍥' },
            { rank: 'Genin', description: 'Beginner ninja.', minProgress: 20, icon: '🍃' },
            { rank: 'Chunin', description: 'Intermediate ninja.', minProgress: 50, icon: '🏵️' },
            { rank: 'Jonin', description: 'Elite ninja.', minProgress: 80, icon: '🔥' },
            { rank: 'Hokage', description: 'Leader of the village!', minProgress: 98, icon: '👒' },
        ],
        subjectStyles: {
            math: { subjectId: 'math', name: 'Rasengan Forms', character: 'Naruto', elements: ['Rasengan', 'Big Ball Rasengan', 'Rasenshuriken'] },
            science: { subjectId: 'science', name: 'Sharingan Arts', character: 'Sasuke', elements: ['One Tomoe', 'Two Tomoe', 'Mangekyo Sharingan'] },
            social: { subjectId: 'social', name: 'Medical Ninjutsu', character: 'Sakura', elements: ['Healing Palm', 'Chakra Control', 'Strength of a Hundred'] },
            english: { subjectId: 'english', name: 'Copy Ninja Skills', character: 'Kakashi', elements: ['Thousand Years of Death', 'Chidori', 'Lightning Blade'] },
            telugu: { subjectId: 'telugu', name: 'Shadow Clone Mastery', character: 'Naruto', elements: ['Shadow Clone', 'Multi-Shadow Clone', 'Sage Mode'] },
            hindi: { subjectId: 'hindi', name: 'Byakugan Vision', character: 'Hinata', elements: ['Eight Trigrams', 'Twin Lion Fists', 'Gentle Step'] },
            sanskrit: { subjectId: 'sanskrit', name: 'Sand Control', character: 'Gaara', elements: ['Sand Coffin', 'Sand Burial', 'Absolute Defense'] },
            computer: { subjectId: 'computer', name: 'Puppetry Jutsu', character: 'Kankuro', elements: ['Crow', 'Black Ant', 'Salamander'] },
            ai: { subjectId: 'ai', name: 'Uchiha Genjutsu', character: 'Itachi', elements: ['Tsukuyomi', 'Amaterasu', 'Susanoo'] },
        }
    },
    "7": {
        grade: "7",
        title: "Omnitrix Hero",
        subtitle: "Plumber Base",
        bgImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80",
        accentColor: "from-green-600 to-emerald-600",
        secondaryColor: "text-green-500",
        unitLabel: "Days to Alien Invasion",
        commandLabel: "Directives from Plumbers HQ",
        ranks: [
            { rank: 'Plumber Recruit', description: 'Training begins.', minProgress: 0, icon: '📟' },
            { rank: 'Alien Scout', description: 'Gaining new forms.', minProgress: 25, icon: '👽' },
            { rank: 'Galaxy Protector', description: 'Saving the world.', minProgress: 60, icon: '🌍' },
            { rank: 'Master of Omnitrix', description: 'Ultimate hero!', minProgress: 95, icon: '⌚' },
        ],
        subjectStyles: {
            math: { subjectId: 'math', name: 'Grey Matter Intelligence', character: 'Grey Matter', elements: ['Logic Pulse', 'Calculated Strike', 'Genius Mind'] },
            science: { subjectId: 'science', name: 'Heatblast Fire', character: 'Heatblast', elements: ['Fireball', 'Flamethrower', 'Supernova'] },
            social: { subjectId: 'social', name: 'Four Arms Strength', character: 'Four Arms', elements: ['Power Slam', 'Sonic Clap', 'Mighty Toss'] },
            english: { subjectId: 'english', name: 'Upgrade Hacking', character: 'Upgrade', elements: ['System Link', 'Hardware Merge', 'Data Override'] },
            telugu: { subjectId: 'telugu', name: 'XLR8 Speed', character: 'XLR8', elements: ['Sonic Dash', 'Quick Strike', 'Time Blur'] },
            hindi: { subjectId: 'hindi', name: 'Ghostfreak Stealth', character: 'Ghostfreak', elements: ['Phasing', 'Invisibility', 'Tentacle Whip'] },
            sanskrit: { subjectId: 'sanskrit', name: 'Diamondhead Shards', character: 'Diamondhead', elements: ['Crystal Spike', 'Shield Wall', 'Razor Blade'] },
            computer: { subjectId: 'computer', name: 'Nanotech Systems', character: 'Upgrade', elements: ['Circuit Jump', 'Code Injection', 'Tech Patch'] },
            ai: { subjectId: 'ai', name: 'Cerebro-Storm', character: 'Brainstorm', elements: ['IQ Pulse', 'Electric Blast', 'Think Tank'] },
        }
    },
    "6": {
        grade: "6",
        title: "Dholakpur Heroes",
        subtitle: "King Indraverma's Kingdom",
        bgImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80",
        accentColor: "from-yellow-400 to-orange-400",
        secondaryColor: "text-yellow-600",
        unitLabel: "Days to Kingdom Fair",
        commandLabel: "Orders from Indraverma",
        ranks: [
            { rank: 'Dholakpur Citizen', description: 'Welcome to the village.', minProgress: 0, icon: '🏘️' },
            { rank: 'Laddo Enthusiast', description: 'Getting stronger!', minProgress: 20, icon: '🟡' },
            { rank: 'Village Protector', description: 'Helping others.', minProgress: 50, icon: '🛡️' },
            { rank: 'King\'s Guard', description: 'Elite protector.', minProgress: 80, icon: '⚔️' },
            { rank: 'Hero of Dholakpur', description: 'The legendary Bheem!', minProgress: 98, icon: '🏆' },
        ],
        subjectStyles: {
            math: { subjectId: 'math', name: 'Bheem Strength', character: 'Bheem', elements: ['Laddo Power', 'Super Punch', 'Heavy Lift'] },
            science: { subjectId: 'science', name: 'Chutki Smartness', character: 'Chutki', elements: ['Quick Thinking', 'Problem Solver', 'Compassion'] },
            social: { subjectId: 'social', name: 'Raju Bravery', character: 'Raju', elements: ['Courage', 'Team Spirit', 'Little Hero'] },
            english: { subjectId: 'english', name: 'Jaggu Tricks', character: 'Jaggu', elements: ['Banana Toss', 'Tree Swing', 'Monkey Talk'] },
            telugu: { subjectId: 'telugu', name: 'Kalia Might', character: 'Kalia', elements: ['Muscle Power', 'Challenge', 'Rival Spirit'] },
            hindi: { subjectId: 'hindi', name: 'Dholu-Bholu Team', character: 'Dholu & Bholu', elements: ['Double Trouble', 'Unity Strike', 'Tag Team'] },
            sanskrit: { subjectId: 'sanskrit', name: 'Einstein Wisdom', character: 'Professor', elements: ['Curiosity', 'Experiment', 'Discovery'] },
            computer: { subjectId: 'computer', name: 'Dhoomketu Gadgets', character: 'Professor Dhoomketu', elements: ['Robot Helper', 'Space Rocket', 'Time Watch'] },
            ai: { subjectId: 'ai', name: 'Indumati Strategy', character: 'Indumati', elements: ['Royal Decree', 'Clever Plan', 'Kind Ruler'] },
        }
    }
};

export function getGradeTheme(grade: string): Theme {
    return THEMES[grade] || THEMES["10"];
}

export function getRank(theme: Theme, progress: number): Rank {
    return [...theme.ranks].reverse().find(r => progress >= r.minProgress) || theme.ranks[0];
}

export function getUnlockedElement(theme: Theme, subjectId: string, progress: number): string | null {
    const style = theme.subjectStyles[subjectId];
    if (!style) return null;

    const count = style.elements.length;
    const unlockedCount = Math.floor((progress / 100) * count);

    if (unlockedCount === 0) return null;
    return style.elements[unlockedCount - 1];
}
