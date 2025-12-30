# StudyQuest Expanded Platform - Elaborated Test Plan

## 1. Authentication & Profiling
### 1.1 Student Registration
- [ ] **Data Capture**: Verify that Name, Class (6-10), 2nd Language (Hindi/Telugu), and State (TS/AP for Telugu) are captured correctly.
- [ ] **Email Optionality**: Verify that signup proceeds even if email is left blank.
- [ ] **Grade Persistence**: Verify that choosing Class 9 initializes the dashboard with Class 9 syllabus (not defaulting to 10).
- [ ] **Language Filtering**: Verify that selecting Hindi hides Telugu subjects and vice versa.

### 1.2 Parent Registration & Child Linking
- [ ] **Multi-Child Signup**: Verify parents can create multiple children during signup.
- [ ] **Profile Linking**: Verify child accounts appear in the parent's "Active Ward" dropdown in the header.
- [ ] **Authentication**: Verify children can log in with their own credentials.

### 1.3 Credentials Recovery
- [ ] **Forgot Password**: Verify the "Forgot?" link displays instructions to contact the parent or support.

## 2. Parent Dashboard & Control
### 2.1 Directive System (Parental Commands)
- [ ] **Target Setting**: Set a `parentTargetDate` for a chapter.
- [ ] **Visibility**: Verify the target pops up on the student's dashboard under "Parental Commands" with priority marking.
- [ ] **Override**: Verify parent target date overrides/shows alongside student-set dates.

### 2.2 Logistics Intelligence (Notifications)
- [ ] **Frequency Settings**: Verify parent can toggle Daily/Weekly/Monthly report frequencies.
- [ ] **Completion Alerts**: Receive a notification when a child completes a parent-prioritized chapter.
- [ ] **Read/Unread State**: Verify notifications can be marked as read.

## 3. Student Experience
### 3.1 Gameplay & Progress
- [ ] **Countdown Timer**: Verify the "Board Exam Window" shows correct number of days remaining until Feb 17, 2026.
- [ ] **Hierarchy Map**: Verify the new map correctly labels XP rewards for Sub-topics (+20), Units (+100), and Papers (+200).
- [ ] **Theme Characters**: Verify Bheem and Chutki images appear in the Special Techniques section.

### 3.2 Syllabus Customization
- [ ] **Dynamic Topics**: Verify students can add custom chapters to subjects (to handle NCERT changes).
- [ ] **Removal**: Verify custom topics can be removed.

### 3.3 Notification Pop-ups
- [ ] **Directives**: If a student is assigned a new reminder/priority, verify it appears as a backdrop-blurred modal on login.

## 4. UI/UX Consistency
- [ ] **Responsive Design**: Verify the grid layouts for chapters and stats work on mobile/tablet.
- [ ] **Role-based Header**: Verify parents see the "Parent Gateway" header while students see their unique wacky rank name.
- [ ] **Class Redundancy**: Verify the manual class switcher is removed from the sidebar (since it's now profile-driven).

## 5. Persistence
- [ ] **Local Storage**: Verify all progress, notifications, and settings survive a browser refresh.
- [ ] **User Switching**: Log out and log in as a different user to ensure data isolation.
