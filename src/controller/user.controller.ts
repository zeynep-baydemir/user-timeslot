import dayjs from "dayjs";
import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { AssignAdminorUserInput, CreateUserInput, ForgotPasswordInput, ReserveSlotInput, ResetPasswordInput, VerifyUserInput } from "../schema/user.schema";
import { findRoomById } from "../service/organization.service";
import { createSlot, findSlot } from "../service/slot.service";
import { createUser, deleteUsers, findUserByEmail, findUserById, getUsers } from "../service/user.service";
import log from "../utils/logger";
import sendEmail from "../utils/mailer";


export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    const body = req.body;
    try {
        const user = await createUser(body);
        await sendEmail({
            from: "test.example.com",
            to: user.email,
            subject: "Please verify your account",
            text: `verification code ${user.verificationCode}. Id: ${user._id}`,
        });
        return res.send(user);
    } catch (error: any) {
        if (error.code === 11000){
                return res.status(409).send("Account already exists");
        }
        return res.status(500).send(error);
    }
}

export async function createAdminHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    const body = req.body;
    try {
        const user = await createUser(body);
        await sendEmail({
            from: "test.example.com",
            to: user.email,
            subject: "Please verify your account",
            text: `verification code ${user.verificationCode}. Id: ${user._id}`,

        }
        );
        return res.send("User successfully created");
    } catch (error: any) {
        if (error.code === 11000){
                return res.status(409).send("Account already exists");
        }
        return res.status(500).send(error);
    }
}

export async function createSuperAdminHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    const body = req.body;
    try {
        const user = await createUser(body);
        await sendEmail({
            from: "test.example.com",
            to: user.email,
            subject: "Please verify your account",
            text: `verification code ${user.verificationCode}. Id: ${user._id}`,

        }
        );
        return res.send("User successfully created");
    } catch (error: any) {
        if (error.code === 11000){
                return res.status(409).send("Account already exists");
        }
        return res.status(500).send(error);
    }
}


export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response){
    const id = req.params.id;
    const verificationCode = req.params.verificationCode;

    const user = await findUserById(id);

    if (!user){
        return res.send("No user found");
    }
    if (user.verified){ 
        return res.send("User is already verified");
    }

    if(user.verificationCode === verificationCode){
        user.verified = true;
        await user.save();
        return res.send("User succesfully verified");
    }
    return res.send("Could not verify user");
}

export async function forgotPasswordHandler(req: Request<{}, {}, ForgotPasswordInput>, res: Response ){
    const message = "If a user with that email is registered you will receive reset email";
    const {email} = req.body;
    const user = await findUserByEmail(email);

    if(!user) {
        log.debug(`User with email ${email} does not exist`);
        return res.send(message);
    }
    if (!user.verified){ 
        return res.send("User is not verified");
    }

    const passwordResetCode = nanoid();

    user.passwordResetCode = passwordResetCode;
    await user.save();

    await sendEmail({
        to: user.email,
        from: "test@example.com",
        subject: "Reset your password",
        text: `Password reset code: ${passwordResetCode}. Id ${user._id}`,
    });

    log.debug(`Passsword reset email sent to ${email}`);
    return res.send(message);
}

export async function resetPasswordHandler(
    req: Request<ResetPasswordInput["params"],{}, ResetPasswordInput["body"]>, 
    res: Response){

    const {id, passwordResetCode} = req.params;
    const {password} = req.body;
    const user = await findUserById(id);

    if(!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode){
        return res.status(400).send("Could not reset user password");
    }
    

    user.passwordResetCode = null;

    // we didn't hash password here because when we call save it will be hashed
    user.password = password;

    await user.save();

    return res.send("Successfully updated user password");

}

export async function reserveSlotHandler(req: Request<ReserveSlotInput["params"],{},ReserveSlotInput["body"]>, res: Response){
    const id = req.params.id;
    const roomId = req.params.roomId;
    const {startTime,day,endTime, desk} = req.body;

    const currentDay = dayjs();
    

    if((currentDay.year() > +day.substring(0,4))|| (currentDay.month()+1 > +day.substring(5,7))|| (currentDay.date() > +day.substring(8,10))){
        return res.send("The slot from the past cannot be reserved");
    }

    if((currentDay.year() <  +day.substring(0,4))|| (currentDay.month()+1 < +day.substring(5,7)) ){
        return res.send("This slot cannot be reserved");
    }

    const user = await findUserById(id);
    if (!user){
        return res.send("No user found");
    }
    const room = await findRoomById(roomId);
    if (!room){
        return res.send("No room found");
    }else{
        if ((room.desk)< desk){
            return res.send("No desk found");
        }
        const slot = await findSlot(day,startTime,endTime,room,desk);
        if (!slot){
            let body = {day,startTime,endTime,room,desk};
            const slot = await createSlot(body);
        }
        else{
            if(!slot.user){
                slot.user = user;
                slot.room = room;
                await slot.save();
                return res.send(slot);
            }else{ 
                return res.send("This slot is not available. Please choose another slot");
            }
        }
    } 
}




export async function getCurrentUserHandler(req: Request, res: Response) {
    return res.send(res.locals.user);
}

export async function getUsersHandler(req: Request, res: Response){
    const users = await getUsers();
    return res.send(users);
}
export async function deleteUsersHandler(req: Request, res: Response){
    await deleteUsers();
    return res.send("deleted");
}


