const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcryptjs'); 
const Artist = require('../models/artists');
const Venue = require('../models/venues');


//registration 

router.post('/registration', async (req, res)=> {
    
    console.log(req.body.accountType = req.body.accountType.includes('artists') ? 'artist' : 'venue')
    console.log(req.body)
    //username
    const username = req.body.username;
    // //password 
    const password = req.body.password;
    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = {}; 
    newUser.username = username; 

    newUser.password = hashedPassword; 

    newUser.accountType = req.body.accountType === 'artist' ? 'artist' : 'venue';
    try {
        let createdUser = "";
        // create a session
        req.session.accountType = createdUser.accountType; ; 
        req.session.logged = true; 
        if (newUser.accountType === 'artist') {
            // createdUser = await Artist.create(newUser);
            return res.redirect('/artists/new')
        } else {
            return res.redirect('/venues/new') 
        }

    }catch(err) {
        res.send(err);
    }

})

//log in 

router.post('/login', async (req, res) => {
    req.body.accountType = req.body.accountType.includes('artists') ? 'artist' : 'venue'
    try {
        let loggedUser = "";
        if (req.body.accountType === 'artist') {
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
                    res.redirect('/artists');
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