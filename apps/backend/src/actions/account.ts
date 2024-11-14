
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'; 
import client from "@repo/db/client";
import { SigninSchema, SignupSchema } from '../types';
import { JWT_SECRET } from '../types/config';

export const signup = async (req: Request, res: Response): Promise<any> => {
    console.log("Request body:", req.body); 
    const parsedData = SignupSchema.safeParse(req.body);
    if(!parsedData.success){
         res.status(400).json({error: "Invalid data"})
        return
    }

    try {
        const hashedPassword = await bcrypt.hash(parsedData.data.password, 10); 
        const user = await client.user.create({
            data: {
                username: parsedData.data.username,
                password:hashedPassword,
                role:parsedData.data.type === "admin" ? "Admin" : "User"
            },
        });

        return res.status(201).json({ message: "User created successfully", userId: user.id });
    } catch (e) {
        return res.status(400).json({ error: "User already exists" });
    }
};



export const signin = async(req: Request, res: Response):Promise<any> => {  


        const parsedData = SigninSchema.safeParse(req.body);

    if(!parsedData.success){
        return res.status(400).json({error: "Invalid data"})    
    }


    try {
            const user = await client.user.findUnique({
                where: {
                    username: parsedData.data.username
                }
            })
  
            if(!user){
                return res.status(400).json({error: "user not found"})
            }
 
            const isPasswordValid = await bcrypt.compare(parsedData.data.password, user.password);
            if(!isPasswordValid){
                return res.status(400).json({error: "Invalid credtionals"})
            }

            const token = jwt.sign({
                userId: user.id,
                role:user.id
            }, JWT_SECRET)

            return res.json({token})

        }catch(err){
             return res.status(500).json({err:"Internal server error"})
        }


}