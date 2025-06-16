import mongoose from "mongoose";
import dotenv from "dotenv";
import { Server } from "http";
dotenv.config();
import { globalEroorHandler } from "./app/middleware/globalEroorHandler";
import { notFoundHandler } from "./app/middleware/notFound";
import app from "./app/app";

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

// global eroor handler whith middleware
app.use(globalEroorHandler);
// notFound  handler
app.use(notFoundHandler);

process.on("unhandledRejection", (promise, error) => {
  console.log(
    "unhandledRejection detected :" + promise + "the error is:" + error
  );
  if (server) {
    server.close();
    process.exit(1);
  }
});
process.on("uncaughtException", (err) => {
  console.log("uncaughtException detected" + err);
  process.exit(1);
});
