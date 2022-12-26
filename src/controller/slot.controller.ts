import { CreateSlotInput, DeleteSlotInput, ReservedSlotsInput } from "../schema/slot.schema";
import { Request, Response } from "express";
import { createSlot, deleteSlot, deleteSlots, findSlot, getReservedSlots} from "../service/slot.service";
import { findUserById } from "../service/user.service";
import { Slot } from "../model/slot.model";
import dayjs from "dayjs";
import { DataExchange } from "aws-sdk";
    
export async function getReservedSlotsHandler(req: Request<{},{},ReservedSlotsInput>, res: Response){
    const {day,startTime,endTime} = req.body;
    const slots = await getReservedSlots(day,startTime,endTime);
    console.log(slots)
    return res.send(slots);

}

export async function deleteSlotHandler(req: Request<{},{},DeleteSlotInput>, res: Response){
    const {day,startTime,endTime} = req.body;
    await deleteSlot(day,startTime,endTime);
    return res.send("slot is deleted");
}
