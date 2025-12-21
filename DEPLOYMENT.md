# StudyQuest - Deployment Guide

This guide will help you deploy StudyQuest so your son can access it on his Android tablet.

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

**Steps:**
1. Create a free account at [vercel.com](https://vercel.com)
2. Install Vercel CLI (if not already installed):
   ```bash
   npm install -g vercel
   ```
3. Deploy from this directory:
   ```bash
   vercel
   ```
4. Follow the prompts:
   - Login to your Vercel account
   - Confirm project settings (just press Enter for defaults)
   - Wait for deployment to complete
5. You'll get a URL like: `https://studyquest-xxx.vercel.app`

**Benefits:**
- ✅ Free forever
- ✅ Automatic HTTPS
- ✅ Fast global CDN
- ✅ Auto-deploys on git push (if connected to GitHub)

---

### Option 2: Netlify

**Steps:**
1. Build the project:
   ```bash
   npm run build
   ```
2. Create account at [netlify.com](https://netlify.com)
3. Drag and drop the `dist` folder to Netlify's deploy zone
4. Get your URL: `https://studyquest-xxx.netlify.app`

**Or use Netlify CLI:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

---

### Option 3: GitHub Pages

**Steps:**
1. Install gh-pages:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add to `package.json`:
   ```json
   "homepage": "https://yourusername.github.io/Studyplan",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Update `vite.config.ts`:
   ```typescript
   export default defineConfig({
     plugins: [react()],
     base: '/Studyplan/'
   })
   ```
4. Deploy:
   ```bash
   npm run deploy
   ```

---

### Option 4: Local Network Access (No Internet Required)

If you want your son to access it on the same WiFi network:

1. Find your computer's local IP address:
   ```bash
   ipconfig
   ```
   Look for "IPv4 Address" (e.g., 192.168.1.5)

2. Run dev server with network access:
   ```bash
   npm run dev -- --host
   ```

3. On the Android tablet, open browser and go to:
   ```
   http://YOUR_IP_ADDRESS:5173
   ```
   Example: `http://192.168.1.5:5173`

**Note:** Your computer must be running and on the same WiFi network.

---

## 📱 Making it Work Like a Native App on Android

After deploying, you can install it as a Progressive Web App (PWA):

### On Android Tablet:
1. Open the deployed URL in Chrome
2. Tap the menu (⋮) in the top-right
3. Select "Add to Home screen" or "Install app"
4. The app will appear on the home screen like a native app
5. It will work offline after the first visit!

---

## 🔄 Updating the App

### For Vercel/Netlify:
- Just run `vercel` or `netlify deploy` again
- Or connect to GitHub for automatic deployments

### For GitHub Pages:
- Run `npm run deploy` after making changes

### For Local Network:
- Changes are reflected automatically (hot reload)

---

## 🌐 Recommended: Vercel Deployment

**Quick Command:**
```bash
# One-time setup
npm install -g vercel

# Deploy (run from project directory)
vercel

# For production deployment
vercel --prod
```

After deployment, share the URL with your son and he can:
- Access it from any device
- Add it to his home screen
- Use it offline (after first visit)
- All progress is saved locally on his device

---

## 📊 Data Persistence

The app stores all data in the browser's localStorage:
- ✅ Progress is saved automatically
- ✅ Works offline after first load
- ✅ Data persists across sessions
- ⚠️ Data is device-specific (clearing browser data will reset progress)

---

## 🆘 Troubleshooting

**Issue: App not loading on mobile**
- Check if the URL is correct
- Try clearing browser cache
- Ensure you're using a modern browser (Chrome recommended)

**Issue: Progress not saving**
- Check if browser allows localStorage
- Ensure not in incognito/private mode

**Issue: Can't access on local network**
- Verify both devices are on same WiFi
- Check firewall settings
- Try using `--host 0.0.0.0` flag

---

## 💡 Best Practice

For the best experience:
1. Deploy to Vercel (free, reliable, fast)
2. Share the URL with your son
3. Have him "Add to Home Screen" on his Android tablet
4. He can use it like a native app!

**Example final URL:** `https://studyquest.vercel.app`
