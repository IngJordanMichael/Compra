const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const roles = require('./roles');
const UserSchema = new Schema({
    name:{type: 'string', required: true},
    email:{type: 'string', required: true, unique: true},
    password:{type: 'string', required: true},
    roles: {
        ref: 'Roles', 
        type: Schema.Types.ObjectId},
     
    
});
UserSchema.methods.encryptPassword = async password =>{
   const salt = await bcrypt.genSalt(10);
   return await bcrypt.hash(password, salt);
}
UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password,this.password);
}
module.exports = model('User', UserSchema);