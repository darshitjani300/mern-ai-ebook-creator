# MERN AI Ebook Creator

A full-stack MERN application that allows users to generate ebooks using AI, edit content, and export as PDF or DOCX. Built with React, Node.js, Express, MongoDB, and Gemini/OpenAI integration.

------------------------------------------------------------

## 📂 Folder Structure

```bash
project-name/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── src/
│   ├── routes/
│   └── package.json
│
└── README.md

------------------------------------------------------------

## Tech Stack

Frontend:
- React
- Vite
- Tailwind CSS
- Axios

Backend:
- Node.js
- Express.js
- MongoDB + Mongoose
- AI Integration (Gemini or OpenAI API)
- PDF and DOCX export utilities

------------------------------------------------------------

## Installation and Setup

1. Clone the repository:
git clone https://github.com/your-username/mern-ai-ebook-creator.git
cd mern-ai-ebook-creator

------------------------------------------------------------

## Backend Setup

cd backend
npm install

Create a .env file:
MONGO_URI=your-mongodb-url
AI_API_KEY=your-api-key
PORT=5000

Run backend:
npm run dev

------------------------------------------------------------

## Frontend Setup

cd frontend
npm install
npm run dev

------------------------------------------------------------

## Running the Project

Backend runs at:
http://localhost:5000

Frontend runs at:
http://localhost:5173

------------------------------------------------------------

## Features

- Generate ebook content using AI
- Create, edit, and save chapters
- Export as PDF or DOCX
- Save ebooks in database
- Clean MERN architecture

------------------------------------------------------------

## Example API Endpoints

POST /api/ebook/generate     - Generate ebook content using AI  
POST /api/ebook/export/pdf   - Export ebook as PDF  
GET  /api/ebook/:id          - Get ebook details

------------------------------------------------------------

## Future Improvements

- Authentication system
- Cloud storage for exported files
- Multi-language ebook generation
- Better ebook formatting templates

------------------------------------------------------------

## Contributing

Pull requests are welcome. For major changes, open an issue first.

------------------------------------------------------------

## License

MIT License
