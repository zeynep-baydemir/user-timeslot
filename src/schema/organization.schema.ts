import { array, number, object, string, TypeOf } from "zod";
import { Room } from "../model/organization.model";

/**
 * @openapi
 * components:
 *  schemas:
 *      CreateOrganizationInput:
 *          type: object
 *          required: 
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *      CreateOrganizationResponse:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              _id:
 *                  type: string
 *              __v:
 *                  type: integer
 */
export const createOrganizationSchema = object({
    body: object ({
        name: string({required_error: "name is required"})
    })
})
/**
 * @openapi
 * components:
 *  schemas:
 *      CreateRoomInput:
 *          type: object
 *          required: 
 *              - roomNumber
 *              - desk
 *          properties:
 *              roomNumber:
 *                  type: string
 *              desk:
 *                  type: string
 *      CreateRoomResponse:
 *          type: object
 *          properties:
 *              roomNumber:
 *                  type: string
 *              desk:
 *                  type: string
 *              _id:
 *                  type: string
 *              __v:
 *                  type: integer
 */
export const createRoomSchema = object({
    body: object ({
        roomNumber: string({required_error: "room number is required"}),
        desk: string({required_error: "number of desk is required"})
    })
})


/**
 * @openapi
 * components:
 *  schemas:
 *      AssignAdminInput:
 *          type: object
 *          required: 
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *      AssignAdminResponse:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              name:
 *                  type: string
 *              __v:
 *                  type: integer
 *              admin:
 *                  $ref: '#/components/schemas/CreateUserResponse'
 *                      
 */
export const assignAdminToOrganizationSchema = object({
    params: object({
        id: string(), 
    }),
    body:object({
        name: string(),
    })
})

/**
 * @openapi
 * components:
 *  schemas:
 *      AssignOrganizationInput:
 *          type: object
 *          required: 
 *              - name
 *          properties:
 *              name:
 *                  type: string
 *      AssignOrganizationResponse:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              roomNumber:
 *                  type: string
 *              desk:
 *                  type: string
 *              __v:
 *                  type: integer
 *              organization:
 *                  $ref: '#/components/schemas/CreateRoomResponse'
 *                      
 */
export const assignRoomToOrganizationSchema = object({
    params: object({
        id: string(), 
    }),
    body:object({
        name: string(),
    })
})

/**
 * @openapi
 * components:
 *  schemas:
 *      RoomsOfOrganizationResponse:
 *          type: array
 *          items:
 *              type: object
 *              properties:
 *                  _id:
 *                      type: string
 *                  roomNumber:
 *                      type: string
 *                  desk:
 *                      type: string
 *                  __v:
 *                      type: integer
 *                  organization:
 *                      type: string
 *                      
 */
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



