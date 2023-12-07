const express = require("express");
const router = express.Router()
const ProductController = require('../controllers/ProductController');
const { authMiddleWare } = require("../middleware/authMiddleware");

router.post('/create',ProductController.createProduct) 
router.put('/update/:id', ProductController.updateProduct)
router.get('/getOneProduct/:id',ProductController.getOneProduct)
router.delete('/deleteProduct/:id',ProductController.deleteProduct)
router.get('/getAllProduct', ProductController.getAllProduct)

module.exports = router