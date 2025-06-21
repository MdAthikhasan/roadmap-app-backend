import { Router } from "express";
import authRouter from "../auth/auth.route.js";
import roadmapRouter from "../modules/roadmapItem/roadmapItem.route.js";
import userRouter from "../modules/user/user.routes.js";
import commentRouter from "../modules/comment/comment.route.js";

const router = Router();

const moduleRoutes = [
  {
    path: "/roadmapitem",
    router: roadmapRouter,
  },


  {
    path: "/user",
    router: userRouter,
  },
  {
    path: "/comment",
    router: commentRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));
export default router;
