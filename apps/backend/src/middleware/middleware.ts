import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "secret";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.error("Authorization header is missing or invalid");
       res.status(403).json({ error: "Forbidden" });
       return
    }
  
    const token = authHeader.split(" ")[1];
  
    try {
      const payload = jwt.verify(token, JWT_SECRET) as { username: string };
      (req as any).user = payload;
      console.log("Authenticated user:", payload); // Log the authenticated user
      next();
    } catch (error) {
      console.error("JWT verification failed:", error);
       res.status(403).json({ error: "Forbidden" });
       return
    }
  };
  