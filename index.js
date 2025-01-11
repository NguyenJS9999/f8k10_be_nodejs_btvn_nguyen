import createError from 'http-errors';
import express, { json } from 'express';
import connectDB from "./src/config/db.js";
import routes from "./src/routes/index.js";
// import dotenv from "dotenv";
// dotenv.config();

const port = 8888;
connectDB();

const app = express();
app.use(json()); // Part Data string to json
app.use("/", routes);

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
