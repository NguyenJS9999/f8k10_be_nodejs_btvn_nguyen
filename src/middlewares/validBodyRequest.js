export const validBodyRequest = (schemaValid) => (req, res, next) => {
	try {
		const data = schemaValid.parse(req.body);
		console.log(`data valid: ${data}`);
		next();
	} catch (err) {
		const errors = err.errors.map((item) => `${item.path}: ${item.message}`);
		res.status(400).send({ errors });
	}
};
	