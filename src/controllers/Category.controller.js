import mongoose from 'mongoose';
import CategoryTable from '../models/Category.model.js';

const categoryController = {
    getCategorys: async (req, res) => {
		try {
			const exitCategorys = await CategoryTable.find();
			if (!exitCategorys) {
				return res.status(404).json({ message: 'Not found categorys' });
			}

			return res.status(200).json({
				message: 'Get category success',
				exitCategorys
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Internal server error',
				error: error.message
			});
		}
	},

    getCategory: async (req, res) => {
		try {
            const categoryId = req.params.id;
			const exitCategory = await CategoryTable.findById(categoryId);
			if (!exitCategory) {
				return res.status(404).json({ message: 'Not found category' });
			}

			return res.status(200).json({
				message: 'Get category success',
				exitCategory
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Internal server error',
				error: error.message
			});
		}
	},

    createCategory: async (req, res) => {
        console.log('Tạo một Category:', req.body);

        try {
            const { title, description } = req.body;

            const existingTitle = await CategoryTable.findOne({ title });
            if (existingTitle) {
                return res.status(409).json({
                    message: 'Category with the same existingTitle already exists'
                });
            }

            const newCategory = new CategoryTable({
                title,
                description: description || "",
            });
            console.log('Tạo một Category đúc ra 1 newCategory:', newCategory);

            // Lưu danh mục vào DB
            await newCategory.save();

            return res.status(201).json({
                message: 'Create category success',
                newCategory
            });
        } catch (error) {
            console.log('Tạo một category catch:', error);

            return res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    updateCategory: async (req, res) => {
        try {
            const { id } = req.params;

            // Kiểm tra danh mục có tồn tại hay không bằng id - uuid duy nhất
            const findProduct = await CategoryTable.findById(id);
            if (!findProduct) {
                return res.status(404).json({
                    message: 'Category not found'
                });
            }

            // Chắt Lọc các trường từ request body
            const { product_code, title, description, price, brand } = req.body;
            const updateData = { product_code, title, description, price, brand };

            // Loại bỏ các trường undefined
            Object.keys(updateData).forEach((key) => {
                if (updateData[key] === undefined) {
                    delete updateData[key];
                }
            });

            // Nếu `product_code` được cập nhật, kiểm tra có bị trùng lặp gì không
            if (product_code && product_code.toUpperCase() !== findProduct.product_code) {
                const upperCaseCode = product_code.toUpperCase();
                const existingProduct = await CategoryTable.findOne({ product_code: upperCaseCode });
                if (existingProduct) {
                    return res.status(409).json({
                        message: 'Category with the same product_code already exists'
                    });
                }
                updateData.product_code = upperCaseCode; // Chuẩn hóa `product_code` trước khi update
            }

            const updatedProduct = await CategoryTable.findByIdAndUpdate(
                id,
                { $set: updateData },
                { new: true, runValidators: true }
            );

            return res.status(200).json({
                message: 'Update product success',
                product: updatedProduct
            });
        } catch (error) {
            console.error('Update product error:', error);
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    // Delete Category
	deleteCategory: async (req, res) => {
        console.log('Xóa một Category:', req.params);
		try {
			const { id } = req.params;

			const product = await CategoryTable.findByIdAndDelete(id);
			if (!product) {
				return res.status(404).json({
					message: 'Not found product'
				});
			}

			return res.status(200).json({
				message: 'Delete product success',
				id
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Internal server error',
				error: error.message
			});
		}
	},


};

export default categoryController;