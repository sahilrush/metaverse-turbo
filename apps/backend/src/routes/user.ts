import express from 'express'
import { userMiddleware } from '../middleware/user'
import { getbulkMetaData, UpdateMetadata } from '../actions/user'
const userRouter = express.Router()

userRouter.post("/metadata",userMiddleware,UpdateMetadata)
userRouter.get("/metadata/bulk",getbulkMetaData)

export default userRouter;