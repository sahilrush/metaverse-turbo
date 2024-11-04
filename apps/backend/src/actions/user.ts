import { UpdateMetadataSchema } from "../types"
import { Request, Response } from "express" 
import  prisma from "@repo/db/client"   


export const metaData = async(req:Request, res:Response) => {  
    const parsedData = UpdateMetadataSchema.safeParse(req.body)
    if(!parsedData.success){
     res.status(400).json({error: "Invalid data"})    
    return    
    }
    await prisma.user.update({
        where :{
            id: req.userId
        },
        data: {
            avatarId: parsedData.data.avatarId,
        }
    })
    res.json({message: "Metadata updated successfully"})    
}

