const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

//Variables de entorno
const NODE_ENV = process.env.NODE_ENV || 'development';

dotenv.config({
    path: `.env.${NODE_ENV}`
});
//Fin variables de entorno

require('./database');

const app = express();
app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(cors());
app.use('/api', require('./routes/api-routes'));
app.use('/public', express.static('./uploads'));


app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});

//Auth backend by: https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/