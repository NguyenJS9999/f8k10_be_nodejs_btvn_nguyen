import Product from "../models/Product.js";

export const create = async (req, res) => {
	try {
		const datas = await Product.create(req.body);
		if (!datas) {
			return res.status(404).send({
				message: "Not found!",
			});
		}
		return res.status(200).send({
			message: "Create successfully!",
			datas,
		});
	} catch (err) {
		res.status(400).send({
			message: "Error",
		});
	}
};

export const getAll = async (req, res) => {
	try {
		const datas = await Product.find();
		if (!datas || datas.length === 0) {
			return res.status(404).send({
				message: "Not found!",
			});
		}
		return res.status(200).send({
			message: "Get successfully!",
			datas,
		});
	} catch (error) {
		return res.status(400).send({
			message: "Error!",
			error: error.message || "Error!",
		});
	}
};

export const getById = async (req, res, next) => {
	try {
		const datas = await Product.findById(req.params.id);
		if (!datas) {
			return res.status(404).send({
				message: "Not found!",
			});
			// throw Error("Not found product");
		}
		return res.status(200).send({
			message: "Get successfully!",
			datas,
		});
	} catch (error) {
		console.log("alo");
		next();
	}
};

export const removeById = async (req, res) => {
	try {
		const datas = await Product.findByIdAndDelete(req.params.id);
		if (!datas) {
			return res.status(404).send({
				message: "Not found!",
			});
		}
		return res.status(200).send({
			message: "Delete successfully!",
			datas,
		});
	} catch (error) {
		return res.status(400).send({
			message: "Error!",
			error: error.message || "Error!",
		});
	}
};

export const updateById = async (req, res) => {
	try {
		const datas = await Product.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			timestamps: true,
		});
		if (!datas) {
			return res.status(404).send({
				message: "Not found!",
			});
		}
		return res.status(200).send({
			message: "Update successfully!",
			datas,
		});
	} catch (error) {
		return res.status(400).send({
			message: "Error!",
			error: error.message || "Error!",
		});
	}
};
