import * as jwt from "jsonwebtoken";
import config from "../config";

const JWT_SECRET = config.jwt_secret as string;
const JWT_EXPIRES_IN = config.jwt_expires_in as string; 

export const signToken = (payload: jwt.JwtPayload) => {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"]
  });
};

export const verifyToken = <T extends jwt.JwtPayload>(token: string): T => {
  return jwt.verify(token, JWT_SECRET) as T;
};