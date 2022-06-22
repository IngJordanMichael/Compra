const mongoose = require('mongoose');
const mongoose_url = process.env.mongoose_url;
mongoose.connect(mongoose_url,{
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(db => console.log('conexion exitosa:',mongoose_url))
    .catch(err => console.log('error: ', err))