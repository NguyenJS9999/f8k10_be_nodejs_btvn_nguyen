import mongoose, { Schema } from 'mongoose';

const productsSchema = new Schema(
	{
		title: { type: String, required: true },
		price: { type: Number, required: true },
		categoryId: {
			type: String,
			required: true,
			ref: "Category",
		},
		description: { type: String, required: false, default: "Updating" },
		brand: { type: String, required: true },
		product_code: { type: String, required: true, unique: true },
		isHidden: {
			type: Boolean,
			default: false,
		},

	},
	{ timestamps: true, versionKey: false }
);

const Products = mongoose.model("Products", productsSchema);
console.log('Products:', Products);
export default Products;
