const mongoose = require('mongoose'); 


const venueSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    name: {type: String},
    VenueUrl: {type:String},
    gigInfo: {type: String},
    address: {type: String},
    pay: String,
    artists: [{type: mongoose.Schema.ObjectId, ref: 'Artist'}],
    accountType: String
});

const Venue = mongoose.model('Venue', venueSchema); 

module.exports = Venue; 

 