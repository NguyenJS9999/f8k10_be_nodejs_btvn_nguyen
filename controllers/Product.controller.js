import mongoose from 'mongoose';
import ProductsTable from '../models/Product.model.js';
import generateSKU from '../utils/generateSku.js';

const ProductController = {
	//Get All Product
	getProducts: async (req, res) => {
		try {
			const product = await ProductsTable.find();
			if (!product) {
				return res.status(404).json({ message: 'Not found product' });
			}

			return res.status(200).json({
				message: 'Get product success',
				product
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Internal server error',
				error: error.message
			});
		}
	},

	//Get one Product
	getProduct: async (req, res) => {
		try {
			const { id } = req.params;
			const products = await ProductsTable.findById(id);

			if (!products) {
				return res.status(404).json({ message: 'Not found product' });
			}

			return res.status(200).json({
				message: 'Get product success',
				products
			});
		} catch (error) {
			return res.status(500).json({
				message: 'Internal server error',
				error: error.message
			});
		}
	},

	//Post one Product
    createProduct: async (req, res) => {
        console.log('Tạo một Product:', req.body);

        try {
            const { title, price, brand, description, product_code } = req.body;

            // Kiểm tra các trường bắt buộc - Validate
            if (!title || !price || !brand || !product_code) {
                return res.status(400).json({
                    message: 'title, price, brand, and product_code are required'
                });
            }

            const upperCaseCode = product_code.toUpperCase();

            // Kiểm tra sản phẩm trùng lặp trong DB dựa trên `product_code`
            const existingProduct = await ProductsTable.findOne({ product_code: upperCaseCode });
            if (existingProduct) {
                return res.status(409).json({
                    message: 'Product with the same product_code already exists'
                });
            }

            const newProduct = new ProductsTable({
                title,
                price,
                brand,
                description,
                product_code: upperCaseCode
            });
            console.log('Tạo một Product đúc ra 1 newProduct:', newProduct);

            // Lưu sản phẩm vào DB
            await newProduct.save();

            return res.status(201).json({
                message: 'Create product success',
                newProduct
            });
        } catch (error) {
            console.log('Tạo một Product catch:', error);

            return res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    },

    // Post many Products
    createProducts: async (req, res) => {
        try {
            console.log('Tạo nhiều Product:', req.body);

            const { products } = req.body;

            // Kiểm tra đầu vào có phải là mảng không rỗng không
            if (!Array.isArray(products) || products.length === 0) {
                return res.status(400).json({
                    message: 'Products must be a non-empty array'
                });
            }

            // Kiểm tra các trường bắt buộc từ UI
            const invalidProducts = products
                .map((product, index) => ({
                    index,
                    missingFields: [
                        !product.title && 'title',
                        !product.price && 'price',
                        !product.brand && 'brand',
                        !product.product_code && 'product_code'
                    ].filter(Boolean)
                }))
                .filter((item) => item.missingFields.length > 0);

            if (invalidProducts.length > 0) {
                return res.status(400).json({
                    message: 'Some products have missing required fields',
                    invalidProducts
                });
            }

            const productsWithUppercaseCode = products.map((product) => ({
                ...product,
                product_code: product.product_code.toUpperCase()
            }));

            // Kiểm tra trùng lặp mã sản phẩm (`product_code`) trong đầu vào
            const inputCodes = productsWithUppercaseCode.map((product) => product.product_code);
            const duplicateCodes = inputCodes.filter(
                (code, index) => inputCodes.indexOf(code) !== index
            );

            if (duplicateCodes.length > 0) {
                return res.status(400).json({
                    message: 'Duplicate product codes in input data',
                    duplicateCodes
                });
            }

            // Kiểm tra mã sản phẩm đã tồn tại trong DB
            const existingProducts = await ProductsTable.find({ product_code: { $in: inputCodes } });
            const existingCodes = existingProducts.map((product) => product.product_code);

            if (existingCodes.length > 0) {
                return res.status(409).json({
                    message: 'Some product codes already exist in the database',
                    existingCodes
                });
            }

            const newProducts = await ProductsTable.insertMany(productsWithUppercaseCode);

            return res.status(201).json({
                message: 'Products created successfully',
                newProducts
            });
        } catch (error) {
            console.error('Tạo nhiều Product lỗi:', error);
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    },

	//Update Product
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;

            // Kiểm tra sản phẩm có tồn tại hay không bằng id - uuid duy nhất
            const findProduct = await ProductsTable.findById(id);
            if (!findProduct) {
                return res.status(404).json({
                    message: 'Product not found'
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
                const existingProduct = await ProductsTable.findOne({ product_code: upperCaseCode });
                if (existingProduct) {
                    return res.status(409).json({
                        message: 'Product with the same product_code already exists'
                    });
                }
                updateData.product_code = upperCaseCode; // Chuẩn hóa `product_code` trước khi update
            }

            const updatedProduct = await ProductsTable.findByIdAndUpdate(
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

	// Delete Product
	deleteProduct: async (req, res) => {
        console.log('Xóa một Product:', req.params);
		try {
			const { id } = req.params;

			const product = await ProductsTable.findByIdAndDelete(id);
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

	// Delete Product
	// Delete multiple products
    deleteProducts: async (req, res) => {
        console.log('Xóa Nhiều Product:', req.body);
        try {
            const { ids } = req.body;

            if (!ids || !Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({
                    message: 'Invalid or missing ids. Please provide an array of ids to delete.'
                });
            }

            // Lọc các id hợp lệ
            const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));

            if (validIds.length === 0) {
                return res.status(400).json({
                    message: 'No valid ids found in the request.',
                    invalidIds: ids
                });
            }

            // Xóa các sản phẩm có id trong mảng hợp lệ
            const deleteResult = await ProductsTable.deleteMany({ _id: { $in: validIds } });

            const deletedCount = deleteResult.deletedCount || 0;

            return res.status(200).json({
                message: `Deleted ${deletedCount} products successfully.`,
                deletedCount,
                invalidIds: ids.filter((id) => !validIds.includes(id)),
                notDeletedIds: validIds.length > deletedCount
                    ? validIds.filter(async (id) => !(await ProductsTable.exists({ _id: id })))
                    : []
            });
        } catch (error) {
            console.error('Delete products error:', error);
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    },

};

export default ProductController;
