const express = require('express'); 
const router = express.Router(); 
const Artist  = require('../models/artists');
const Venue   = require('../models/venues');
const bcrypt  = require('bcryptjs');

//index 
 
router.get('/', (req, res) => {
    Artist.find({}, (err, allArtist) => {
        if(err) {
            res.send(arr);
        } else {
            res.render('../views/artists/index.ejs', {
                artists: allArtist //the key becomes a var inside the tempelate
            }); 
        }
    }); 
})

//new

router.get('/new', (req, res) => {
    res.render('../views/artists/new.ejs'); 
}); 

//create

router.post('/', (req, res) => {
    Artist.create(req.body, (err, newArtist) => {
        if(err) {
            res.send(err); 
        } else {
            console.log(newArtist); 
            res.redirect('/artists'); 
        }
    }); 
}); 

//edit 

router.get('/:id/edit', (req, res) => {
    Artist.findById(req.params.id, (err, editedArtist) => {
        if(err) {
            res.send(err); 
        } else {
            res.render('../views/artists/edit.ejs', 
            {artist: editedArtist}); 
        }
    })
}); 

//update

router.put('/:id', (req, res) => {
    Artist.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updateArtist) => {
        if(err) {
            res.send(err); 
        } else {
            console.log(updateArtist); 
            res.redirect('/artists'); 
        }
    })
}); 

//show

router.get('/:id', (req, res) => {
    Artist.findById(req.params.id, (err, foundArtist) => {
        console.log('this is the art' + foundArtist)
        if(err) {
            res.send(err);
        } else {
            console.log(req.session.userId, foundArtist._id)
            res.render('../views/artists/show.ejs', 
            {
                artist: foundArtist,
                loggedUserName: req.session.username,
                loggedUserId: req.session.userId
            }); 
            
        }
    })
}); 

//delete

router.delete('/:id', (req, res) => {
    Artist.findOneAndRemove(req.params.id, (err, deletedArtist) => {
        if(err) {
            res.send(err); 
        } else {
            console.log(deletedArtist)
            res.redirect('/artists'); 
        }
    })
}); 











module.exports = router; 