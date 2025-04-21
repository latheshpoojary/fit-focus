import { NextFunction, Request, Response } from "express";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { ENV_KEY } from "../enviroments";

export interface CustomRequest extends Request {
  user?: JwtPayload;
}
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new Error();
    }

    if (!ENV_KEY.SECRET_KEY) {
      throw new Error("SECRET_KEY is not set");
    }

    const decoded = jwt.verify(token, ENV_KEY.SECRET_KEY);

    if (typeof decoded === "object" && decoded !== null) {
      (req as CustomRequest).user = decoded as JwtPayload;
    } else {
      // Handle unexpected string payload, or throw an error
      throw new Error("Invalid JWT payload type");
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Please Authenticate" });
  }
};
