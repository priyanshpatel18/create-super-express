import { SignJWT, jwtVerify } from "jose";

const SECRET_KEY_ACCESS = new TextEncoder().encode(process.env.SECRET_KEY_ACCESS || "access_secret");
const SECRET_KEY_REFRESH = new TextEncoder().encode(process.env.SECRET_KEY_REFRESH || "refresh_secret");

export interface jwtUser {
  id: string;
  email: string;
  username: string;
}

export const generateToken = async (
  payload: any,
  type: "access" | "refresh",
  expiresIn: string = "1h"
) => {
  const secret = type === "access" ? SECRET_KEY_ACCESS : SECRET_KEY_REFRESH;
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(expiresIn)
    .sign(secret);
};

export const verifyToken = async (token: string, type: "access" | "refresh") => {
  try {
    const secret = type === "access" ? SECRET_KEY_ACCESS : SECRET_KEY_REFRESH;
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
