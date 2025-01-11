import CategoryTable from '../models/Category.js';

export const createCategory = async (req, res) => {
	try {
		const datas = await CategoryTable.create(req.body);
		if (!datas) {
			return res.status(404).send({
				message: 'Not found category!'
			});
		} else {
			return res.status(200).send({
				message: 'Create category successfully!',
				datas
			});
		}

	} catch (error) {
		res.status(400).send({
			message: 'Error!'
		});
	}
};
export const getAllCategory = async (req, res) => {
	try {
		const datas = await CategoryTable.find();
		if (!datas || datas.length === 0) {
			return res.status(404).send({
				message: 'Not found category!'
			});
		}
		return res.status(200).send({
			message: 'Get categories successfully!',
			datas
		});
	} catch (error) {
		return res.status(400).send({
			message: 'Error!',
			error: error.message || 'Error!'
		});
	}
};

export const getCategoryById = async (req, res, next) => {
	try {
		const datas = await CategoryTable.findById(req.params.id);
		if (!datas) {
			return res.status(404).send({
				message: 'Not found category!'
			});
		}
		return res.status(200).send({
			message: 'Get category successfully!',
			datas
		});
	} catch (error) {
		console.log('getCategoryById error: ', error);
		next();
	}
};

export const updateCategoryById = async (req, res) => {
	try {
		const datas = await CategoryTable.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				timestamps: true
			}
		);
		if (!datas) {
			return res.status(404).send({
				message: 'Not found category!'
			});
		} else {
			return res.status(200).send({
				message: 'Update category successfully!',
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

export const removeCategoryById = async (req, res) => {
	try {
		const datas = await CategoryTable.findByIdAndDelete(req.params.id);
		if (!datas) {
			return res.status(404).send({
				message: 'Not found category!'
			});
		} else {
			return res.status(200).send({
				message: 'Delete category successfully!',
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
