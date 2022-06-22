const  dotenv  =  require ( 'dotenv' );
const resultado = dotenv.config();
require('./database');
const path = require('path');
const app = require('./server');

app.listen(app.get('port'),() => {
    console.log('Puerto', app.get('port'))

});


 