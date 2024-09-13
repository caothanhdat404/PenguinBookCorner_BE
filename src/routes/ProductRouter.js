const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/ProductController')
const { authMiddleWare } = require('../middleware/authMiddleware')

router.post('/create', ProductController.createProduct)
router.put('/update/:id', ProductController.updateProduct)
router.delete('/delete/:id', ProductController.deleteProduct)
router.get('/get-details/:id', ProductController.getDetailsProduct)
router.get('/getAll', ProductController.getAllProduct)
router.get('/get-all-type', ProductController.getAllType)
router.delete('/delete-many', ProductController.deleteMany)

module.exports = router