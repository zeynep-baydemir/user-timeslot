import  { Organization, OrganizationModel, Room, RoomModel } from "../model/organization.model";

export function createOrganization(input: Partial<Organization>){
    return OrganizationModel.create(input)
}

export function findOrganizationByName(name: string){
    return OrganizationModel.findOne({name});
}

export function createRoom(input: Partial<Room>){
    return RoomModel.create(input)
}

export function findRoomById(id: string){
    return RoomModel.findById(id);
}

export function findRoomByNumber(number: string){
    return RoomModel.find({number});
}

export function findRoomByOrganization(organization: string){
    return RoomModel.find({organization});
}
export function deleteOrgs(){
    return OrganizationModel.deleteMany({});
}
export function deleteRooms(){
    return RoomModel.deleteMany({});
}

export function getOrgs(){
    return OrganizationModel.find().lean();
}

export function getRooms(){
    return RoomModel.find().lean();
}