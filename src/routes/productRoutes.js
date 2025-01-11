import { Router } from 'express';
import {
	createProduct,
	getAllProducts,
	getProductById,
	updateProductById,
	removeProductById
} from '../controllers/productControllers.js';
import productSchema from '../validations/productSchema.js';
import { validBodyRequest } from '../middlewares/validBodyRequest.js';

const productRoutes = Router();

productRoutes.post('/', validBodyRequest(productSchema), createProduct);

productRoutes.get('/', getAllProducts);
productRoutes.get('/:id', getProductById);

productRoutes.patch('/:id', validBodyRequest(productSchema), updateProductById);

productRoutes.delete('/:id', removeProductById);

export default productRoutes;
