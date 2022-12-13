import { Request, Response } from "express";
import { nanoid } from "nanoid";
import { CreateUserInput, ForgotPasswordInput, ResetPasswordInput, VerifyUserInput } from "../schema/user.schema";
import { createUser, findUserByEmail, findUserById, getUsers } from "../service/user.service";
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
    req: Request<ResetPasswordInput["params"], {}, ResetPasswordInput["body"]>, 
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
export async function getCurrentUserHandler(req: Request, res: Response) {
    return res.send(res.locals.user);
}

export async function getUsersHandler(req: Request, res: Response){
    const users = await getUsers();
    return res.send(users);
}



