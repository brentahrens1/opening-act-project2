require('./db/db');
const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const methodOverride = require('method-override'); 
const artistController = require('./controllers/artists');
const venueController = require('./controllers/venues');
const session  = require('express-session');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static('public')); 

app.use('/artists', artistController);
app.use('/venues', venueController);

app.get('/', (req, res) => {
    res.render('index.ejs')
  });   

app.listen(3000, function() {
    console.log('listening on port 3000'); 
});
