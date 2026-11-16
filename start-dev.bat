@echo off
echo =======================================
echo Starting SK Car Shop (Full Stack)
echo =======================================
echo.
echo [1/2] Starting Node.js Express Backend on port 5000...
start "SK Car Shop Backend" cmd /k "cd /d %~dp0backend && npm run dev"

echo.
echo [2/2] Starting Next.js Frontend on port 3000...
start "SK Car Shop Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Both servers are launching!
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000
echo.
pause
