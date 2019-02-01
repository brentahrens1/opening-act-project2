
const express = require('express'); 
const app = express(); 
const bodyParser = require('body-parser'); 
const methodOverride = require('method-override'); 
const artistController = require('./controllers/artists');
const venueController = require('./controllers/venues');
const session  = require('express-session');
const authController = require('./controllers/auth')
const logger = require('morgan'); 

require('dotenv').config(); 
require('./db/db');

app.set('view engine', 'ejs')
app.use(logger('dev')); 
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true})); 
app.use(express.static('public'));

app.use(session({
    secret: "This is a random secret string",
    resave: false,
    saveUninitialized: false
}))

app.use((req,res, next)=>{
    res.locals.currentUser = req.session
    next()
})

app.get('/', (req, res) => {
    res.render('index.ejs')
});   

app.use('/auth', authController); 
app.use('/artists',artistController);
app.use('/venues', venueController);


app.get('/login', (req, res)=> {
    res.render('auth/login'); 
})

app.get('/signup', (req, res)=> {
    res.render('auth/signup'); 
})



app.listen(3000, function() {
    console.log('listening on port 3000'); 
});
