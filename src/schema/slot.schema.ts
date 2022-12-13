import { mongoose } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { stdTimeFunctions } from 'pino';
import { date, object, string, TypeOf } from 'zod';

export const reserveSlotSchema = object({
    params:  object ({
        id: string(), 
    }),
    body: object ({
        //startTime: string({required_error: "start time is required"}),
        startTime: string(),


        day: string(),

    })
})

export const createSlotSchema = object({
    body: object ({
        day: string({required_error: "day is required"}),

    })
})

export type ReserveSlotInput = TypeOf<typeof reserveSlotSchema>;
export type CreateSlotInput = TypeOf<typeof createSlotSchema>;