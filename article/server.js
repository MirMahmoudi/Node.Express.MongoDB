const express = require('express');
const router = require('./router');
require('./config/mongoose');
// const bodyParser = require('body-parser')

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(express.urlencoded({extended: true}));
// app.use(bodyParser())
// app.use(express.json())
app.use(router);

app.listen(2019, () => console.log('connected to port 2019 ...'));