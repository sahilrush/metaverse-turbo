import express from "express"
import { adminMiddleware } from "../middleware/admin"
import { createAvatar, createElement, createMap, updateElement } from "../actions/admin"


const router = express.Router()

router.post("/elements", adminMiddleware, createElement)
router.put("/element/:elementId", adminMiddleware, updateElement)
router.post("/avatar", adminMiddleware, createAvatar)
router.post("/map", adminMiddleware, createMap)