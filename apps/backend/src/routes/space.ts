import express from "express"
import { userMiddleware } from "../middleware/user";
import {  addElementtoSpace, createSpace, deleteElement, deleteSpace, getAllSpaces,  getSpaceElementsbyId } from "../actions/space";
import { adminMiddleware } from "../middleware/admin";


const spaceRouter = express.Router();

spaceRouter.post("/", userMiddleware, createSpace)
spaceRouter.delete("/element", userMiddleware, deleteElement)
spaceRouter.delete("/:spaceId", userMiddleware, deleteSpace)
spaceRouter.get("/all", userMiddleware, getAllSpaces)
spaceRouter.get("/:spaceId", userMiddleware, getSpaceElementsbyId)
spaceRouter.post("/element", userMiddleware, addElementtoSpace)
spaceRouter.put("/element/:elementId",adminMiddleware)

export default spaceRouter