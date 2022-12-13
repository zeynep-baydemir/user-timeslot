import nodemailer,{SendMailOptions} from 'nodemailer';
import config from 'config';
import log from './logger';
/*
async function createTestCreds(){
    const creds = await nodemailer.createTestAccount();
    console.log({creds});
 
}
*/
const smtp = config.get<{ 
    user: string,
    pass: string,
    host: string,
    port: number,
    secure: boolean
}>('smtp');

//createTestCreds();


// if we use this in the sendEmail function everytime it executes, it will create new transporter
const transporter = nodemailer.createTransport({
    ...smtp,
    auth: {user: smtp.user, pass: smtp.pass}
})

async function sendEmail(payLoad: SendMailOptions){
    transporter.sendMail(payLoad, (err, info) => {
    if (err){
        log.error(err, "Error sending email");
        return 
    }
    log.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
    })
}

export default sendEmail;