import express from "express";
import { assignAdminToOrganization, assignOrganizationToRoomHandler, createOrganizationHandler, createRoomHandler, deleteOrgsHandler, deleteRoomHandler, getOrgsHandler, getRoomsHandler, roomsOfOrganizationHandler } from "../controller/organization.controller";
import { requireAdmin, requireSuperAdmin } from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { assignAdminToOrganizationSchema, assignRoomToOrganizationSchema, createOrganizationSchema, createRoomSchema, roomsOfOrganizationSchema } from "../schema/organization.schema";

const router = express.Router();

router.post(
    "/api/organizations", requireSuperAdmin,
    validateResource(createOrganizationSchema), 
    createOrganizationHandler
)

router.post(
    "/api/organizations/:id", requireSuperAdmin,
    validateResource(assignAdminToOrganizationSchema), 
    assignAdminToOrganization
)

router.post(
    "/api/rooms/", requireSuperAdmin,
    validateResource(createRoomSchema), 
    createRoomHandler
)

router.post(
    "/api/rooms/:id", requireAdmin,
    validateResource(assignRoomToOrganizationSchema), 
    assignOrganizationToRoomHandler
)

router.get(
    "/api/rooms/:id", requireAdmin,
    validateResource(roomsOfOrganizationSchema),
    roomsOfOrganizationHandler
)

router.delete(
    "/api/organizations/", requireSuperAdmin, deleteOrgsHandler
)
router.delete(
    "/api/rooms/", requireAdmin, deleteRoomHandler
)
router.get(
    "/api/organizations/", requireSuperAdmin, getOrgsHandler
)
router.get(
    "/api/rooms/",requireAdmin, getRoomsHandler
)
export default router;


