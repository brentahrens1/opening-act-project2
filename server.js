require('./db/db');
const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const methodOverride = require('method-override'); 

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static('public')); 



app.listen(3000, function() {
    console.log('listening on port 3000'); 
});
