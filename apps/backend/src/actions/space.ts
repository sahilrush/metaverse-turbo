import { CreateSpaceSchema } from "../types"
import client from "@repo/db/client"    
import { Request, Response } from "express"




export const createSpace = async(req: Request, res: Response) => {

    const parsedData = CreateSpaceSchema.safeParse(req.body)
    if(!parsedData.success){
        res.status(400).json({error: "Invalid data"})
        return
    }

    if(!parsedData.data.mapId)  {
        await client.space.create({
            data: {
                name: parsedData.data.name,
                width: parsedData.data.dimensions.split("x")[0],
                height: parsedData.data.dimensions.split("x")[1],
                creatorId: req.userId!
                
            }
        });
        res.json({message: "Space created successfully"})
    }
    const map = await client.map.findUnique({
        where: {
            id: parsedData.data.mapId
        }
    })

}