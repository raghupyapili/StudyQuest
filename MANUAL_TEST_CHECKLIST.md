# 🧪 StudyQuest Tactical Field Test Protocol

Perform these missions on your local browser (http://localhost:5173) to verify system integrity.

## Mission 1: Student Induction (Onboarding)
- [ ] **Access**: Navigate to the Login Page.
- [ ] **Visual Check**: "Sword & Shield" Logo is visible next to "STUDYQUEST".
- [ ] **Visual Check**: Footer reads "StudyQuest v3.0.0 Stable".
- [ ] **Action**: Click `Initialize Profile` -> `Create New`.
- [ ] **Action**: Select `Student`. Name: "Cadet Test", User: "cadet1", Pass: "pass123".
- [ ] **Outcome**: Redirected to Student Dashboard. Welcome message visible.

## Mission 2: Academic Operations
- [ ] **Action**: Click "Mathematics" Subject Card.
- [ ] **Action**: Click "Real Numbers" Chapter.
- [ ] **Action**: Click "Mission Plan" -> Add Task "Test Task" -> Check it.
- [ ] **Action**: Toggle "Critical Sub-topic" checkbox.
- [ ] **Action**: Click `Complete Chapter`.
- [ ] **Outcome**: Confetti animation triggers. Progress bar updates.

## Mission 3: Command & Control (Parent)
- [ ] **Action**: Logout. Create New Account -> `Parent` Role. (User: "parent1", Pass: "pass123").
- [ ] **Action**: Go to Settings (Gear Icon).
- [ ] **Action**: Click `Deploy New Asset` -> Create Child (User: "kid1", Pass: "oldpass").
- [ ] **Action**: Locate "kid1" in the list.
- [ ] **Action**: Click `Reset Access Key` button (Inline, NOT a popup).
- [ ] **Action**: Enter "newpass999" -> Click `Save`.
- [ ] **Outcome**: Green "Key Updated" badge appears.

## Mission 4: Emergency Protocols (Recovery)
- [ ] **Action**: Logout.
- [ ] **Action**: Click `Forgot UserName or Password?`.
- [ ] **Action**: Enter Parent Email (from Mission 3). Click `Request OTP`.
- [ ] **Outcome**: **Browser Alert** appears with a 4-digit code.
- [ ] **Action**: Enter the Code.
- [ ] **Outcome**: Screen shows "Recovered Codename: parent1".
- [ ] **Action**: Set New Password -> Login.

**Status Report**:
Please mark these checkboxes as you verify them. If any step fails, report the specific error message.
