import createError from 'http-errors';

import express, { json } from 'express';
import mongoose from 'mongoose';

const port = 8888;

(async function connectMongoose() {
	try {
		await mongoose.connect('mongodb://localhost:27017/f8k10_nguyen');
		console.log('Connect data Success');
	} catch (error) {
		console.log('Error:', error);
	}
})();

import indexRouter from "./routes/index.js";
import productRouter from "./routes/products.js";
//
const app = express();

app.use(json()); // Part Data string to json

app.use('/', indexRouter);
app.use('/products', productRouter);

// app.use((req, res) => {
// 	return res.status(404).json({
// 		message: 'Route not found'
// 	});
// });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

app.listen(port, () => {
	console.log(`Server is running with port: ${port}`);
});
