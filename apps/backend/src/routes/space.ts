import express, { Router } from "express"
import { userMiddleware } from "../middleware/user";
import {  addElementtoSpace, createSpace, deleteElement, getAllSpaces,  getSpaceElementsbyId } from "../actions/space";


export const spaceRouter = Router();

spaceRouter.post("/", userMiddleware, createSpace)
spaceRouter.delete("/element", userMiddleware, deleteElement)
// spaceRouter.delete("/:spaceId", userMiddleware, deleteSpace)
spaceRouter.get("/all", userMiddleware, getAllSpaces)
spaceRouter.get("/:spaceId", userMiddleware, getSpaceElementsbyId)
spaceRouter.post("/element", userMiddleware, addElementtoSpace)

