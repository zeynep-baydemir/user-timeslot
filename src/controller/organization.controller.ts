import { createOrganization, createRoom, deleteOrgs, deleteRooms, findOrganizationByName, findRoomById, findRoomByOrganization, getOrgs, getRooms } from "../service/organization.service";
import { Request, Response } from "express";
import { AssignAdminInput, AssignRoomInput, CreateOrganizationInput, CreateRoomInput, RoomsOfOrganizationInput } from "../schema/organization.schema";
import { findUserById } from "../service/user.service";


export async function createOrganizationHandler(req: Request<{},{},CreateOrganizationInput>, res: Response) {
    try {
        const name = req.body;
        const organization = await createOrganization(name);
        return res.send(organization);
    } catch (error: any) {
        if (error.code === 11000){
                return res.status(409).send("Organization already exists");
        }
        return res.status(500).send(error);
    } 
}

export async function assignAdminToOrganization(req: Request<AssignAdminInput["params"],{},AssignAdminInput["body"]>, res: Response) {
    const id = req.params.id;
    const name = req.body.name;
    const admin = await findUserById(id);
    const organization = await findOrganizationByName(name);

    if (!organization){
        return res.send("Organization is not found");
    }
    if(admin){
        if(!organization.admin){
            organization.admin = admin;
            organization.save();
            return res.send(organization);
        }else{
            return res.send("The organization has admin");
        }
        
    }
    else {
        return res.send("Admin is not found");
    } 
}

export async function createRoomHandler(req: Request<{},{},CreateRoomInput>,res:Response){
    const body = req.body;
    try {
        const room = await createRoom(body);
        return res.send(room);
    } catch (error:any) {
        if (error.code === 11000){
            return res.status(409).send("Room already exists");
    }
    return res.status(500).send(error);
        return res.status(500).send(error);
    }

}

export async function assignOrganizationToRoomHandler(req: Request<AssignRoomInput["params"],{},AssignRoomInput["body"]>,res:Response){
    const id = req.params.id;
    const name = req.body.name;
    const room = await findRoomById(id);
    const organization = await findOrganizationByName(name);
    if(!organization){
        res.send("No organization is found");
    }else{
        if (room){
            if(!room.organization){
                room.organization = organization;
                room.save();
                res.send(room);
            }else{
                res.send("This room belongs to another organization ")
            }
            
        }else{
            res.send("No room found");
        }
    }
    
}

export async function roomsOfOrganizationHandler(req: Request<RoomsOfOrganizationInput,{},{}>, res: Response){
    const organizationId = req.params.id;
    const rooms = await findRoomByOrganization(organizationId);
    return res.send(rooms);
}

export async function deleteOrgsHandler(req: Request, res: Response){
    await deleteOrgs();
    return res.send("deleted");
}
export async function deleteRoomHandler(req: Request, res: Response){
    await deleteRooms();
    return res.send("deleted");
}
export async function getOrgsHandler(req: Request, res: Response){
    const organizations = await getOrgs();
    return res.send(organizations);
}
export async function getRoomsHandler(req: Request, res: Response){
    const rooms = await getRooms();
    return res.send(rooms);
}