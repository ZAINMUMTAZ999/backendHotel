import express, { Response, Router } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";
import { registerRouter } from './routes/registerRouter';
import { loginRouter } from './routes/loginRouter';
import { addHeroImageRouter } from './routes/addHeroImageRouter';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection error:", error));

// CORS
const allowedOrigins = [
  process.env.FRONTEND_URL as string,
  "http://localhost:3000",
  "https://demosekaispacehotelapp.vercel.app",
  "https://demosekaispacehotelapp-git-main-zainmumtaz999s-projects.vercel.app"
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
  res.send("✅ Backend running successfully!");
});

// Routes
const router = Router();
router.use("/api/v1", registerRouter);
router.use("/api/v2", loginRouter);
router.use("/api/v3", addHeroImageRouter);
app.use("/", router);

// Local dev only
if (process.env.NODE_ENV !== "production") {
  app.listen(8000, () => console.log("Listening on port 8000"));
}

export default app;
// import dns from 'dns';
// dns.setDefaultResultOrder('ipv4first');
// dns.setServers(['8.8.8.8', '8.8.4.4']);

// import express, { Response, Router } from "express";
// import serverless from "serverless-http";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import mongoose from "mongoose";

// import { v2 as cloudinary } from "cloudinary";
// import { registerRouter } from './routes/registerRouter';
// import { loginRouter } from './routes/loginRouter';
// import { addHeroImageRouter } from './routes/addHeroImageRouter';

// const MONGODB_URL = "mongodb+srv://hotelbackend:zxcvvcxz@cluster0.245yfua.mongodb.net/?appName=Cluster0";
// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// mongoose
//   .connect(MONGODB_URL)
//   .then(() => console.log("Database connected successfully"))
//   .catch((error) => console.error("Database connection error:", error));

// const allowedOrigins = [
//   "https://demosekaispacehotelapp.vercel.app",
//   "http://localhost:3000"
// ];
// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) return callback(null, true);
//     return callback(new Error("Not allowed by CORS"));
//   },
//   credentials: true,
// }));

// cloudinary.config({
//   cloud_name: "zainmughal999",
//   api_key: "744766614756274",
//   api_secret: "F5uKFc-wILFbT2CW44eUJzDV8o8"
// });

// app.get("/", (_req, res: Response) => {
//   res.send("✅ Backend running successfully!");
// });

// const router = Router();
// router.use("/api/v1", registerRouter);
// router.use("/api/v2", loginRouter);
// router.use("/api/v3", addHeroImageRouter);
// app.use("/", router);

// export const handler = serverless(app);