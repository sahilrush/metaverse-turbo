import { NextFunction } from "express";
import { Request, Response } from "express";    
import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";


export const userMiddleware = (req: Request, res: Response, next: NextFunction) => { 
        
  const header = req.headers["authorization"];
  const token = header?.split(" ")[1];

  if(!token) {
    res.status(403).json({
      messagge: "Unauthorized"  

    })
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_PASSWORD)as {role: string, userId:string};
    req.userId = decoded.userId;
    next();
  } catch(e) {
    res.status(403).json({
      message: "Unauthorized"
    })  
    return
  }
}