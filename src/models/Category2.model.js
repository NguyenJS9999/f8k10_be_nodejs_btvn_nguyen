import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			unique: true,
			required: true,
		},
		description: {
			type: String,
		},
		// Khong bat buoc
		products: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: "Product",
				},
			},
		],
		slug: {
			type: String,
			// required: true,
		},
		isHidden: {
			type: Boolean,
			default: false,
		},

	},
	// title: String, required
	// description: String
	// products: Array, ref: ‘Product’
	// isHidden: Boolean, default: false
	// createdAt: Date, default: Date.now
	// updatedAt: Date, default: Date.now
	// deletedAt: Date, default: null
	{
		timestamps: true,
		versionKey: false,
	}
);

const Category = mongoose.model("Category", categorySchema);
export default Category;

// Main category (Phụ kiện)-> Sub Category (keyboard, mouse, headphone)-> Product (sản phẩm cụ thể)
