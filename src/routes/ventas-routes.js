const {Router}= require('express');
const router= Router();
const {renderSaleForm}= require('../controllers/venta-controllers')

router.get('/products/sale', renderSaleForm);
module.exports = router;