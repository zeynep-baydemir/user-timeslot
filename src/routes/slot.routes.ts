import express from 'express';
import { deleteSlotHandler, getReservedSlotsHandler } from '../controller/slot.controller';
import { requireAdmin, requireUser } from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import { createSlotSchema } from '../schema/slot.schema';

const router = express.Router();


/**
 * @openapi
 * /api/slots/reserved:
 *   get:
 *     summary: Get reserved slots
 *     tags: 
 *         - Slot
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ReservedSlotsResponse'
 *       400:
 *         description: Bad request 
 *       404:
 *         description: Not found             
 * 
 */    
router.post(
    "/api/slots/reserved", requireUser,
    getReservedSlotsHandler
)


router.delete(
    "/api/slots", requireAdmin,
    deleteSlotHandler
)

export default router;