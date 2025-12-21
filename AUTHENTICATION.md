# 🔐 Authentication Feature

## Overview

StudyQuest now includes a simple authentication system with two roles:

### 👨‍🎓 Student Role
- **Username:** Student
- **Password:** `study2025`
- **Access:** Full access to all features
  - Mark chapters and sub-topics as complete
  - Create and manage study plans
  - Set target dates for chapters
  - Use Grind Mode timer
  - Track XP, levels, and streaks

### 👨‍👩‍👦 Parent Role  
- **Username:** Parent
- **Password:** `parent2025`
- **Access:** Read-only dashboard with:
  - Overall progress percentage
  - Subject-wise completion stats
  - XP and level information
  - Study streak tracking
  - Upcoming deadlines
  - List of pending chapters by subject

## Features

### For Students:
- ✅ Complete control over study progress
- ✅ Create personalized study plans
- ✅ Set target completion dates
- ✅ Track sub-topic completion
- ✅ Gamified learning experience

### For Parents:
- 📊 High-level progress overview
- 📈 Subject-wise performance tracking
- 📅 Monitor upcoming deadlines
- 🎯 See which chapters are pending
- 🔥 Track study consistency (streak)

## How to Use

### First Time Setup:
1. Open the app - you'll see the login screen
2. Select your role (Student or Parent)
3. Enter the password
4. Click "Sign In"

### Switching Users:
- Click the "Logout" button in the sidebar (Student) or header (Parent)
- Select a different role and login

### Changing Passwords:
Edit the credentials in `src/hooks/useAuth.ts`:
```typescript
const CREDENTIALS = {
    student: { password: 'your-new-password', name: 'Student' },
    parent: { password: 'your-new-password', name: 'Parent' }
};
```

## Data Persistence

- Authentication state is saved in browser localStorage
- Progress data is shared between both roles
- Logging out doesn't clear progress data
- Each device maintains its own login state

## Security Note

⚠️ **Important:** This is a simple client-side authentication suitable for family use. For production deployment with sensitive data, implement proper server-side authentication.

## Parent Dashboard Features

### Key Metrics Cards:
1. **Overall Progress** - Percentage of chapters completed
2. **Level & XP** - Current level and total XP earned
3. **Sub-Topics** - Number of sub-topics completed
4. **Study Streak** - Consecutive days of study

### Subject-wise Progress:
- Visual circular progress bars for each subject
- Completion percentage
- Chapters completed vs total

### Upcoming Deadlines:
- Shows next 5 upcoming chapter deadlines
- Color-coded by urgency:
  - 🔴 Red: Overdue
  - 🟠 Orange: 3 days or less
  - 🔵 Blue: More than 3 days

### Pending Chapters:
- Organized by subject
- Shows all incomplete chapters
- Easy to see what needs attention

## Tips for Parents

1. **Regular Check-ins:** Login weekly to monitor progress
2. **Encourage Consistency:** Watch the streak counter
3. **Deadline Awareness:** Help your child meet target dates
4. **Balanced Progress:** Ensure all subjects are progressing
5. **Celebrate Milestones:** Acknowledge level-ups and completions!

## Tips for Students

1. **Set Realistic Deadlines:** Use target dates wisely
2. **Break Down Chapters:** Complete sub-topics one by one
3. **Use Grind Mode:** Focus sessions improve retention
4. **Maintain Streak:** Study daily, even if just 30 minutes
5. **Track Everything:** Mark completion as you go

---

**Made with ❤️ for collaborative learning!**
