import express from "express";  
import { addElement, createSpace, deleteElement, getAllSpaces } from "../actions/space";
import { userMiddleware } from "../middleware/user";

export const spaceRouter = express.Router();
spaceRouter.post('/',userMiddleware, createSpace);
spaceRouter.delete("/element", userMiddleware, deleteElement);
spaceRouter.get("/all", userMiddleware, getAllSpaces);
spaceRouter.post("/element", userMiddleware, addElement);