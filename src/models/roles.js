const mongoose = require('mongoose');
const {Schema} = mongoose;
 const schemaRoles = new Schema ({
    name: {type: 'string'},
    versionkey: false,
     
});
module.exports = mongoose.model('Roles', schemaRoles);