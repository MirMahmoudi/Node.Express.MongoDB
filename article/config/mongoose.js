const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nodejsCourse')
    .then(() => console.log('connected to DB ...'))
    .catch(err => console.log(err))