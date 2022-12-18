import { ObjectId } from "mongoose";
import { string } from "zod";
import SlotModel, { Slot } from "../model/slot.model";
import { ReservedSlotsInput } from "../schema/slot.schema";


export function createSlot(input:Partial<Slot>){
    return SlotModel.create(input);
}

export function findSlot(day: string,startTime: string, endTime:string ){
    return SlotModel.findOne({day,startTime, endTime});
}

export function getReservedSlots(day?: string,startTime?: string, endTime?:string){
    console.log(day === undefined);
    console.log(startTime === undefined);
    console.log(endTime === undefined);

    if((day === undefined) && (startTime === undefined) && (endTime === undefined)){
        console.log("undefined");
        return SlotModel.find().select('day startTime endTime');
    }
    else if ((day === undefined) && (startTime !== undefined) && (endTime === undefined)){
        return SlotModel.find({startTime}).select('day startTime endTime');
    }
    else if ((day === undefined) && (startTime !== undefined) && (endTime !== undefined)){
        return SlotModel.find({startTime,endTime}).select('day startTime endTime');
    }
    else if ((day === undefined) && (startTime === undefined) && (endTime !== undefined)){
        return SlotModel.find({endTime}).select('day startTime endTime');
    }
    else if ((day !== undefined) && (startTime === undefined) && (endTime === undefined)){
        return SlotModel.find({day}).select('day startTime endTime');
    }
    else if ((day !== undefined) && (startTime !== undefined) && (endTime === undefined)){
        return SlotModel.find({day,startTime}).select('day startTime endTime');
    }
    else if ((day !== undefined) && (startTime !== undefined) && (endTime !== undefined)){
        return SlotModel.find({day,startTime,endTime}).select('day startTime endTime');
    }
    else if ((day !== undefined) && (startTime === undefined) && (endTime !== undefined)){
        return SlotModel.find({day,endTime}).select('day startTime endTime');
    }

}

export function deleteSlots(){
    return SlotModel.deleteMany();
}

export function deleteSlot(day: string,startTime: string, endTime:string ){
    return SlotModel.deleteOne({day: day,startTime: startTime, endTime: endTime});
}

