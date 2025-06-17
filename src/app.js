import express from "express";
import cookieParser from "cookie-parser";
const app = express();
import cors from "cors";
import router from "./app/routes/routes";

//Middleware to parse JSON request to body
app.use(express.json());
app.use(cors());
// cookie parser
app.use(cookieParser());
// Application level router
app.use("/api/v1", router);

export default app;
