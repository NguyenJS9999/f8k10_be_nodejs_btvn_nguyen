import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: "Category",
		},
        description: {
			type: String,
            required: false,
			default: "Updating",
		},
		brand: { type: String, required: true },
		product_code: { type: String, required: true, unique: true },
		isHidden: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true, versionKey: false }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
