import express from 'express';
import { createSessionHandler, refreshAccessTokenHandler } from '../controller/auth.controller';
import validateResource from '../middleware/validateResource';
import { createSessionSchema } from '../schema/auth.schema';

const router = express.Router();

/**
 * @openapi
 * /api/session:
 *   post:
 *     summary: Login
 *     tags: 
 *         - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/CreateSessionInput'
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CreateSessionResponse'
 *       400:
 *         description: Bad request             
 * 
 */    
router.post(
    "/api/session",
    validateResource(createSessionSchema), 
    createSessionHandler
)
/**
 * @openapi
 * /api/session/refresh:
 *   post:
 *     summary: Refresh Token
 *     tags: 
 *         - Authentication
 *     header:
 *       required: true
 *       content:
 *     responses: 
 *       200:
 *         description: Success
 *         content: 
 *           application/json:
 *             schema:
 *               type: string
 *               description: Refresh token
 *       400:
 *         description: Bad request  
 *       401:
 *         description: Could not refresh access token             
 * 
 */
router.post(
    "/api/session/refresh", 
    refreshAccessTokenHandler,
)


export default router;