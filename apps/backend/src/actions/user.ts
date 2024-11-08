import { UpdateMetadataSchema } from "../types"
import { Request, Response } from "express" 
import client from "@repo/db/client"


export const metaData = async(req:Request, res:Response) => {  
    const parsedData = UpdateMetadataSchema.safeParse(req.body)
    if(!parsedData.success){
     res.status(400).json({error: "Invalid data"})    
    return    
    }
    await client.user.update({
        where :{
            id: req.userId
        },
        data: {
            avatarId: parsedData.data.avatarId,
        }
    })
    res.json({message: "Metadata updated successfully"})    
}


export const bulkMetaData = async(req:Request, res:Response) => {   
    const userIdString = (req.query.ids ?? "[]") as string;
    const userIds = (userIdString).slice(1, userIdString?.length - 2).split(",");

    const metadata = await client.user.findMany({
        where: {
            id: {
                in: userIds
            }
        }, select: {
            avatar: true,
            id:true
        }
    })
    res.json({
        avatars: metadata.map((m:any) => ({
            userId: m.id,
            avatarId: m.avatar?.imageUrl    
        }))
    })
}

