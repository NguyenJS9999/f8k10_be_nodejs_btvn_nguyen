import { Router } from "express";
import productRoutes from "./productRoutes.js";
import authRoutes from "./authRoutes.js";
import categoriesRoutes from "./categories.js";

const routes = Router();

routes.use("/products", productRoutes);
routes.use("/auth", authRoutes);
routes.use("/categories", categoriesRoutes);

export default routes;
