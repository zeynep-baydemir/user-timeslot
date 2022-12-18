import express from 'express';
import { createAdminHandler, createUserHandler, deleteUsersHandler, forgotPasswordHandler, getCurrentUserHandler, getUsersHandler, reserveSlotHandler, resetPasswordHandler, verifyUserHandler } from '../controller/user.controller';
import {requireUser, requireAdmin} from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import { createAdminSchema, createUserSchema, forgotPasswordSchema, reserveSlotSchema, resetPasswordSchema, verifyUserSchema } from '../schema/user.schema';

const router = express.Router();


router.post(
    "/api/users",
    validateResource(createUserSchema), 
    createUserHandler
);
/*router.post(
    "/api/admin",
    validateResource(createAdminSchema), 
    createAdminHandler
);
*/
router.post(
    "/api/users/verify/:id/:verificationCode",
    validateResource(verifyUserSchema),
    verifyUserHandler
);

router.post(
    "/api/users/forgotpassword",
    validateResource(forgotPasswordSchema),
    forgotPasswordHandler
);

router.post(
    "/api/users/resetPassword/:id/:passwordResetCode",
    validateResource(resetPasswordSchema),
    resetPasswordHandler
);

router.post(
    "/api/users/reserveSlot/:id", requireUser,
    validateResource(reserveSlotSchema),
    reserveSlotHandler
);

router.get("/api/users/me", requireUser, getCurrentUserHandler);

router.get(
    "/api/users/", requireAdmin, getUsersHandler
)

router.delete(
    "/api/users/", requireAdmin, deleteUsersHandler
)

export default router;