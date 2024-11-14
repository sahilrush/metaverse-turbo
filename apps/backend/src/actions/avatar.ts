import client from "@repo/db/client"
import { Request, Response } from "express"

export const getAllavatars = async (req: Request, res: Response) => {
    try {
      const avatars = await client.avatar.findMany();
      res.json({
        avatars: avatars.map((a:any) => ({
          id: a.id,
          name: a.name,
          imageUrl: a.imageUrl,
        })),
      });
    } catch (error) {
      console.error('Error fetching avatars:', error);
      res.status(500).json({ error: 'An error occurred while fetching avatars' });
    }
  };