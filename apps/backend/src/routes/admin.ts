import { Router } from "express";
import { adminMiddleware } from "../middleware/admin";
import { createAvatar, createElement, createMap } from "../actions/admin";

const adminRouter = Router();

adminRouter.post("/avatar", adminMiddleware, createAvatar);
adminRouter.post("/map", adminMiddleware, createMap);
adminRouter.post("/element",adminMiddleware,createElement)

export default adminRouter;
