# SENDIT 🚀  
### Secure Link-Free File Sharing System (MERN Stack)

SENDIT is a real-world, secure, and link-free file sharing web application where users can send files using a **4-digit access code** instead of URLs.  
The receiver enters the code to download the file — fast, simple, and secure.

---

## 🔥 Key Features

- 🔢 **4-Digit Code Based Sharing** (No links, no URLs)
- 📤 Send any file type (Images, PDFs, DOC, ZIP, APK, PPT, etc.)
- 📥 Secure file receive (Login required)
- 🔐 Authentication:
  - Email & Password
  - Google Login (OAuth)
- 🕒 Automatic file expiry
- 🗂️ **Sent & Received File History**
- 🧾 Original file name preserved on download
- 📱 Fully responsive (Mobile & Desktop)
- ⚡ Fast & real-time experience

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Axios
- Context API
- Responsive UI (Mobile-first)

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- Multer (File upload)
- JWT Authentication
- Google OAuth

---

## ⚙️ How It Works

1. Sender uploads a file
2. System generates a **unique 4-digit access code**
3. Sender shares the code with receiver
4. Receiver logs in and enters the code
5. File downloads with **original file name**
6. History is saved for both sender & receiver

---

## 🔐 Security Design

- No public links
- JWT-based authentication
- Receiver must be logged in
- Temporary file access
- Automatic database cleanup using TTL

---

## 📂 Project Structure

