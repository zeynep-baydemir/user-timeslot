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
 *     tags: 
 *         - User
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
/**
 * @openapi
 * /api/admin:
 *   post:
 *     summary: Create an admin
 *     tags: 
 *         - User
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

/**
 * @openapi
 * /api/users/:id:/verificationCode:
 *   post:
 *     summary: Verify a user
 *     tags: 
 *         - User
 *     parameters:
 *       - in: path
 *         name: id
 *         description: The id of the user
 *         required: true
 *       - in: path
 *         name: verificationCode
 *         description: The verification code of the user
 *         required: true
 *     content:
 *         application/json:
 *            schema:
 *               $ref: '#/components/schemas/VerifyUserInput'
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/VerifyUserResponse'
 *       404:
 *         description: User not found
 *       409:
 *         description: User is already verified
 *       400:
 *         description: Bad request             
 * 
 */  
router.post(
    "/api/users/verify/:id/:verificationCode", requireUser,
    validateResource(verifyUserSchema),
    verifyUserHandler
);
/**
 * @openapi
 * /api/users/forgotpassword:
 *   post:
 *     summary: Forgot Password
 *     tags: 
 *         - User
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ForgotPasswordInput'
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ForgotPasswordResponse'
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found                
 * 
 */              

router.post(
    "/api/users/forgotpassword", requireUser,
    validateResource(forgotPasswordSchema),
    forgotPasswordHandler
);

/**
 * @openapi
 * /api/users/resetPassword:/id/:passwordResetCode:
 *   post:
 *     summary: Reset Password
 *     tags: 
 *         - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *       - in: path
 *         name: resetPassword
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/ResetPasswordInput'
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ResetPasswordResponse'
 *       400:
 *         description: Bad request
 *                      
 * 
 */
router.post(
    "/api/users/resetPassword/:id/:passwordResetCode", requireUser,
    validateResource(resetPasswordSchema),
    resetPasswordHandler
);

/**
 * @openapi
 * /api/users/reserveSlot:/id/:roomId:
 *   post:
 *     summary: Reserve a slot
 *     tags: 
 *         - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *       - in: path
 *         name: roomId
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/CreateSlotInput'
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateSlotResponse'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found              
 * 
 */
router.post(
    "/api/users/reserveSlot/:id/:roomId", requireUser,
    validateResource(reserveSlotSchema),
    reserveSlotHandler
);

/**
 * @openapi
 * /api/users/me:/id:
 *   get:
 *     summary:  
 *     tags: 
 *         - User
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found              
 * 
 */
router.get("/api/users/me", requireUser, getCurrentUserHandler);
/**
 * @openapi
 * /api/users:
 *   get:
 *     summary:  Users
 *     tags: 
 *         - User
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateUserResponse'
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found              
 * 
 */
router.get(
    "/api/users/",requireSuperAdmin,getUsersHandler
)
/**
 * @openapi
 * /api/users:
 *   delete:
 *     summary:  Delete Users
 *     tags: 
 *         - User
 *     responses: 
 *       200:
 *         description: Success
 *       400:
 *         description: Bad request
 *       404:
 *         description: Not found              
 * 
 */
router.delete(
    "/api/users/", requireSuperAdmin, deleteUsersHandler
)

export default router;