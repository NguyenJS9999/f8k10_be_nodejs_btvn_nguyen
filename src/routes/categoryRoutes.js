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
categoryRoutes.get("/:id", getCategoryById); // R

categoryRoutes.post("/", validBodyRequest(categorySchema), createCategory); // C

categoryRoutes.patch("/:id", validBodyRequest(categorySchema), updateCategory); // U
categoryRoutes.patch("/soft-delete/:id", softDeleteCategory); // Xóa mềm
categoryRoutes.patch("/restore/:id", restoreCategory); // Phục hồi

categoryRoutes.delete("/:id", deleteCategory); // D Xóa cứng


export default categoryRoutes;
