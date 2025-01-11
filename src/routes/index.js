import { Router } from "express";
import productRoutes from "./productRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import authRoutes from "./authRoutes.js";

const routes = Router();

routes.use("/auth", authRoutes);

routes.use("/products", productRoutes);
routes.use("/categories", categoryRoutes);

export default routes;
