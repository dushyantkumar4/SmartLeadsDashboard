import express from "express";
import cors from "cors";


import authRoutes from "./models/auth/auth.routes.js";
import leadRoutes from "./models/lead/lead.routes.js";

import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", authRoutes);

app.use("/api", leadRoutes);

app.use(errorMiddleware);

export default app;