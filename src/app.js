import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import router from "./app/routes/routes.js";
const app = express();

//Middleware to parse JSON request to body
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // not "*"
    credentials: true,
  })
);

// cookie parser
app.use(cookieParser());
// Application level router
app.use("/api/", router);

export default app;
