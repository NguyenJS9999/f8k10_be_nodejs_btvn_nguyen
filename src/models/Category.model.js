import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
	{
		title: {
			type: String,
			unique: true,
			required: true
		},
		description: {
			type: String,
			required: false
		},
		slug: {
			type: String
			// required: true,
		},
		isHidden: {
			type: Boolean,
			default: false
		},
		products: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Product'
			}
		]
	},
	{
		timestamps: true,
		versionKey: false
	}
);

const Category = mongoose.model('Category', categorySchema);

export default Category;
// Main category (Phụ kiện)-> Sub Category (keyboard, mouse, headphone)-> Product (sản phẩm cụ thể)
