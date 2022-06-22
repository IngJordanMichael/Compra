const mongoose = require('mongoose');
const {Schema} = mongoose;
 const schemaProduct = new Schema ({
   title: {type: 'string'},
   description: {type: 'string'},
   precio: {type: Number},
   filename: {type: 'string'},
   path: {type: 'string'},
   originalname: {type: 'string'},
   mimetype: {type: 'string'},
   size: {type: Number},
   created : {type: Date, default: Date.now},

});
module.exports = mongoose.model('Product', schemaProduct);