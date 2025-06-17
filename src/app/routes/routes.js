import authRouter from "../auth/auth.route";
import roadmapRouter from "../modules/roadmapItem/roadmapItem.route";
import { Router } from "express";

const router = Router();

const moduleRoutes = [
  {
    path: "/roadmapitem",
    router: roadmapRouter,
  },

  {
    path: "/user",
    router: authRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));
export default router;
