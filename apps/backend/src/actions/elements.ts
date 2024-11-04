import client from "@repo/db/client"
import { Request, Response } from "express"

export const avatars = async (req: Request, res: Response) => {
    try {
      const avatars = await client.avatar.findMany();
      res.json({
        avatars: avatars.map(a => ({
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


  export const elements = async(req: Request, res: Response) => {
    try {
      const elements = await client.element.findMany();
      res.json({
        elements: elements.map(e => ({
          id: e.id,
          imageUrl: e.imageUrl,
          width: e.width,
          height: e.height,
          static: e.static,
        })),
      });
    } catch (error) {
      console.error('Error fetching elements:', error);
      res.status(500).json({ error: 'An error occurred while fetching elements' });
    }
  };
  