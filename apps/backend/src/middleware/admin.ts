import { NextFunction } from "express";
import { Request, Response } from "express";    
import { JWT_SECRET } from "../types/config";
import jwt from "jsonwebtoken";


export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => { 
        
  const header = req.headers["authorization"];
  const token = header?.split(" ")[1];

  if(!token) {
    res.status(403).json({
      messagge: "Unauthorized"  

    })
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)as {role: string, userId:string};
    if(decoded.role !== "Admin") {
      res.status(403).json({
        message: "Unauthorized"
      })
      return;
    }
    req.userId = decoded.userId;
    next();
  } catch(e) {
    res.status(403).json({
      message: "Unauthorized"
    })  
    return
  }
}