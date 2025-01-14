import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  restoreProduct,
  softDeleteProduct,
  updateProduct,
} from "../controllers/productControllers.js";
import productSchema from "../schemas/productSchemas.js";
import { validBodyRequest } from "../middlewares/validBodyRequest.js";

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const productRoutes = Router();

async function verifyUser(req, res, next) {
  // Buoc 1: Kiem tra token có được gửi trong headers hay không?
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "banAnhHoang");
  if (!decoded) {
    return res.status(401).json({
      message: "Un Authorized",
    });
  }

  // Bước 2: Xác thực user dựa vào payload, phân quyền
  const userExist = await User.findById(decoded._id);
  if (!userExist || userExist.role !== "admin") {
    return res.status(401).json({
      message: "Un Authorized",
    });
  }

  next();
}

productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post(
  "/",
  verifyUser,
  validBodyRequest(productSchema),
  createProduct,
);
productRoutes.patch("/:id", validBodyRequest(productSchema), updateProduct);
productRoutes.patch("/soft-delete/:id", softDeleteProduct);
productRoutes.patch("/restore/:id", restoreProduct);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
