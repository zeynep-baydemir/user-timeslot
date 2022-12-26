import express from 'express';
import {  createAdminHandler, createSuperAdminHandler, createUserHandler, deleteUsersHandler, forgotPasswordHandler, getCurrentUserHandler, getUsersHandler, reserveSlotHandler, resetPasswordHandler, verifyUserHandler } from '../controller/user.controller';
import {requireUser, requireAdmin, requireSuperAdmin} from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import { assignAdminorUserSchema, createUserSchema, forgotPasswordSchema, reserveSlotSchema, resetPasswordSchema, verifyUserSchema } from '../schema/user.schema';

const router = express.Router();

/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Register a user
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/CreateUserInput'
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       409:
 *         description: Conflict
 *       400:
 *         description: Bad request             
 * 
 */         


router.post(
    "/api/users", 
    validateResource(createUserSchema), 
    createUserHandler
);
router.post(
    "/api/admin", requireSuperAdmin,
    validateResource(createUserSchema), 
    createAdminHandler
);

/*
router.post(
    "/api/superAdmin",
    validateResource(createUserSchema), 
    createSuperAdminHandler
);
*/
router.post(
    "/api/users/verify/:id/:verificationCode", requireUser,
    validateResource(verifyUserSchema),
    verifyUserHandler
);

router.post(
    "/api/users/forgotpassword", requireUser,
    validateResource(forgotPasswordSchema),
    forgotPasswordHandler
);

router.post(
    "/api/users/resetPassword/:id/:passwordResetCode", requireUser,
    validateResource(resetPasswordSchema),
    resetPasswordHandler
);

router.post(
    "/api/users/reserveSlot/:id/:roomId", requireUser,
    validateResource(reserveSlotSchema),
    reserveSlotHandler
);


router.get("/api/users/me", requireUser, getCurrentUserHandler);

router.get(
    "/api/users/",requireSuperAdmin,getUsersHandler
)

router.delete(
    "/api/users/", requireSuperAdmin, deleteUsersHandler
)

export default router;