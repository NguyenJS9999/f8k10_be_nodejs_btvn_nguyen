import express from "express";
const router = express.Router();
import ProductController from "../controllers/Product.controller.js";


/* GET producs listing /products . */
router.get("/", ProductController.getProducts);
router.get("/:id", ProductController.getProduct); // Get One

router.post("/", ProductController.createProduct);
router.post("/many", ProductController.createProducts); // Add Many

router.patch("/:id", ProductController.updateProduct); // Update One

router.delete("/:id", ProductController.deleteProduct); // Delete One
router.delete("/many", ProductController.deleteProducts); // Delete Many


export default router;
