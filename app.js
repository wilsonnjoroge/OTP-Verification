const express = require('express');
const router = require('./routers/user_routes');


const app = express();

app.use(express.json());
 

app.use('/app', router)



 module.exports = app;