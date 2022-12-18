require('dotenv').config();
import express from 'express';
import config from 'config';
import nodeCron from 'node-cron';
import connectToDb from './utils/connectToDb';
import log from './utils/logger';
import router from './routes';
import deserializeUser from './middleware/deserializeUser';
import { deleteSlots } from './service/slot.service';

const app = express();

app.use(express.json()); 
app.use(deserializeUser);
app.use(router);


const dateTime = new Date();
console.log(dateTime);

const jobDelete =  nodeCron.schedule("0 0 0 1 * *", deleteSlots);

const port = config.get('port');

app.listen(port, () => [
    log.info(`App started at http://localhost:${port}`),
    connectToDb()
]);