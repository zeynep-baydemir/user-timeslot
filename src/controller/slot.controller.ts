import { CreateSlotInput, ReserveSlotInput } from "../schema/slot.schema";
import { Request, Response } from "express";
import { createSlot, deleteSlots, findSlot, getAvailableSlots, getSlots } from "../service/slot.service";
import { findUserById } from "../service/user.service";
import { Slot } from "../model/slot.model";
import dayjs from "dayjs";
import { DataExchange } from "aws-sdk";

export async function createSlotsHandler(req:Request<{},{},CreateSlotInput["body"]>, res: Response){
    
    let currentDay = dayjs(req.body.day);

    for (let i = 0; i < 5; i++) {

        let start=dayjs().set('hour', 9).set('minute', 0);


        let startTime = start.format("hh:mm");

        for (let j = 0; j < 16; j++) {

            const end = dayjs(start.add(30, 'minutes'));

            const endTime = (end.format("hh:mm"));

            const day = currentDay.format("YYYY-MM-DD")
            const isSlot = await findSlot(startTime,day);
            if (!isSlot){
            let body = {day,startTime,endTime};
            const slot = await createSlot(body);

            start = start.add(30, 'minutes');
            startTime = start.format("hh:mm");

            console.log(slot);

            }
        };
        currentDay = currentDay.add(1, 'day');
        start=dayjs().set('hour', 9).set('minute', 0);

    }
    return res.send("Slots are successfully created");

}
          


export async function reserveSlotHandler(req: Request<ReserveSlotInput["params"],{},ReserveSlotInput["body"]>, res: Response){
    const id = req.params.id;
    const {startTime,day} = req.body;

    const user = await findUserById(id);
    if (!user){
        return res.send("No user found");
    }
    
    const slot = await findSlot(startTime,day);
    if (!slot){
        return res.send("No slot found");

    }
    else{
        if(slot.userId === null){
            slot.userId = id;
            await slot.save();
            return res.send(slot);

        }else{
            return res.send("This slot is not available. Please choose another slot");
        }
    }

}

export async function getavailableSlotsHandler(req: Request, res: Response){
    const slots = await getAvailableSlots();
    return res.send(slots);
}

export async function getSlotsHandler(req: Request, res: Response){
    const slots = await getSlots();
    return res.send(slots);
}

export async function deleteSlotsHandler(req: Request, res: Response){
    await deleteSlots();
    return res.send("deleted");
}

