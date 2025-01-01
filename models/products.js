import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "Updating",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);