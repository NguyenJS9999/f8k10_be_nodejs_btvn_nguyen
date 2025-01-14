import { Router } from "express";
import productRoutes from "./productRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import authRoutes from "./authRoutes.js";

const routes = Router();

routes.use("/products", productRoutes);
routes.use("/categories", categoryRoutes);
routes.use("/auth", authRoutes);

export default routes;
