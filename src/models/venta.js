const mongoose = require('mongoose');
const {Schema} = mongoose;
 const schemaVenta = new Schema ({
   cliente: {type: 'string',},
   product: {type: 'string'},
   cantidad: {type: Number},
   Monto: {type: Number},
   created : {type: Date, default: Date.now},

});
module.exports = mongoose.model('Venta', schemaVenta);