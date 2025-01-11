import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true
		},
		price: {
			type: Number,
			required: true
		},

		categoryId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Category',
			required: true
		},
		description: {
			type: String,
			default: 'Updating'
		},
		isHidden: {
			type: Boolean,
			default: false
		}
	},
	{ timestamps: true, versionKey: false }
);

const Product = mongoose.model('Product', productSchema);

export default Product;
