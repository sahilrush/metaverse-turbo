import express from "express"
import { adminMiddleware } from "../middleware/admin"
import { createAvatar, createElement, createMap, updateElement } from "../actions/admin"


const adminRouter = express.Router()

adminRouter.post("/avatar",adminMiddleware,createAvatar)
adminRouter.post("/map",adminMiddleware,createMap)
