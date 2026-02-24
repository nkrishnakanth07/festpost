# 🎨 FestPost - AI Festival Image Generator

## Backend Setup

### 1. Install dependencies

```cmd
cd D:\Projects\Claude_Image\backend
pip install -r requirements.txt
```

### 2. Create .env file

Copy `.env.example` to `.env` and add your Replicate API token:

```
REPLICATE_API_TOKEN=r8_your_actual_token_here
```

### 3. Run backend

```cmd
uvicorn main:app --reload --port 8000
```

Backend will run at: http://localhost:8000

---

## Frontend Setup

### 1. Create React app

```cmd
cd D:\Projects\Claude_Image
npx create-react-app frontend
cd frontend
npm install axios
```

### 2. Replace files

Copy these files to `frontend/src/`:
- App.js (replace existing)
- App.css (replace existing)

### 3. Create .env file in frontend folder

```
REACT_APP_API_URL=http://localhost:8000
```

### 4. Run frontend

```cmd
npm start
```

Frontend will run at: http://localhost:3000

---

## Test the App

1. Open http://localhost:3000
2. Enter business name
3. Select festival
4. Click "Generate Image"
5. Wait 10-30 seconds
6. Download your image!

---

## Deployment

**Backend on Render:**
- Build: `pip install -r requirements.txt`
- Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Add env var: `REPLICATE_API_TOKEN`

**Frontend on Vercel:**
- Root directory: `frontend`
- Framework: Create React App
- Add env var: `REACT_APP_API_URL`

---

Need help? Check the README or ask! 🚀
