@echo off
echo ========================================
echo   StudyQuest - Quick Deployment
echo ========================================
echo.

echo [1/3] Building the application...
call npm run build

if %errorlevel% neq 0 (
    echo.
    echo ❌ Build failed! Please fix errors and try again.
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.
echo [2/3] Choose deployment method:
echo.
echo 1. Vercel (Recommended - Free, Fast, Easy)
echo 2. Netlify (Alternative - Also Free)
echo 3. Preview locally (Test before deploying)
echo 4. Local network access (Same WiFi only)
echo.
set /p choice="Enter your choice (1-4): "

if "%choice%"=="1" (
    echo.
    echo [3/3] Deploying to Vercel...
    echo.
    echo Please login to Vercel when prompted.
    echo Press any key to continue...
    pause >nul
    vercel --prod
    echo.
    echo ✅ Deployment complete!
    echo Share the URL above with your son.
) else if "%choice%"=="2" (
    echo.
    echo [3/3] To deploy to Netlify:
    echo 1. Go to https://app.netlify.com/drop
    echo 2. Drag and drop the 'dist' folder
    echo 3. Get your URL!
    echo.
    echo Opening dist folder...
    explorer dist
) else if "%choice%"=="3" (
    echo.
    echo [3/3] Starting preview server...
    call npm run preview
) else if "%choice%"=="4" (
    echo.
    echo [3/3] Starting dev server on local network...
    echo.
    echo Your son can access the app at:
    echo http://YOUR_LOCAL_IP:5173
    echo.
    echo Find your IP with: ipconfig
    echo.
    call npm run dev -- --host
) else (
    echo.
    echo ❌ Invalid choice!
)

echo.
pause
