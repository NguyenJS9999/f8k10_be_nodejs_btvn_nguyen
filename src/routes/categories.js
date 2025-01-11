import express from "express";
import categoryController from "../controllers/Category.controller.js";

const router = express.Router();

router.get("/", categoryController.getCategorys);
router.get("/:id", categoryController.getCategory); // Get One

router.post("/", categoryController.createCategory);

router.patch("/:id", categoryController.updateCategory); // Update One

router.delete("/:id", categoryController.deleteCategory); // Delete One

export default router;
