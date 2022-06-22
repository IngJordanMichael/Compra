const Role = require('../models/roles');
const createRoles = async  () => {
    const count = await Role.estimatedDocumentCount();
    try {
        if(count > 0) return;
           const  values = await Promise.all([
            new Role({name: 'admin'}).save(),
            new Role({name: 'user'}).save()
        ])
    }catch(error) {
        console.error(error);
    }
}

module.exports = createRoles;