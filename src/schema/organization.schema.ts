import { array, number, object, string, TypeOf } from "zod";
import { Room } from "../model/organization.model";


export const createOrganizationSchema = object({
    body: object ({
        name: string({required_error: "name is required"})
    })
})

export const createRoomSchema = object({
    body: object ({
        roomNumber: string({required_error: "room number is required"}),
        desk: string({required_error: "number of desk is required"})
    })
})

export const assignAdminToOrganizationSchema = object({
    params: object({
        id: string(), 
    }),
    body:object({
        name: string(),
    })
})

export const assignRoomToOrganizationSchema = object({
    params: object({
        id: string(), 
    }),
    body:object({
        name: string(),
    })
})

export const roomsOfOrganizationSchema = object({
    params: object({
        id: string(), 
    }),
})


export type CreateOrganizationInput = TypeOf<typeof createOrganizationSchema>["body"];
export type AssignAdminInput = TypeOf<typeof assignAdminToOrganizationSchema>;
export type CreateRoomInput = TypeOf<typeof createRoomSchema>["body"];
export type AssignRoomInput = TypeOf<typeof assignRoomToOrganizationSchema>;
export type RoomsOfOrganizationInput = TypeOf<typeof roomsOfOrganizationSchema>["params"];



