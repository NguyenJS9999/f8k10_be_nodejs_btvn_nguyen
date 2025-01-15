import { Router } from "express";
import {
    getProfile,
    login,
    refreshToken,
    register,
} from "../controllers/authControllers.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const authRoutes = Router();

authRoutes.post("/register", validBodyRequest(registerSchema), register);

authRoutes.post("/login", validBodyRequest(loginSchema), login);

authRoutes.post("/refresh-token", validBodyRequest(loginSchema), refreshToken);

authRoutes.get("/profile", authenticate, getProfile);
export default authRoutes;
