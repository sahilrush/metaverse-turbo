
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'secret';
import jwt from 'jsonwebtoken'; 



export const signup = async (req: Request, res: Response): Promise<any> => {
    console.log("Request body:", req.body); 
    const { username, password, role } = req.body;
    console.log(role);

    // Validate role
    if (role !== "Admin" && role !== "User") {
        return res.status(400).json({ error: "Role must be either Admin or User" });
    }

    try {
        // Check if the user already exists3
        const existingUser = await prisma.user.findUnique({
            where: {
                username: username,
            },
        });

        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Create a new user
        const user = await prisma.user.create({
            data: {
                username: username,
                password: passwordHash,
                role: role,
            },
        });

        return res.status(201).json({ message: "User created successfully" });
    } catch (err: any) {
        console.error("Error in /signup:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};



export const signin = async(req: Request, res: Response):Promise<any> => {  
        const {username ,password} = req.body;
        try {
            const user = await prisma.user.findUnique({
                where: {
                    username: username
                }
            })
            if(!user) {
                return res.status(400).json({error: "Invalid credtionals"})
            }


            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(400).json({error: "Invalid credtionals"})
            }

            const token = jwt.sign({ username: user.username}, JWT_SECRET, {expiresIn: "1h"})

            return res.status(500).json({token})

        }catch(err){
             console.error("Error in /sign:",err)
             return res.status(500).json({err:"Internal server error"})
        }


}