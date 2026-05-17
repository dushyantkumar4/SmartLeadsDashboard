import express from "express";
import cors from "cors";

import authRoutes from "./models/auth/auth.routes.js";
import leadRoutes from "./models/lead/lead.routes.js";

import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

const allowedOrigins = [
  "https://smart-leads-dashboard-nu-eosin.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api", authRoutes);

app.use("/api", leadRoutes);

app.use(errorMiddleware);

export default app;
