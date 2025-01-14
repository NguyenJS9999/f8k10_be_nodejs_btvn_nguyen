import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  restoreCategory,
  softDeleteCategory,
  updateCategory,
} from "../controllers/categoryControllers.js";
import categorySchema from "../schemas/categorySchemas.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";

const categoryRoutes = Router();

categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.post("/", validBodyRequest(categorySchema), createCategory);
categoryRoutes.patch("/:id", validBodyRequest(categorySchema), updateCategory);
categoryRoutes.patch("/soft-delete/:id", softDeleteCategory);
categoryRoutes.delete("/:id", deleteCategory);
categoryRoutes.patch("/restore/:id", restoreCategory);

export default categoryRoutes;
