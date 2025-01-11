import express from "express";
import ProductController from "../controllers/Product.controller.js";
import loggerMiddleware from "../middleware/logger.middleware.js";

const router = express.Router();

// Sử dụng middleware để log thông tin request
router.use(loggerMiddleware);

/* GET products listing */
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProduct); // Get One

router.post("/many", ProductController.createProducts); // Add Many
router.post("/", ProductController.createProduct);

router.patch("/:id", ProductController.updateProduct); // Update One

router.delete("/many", ProductController.deleteProducts); // Delete Many
router.delete("/:id", ProductController.deleteProduct); // Delete One

export default router;
