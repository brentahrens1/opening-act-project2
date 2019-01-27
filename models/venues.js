const mongoose = require('mongoose'); 


const venueSchema = new mongoose.Schema({
    username: {type: String,},
    password: {type: String,},
    name: {type: String, required: true},
    pic: String,
    gigInfo: {type: String, required: true},
    address: {type: String, required: true},
    pay: String
});

const Venue = mongoose.model('Venue', venueSchema); 

module.exports = Venue; 

 