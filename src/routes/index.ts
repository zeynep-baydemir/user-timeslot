import express from 'express';
import user from './user.routes';
import auth from './auth.routes';
import slot from './slot.routes';
import organization from './organization.routes';

import nodeCron from 'node-cron';


const router = express.Router();

router.get("/healthcheck", (_, res) => res.sendStatus(200));


router.use(user);
router.use(auth);
router.use(slot);
router.use(organization);


export default router;