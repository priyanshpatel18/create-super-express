import { Request, Response } from "express";
import db from "../db";
import { generateToken } from "../utils/jwtUtils";
import { compare, genSalt, hash } from "bcrypt";
import { AppError } from "../utils/appError"; // Import the custom error class

export const signUp = async (req: Request, res: Response, next: Function) => {
  const { username, email, password } = req.body;

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

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

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

    const token = generateToken({
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
    });

    res.cookie("token", token, {
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

    if (!user.password || !(await compare(password, user.password))) {
      // Throw custom error if password is incorrect
      return next(new AppError("Incorrect password", 401));
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    res.cookie("token", token, {
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
  res.clearCookie("token");
  res.status(200).json({ message: "Logout successful" });
};
