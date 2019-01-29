const express = require('express');
const router = express.Router(); 
const bcrypt = require('bcryptjs'); 
const Artist = require('../models/artists');
const Venue = require('../models/venues');


//registration

const convertYouTubeUrl = url =>  `https://www.youtube.com/embed/${url.split('v=')[1]}`

router.post('/registration/:type', async (req, res)=> {
    const newUser = req.body
    newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    newUser.accountType = req.params.type === 'artist' ? 'artist' : 'venue';
    console.log(req.body)
    newUser.link = req.body.link && convertYouTubeUrl(req.body.link)
    try {
        // create a session
        req.session.accountType = newUser.accountType; ; 
        req.session.logged = true;
        req.session.username = newUser.username;
        req.session.user = newUser
        if (newUser.accountType === 'artist') {
            //create artist
            Artist.create(newUser, (err, createdArtist)=> {
                if(err) {
                    res.send(err)
                } else {
                    res.redirect('/artists')
                }
            })
            
            
        } else {
            // create venue 
            Venue.create(newUser, (err, createdVenue)=> {
                if(err) {
                    res.send(err)
                } else {
                    res.redirect('/venues')
                }
            })
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
                req.session.user = loggedUser; 
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