import { mongoose } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { stdTimeFunctions } from 'pino';
import { date, object, string, TypeOf } from 'zod';



export const createSlotSchema = object({
    body: object ({
        day: string({required_error: "day is required"}),
    })
})

export const reservedSlotsSchema = object({
    body: object ({
        day: string(),
        startTime: string(),
        endTime: string(),
        room: string(),
        desk: string()
        
    })
})

export const deleteSlotSchema = object({
    body: object ({
        day: string({required_error: "day is required"}),
        startTime: string({required_error: "startTime is required"}),
        endTime: string({required_error: "endTime is required"}),
        room: string(),
        desk: string()
    })
})

export type CreateSlotInput = TypeOf<typeof createSlotSchema>;
export type ReservedSlotsInput = TypeOf<typeof reservedSlotsSchema>["body"];
export type DeleteSlotInput = TypeOf<typeof deleteSlotSchema>["body"];