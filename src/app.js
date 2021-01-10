const express = require('express');

require('./database');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use('/api', require('./routes/api-routes'));
app.use('/public', express.static('./uploads'));

app.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'));
});