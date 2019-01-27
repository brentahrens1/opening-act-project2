const mongoose = require('mongoose'); 


const artistSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String},
    alias: {type: String, required: true},
    url: String,
    link: {type: String, required: true},
    bio: String, 
    bookingInfo: {type: String, required: true},
    genre: {type: String, required: true},
    city: {type: String, required: true},
    accountType: String
})

const Artist = mongoose.model('Artist', artistSchema); 

module.exports = Artist; 

 