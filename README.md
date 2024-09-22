# Fullstack Project

This is a fullstack web application built with a React frontend and Node.js backend. It uses Vite for the frontend build process and Express for the backend server.

## 🚀 Features

- React frontend with Vite for fast development and optimized builds
- Node.js backend with Express
- Fullstack deployment configuration for Vercel
- Concurrently run frontend and backend in development

## 🛠️ Technologies Used

- Frontend: React, Vite
- Backend: Node.js, Express
- Database: MongoDB
- Deployment: Vercel

## 📁 Project Structure
```
    fullstack-project/
    ├── backend/
    │ ├── src/
    │ │ ├── server/
    | | │ ├── config/
    | | │ ├── controllers/
    | | │ ├── middleware/
    │ │ │ ├── models/
    │ │ │ ├── routes/
    │ │ │ ├── server.js
    │ ├── package.json
    ├── frontend/
    │ ├── src/
    │ │ ├── components/
    │ │ ├── routing/
    │ │ ├── styles/
    │ │ ├── App.jsx
    │ │ ├── main.jsx
    │ ├── index.html
    │ ├── vite.config.js
    │ └── package.json
    ├── package.json
    ├── vercel.json
    └── README.md
```

## 🛠️ Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/fullstack-project.git
   cd fullstack-project
   ```

2. Install dependencies:
   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   cd ..
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory for backend environment variables
   - Create a `.env` file in the `frontend` directory for frontend environment variables

## 🖥️ Development

To run the application in development mode:

```
npm run dev
```

This will start both the frontend and backend servers concurrently.

- Frontend will be available at `http://localhost:5173`
- Backend will be available at `http://localhost:5353`

## 🏗️ Building for Production

To build the application for production:

```
npm run build
```

This will create a production build of both the frontend and backend.

## 🚢 Deployment

This project is configured for deployment on Vercel. To deploy:

1. Push your changes to GitHub
2. Connect your GitHub repository to Vercel
3. Configure the following settings in Vercel:
   - Build Command: `npm run vercel-build`
   - Output Directory: Leave blank
   - Install Command: `npm install`

## 👤 Author

- GitHub: [@yash-babariya](https://github.com/yash-babariya)
- LinkedIn: [@yash-babariya](https://www.linkedin.com/in/yash-babariya-a370b52a5/)
