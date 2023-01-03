import { mongoose } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { stdTimeFunctions } from 'pino';
import { date, object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *      CreateSlotInput:
 *          type: object
 *          required: 
 *              - day
 *              - start time
 *              - end time
 *              - desk
 *          properties:
 *              day:
 *                  type: string
 *                  default: 2023-01-05
 *              startTime:
 *                  type: string
 *                  default: 15:00
 *              endTime:
 *                  type: string
 *                  default: 15:30
 *              desk:
 *                  type: string
 *                  default: 1
 *      CreateSlotResponse:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              day:
 *                  type: string
 *              startTime:
 *                  type: string
 *              endTime:
 *                  type: string
 *              room:
 *                  $ref: '#/components/schemas/CreateRoomResponse'  
 *              desk:
 *                  type: string
 *              user:
 *                  $ref: '#/components/schemas/CreateUserResponse'
 */

export const createSlotSchema = object({
    body: object ({
        day: string({required_error: "day is required"}),
        startTime: string({required_error: "start time is required"}),
        endTime: string({required_error: "end time is required"}),
        room: string({required_error: "room is required"}),
        desk: string({required_error: "desk is required"}),
    })
})
/**
 * @openapi
 * components:
 *  schemas:
 *      ReservedSlotsInput:
 *          type: object
 *              - day
 *              - start time
 *              - end time
 *              - desk
 *          properties:
 *              day:
 *                  type: string
 *                  default: 2023-01-05
 *              startTime:
 *                  type: string
 *                  default: 15:00
 *              endTime:
 *                  type: string
 *                  default: 15:30
 *              desk:
 *                  type: string
 *                  default: 1
 *      ReservedSlotsResponse:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  day:
 *                      type: string
 *                  startTime:
 *                      type: string
 *                  endTime:
 *                      type: string
 *                  room:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateRoomResponse'  
 *                  desk:
 *                      type: string
 *                  user:                     
 *                      $ref: '#/components/schemas/CreateUserResponse'
 * 
 *              
 */ 

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