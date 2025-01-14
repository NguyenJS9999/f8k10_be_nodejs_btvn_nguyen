import mongoose from "mongoose";
import slugMiddleware from "../middlewares/slugMiddleware.js";

export const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      // default: "67836a60a83094583683c85e", // unclassified
    },
    description: { type: String },
    isHidden: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true, versionKey: false },
);

productSchema.plugin(slugMiddleware("title", "slug"));
const Product = mongoose.model("Product", productSchema);

export default Product;
