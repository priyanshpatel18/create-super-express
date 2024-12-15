import { sign, verify } from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY || "secret";

export interface jwtUser {
  payload: {
    id: string;
    email: string;
    username: string;
  }
}

export const generateToken = (payload: any, expiresIn: string = "1h") => {
  return sign(payload, SECRET_KEY as string, { expiresIn });
};

export const verifyToken = (token: string) => {
  try {
    return verify(token, SECRET_KEY as string);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};