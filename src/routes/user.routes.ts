import express from 'express';
import { createUserHandler, forgotPasswordHandler, getCurrentUserHandler, getUsersHandler, resetPasswordHandler, verifyUserHandler } from '../controller/user.controller';
import requireUser from '../middleware/requireUser';
import validateResource from '../middleware/validateResource';
import { createUserSchema, forgotPasswordSchema, resetPasswordSchema, verifyUserSchema } from '../schema/user.schema';

const router = express.Router();


router.post(
    "/api/users",
    validateResource(createUserSchema), 
    createUserHandler
);

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


router.get("/api/users/me", requireUser, getCurrentUserHandler);

router.get(
    "/api/users/", getUsersHandler)

export default router;