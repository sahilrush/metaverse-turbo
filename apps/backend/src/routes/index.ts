import express from "express"
import { signin, signup } from "../actions/account"
import { getAllelements } from "../actions/element"
import { getAllavatars } from "../actions/avatar"
import spaceRouter from "./space"
import adminRouter from "./user"
import userRouter from "./user"


const router = express.Router()
router.get("/health",(req,res)=>{
    res.send("API Server is running")
})
router.post("/signup",signup)
router.post("/signin",signin)
router.get("/avatars",getAllavatars)
router.get("/elements",getAllelements)
router.use("/user",userRouter)
router.use("/space",spaceRouter)
router.use("/admin",adminRouter)

export default router;