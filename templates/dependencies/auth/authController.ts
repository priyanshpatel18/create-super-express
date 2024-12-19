import { hash as argon2Hash, verify as argon2Verify } from "argon2";
import { Request, Response } from "express";
import db from "../db";
import { AppError } from "../utils/appError";
import { generateToken } from "../utils/tokenUtils";


export const signUp = async (req: Request, res: Response, next: Function) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(new AppError("Missing required fields", 400));
  }

  try {
    const userExists = await db.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    });

    if (userExists?.email === email) {
      // Throw custom error if email already exists
      return next(new AppError("Email already exists", 400));
    }
    if (userExists?.username === username) {
      // Throw custom error if username already exists
      return next(new AppError("Try another username", 400));
    }

    const hashedPassword = await argon2Hash(password);

    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    if (!newUser) {
      // Throw custom error if user creation fails
      return next(new AppError("Error creating user", 500));
    }

    const accessToken = await generateToken({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    }, "access", "15m");
    const refreshToken = await generateToken({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    }, "refresh", "7d")

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Catch and throw unexpected errors
    return next(new AppError("Internal server error", 500));
  }
};

export const signIn = async (req: Request, res: Response, next: Function) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return next(new AppError("Missing required fields", 400));
  }

  try {
    const user = await db.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      // Throw custom error if user not found
      return next(new AppError("User not found", 404));
    }

    if (!user.password || !(await argon2Verify(password, user.password))) {
      // Throw custom error if password is incorrect
      return next(new AppError("Incorrect password", 401));
    }

    const accessToken = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    }, "access", "15m");
    const refreshToken = await generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    }, "refresh", "7d")

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });


    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    // Catch and throw unexpected errors
    return next(new AppError("Internal server error", 500));
  }
};

export const signOut = (req: Request, res: Response) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logout successful" });
};
