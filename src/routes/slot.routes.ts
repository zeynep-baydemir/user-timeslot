import express from 'express';
import { deleteSlotHandler, getReservedSlotsHandler } from '../controller/slot.controller';
import { requireAdmin, requireUser } from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import { createSlotSchema } from '../schema/slot.schema';

const router = express.Router();

router.post(
    "/api/slots/reserved",requireUser,
    getReservedSlotsHandler
)


router.delete(
    "/api/slots", requireAdmin,
    deleteSlotHandler
)

export default router;