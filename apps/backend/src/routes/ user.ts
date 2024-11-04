import { bulkMetaData, metaData } from "../actions/user";
import express from "express";  
import { userMiddleware } from "../middleware/user";



export const userRouter = express.Router();
userRouter.get("/metadata",userMiddleware, metaData);
userRouter.get("/metadata/bulk", bulkMetaData);
