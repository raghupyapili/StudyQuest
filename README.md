# 📚 StudyQuest - Gamified Learning Tracker

A beautiful, gamified study tracker designed to help students prepare for board exams. Built with React, TypeScript, and Tailwind CSS.

![StudyQuest Icon](/.gemini/antigravity/brain/6f099c38-7675-44a1-8c5a-819942dba14f/studyquest_icon_1766238689936.png)

## ✨ Features

- 📊 **Progress Tracking**: Track completion of chapters and sub-topics across all subjects
- 🎯 **Gamification**: Earn XP, level up, and maintain study streaks
- 📅 **Study Plans**: Create custom study plans with tasks for each chapter
- ⏱️ **Grind Mode**: Pomodoro-style focus timer
- ⏳ **Exam Countdown**: Track days remaining until board exams
- 📱 **Mobile-Friendly**: Fully responsive, works great on tablets and phones
- 💾 **Offline Support**: All data saved locally, works without internet

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

## 📱 Deploy for Android Tablet

### Option 1: One-Click Deploy (Recommended)

**Windows:**
```bash
deploy.bat
```

Follow the prompts to choose your deployment method.

### Option 2: Manual Deployment

#### Vercel (Recommended)
```bash
# Install Vercel CLI (one-time)
npm install -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
npm run build
# Then drag the 'dist' folder to https://app.netlify.com/drop
```

#### Local Network (Same WiFi)
```bash
npm run dev -- --host
# Access at http://YOUR_IP:5173
```

## 📲 Installing on Android Tablet

After deployment:

1. Open the deployed URL in Chrome on the Android tablet
2. Tap the menu (⋮) → "Add to Home screen"
3. The app will install like a native app
4. Launch from home screen - works offline!

## 🎨 Customization

### Update Exam Date
Edit `src/hooks/useGameState.ts`:
```typescript
const DEFAULT_EXAM_DATE = '2026-02-17T00:00:00.000Z';
```

### Modify Subjects/Chapters
Edit `src/data/syllabus.ts` to add/remove subjects or chapters.

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Confetti**: Canvas Confetti

## 📖 Usage Guide

### For Students

1. **Dashboard**: View overall progress, XP, level, and streak
2. **Subjects**: Click on any subject to see chapters
3. **Chapters**: 
   - Click chapter name to open detailed view
   - Check off sub-topics as you complete them
   - Create study plans with tasks
   - Set target completion dates
4. **Grind Mode**: Use the focus timer for distraction-free study sessions

### Data Persistence

- All progress is saved automatically in browser localStorage
- Data persists across sessions
- Each device maintains its own progress
- Clearing browser data will reset progress

## 🔧 Troubleshooting

**App not loading on mobile?**
- Clear browser cache
- Ensure using modern browser (Chrome recommended)
- Check URL is correct

**Progress not saving?**
- Don't use incognito/private mode
- Check browser allows localStorage

**Can't access on local network?**
- Verify same WiFi network
- Check firewall settings
- Use `--host 0.0.0.0` flag

## 📄 License

This project is for personal/educational use.

## 🤝 Contributing

Feel free to customize for your needs! The codebase is well-structured and commented.

---

**Made with ❤️ for focused learning and exam success!**
