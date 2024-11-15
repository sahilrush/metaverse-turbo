import { AddElementSchema, CreateElementSchema, CreateSpaceSchema, DeleteElementSchema } from "../types"    
import client from "@repo/db/client"    
import e, { Request, Response } from "express"




export const createSpace = async(req: Request, res: Response) => {

    const parsedData = CreateSpaceSchema.safeParse(req.body)
    if (!parsedData.success) {
        console.log(JSON.stringify(parsedData))
        res.status(400).json({message: "Validation failed"})
        return
    }

    if (!parsedData.data.mapId) {
        const space = await client.space.create({
            data: {
                name: parsedData.data.name,
                width: parseInt(parsedData.data.dimensions.split("x")[0]),
                height: parseInt(parsedData.data.dimensions.split("x")[1]),
                creatorId: req.userId!
            }
        });
        res.json({spaceId: space.id})
        return;
    }
    
    const map = await client.map.findFirst({
        where: {
            id: parsedData.data.mapId
        }, select: {
            mapElements: true,
            width: true,
            height: true
        }
    })
    console.log("after")
    if (!map) {
        res.status(400).json({message: "Map not found"})
        return
    }
    console.log("map.mapElements.length")
    console.log(map.mapElements.length)
    let space = await client.$transaction(async () => {
        const space = await client.space.create({
            data: {
                name: parsedData.data.name,
                width: map.width,
                height: map.height,
                creatorId: req.userId!,  // as string
            }
        });

        await client.spaceElements.createMany({
            data: map.mapElements.map((e:any) => ({
                spaceId: space.id,
                elementId: e.elementId,
                x: e.x!,
                y: e.y!
            }))
        })
        return space;

    })
    console.log("space crated")
    res.json({spaceId: space.id})
}

export  const deleteSpace = async(req: Request, res: Response) => {
    const space = await client.space.findFirst({
        where:{
            id: req.params.spaceId
        }, select:{
            creatorId: true 
        }

    })


    if(!space){
        res.status(400).json({message: "Space not found"})
        return
    }


    if(space.creatorId !== req.userId){
        res.status(401).json({message: "Not authorized"})
        return
    }
    await client.space.delete({
        where: {
            id: req.params.spaceId
        }
    })
    res.json({message: "Space deleted successfully"})

}


export const getAllSpaces = async(req: Request, res: Response) => {
    const spaces = await client.space.findMany({
        where: {
            creatorId: req.userId
        }
    })
    res.json({
        spaces: spaces.map((s:any) => ({
            id: s.id,
            name: s.name,
            thumbnail: s.thumbnail,
            dimensions: `${s.width}x${s.height}`,
        }))
    })
}


export const addElementtoSpace = async(req: Request, res: Response) => {
    const parsedData = AddElementSchema.safeParse(req.body)
    if(!parsedData.success){
        res.status(400).json({message: "Validation failed"})
        return
    }
    const space = await client.space.findFirst({
        where:{
            id: req.body.spaceId,
            creatorId: req.userId
        }, select:{
            width: true,
            height: true,
        }
    })
    if(!space){
        res.status(400).json({message: "Space not found"})
        return
    }

    await client.spaceElements.create({
        data: {
            spaceId: req.body.spaceId,
            elementId: req.body.elementId,
            x: req.body.x,
            y: req.body.y
        }
    })
   
    res.json({message: "Element added successfully"})


}






export const getSpaceElementsbyId = async (req: Request, res: Response) => {
    console.log("req.params.spaceId", req.params.spaceId)
    const space = await client.space.findUnique({
        where: {
            id: req.params.spaceId
        }, select: {
            creatorId: true
        }
    })
    if (!space) {
        res.status(400).json({message: "Space not found"})
        return
    }

    if (space.creatorId !== req.userId) {
        console.log("code should reach here")
        res.status(403).json({message: "Unauthorized"})
        return
    }

    await client.space.delete({
        where: {
            id: req.params.spaceId
        }
    })
    res.status(200).json({message: "Space deleted"})
}

    export const deleteElement = async(req: Request, res: Response) => {   
        console.log("spaceElement?.space1 ")
        const parsedData = DeleteElementSchema.safeParse(req.body)
        if (!parsedData.success) {
            res.status(400).json({message: "Validation failed"})
            return
        }
        const spaceElement = await client.spaceElements.findFirst({
            where: {
                id: parsedData.data.id
            }, 
            include: {
                space: true
            }
        })
        console.log(spaceElement?.space)
        console.log("spaceElement?.space")
        if (!spaceElement?.space.creatorId || spaceElement.space.creatorId !== req.userId) {
            res.status(403).json({message: "Unauthorized"})
            return
        }
        await client.spaceElements.delete({
            where: {
                id: parsedData.data.id
            }
        })
        res.status(200).json({message: "Element deleted"})
    }    