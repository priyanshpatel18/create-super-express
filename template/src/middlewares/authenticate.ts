import { NextFunction, Request, Response } from "express";
import { jwtUser, verifyToken } from "../utils/jwtUtils";

export const authenticate = (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decodedToken = verifyToken(token) as jwtUser;
    console.log(decodedToken);
    if (!decodedToken) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    req.user = decodedToken.payload;
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
    return;
  }
};