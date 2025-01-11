import { Router } from 'express';
import {
    createCategory,
	getAllCategory,
	getCategoryById,
	updateCategoryById,
	removeCategoryById,
} from '../controllers/categoryControllers.js';
import { categorySchema } from '../validations/categorySchema.js';
import { validBodyRequest } from '../middlewares/validBodyRequest.js';

const categoryRoutes = Router();

categoryRoutes.post('/', validBodyRequest(categorySchema), createCategory); // C

categoryRoutes.get('/', getAllCategory); //  R
categoryRoutes.get('/:id', getCategoryById); // R

categoryRoutes.patch('/:id', validBodyRequest(categorySchema), updateCategoryById); // U

categoryRoutes.delete('/:id', removeCategoryById); // D

export default categoryRoutes;
