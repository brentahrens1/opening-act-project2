const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcryptjs'); 
const Artist = require('../models/artists');
const Venue = require('../models/venues');


//registration 

router.post('/registration', async (req, res)=> {
    //username
    const username = req.body.username;
    //password 
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = {}; 
    newUser.username = username; 

    newUser.password = hashedPassword; 

    newUser.accountType = req.body.accountType === 'artist' ? 'artist' : 'venue';
    try {
        const createdUser = "";
        if (accountType === 'artist') {
            createdUser = await Artist.create(newUser); 
            } else {
            createdUser = await Venue.create(newUser); 
            }

        //create a session 
        req.session.accountType = createdUser.accountType; ; 
        req.session.logged = true; 
        res.redirect('/auth');


    }catch(err) {
        res.send(err);
    }

})

//log in 

router.post('/login', async (req, res) => {
    try {
        const loggedUser = "";
        if (accountType === 'artist') {
        loggedUser = await Artist.findOne({username: req.body.username});
        } else {
        loggedUser = await Venue.findOne({username: req.body.username});
        }
        if (loggedUser) {
            if(bcrypt.compareSync(req.body.password, loggedUser.password)) {
                req.session.message = "";
                req.session.logged = true; 
                req.session.username = loggedUser.username; 
                if (loggedUser.accountType === 'artist') {
                    res.redirect('/aritsts');
                } else {
                    res.redirect('/venues'); 
                }
            } else {
                req.session.message = 'invalid password'; 
                res.redirect('/');
            }
        } else {
            req.session.message = "invalid";
            res.redirect('/');
        }
    }catch(err) {
        res.send(err); 
    }
})

//log out 

router.get('/logout', async  (req,res)=> {
    req.session.destroy((err) => {
        if(err) {
            res.send(err); 
        }else {
            res.redirect('/'); 
        }
    })
})

module.exports = router; 