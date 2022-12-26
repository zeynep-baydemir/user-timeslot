import { ObjectId } from "mongoose";
import { string } from "zod";
import { Room, RoomModel } from "../model/organization.model";
import SlotModel, { Slot } from "../model/slot.model";
import { ReservedSlotsInput } from "../schema/slot.schema";


export function createSlot(input:Partial<Slot>){
    return SlotModel.create(input);
}

export function findSlot(day: string,startTime: string, endTime:string, room: Room, desk: string ){
    return SlotModel.findOne({day,startTime, endTime,room,desk});
}

export function getReservedSlots(day?: string,startTime?: string, endTime?:string){
    let query = {
        day,
        startTime,
        endTime
    };
    if (day) {
        query.day = day;
    }
    if (startTime) {
        query.startTime = startTime;
    }
    if (day) {
        query.endTime = endTime;
    }
    console.log(query);
    return SlotModel.find(query);

}

export function deleteSlots(){
    return SlotModel.deleteMany();
}

export function deleteSlot(day: string,startTime: string, endTime:string ){
    return SlotModel.deleteOne({day: day,startTime: startTime, endTime: endTime});
}

