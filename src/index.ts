import express, { Response, Router } from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { registerRouter } from './routes/registerRouter';
import { loginRouter } from './routes/loginRouter';
import { addHeroImageRouter } from './routes/addHeroImageRouter';
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
const app = express();
app.use(express.json());

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// console.log(
//   "Stripe key loaded:",
//   Boolean(process.env.STRIPE_SECRET_KEY)
// );
const MONGO_URI="mongodb+srv://hotelbackend:zxcvvcxz@cluster0.245yfua.mongodb.net/?appName=Cluster0";
// Database connection
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection error:", error));

// CORS
const allowedOrigins = [
//   process.env.FRONTEND_URL as string,
"http://localhost:3000",
"https://demosekaispacehotelapp.vercel.app",
"https://demosekaispacehotelapp-zainmumtaz999s-projects.vercel.app",
"https://demosekaispacehotelapp-git-main-zainmumtaz999s-projects.vercel.app",
"https://demosekaispacehotelapp-fx3a46k83-zainmumtaz999s-projects.vercel.app",
"http://localhost:5173"
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
}));

// Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get("/", (_req, res: Response) => {
  res.send(" Backend running successfully!");
});

// Routes
const router = Router();
router.use("/api/v1", registerRouter);
router.use("/api/v2", loginRouter);
router.use("/api/v3", addHeroImageRouter);
// router.use("/api/v3", addb);
app.use("/", router);

// Local dev only
if (process.env.NODE_ENV !== "production") {
  app.listen(8000, () => console.log("Listening on port 8000"));
}

export default app;
