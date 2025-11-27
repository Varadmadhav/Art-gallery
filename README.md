# 🎨 Art Gallery – Full Stack Web Application
A modern art marketplace built with React, TypeScript, Node.js, Express & MongoDB.

![Banner](https://via.placeholder.com/1200x350?text=Art+Gallery+Project+Banner)

---

## 🌟 Tech Stack

### Frontend
- React + TypeScript
- Vite
- TailwindCSS + Shadcn UI
- React Router
- Lucide Icons
- Context API
- Sonner for notifications

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Multer (file upload)
- Cloudinary
- REST API structure

---

# 🚀 Installation & Setup

## 1️⃣ Clone the Repository
```bash
git clone https://github.com/Varadmadhav/Art-gallery.git
cd Art-gallery
```

## 2️⃣ Install Frontend Dependencies
```bash
npm install
```

## 3️⃣ Install Backend Dependencies
```bash
cd backend
npm install
```

## 4️⃣ Create Environment File (Backend)
Create:
```
backend/.env
```

Add:
```env
MONGO_URI=your_mongodb_url
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# ▶️ Running the Project

## 🔥 Start Backend
```bash
cd backend
node server.js
```
Backend will run at:
```
http://localhost:5000
```

## 🔥 Start Frontend
```bash
cd ..
npm run dev
```

Frontend will run at:
```
http://localhost:5173
```

---

# 📁 Project Structure

```
Art-gallery/
 ├── src/                   # Frontend
 │    ├── components/
 │    ├── pages/
 │    ├── context/
 │    ├── data/
 │    ├── styles/
 │
 ├── backend/               # Backend API
 │    ├── controllers/
 │    ├── models/
 │    ├── routes/
 │    ├── middlewares/
 │    ├── config/
 │    └── uploads/
 │
 ├── package.json
 ├── vite.config.ts
 ├── index.html
 └── README.md
```

---

# 🔐 API Base URL

Default:
```
http://localhost:5000/api
```

---

# 👥 Contribution Guidelines (Team Workflow)

## ✔ 1. Always pull latest
```bash
git pull
```

## ✔ 2. Create a feature branch
```bash
git checkout -b feature/<feature-name>
```

## ✔ 3. Commit changes
```bash
git add .
git commit -m "added <feature>"
```

## ✔ 4. Push branch
```bash
git push origin feature/<feature-name>
```

## ✔ 5. Create Pull Request
Team reviews → merge into **main**

---

# 📝 Notes for Teammates
- Don't upload `node_modules`
- Don't upload `.env`
- Always run `npm install` after pulling new changes
- Never commit directly to main branch

---

# 🚀 Deployment Options

### Frontend:
- Vercel  
- Netlify  

### Backend:
- Render  
- Railway  
- VPS / AWS  

### Database:
- MongoDB Atlas

---

# 📸 Screenshots (Add Later)

```
![Home Page](screenshot-home.png)
![Gallery Page](screenshot-gallery.png)
![Admin Panel](screenshot-admin.png)
```

---

# ❤️ Thank You!
If you like this project:
- ⭐ Star the repo
- 📢 Contribute

Manage orders

Dashboard insights
