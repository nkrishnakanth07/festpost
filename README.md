# 🎨 FestPost - AI Festival Image Generator

**AI-Powered Festival Images for Your Business Clients**

Generate professional, customized festival images for any business using AI. Perfect for social media marketing!

---

## ✨ Features

- 🎯 **8 Festival Templates:** Diwali, Christmas, New Year, Holi, Eid, Valentine's, Independence Day, Ganesh Chaturthi
- 🎨 **5 Style Options:** Professional, Vibrant, Elegant, Minimal, Traditional
- 📱 **4 Aspect Ratios:** Instagram Square/Story, Facebook, Instagram Feed
- 🤖 **AI-Powered:** Uses Flux AI via Replicate
- 💾 **Image History:** Keep track of generated images
- ⬇️ **Easy Download:** Download images ready for social media

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 16+
- Replicate API key (free tier available at https://replicate.com)

---

### Backend Setup

1. **Navigate to backend folder:**
```cmd
cd D:\Projects\Claude_Image\backend
```

2. **Install dependencies:**
```cmd
pip install -r requirements.txt
```

3. **Create .env file:**
Copy `.env.example` to `.env` and add your Replicate API token:
```
REPLICATE_API_TOKEN=r8_your_actual_token_here
```

4. **Run backend:**
```cmd
uvicorn main:app --reload --port 8000
```

Backend runs at: **http://localhost:8000**

---

### Frontend Setup

1. **Run the setup script:**
```cmd
cd D:\Projects\Claude_Image
setup_frontend.bat
```

This will:
- Create React app
- Install axios
- Takes 2-3 minutes

2. **Copy frontend files:**
After setup completes, copy these files:
- `frontend_files/App.js` → `frontend/src/App.js`
- `frontend_files/App.css` → `frontend/src/App.css`
- `frontend_files/.env.example` → `frontend/.env` (rename and keep as is)

3. **Run frontend:**
```cmd
cd frontend
npm start
```

Frontend runs at: **http://localhost:3000**

---

## 🧪 Test the App

1. Open **http://localhost:3000**
2. Enter your business name (e.g., "Tech Solutions")
3. Add a tagline (optional)
4. Select a festival (e.g., "Diwali")
5. Choose style and aspect ratio
6. Click **"Generate Image"**
7. Wait 10-30 seconds for AI to generate
8. Download your professional festival image!

---

## 📦 What's Included

```
D:\Projects\Claude_Image/
├── backend/
│   ├── main.py              # FastAPI backend
│   ├── requirements.txt     # Python dependencies
│   ├── .env.example         # Environment template
│   └── README.md            # Backend docs
├── frontend_files/          # React source files
│   ├── App.js              # Main React component
│   ├── App.css             # Styles
│   └── .env.example        # Frontend env template
├── setup_frontend.bat       # Automated setup script
└── README.md               # This file
```

---

## 🌐 Deployment

### Backend on Render

1. Create new Web Service
2. Connect GitHub repository
3. Settings:
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Root Directory:** `backend`
4. Add environment variable:
   - `REPLICATE_API_TOKEN` = your token
5. Deploy!

### Frontend on Vercel

1. Create new project
2. Import GitHub repository
3. Settings:
   - **Framework:** Create React App
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
4. Add environment variable:
   - `REACT_APP_API_URL` = your Render backend URL
5. Deploy!

---

## 💰 API Costs

**Replicate (Flux AI):**
- Free tier: $5 credit
- ~$0.003 per image generation
- ~1600 free images!

**Hosting:**
- Render: Free tier available
- Vercel: Free tier available

---

## 🎯 Use Cases

Perfect for:
- **Marketing Agencies:** Generate client festival posts
- **Small Businesses:** Quick social media content
- **Freelancers:** Offer festival image service
- **Social Media Managers:** Bulk festival content

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Axios
- CSS3

**Backend:**
- FastAPI (Python)
- Replicate API (Flux AI)
- Uvicorn

**AI Model:**
- Flux Schnell (via Replicate)

---

## 📝 API Endpoints

- `GET /` - API info
- `GET /health` - Health check
- `GET /festivals` - List all festivals
- `POST /generate` - Generate festival image
- `GET /images` - List generated images
- `GET /images/{id}` - Get specific image

---

## 🤝 Support

Issues? Questions?
- Check backend logs: Terminal running uvicorn
- Check frontend logs: Browser console (F12)
- Verify API token in .env
- Ensure both servers are running

---

## 📄 License

MIT License - Free to use and modify!

---

## 🎉 Credits

Built with:
- FastAPI
- React
- Flux AI (Replicate)
- Love ❤️

---

**Happy Generating! 🎨**
