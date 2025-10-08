import express from "express";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import dataBaseConnection from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url"; // <--- import this
import cron from "node-cron";
import axios from "axios";

dotenv.config();

// ES module me __dirname define karo
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SERVER_URL = "https://ptlmarketing-backend-7fg9.onrender.com";

// ✅ Ensure uploads folder exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("✅ uploads folder created automatically");
}

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://ptlmarketing-r8ym.onrender.com","https://ptlmarketing-backend-7fg9.onrender.com"],
    credentials: true,
  })
);
app.use("/uploads", express.static(uploadDir)); // use uploadDir

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Database Connection
dataBaseConnection();

app.get('/api/v1/ping',(req,res)=>{
    res.send("🏓 Pong! Server is alive at " + new Date().toLocaleTimeString());
})

// Router Configuration
import userRouter from "./routers/userRouter.js";
import contactusRouter from "./routers/contactusRouter.js";
import blogRouter from "./routers/blogRouter.js";
import dashboardRouter from "./routers/dashboardRouter.js";

// Routers
app.use("/api/v1/", userRouter);
app.use("/api/v1/", contactusRouter);
app.use("/api/v1/", blogRouter);
app.use("/api/v1/", dashboardRouter);




cron.schedule("*/1 * * * *", async () => {
  try {
    console.log("⏰ Keeping server awake:", new Date().toLocaleTimeString());
    const res = await axios.get(`${SERVER_URL}/api/v1/get-contact`, {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    console.log("✅ Ping success:", res);
  } catch (error) {
    console.error("❌ Ping failed:", error.message);
  }
});


setInterval(async () => {
  try {
    await axios.get("https://ptlmarketing-backend-7fg9.onrender.com/api/v1/get-contact", {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    console.log("Server pinged to stay awake.");
  } catch (err) {
    console.log("Ping failed:", err.message);
  }
}, 1 * 60 * 1000); // 10 minutes


app.get("/", (req, res) => {
  res.send("Server is Running....");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
