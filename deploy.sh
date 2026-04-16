#!/bin/bash

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== MaxiClean GCP Deployment Script ===${NC}"

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo -e "${RED}❌ gcloud CLI not found. Install from: https://cloud.google.com/sdk/docs/install${NC}"
    exit 1
fi

# Get project ID
PROJECT_ID=$(gcloud config get-value project)
echo -e "${GREEN}✓ Project ID: $PROJECT_ID${NC}"

# Step 1: Build and push Docker image
echo -e "\n${BLUE}Step 1: Building Docker image...${NC}"
docker build -t gcr.io/$PROJECT_ID/maxiclean-backend:latest -f backend/Dockerfile .
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Docker build successful${NC}"
else
    echo -e "${RED}❌ Docker build failed${NC}"
    exit 1
fi

# Step 2: Push to Container Registry
echo -e "\n${BLUE}Step 2: Pushing to Container Registry...${NC}"
docker push gcr.io/$PROJECT_ID/maxiclean-backend:latest
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Push successful${NC}"
else
    echo -e "${RED}❌ Push failed${NC}"
    exit 1
fi

# Step 3: Deploy App Engine
echo -e "\n${BLUE}Step 3: Deploying to App Engine...${NC}"
cd backend
gcloud app deploy app.yaml --quiet
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ App Engine deployment successful${NC}"
else
    echo -e "${RED}❌ App Engine deployment failed${NC}"
    exit 1
fi
cd ..

# Step 4: Build frontend
echo -e "\n${BLUE}Step 4: Building frontend...${NC}"
cd frontend
npm install
npm run build
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend build successful${NC}"
else
    echo -e "${RED}❌ Frontend build failed${NC}"
    exit 1
fi
cd ..

# Step 5: Deploy frontend to Cloud Storage
echo -e "\n${BLUE}Step 5: Uploading frontend to Cloud Storage...${NC}"
gsutil -m cp -r frontend/dist/* gs://maxiclean-frontend/
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend upload successful${NC}"
else
    echo -e "${RED}❌ Frontend upload failed${NC}"
    exit 1
fi

# Step 6: Run migrations
echo -e "\n${BLUE}Step 6: Running database migrations...${NC}"
gcloud app exec -- python manage.py migrate
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Migrations completed${NC}"
else
    echo -e "${RED}❌ Migrations failed${NC}"
    exit 1
fi

echo -e "\n${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${BLUE}Your app is now live at: https://$(gcloud app describe --format='value(defaultHostname)')${NC}"
