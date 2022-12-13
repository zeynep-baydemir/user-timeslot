import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";


// to make sure that schema and request matches
const validateResource = (schema: AnyZodObject) =>  (req: Request, res: Response, next:NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        });
        next();
    } catch (err:any ){
        return res.status(400).send(err.errors);
    }
}

export default validateResource;