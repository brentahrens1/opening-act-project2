const mongoose = require('mongoose'); 


const artistSchema = new mongoose.Schema({
    username: {type: String},
    password: {type: String},
    email: {type: String},
    alias: {type: String},
    url: {type:String},
    link: {type: String},
    bio: String, 
    instagram: String,
    twitter: String,
    bookingInfo: {type: String},
    genre: {type: String},
    city: {type: String},
    accountType: String
})

const Artist = mongoose.model('Artist', artistSchema); 

module.exports = Artist; 

 