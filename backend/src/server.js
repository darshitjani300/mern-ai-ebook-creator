require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db.js");

const authRoutes = require("./routes/auth.route.js");
const bookRoutes = require("./routes/book.route.js");
const aiRoutes = require("./routes/ai.route.js");
const exportRoutes = require("./routes/export.route.js");

const app = express();

//cors
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//Middleware
app.use(express.json());

//Static folders for upload
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

//db
connectDB();

//routes
app.get("/", (req,res) => {
  res.send("Server is running fine")
})
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/export", exportRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
