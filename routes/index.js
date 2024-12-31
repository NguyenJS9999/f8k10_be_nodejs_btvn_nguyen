import express from "express";
const router = express.Router();

/* GET home listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a home resource');
});


export default router;
