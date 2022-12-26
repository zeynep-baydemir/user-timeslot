import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose";
import { int } from "aws-sdk/clients/datapipeline";
import { User } from "./user.model";

export class Organization {
    @prop({unique: true})
    name: string;

    @prop({ref: () => User })
    admin: Ref<User>;
   
}

export class Room{
    @prop({unique: true})
    roomNumber: string;

    @prop()
    desk: string;

    @prop({ref: () => Organization })
    organization: Ref<Organization>;
}

export const OrganizationModel = getModelForClass(Organization);
export const RoomModel = getModelForClass(Room);

