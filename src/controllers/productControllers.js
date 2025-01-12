import ProductTable from '../models/Product.js';
import CategoryTable from '../models/Category.js';

export const createProduct = async (req, res) => {
	try {
		const datas = await ProductTable.create(req.body);
		if (!datas) {
			return res.status(404).send({
				message: 'Not found product!'
			});
		}
		return res.status(200).send({
			message: 'Create product successfully!',
			datas
		});
	} catch (err) {
		res.status(400).send({
			message: 'Error'
		});
	}
};

export const getAllProducts = async (req, res) => {
	try {
		const datas = await ProductTable.find();
		if (!datas || datas.length === 0) {
			return res.status(404).send({
				message: 'Not found product!'
			});
		}
		return res.status(200).send({
			message: 'Get product successfully!',
			datas
		});
	} catch (error) {
		return res.status(400).send({
			message: 'Error!',
			error: error.message || 'Error!'
		});
	}
};

export const getProductById = async (req, res, next) => {
	try {
		const { id } = req.params;

		// const populatedProduct = await ProductTable.find().populate({ path: "categoryId", select: '-_id, title', });
		const populatedProduct = await ProductTable.findById(id).populate(
			'categoryId'
		);

		if (!populatedProduct) {
			return res.status(404).send({
				message: 'Not product found!'
			});
		}
		return res.status(200).send({
			message: 'Get product successfully!',
			data: populatedProduct
		});
	} catch (error) {
		console.log('getProductById error: ', error);
		next();
	}
};
/**/
export const updateProductById = async (req, res) => {
	try {
		const { categoryId } = req.params;
		const { id } = req.params;
		const product = await ProductTable.findById(id);

		if (!product) {
			return res.status(404).send({
				message: 'Not found product!'
			});
		}

		const category = await CategoryTable.findById(categoryId);
		if (!category) {
			return res.status(404).send({
				message: 'Not found category!'
			});
		}

		const datas = await ProductTable.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				timestamps: true
			}
		);

		// Nếu như có sự cập nhật categoryId thì
		console.log(product.categoryId.toString(), categoryId);
		console.log(typeof product.categoryId.toString(), typeof categoryId);

		if (product.categoryId.toString() !== categoryId) {
			console.log('ok');
			await CategoryTable.updateOne(
				{ _id: product.categoryId },
				{ $pull: { products: req.parames.id } }
			);
			await CategoryTable.updateOne(
				{ _id: categoryId },
				{ $push: { products: req.parames.id } }
			);
		}

		return res.status(200).send({
			message: 'Update product successfully!',
			datas
		});

	} catch (error) {
		return res.status(400).send({
			message: 'Error!',
			error: error.message || 'Error!'
		});
	}
};



export const softDeleteProductByIdAndUpdate = async (req, res) => {
	try {
		const { id } = req.params;
		const datas = await ProductTable.findByIdAndUpdate(id, {
			isHidden: true,
			deletedAt: new Date()
		});
		if (!datas) {
			return res.status(404).send({
				message: 'Not found product!'
			});
		} else {
			return res.status(200).send(
				{
					message: 'Update product successfully!',
					datas
				},
				{
					new: true,
					timestampes: true
				}
			);
		}
	} catch (error) {
		return res.status(400).send({
			message: 'Error!',
			error: error.message || 'Error!'
		});
	}
};

export const removeProductById = async (req, res) => {
	try {
		const datas = await ProductTable.findByIdAndDelete(req.params.id);
		if (!datas) {
			return res.status(404).send({
				message: 'Not found product!'
			});
		} else {
			return res.status(200).send({
				message: 'Delete product successfully!',
				datas
			});
		}
	} catch (error) {
		return res.status(400).send({
			message: 'Error!',
			error: error.message || 'Error!'
		});
	}
};
