const imageCtrl = {};
const Product = require('../models/schema-article');
const Venta = require('../models/venta');

imageCtrl.rendersProductsForm  = (req, res) => {
    res.render('products/registers-products');
};

imageCtrl.createNewProduct = (req, res) => {
    const {title, description, precio} = req.body;
    const product = new Product({title: title, description: description, precio: precio});
    product.filename = req.file.filename;
    product.path = '/uploads/' + req.file.filename;
    product.originalname = req.file.originalname;
    product.mimetype = req.file.mimetype;
    product.size = req.file.size;
    console.log(req.file);
    console.log(title);
    product.save();
    res.render('products/registers-products');
};

imageCtrl.renderAllProduct = async(req, res) => {
    const product = await Product.find().lean();
    res.render('products/all-products', {product});

};

imageCtrl.renderSaleForm = async (req, res) => {
    const product = await Product.findById(req.params.id).lean();
    res.render('products/sale',{product});
}

imageCtrl.createNewSale = async (req, res) => {
    const {user, title, selectSale, price, total} = req.body;
    const venta= new Venta({cliente: user, product: title, Monto: price});
    venta.save();
    req.flash('success_msg', 'Satisfactory purchase please come to our office')
    res.redirect('/products/all-products');
    
    
}

imageCtrl.renderAllSale = async (req, res) => {
    const sale = await Venta.find().lean();

    console.log(sale);
    res.render('products/all-ventas', {sale});
}
module.exports = imageCtrl;

