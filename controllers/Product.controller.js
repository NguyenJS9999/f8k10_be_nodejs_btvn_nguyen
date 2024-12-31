import ProductsTable from '../models/Product.model.js';
import generateSKU from '../utils/generateSku.js';

console.log('In ra ở Controller bảng ProductsTable:', ProductsTable);


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
            const { title, price, brand, description } = req.body;

            // Kiểm tra các trường bắt buộc
            if (!title || !price || !brand) {
                return res.status(400).json({
                    message: 'title, price, and brand are required'
                });
            }

            // Kiểm tra sản phẩm trùng lặp dựa trên title và brand
            const existingProduct = await ProductsTable.findOne({ title, brand });
            if (existingProduct) {
                return res.status(409).json({
                    message: 'Product with the same title and brand already exists'
                });
            }

            // Sinh SKU từ thông tin
            const newSku = generateSKU(brand, title, description);

            // Tạo sản phẩm mới
            const newProduct = new ProductsTable({
                title,
                price,
                brand,
                description: description || "Updating",
                sku: newSku,
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

	//Post many Product
	createProducts: async (req, res) => {
        console.log('Tạo nhiều Product:', req.body);

		try {
			const { products } = req.body;

			const isValid = products.filter(
				product => !product.title || !product.price || !product.sku
			);

			if (isValid.length) {
				return res.status(400).json({
					message:'Each product must have a title, price, and sku', isValid
				});
			}

			const skus = products.map(product => product.sku);

			const duplicateSkus = skus.filter(
                (sku, index) => skus.indexOf(sku) !== index
            );

			if (duplicateSkus.length > 0) {
				return res.status(400).json({
					message: 'duplicate skus from input data',
					duplicateSkus
				});
			}

			const existingSku = await ProductsTable.find({
				sku: { $in: skus }
			});

			if (existingSku.length > 0) {
				return res.status(409).json({
					message: 'Sku already exists',
					existingSku
				});
			}

			const newProducts = await ProductsTable.insertMany(products);

			return res.status(201).json({
				message: 'Create product success',
				newProducts
			});
		} catch (error) {
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

            // Kiểm tra sp có tồn tại không bằng id duy nhât
            const findProduct = await ProductsTable.findById(id);
            if (!findProduct) {
                return res.status(404).json({
                    message: 'Product not found'
                });
            }

            // Lọc các trường không hợp lệ
            const { sku, title, description, price, brand } = req.body;
            const updateData = { sku, title, description, price, brand };

            // Loại các trường không hợp lệ (undefined)
            Object.keys(updateData).forEach((key) => {
                if (updateData[key] === undefined) {
                    delete updateData[key];
                }
            });

            // Nếu `sku` thay đổi, kiểm tra trùng lặp
            if (sku && sku !== findProduct.sku) {
                const existingProduct = await ProductsTable.findOne({ sku });
                if (existingProduct) {
                    return res.status(409).json({
                        message: 'SKU already exists'
                    });
                }
            }

            // Tìm sp theo id và cập nhật sản phẩm
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
            console.error('Updateproduct error:', error);
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
        try {
            const { ids } = req.body;

            if (!ids || !Array.isArray(ids) || ids.length === 0) {
                return res.status(400).json({
                    message: 'Invalid or missing ids. Please provide an array of ids to delete.'
                });
            }

            // Lọc và xác thực các id ok
            const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));
            if (validIds.length === 0) {
                return res.status(400).json({
                    message: 'No valid ids found in the request.'
                });
            }

            const existingProducts = await ProductsTable.find({ _id: { $in: validIds } });
            const existingIds = existingProducts.map((product) => product._id.toString());

            if (existingIds.length === 0) {
                return res.status(404).json({
                    message: 'No products found to delete.'
                });
            }
            
            const deleteResult = await ProductsTable.deleteMany({ _id: { $in: existingIds } });

            return res.status(200).json({
                message: `Deleted ${deleteResult.deletedCount} products successfully.`,
                deletedIds: existingIds,
                invalidIds: ids.filter((id) => !validIds.includes(id)),
                notFoundIds: validIds.filter((id) => !existingIds.includes(id))
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
                error: error.message
            });
        }
    },

};

export default ProductController;
