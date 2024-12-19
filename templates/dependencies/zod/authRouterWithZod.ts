import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/authController";
import validateSchema from "../middlewares/validateSchema";
import { signInSchema, signUpSchema } from "../schemas/authSchema";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signUp);
authRouter.post("/signin", validateSchema(signInSchema), signIn);
authRouter.post("/signout", signOut);

export { authRouter };
