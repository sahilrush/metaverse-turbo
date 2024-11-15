import express from 'express'
import { userMiddleware } from '../middleware/user'
import { getbulkMetaData, UpdateMetadata } from '../actions/user'
import { createAvatar, createElement, createMap, updateElement } from '../actions/admin'
import { adminMiddleware } from '../middleware/admin'
const userRouter = express.Router()

userRouter.post("/metadata",userMiddleware,UpdateMetadata)
userRouter.get("/metadata/bulk",getbulkMetaData)
// router.post("/elements", adminMiddleware, createElement)
// router.put("/element/:elementId", adminMiddleware, updateElement)

export default userRouter;