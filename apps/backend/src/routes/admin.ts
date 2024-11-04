import { createAvatar, createElement, createMap, updateElement } from "../actions/admin";
import express from "express";  


export const adminRouter = express.Router()
adminRouter.post("/element", createElement);
adminRouter.put("/element/:elementId", updateElement);
adminRouter.post("/avatar", createAvatar);
adminRouter.post("/map", createMap);