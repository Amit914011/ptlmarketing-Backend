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
const SERVER_URL = process.env.BASE_URL;

// ✅ Ensure uploads folder exists
const uploadDir = path.join(__dirname, "/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
  console.log("✅ uploads folder created automatically");
}

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "https://ptlmarketing-r8ym.onrender.com"],
    credentials: true,
  })
);
app.use("/uploads", express.static(uploadDir)); // use uploadDir

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Database Connection
dataBaseConnection();

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

// ✅ Create simple ping endpoint
app.get("/ping", (req, res) => {
  const now = new Date();
  const timeInIndia = now.toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  console.log("🏓 Pong! Server is alive at " + timeInIndia);
});
// ✅ Cron job that runs every 10 minutes
cron.schedule("*/10 * * * *", async () => {
  try {
    console.log("⏰ Keeping server awake:", new Date().toLocaleTimeString());
    const res = await axios.get(`${SERVER_URL}/ping`); // simple API hit
    console.log("✅ Ping success:", res.status);
  } catch (error) {
    console.error("❌ Ping failed:", error.message);
  }
});

app.get("/", (req, res) => {
  res.send("Server is Running....");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
