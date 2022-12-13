import { ObjectId } from "mongoose";
import { string } from "zod";
import SlotModel, { Slot } from "../model/slot.model";
import { ReserveSlotInput } from "../schema/slot.schema";


export function createSlot(input:Partial<Slot>){
    return SlotModel.create(input);
}

export function findSlot(startTime: string, day: string){
    return SlotModel.findOne({startTime, day});
}

export function getAvailableSlots(){
    return SlotModel.find({userId: null}).select('day startTime endTime');
}

export function getSlots(){
    return SlotModel.find();
}

export function deleteSlots(){
    return SlotModel.deleteMany({userId: null});
}

