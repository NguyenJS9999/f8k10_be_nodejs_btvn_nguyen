import ProductTable from "../models/Product.js";

export const createProduct = async (req, res) => {
	try {
		const datas = await ProductTable.create(req.body);
		if (!datas) {
			return res.status(404).send({
				message: "Not found product!",
			});
		}
		return res.status(200).send({
			message: "Create product successfully!",
			datas,
		});
	} catch (err) {
		res.status(400).send({
			message: "Error",
		});
	}
};

export const getAllProducts = async (req, res) => {
	try {
		const datas = await ProductTable.find();
		if (!datas || datas.length === 0) {
			return res.status(404).send({
				message: "Not found product!",
			});
		}
		return res.status(200).send({
			message: "Get product successfully!",
			datas,
		});
	} catch (error) {
		return res.status(400).send({
			message: "Error!",
			error: error.message || "Error!",
		});
	}
};

export const getProductById = async (req, res, next) => {
	try {
		const datas = await ProductTable.findById(req.params.id).populate({ path: "categoryId", select: '-_id, title', });

		if (!datas) {
			return res.status(404).send({
				message: "Not product found!",
			});
		}
		return res.status(200).send({
			message: "Get product successfully!",
			datas,
		});
	} catch (error) {
		console.log("getProductById error: ", error);
		next();
	}
};

export const updateProductById = async (req, res) => {
	try {
		const datas = await ProductTable.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			timestamps: true,
		});
		if (!datas) {
			return res.status(404).send({
				message: "Not found product!",
			});
		} else {
			return res.status(200).send({
				message: "Update product successfully!",
				datas,
			});
		}

	} catch (error) {
		return res.status(400).send({
			message: "Error!",
			error: error.message || "Error!",
		});
	}
};

export const removeProductById = async (req, res) => {
	try {
		const datas = await ProductTable.findByIdAndDelete(req.params.id);
		if (!datas) {
			return res.status(404).send({
				message: "Not found product!",
			});
		} else {
			return res.status(200).send({
				message: "Delete product successfully!",
				datas,
			});
		}
	} catch (error) {
		return res.status(400).send({
			message: "Error!",
			error: error.message || "Error!",
		});
	}
};