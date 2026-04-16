@echo off
setlocal enabledelayedexpansion

echo.
echo ===== MaxiClean GCP Deployment Script =====
echo.

REM Check if gcloud is installed
where gcloud >nul 2>nul
if %errorlevel% neq 0 (
    echo ERROR: gcloud CLI not found.
    echo Install from: https://cloud.google.com/sdk/docs/install
    exit /b 1
)

REM Get project ID
for /f "tokens=*" %%i in ('gcloud config get-value project') do set PROJECT_ID=%%i
echo [OK] Project ID: %PROJECT_ID%

REM Step 1: Build Docker image
echo.
echo [Step 1] Building Docker image...
docker build -t gcr.io/%PROJECT_ID%/maxiclean-backend:latest -f backend/Dockerfile .
if %errorlevel% neq 0 (
    echo [ERROR] Docker build failed
    exit /b 1
)
echo [OK] Docker build successful

REM Step 2: Push to Container Registry
echo.
echo [Step 2] Pushing to Container Registry...
docker push gcr.io/%PROJECT_ID%/maxiclean-backend:latest
if %errorlevel% neq 0 (
    echo [ERROR] Push failed
    exit /b 1
)
echo [OK] Push successful

REM Step 3: Deploy App Engine
echo.
echo [Step 3] Deploying to App Engine...
cd backend
gcloud app deploy app.yaml --quiet
if %errorlevel% neq 0 (
    echo [ERROR] App Engine deployment failed
    cd ..
    exit /b 1
)
echo [OK] App Engine deployment successful
cd ..

REM Step 4: Build frontend
echo.
echo [Step 4] Building frontend...
cd frontend
call npm install
call npm run build
if %errorlevel% neq 0 (
    echo [ERROR] Frontend build failed
    cd ..
    exit /b 1
)
echo [OK] Frontend build successful
cd ..

REM Step 5: Deploy frontend to Cloud Storage
echo.
echo [Step 5] Uploading frontend to Cloud Storage...
gsutil -m cp -r frontend/dist/* gs://maxiclean-frontend/
if %errorlevel% neq 0 (
    echo [ERROR] Frontend upload failed
    exit /b 1
)
echo [OK] Frontend upload successful

REM Step 6: Run migrations
echo.
echo [Step 6] Running database migrations...
cd backend
gcloud app exec -- python manage.py migrate
if %errorlevel% neq 0 (
    echo [ERROR] Migrations failed
    cd ..
    exit /b 1
)
echo [OK] Migrations completed
cd ..

echo.
echo [SUCCESS] Deployment completed!
echo Your app is live at: https://maxiclean.time
echo.

endlocal
