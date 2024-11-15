import { UpdateMetadataSchema } from "../types"
import { Request, Response } from "express" 
import client from "@repo/db/client"


export const UpdateMetadata = async(req:Request, res:Response) => {  
    const parsedData = UpdateMetadataSchema.safeParse(req.body)   
    console.log(parsedData)    
    if (!parsedData.success) {
        console.log("parsed data incorrect")
        res.status(403).json({message: "Validation failed"})
        return
    }
    try {
        await client.user.update({
            where: {
                id: req.userId
            },
            data: {
                avatarId: parsedData.data.avatarId
            }
        })
        res.status(200).json({message: "Metadata updated"})
    } catch(e) {
        console.log("error")
        res.status(403).json({message: "Internal server error"})
    }
}



export const getbulkMetaData = async(req:Request, res:Response) => {   
    const parsedData = UpdateMetadataSchema.safeParse(req.body)       
    if (!parsedData.success) {
        console.log("parsed data incorrect")
        res.status(403).json({message: "Validation failed"})
        return
    }
    try {
        await client.user.update({
            where: {
                id: req.userId
            },
            data: {
                avatarId: parsedData.data.avatarId
            }
        })
        res.status(200).json({message: "Metadata updated"})
    } catch(e) {
        console.log("error")
        res.status(403).json({message: "Internal server error"})
    }
}