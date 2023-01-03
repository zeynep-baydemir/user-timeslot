import {object, string, TypeOf} from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *      CreateUserInput:
 *          type: object
 *          required: 
 *              - email
 *              - firstName
 *              - lastName
 *              - password
 *              - passwordConfirmation
 *          properties:
 *              email:
 *                  type: string
 *                  default: stanford.marvin@example.com
 *              firstName:
 *                  type: string
 *                  default: Stanford
 *              lastName:
 *                  type: string
 *                  default: Marvin
 *              password:
 *                  type: string
 *                  default: password123
 *              passwordConfirmation:
 *                  type: string
 *                  default: password123
 *      CreateUserResponse:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              firstName:
 *                  type: string
 *              lastName:
 *                  type: string
 *              password:
 *                  type: string
 *              verified:
 *                  type: string
 *              role:
 *                  type: string
 *              _id:
 *                  type: string
 *              verificationCode:
 *                  type: string
 *              createdAt:
 *                  type: string
 *              updatedAt:
 *                  type: string
 *              __v:
 *                  type: integer
 */

export const createUserSchema = object({   
    body: object({
        firstName: string({
            required_error: "First name is required"
        }),
        lastName: string({
            required_error: "Last name is required"
        }),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password is too short"),
        passwordConfirmation: string({
                required_error: "Password confirmation is required"
        }),
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email"),
    }).refine((data)=> data.password === data.passwordConfirmation,{
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
});

/**
 * @openapi
 * components:
 *  schemas:
 *      VerifyUserInput:
 *          type: object
 *          required: 
 *              - id
 *              - verificationCode
 *          properties:
 *              id:
 *                  type: string
 *              verificationCode:
 *                  type: string
 *      VerifyUserResponse:
 *          type: object
 *          properties:
 *              user:
 *                  $ref: '#/components/schemas/CreateUserResponse'
 */


export const verifyUserSchema = object({
    params: object({
        id: string(),
        verificationCode: string(),
    }),
})

/**
 * @openapi
 * components:
 *  schemas:
 *      ForgotPasswordInput:
 *          type: object
 *          required: 
 *              - email
 *          properties:
 *              id:
 *                  type: string
 *              verificationCode:
 *                  type: string
 *      ForgotPasswordResponse:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *                  default: "If a user with that email is registered you will receive reset email"
 */

export const forgotPasswordSchema = object({
    body: object({
        email: string({
            required_error: "Email is required",
        }).email("Invalid email"),
    }),
})

/**
 * @openapi
 * components:
 *  schemas:
 *      ResetPasswordInput:
 *          type: object
 *          required: 
 *              - password
 *              - passwordConfirmation
 *          properties:
 *              password:
 *                  type: string
 *              passwordConfirmation:
 *                  type: string
 *      ResetPasswordResponse:
 *          type: object
 *          properties:
 *              email:
 *                  type: string
 *              firstName:
 *                  type: string
 *              lastName:
 *                  type: string
 *              password:
 *                  type: string
 *              verified:
 *                  type: string
 *              role:
 *                  type: string
 *              _id:
 *                  type: string
 *              verificationCode:
 *                  type: string
 *              createdAt:
 *                  type: string
 *              updatedAt:
 *                  type: string
 *              __v:
 *                  type: string
 */


export const resetPasswordSchema = object({
    params: object({
        id: string(),
        passwordResetCode: string(),
    }),
    body: object({
        password: string({
            required_error: "Password is required"
        }).min(6, "Password is too short"),
        passwordConfirmation: string({
            required_error: "Password confirmation is required"
        }),
    }).refine((data)=> data.password === data.passwordConfirmation,{
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
})

/**
 * @openapi
 * components:
 *  schemas:
 *      ReserveSlotInput:
 *          type: object
 *          required: 
 *              - startTime
 *              - endTime
 *              - day
 *              - desk
 *          properties:
 *              startTime:
 *                  type: string
 *              endTime:
 *                  type: string
 *              day:
 *                  type: string
 *              desk:
 *                  type: string
 *      ResetPasswordResponse:
 *          type: object
 *          properties:
 *          
 */
export const reserveSlotSchema = object({
    params:  object ({
        id: string(), 
        roomId: string()
    }),
    body: object ({
        startTime: string({required_error: "start time is required"}),
        endTime: string({required_error: "end time is required"}),
        day: string({required_error: "day is required"}),
        desk: string({required_error: "desk is required"})
    })
})

/**
 * @openapi
 * components:
 *  schemas:
 *      AssingAdminorUserInput:
 *          type: object
 *          required: 
 *              - organization
 *          properties:
 *              organization:
 *                  type: string
 *      AssignAdminorUserResponse:
 *          type: object
 *          properties:
 *          
 */

export const assignAdminorUserSchema = object({
    params:  object ({
        id: string(), 
    }),
    body: object ({
        organization: string(),

    })
})


export type CreateUserInput = TypeOf<typeof createUserSchema>["body"];

export type ReserveSlotInput = TypeOf<typeof reserveSlotSchema>;

export type VerifyUserInput = TypeOf<typeof verifyUserSchema>["params"];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>["body"];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;
export type AssignAdminorUserInput = TypeOf<typeof assignAdminorUserSchema>;