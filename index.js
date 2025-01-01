import express from 'express';
import {
	getAllProducts,
	getOneProduct,
	addProduct,
	deleteProduct,
	updateProduct
} from './services/crud.js';

const app = express();
const PORT = 8888;

import cors from 'cors';
app.use(cors());

// Middleware
app.use(express.json());

// Get All
app.get('/products', async (req, res) => {
	const response = await getAllProducts();
	// console.log('Get All response', response);

	if (response.status === 200) {
		res.status(200).json({
			data: response.data,
			message: 'Get product successfully'
		});
        console.log('Get All res', response.data);
		return res;
	} else {
		console.error(response.message);
		return res.status(404).json({ message: 'Product not found' });
	}
});

// Get by ID
app.get('/products/:id', async (req, res) => {
	const { id } = req.params;
	const response = await getOneProduct(id);
	// console.log('Get by ID All response', response);

	if (response.status === 200) {
		res.status(200).json({
			data: response.data,
			message: 'Get product successfully'
		});
	    console.log('Get by ID All res', response.data);
		return res;
	} else {
		console.error(response.message);
		return res.status(404).json({ message: 'Product not found' });
	}
});

// Add
app.post('/products', async (req, res) => {
	const newProduct = req.body;
	const response = await addProduct(newProduct);
	// console.log('Add response', response);

	if (response.status === 200) {
		res.status(200).json({
			data: response.data,
			message: 'Add product successfully'
		});
        console.log('Add res', response.data);
		return res;
	} else {
		console.error(response.message);
		return res.status(404).json({ message: 'Add product failed' });
	}
});

// Update
app.patch('/products/:id', async (req, res) => {
	const { id } = req.params;
	const updateData = req.body;
	const response = await updateProduct(id, updateData);
	// console.log('Update response', response);
	if (response.status === 200) {
		res.status(200).json({
			data: response.data,
			message: 'Product updated successfully'
		});
		console.log('Update res', response.data);
		return res;
	} else {
		console.error(response.message);
		return res.status(404).json({ message: 'Product not found' });
	}
});

// Delete
app.delete('/products/:id', async (req, res) => {
	const { id } = req.params;
	const response = await deleteProduct(id);
	// console.log('Get All response', response);

	if (response.status === 200) {
		res.status(200).json({
			data: response.data,
			message: 'Delete product successfully'
		});
		console.log('Get All res', response.data);
		return res;
	} else {
		console.error(response.message);
		return res.status(404).json({ message: 'Product deleted failed' });
	}
});

// Catch-all for undefined routes
app.use((req, res) => {
	res.status(404).json({ message: 'Router not found' });
});

app.listen(PORT, () => {
	console.log(`Server now is running on port: ${PORT}`);
});
