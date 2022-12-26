
import { Request, Response, NextFunction } from "express";

export const requireUser = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    return res.sendStatus(403);
  }
  if (user.role !== "user"){
    return res.sendStatus(401);
  }else{
    return next();
  }
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    return res.sendStatus(403);
  }
  if (user.role !== "admin"){
    return res.sendStatus(401);
  }else{
    return next();
  }
}

export const requireSuperAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;
  if (!user) {
    return res.sendStatus(403);
  }
  if (user.role !== "super"){
    return res.sendStatus(401);
  }else{
    return next();
  }
}

