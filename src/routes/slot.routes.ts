import express from 'express';
import { createSlotsHandler, deleteSlotsHandler, getavailableSlotsHandler, getSlotsHandler, reserveSlotHandler } from '../controller/slot.controller';
import validateResource from '../middleware/validateResource';
import { createSlotSchema, reserveSlotSchema } from '../schema/slot.schema';

const router = express.Router();

router.post(
    "/api/slots/create",
    validateResource(createSlotSchema), 
    createSlotsHandler
)

router.post(
    "/api/slots/:id",
    validateResource(reserveSlotSchema), 
    reserveSlotHandler
)

router.get(
    "/api/slots/available",
    getavailableSlotsHandler
)

router.get(
    "/api/slots",
    getSlotsHandler
)

router.delete(
    "/api/slots",
    deleteSlotsHandler
)

export default router;