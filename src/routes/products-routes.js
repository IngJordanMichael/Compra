const express = require('express');
const router = express.Router();
const {
    rendersProductsForm,
    createNewProduct,
    renderAllProduct, 
    renderSaleForm,
    createNewSale,
    renderAllSale
} = require('../controllers/products-controllers');

router.get('/products/add', rendersProductsForm);
router.post('/upload', createNewProduct);
router.get('/products/all-products', renderAllProduct);
router.get('/products/sale/:id', renderSaleForm);
router.post('/products/newSale', createNewSale);
router.get('/sale/all', renderAllSale);
module.exports = router;


