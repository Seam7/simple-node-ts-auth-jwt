import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwtSecretKey } from "./secret";
import { getUserById } from "./db";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization as string;

  console.log({ authHeader, headers: req.headers });

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const data = jwt.verify(authHeader, jwtSecretKey) as jwt.JwtPayload;
  const user = getUserById(data.id);

  if (!user) {
    return res.sendStatus(401);
  }

  // @ts-ignore: Storing user here to pass it down the chain
  req.user = user;
  next();
};

export default authMiddleware;
