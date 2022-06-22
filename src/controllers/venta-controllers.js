const saleCtrl = {};


saleCtrl.renderSaleForm = async (req, res) => {
    console.log('sale');

    res.render('products/sale')
}

module.exports = saleCtrl;