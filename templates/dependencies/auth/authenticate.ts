import { NextFunction, Request, Response } from "express";
import { generateToken, verifyToken } from "../utils/tokenUtils";

export const authenticate = async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    // Verify the access token
    const decodedAccessToken = await verifyToken(accessToken, "access");
    req.user = decodedAccessToken;
    return next();
  } catch (error) {
    if (error instanceof Error && error.message === "Invalid or expired token") {
      try {
        const decodedRefreshToken = await verifyToken(refreshToken, "refresh");

        // Generate a new access token
        const newAccessToken = await generateToken(
          {
            id: decodedRefreshToken.id,
            email: decodedRefreshToken.email,
            username: decodedRefreshToken.username,
          },
          "access",
          "15m"
        );

        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        req.user = decodedRefreshToken;
        return next();
      } catch (refreshError) {
        return res.status(401).json({ message: "Session expired. Please log in again." });
      }
    }

    return res.status(401).json({ message: "Invalid token" });
  }
};
