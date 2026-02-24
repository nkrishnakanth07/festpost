@echo off
echo ============================================
echo FestPost - Frontend Setup Script
echo ============================================
echo.

cd D:\Projects\Claude_Image

echo Step 1: Creating React app...
echo This will take 2-3 minutes...
call npx create-react-app frontend

echo.
echo Step 2: Installing axios...
cd frontend
call npm install axios

echo.
echo ============================================
echo Setup complete!
echo ============================================
echo.
echo Next steps:
echo 1. Copy App.js to frontend\src\App.js
echo 2. Copy App.css to frontend\src\App.css
echo 3. Create frontend\.env with: REACT_APP_API_URL=http://localhost:8000
echo 4. Run: npm start
echo.
pause
