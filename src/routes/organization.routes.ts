import express from "express";
import { assignAdminToOrganization, assignOrganizationToRoomHandler, createOrganizationHandler, createRoomHandler, deleteOrgsHandler, deleteRoomHandler, getOrgsHandler, getRoomsHandler, roomsOfOrganizationHandler } from "../controller/organization.controller";
import { requireAdmin, requireSuperAdmin } from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { assignAdminToOrganizationSchema, assignRoomToOrganizationSchema, createOrganizationSchema, createRoomSchema, roomsOfOrganizationSchema } from "../schema/organization.schema";

const router = express.Router();

/**
 * @openapi
 * /api/organizations:
 *   post:
 *     summary: Create an organization
 *     tags: 
 *         - Organization
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/CreateOrganizationInput'
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateOrganizationResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad request  
 *       500:
 *         description: Error            
 * 
 */  
router.post(
    "/api/organizations", requireSuperAdmin,
    validateResource(createOrganizationSchema), 
    createOrganizationHandler
)

/**
 * @openapi
 * /api/organizations/:id:
 *   post:
 *     summary: Assign admin to an organization
 *     tags: 
 *         - Organization
 *     parameters:
 *       - in: path
 *         name: admin
 *         description: The id of the admin
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AssingAdminInput'
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AssignAdminResponse'
 *       404:
 *         description: Not Found
 *       400:
 *         description: Bad request             
 * 
 */ 
router.post(
    "/api/organizations/:id", requireSuperAdmin,
    validateResource(assignAdminToOrganizationSchema), 
    assignAdminToOrganization
)

/**
 * @openapi
 * /api/rooms:
 *   post:
 *     summary: Create a room
 *     tags: 
 *         - Organization
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/CreateRoomInput'
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateRoomResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad request             
 * 
 */ 
router.post(
    "/api/rooms/", requireSuperAdmin,
    validateResource(createRoomSchema), 
    createRoomHandler
)

/**
 * @openapi
 * /api/rooms/:id:
 *   post:
 *     summary: Assign organization to a room
 *     tags: 
 *         - Organization
 *     parameters:
 *       - in: path
 *         name: room
 *         description: The id of the room
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/AssignOrganizationInput'
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AssignOrganizationResponse'
 *       400:
 *         description: Bad request             
 * 
 */ 
router.post(
    "/api/rooms/:id", requireAdmin,
    validateResource(assignRoomToOrganizationSchema), 
    assignOrganizationToRoomHandler
)


/**
 * @openapi
 * /api/rooms/:id:
 *   get:
 *     summary: Get rooms of organization
 *     tags: 
 *         - Organization
 *     parameters:
 *       - in: path
 *         name: room
 *         description: The id of the room
 *         required: true
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RoomsOfOrganizationResponse'
 *       400:
 *         description: Bad request             
 * 
 */ 

router.get(
    "/api/rooms/:id", requireAdmin,
    validateResource(roomsOfOrganizationSchema),
    roomsOfOrganizationHandler
)

/**
 * @openapi
 * /api/organizations:
 *   delete:
 *     summary: Delete organizations
 *     tags: 
 *         - Organization
 *     responses: 
 *       200:
 *         description: Deleted
 *       400:
 *         description: Bad request             
 * 
 */
router.delete(
    "/api/organizations/", requireSuperAdmin, deleteOrgsHandler
)

/**
 * @openapi
 * /api/rooms:
 *   delete:
 *     summary: Delete rooms
 *     tags: 
 *         - Organization
 *     responses: 
 *       200:
 *         description: Deleted
 *       400:
 *         description: Bad request             
 * 
 */
router.delete(
    "/api/rooms/", requireAdmin, deleteRoomHandler
)
/**
 * @openapi
 * /api/organizations:
 *   get:
 *     summary: Get organizations
 *     tags: 
 *         - Organization
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          _id: 
 *                              type: string
 *                          name: 
 *                              type: string
 *                          __v: 
 *                              type: integer
 *                          admin: 
 *                              type: string
 *       400:
 *         description: Bad request             
 *          
 */ 
router.get(
    "/api/organizations/", requireSuperAdmin, getOrgsHandler
)

/**
 * @openapi
 * /api/rooms:
 *   get:
 *     summary: Get rooms
 *     tags: 
 *         - Organization
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/RoomsOfOrganizationResponse'
 *       400:
 *         description: Bad request             
 * 
 */ 
router.get(
    "/api/rooms/",requireSuperAdmin, getRoomsHandler
)
export default router;


