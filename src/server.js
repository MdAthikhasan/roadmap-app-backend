import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

import app from "./app.js";
import { notFoundHandler } from "./app/middlewares/notFound.js";
import globarErrorHandler from "./app/middlewares/globarErrorHandler.js";

let server;

// connect with monogodb
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log(`The application has  been connected to Mongodb `);
    server = app.listen(process.env.PORT, () => {
      console.log(`The app is listing ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

// notFound  handler
app.use(notFoundHandler);

//global error handler
app.use(globarErrorHandler);
