import client from "@repo/db/client"
import { Request, Response } from "express"



  export const getAllelements = async(req: Request, res: Response) => {
    try {
      const elements = await client.element.findMany();
      res.json({
        elements: elements.map((e:any) => ({
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
  