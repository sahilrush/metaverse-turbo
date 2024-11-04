import { CreateAvatarSchema, CreateElementSchema, CreateMapSchema, UpdateElementSchema } from "../types"
import client from "@repo/db/client"    
import { Request, Response } from "express" 


export const createElement = async(req: Request, res: Response) => {
    const parsedData = CreateElementSchema.safeParse(req.body)

    if(!parsedData.success){
        res.status(400).json({message: "Validation failed"})
        return
    } 


    const element = await client.element.create({
        data:{
            imageUrl: parsedData.data.imageUrl,
            width: parsedData.data.width,
            height: parsedData.data.height,
            static: parsedData.data.static,
        }
        
    })

        
    res.json({
        id: element.id,
        message: "Element created successfully",
    })

}


export const updateElement = async(req: Request, res: Response) => {
    const parsedData = UpdateElementSchema.safeParse(req.body)

    if(!parsedData.success){
        res.status(400).json({message: "Validation failed"})
        return
    }

    const element = await client.element.update({
        where: {
            id: req.params.elementId
        }, 
        data: {
            imageUrl: parsedData.data.imageUrl,
        }   
    })
}   

export const createAvatar = async(req: Request, res: Response) => {
    const parsedData = CreateAvatarSchema.safeParse(req.body)
    if(!parsedData.success){
       res.status(400).json({message:"validation failed"})
        return
    }

    const avatar = await client.avatar.create({
        data:{
            name:parsedData.data.name,
            imageUrl:parsedData.data.imageUrl,
        }
    })
    res.json({
        id:avatar.id,
        message:"Avatar created"
    })
}

export const createMap = async(req:Request, res:Response) =>{

    const parsedData = CreateMapSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({message: "Validation failed"})
        return
    }
    const map = await client.map.create({
        data: {
            name: parsedData.data.name,
            width: parseInt(parsedData.data.dimensions.split("x")[0]),
            height: parseInt(parsedData.data.dimensions.split("x")[1]),
            thumbnail: parsedData.data.thumbnail,
            mapElements: {
                create: parsedData.data.defaultElements.map(e => ({
                    elementId: e.elementId,
                    x: e.x,
                    y: e.y
                }))
            }
        }
    })

    res.json({
        id: map.id
    })

    }
