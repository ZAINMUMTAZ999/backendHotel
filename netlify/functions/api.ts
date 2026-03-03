import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

import express, { Response, Router } from "express";
import serverless from "serverless-http";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { registerRouter } from "../../src/routes/registerRouter";
import { loginRouter } from "../../src/routes/loginRouter";
import { v2 as cloudinary } from "cloudinary";
import { addHeroImageRouter } from "../../src/routes/addHeroImageRouter";

const MONGODB_URL = "mongodb+srv://hotelbackend:zxcvvcxz@cluster0.245yfua.mongodb.net/?appName=Cluster0";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(MONGODB_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection error:", error));

const allowedOrigins = [
  "https://demosekaispacehotelapp.vercel.app",
  "http://localhost:3000"
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

cloudinary.config({
  cloud_name: "zainmughal999",
  api_key: "744766614756274",
  api_secret: "F5uKFc-wILFbT2CW44eUJzDV8o8"
});

// ✅ FIX 1: Mount router on app (it was defined but never used!)
const router = Router();
router.use("/v1", registerRouter);
router.use("/v2", loginRouter);
router.use("/v3", addHeroImageRouter);
app.use("/", router); // 👈 this line was missing

app.get("/", (_req, res: Response) => {
  res.send("✅ Backend running successfully!");
});

// ✅ FIX 2: Remove app.listen() — Netlify is serverless, no ports
export const handler = serverless(app);
// ❌ DELETE: app.listen(8000, ...) — this breaks Netlify deployment