# 🎨 FestPost - AI Festival Image Generator

## Setup Instructions

### 1. Backend Setup

```cmd
cd D:\Projects\Claude_Chatbot\Chatbot\festpost\backend
```

**Create these files:**
- `main.py` - Copy from festpost_backend_main.py
- `requirements.txt` - Copy from festpost_requirements.txt
- `.env` - Create with your Replicate API key

**.env file:**
```
REPLICATE_API_TOKEN=r8_your_api_token_here
```

**Install dependencies:**
```cmd
pip install -r requirements.txt
```

**Run backend:**
```cmd
uvicorn main:app --reload --port 8000
```

Backend will run at: http://localhost:8000

---

### 2. Frontend Setup

```cmd
cd D:\Projects\Claude_Chatbot\Chatbot\festpost
npx create-react-app frontend
cd frontend
npm install axios
```

**Replace these files:**
- `src/App.js` - Copy from festpost_App.js
- `src/App.css` - Copy from festpost_App.css

**Create `.env` file in frontend folder:**
```
REACT_APP_API_URL=http://localhost:8000
```

**Run frontend:**
```cmd
npm start
```

Frontend will run at: http://localhost:3000

---

### 3. Test Locally

1. ✅ Backend running on :8000
2. ✅ Frontend running on :3000
3. ✅ Open http://localhost:3000
4. ✅ Fill in business name
5. ✅ Select festival
6. ✅ Click "Generate Image"
7. ✅ Wait 10-30 seconds
8. ✅ Download your image!

---

### 4. Deployment (Same as Chatbot)

**Backend on Render:**
- Service name: festpost-backend
- Build command: `pip install -r requirements.txt`
- Start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
- Environment variable: `REPLICATE_API_TOKEN`

**Frontend on Vercel:**
- Root directory: `frontend`
- Framework: Create React App
- Environment variable: `REACT_APP_API_URL` = your Render URL

---

## Features Included

✅ 8 Festival Templates (Diwali, Christmas, New Year, etc.)
✅ 5 Style Options (Professional, Vibrant, Elegant, etc.)
✅ 4 Aspect Ratios (Instagram, Facebook, Story)
✅ AI Image Generation using Flux
✅ Download Images
✅ Image History
✅ Beautiful UI

---

## How It Works

1. User enters business name and tagline
2. Selects festival and style
3. AI generates custom festival image
4. User downloads for social media
5. Images saved in history

---

## Tech Stack

- **Frontend:** React, Axios
- **Backend:** FastAPI, Python
- **AI:** Flux (via Replicate API)
- **Deployment:** Vercel + Render

---

## Next Steps

1. Follow setup instructions above
2. Test locally
3. Deploy to production
4. Share with clients!

Need help? Just ask! 🚀
