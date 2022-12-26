require('dotenv').config();
import express from 'express';
import config from 'config';
import nodeCron from 'node-cron';
import connectToDb from './utils/connectToDb';
import log from './utils/logger';
import router from './routes';
import deserializeUser from './middleware/deserializeUser';
import { deleteSlots } from './service/slot.service';
import { swaggerDocs } from './utils/swagger';

const app = express();

app.use(express.json()); 
app.use(deserializeUser);
app.use(router);

const jobDelete =  nodeCron.schedule("0 0 0 1 * *", deleteSlots);

const port = config.get<number>('port');

app.listen(port, async () => [
    log.info(`App started at http://localhost:${port}`),
    await connectToDb(),
    swaggerDocs(app,port),
]);