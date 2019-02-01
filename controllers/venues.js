 const express = require('express'); 
 const router = express.Router(); 
 const Artist  = require('../models/artists');
 const Venue   = require('../models/venues');
 const bcrypt  = require('bcryptjs');

//index 
 
router.get('/', (req, res) => {
    Venue.find({}, (err, allVenues) => {
        if(err) {
            res.send(arr);
        } else {
            res.render('../views/venues/index.ejs', {
                venues: allVenues 
            }); 
        }
    }); 
})

//new

router.get('/new', (req, res) => {
    res.render('../views/venues/new.ejs'); 
}); 

//create

router.post('/registration/venue', (req, res) => {
    if(!req.body.url) {
        req.body.url = 'https://i.pinimg.com/originals/3a/ef/bc/3aefbcb7b8620a31f60b0b25b3e22b00.jpg'; 
    }
    Venue.create(req.body, (err, newVenue) => {
        if(err) {
            res.send(err); 
        } else {
            console.log(newVenue); 
            res.redirect('/venues'); 
        }
    }); 
}); 

//edit 

router.get('/:id/edit', (req, res) => {
    Venue.findById(req.params.id, (err, editedVenue) => {
        if(err) {
            res.send(err); 
        } else {
            res.render('../views/venues/edit.ejs', 
            {venue: editedVenue}); 
        }
    })
}); 

//update

router.put('/:id', (req, res) => {
    Venue.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updateVenue) => {
        if(err) {
            res.send(err); 
        } else {
            console.log(updateVenue); 
            res.redirect('/venues'); 
        }
    })
}); 

//show

router.get('/:id', (req, res) => {
    Venue.findById(req.params.id, (err, foundVenue) => {
        if(err) {
            res.send(err);
        } else {
            res.render('../views/venues/show.ejs', 
            {venue: foundVenue}); 
            
        }
    })
}); 

//delete

router.delete('/:id', (req, res) => {
    Venue.findByIdAndDelete(req.params.id, (err, deletedVenue) => {
        if(err) {
            res.send(err); 
        } else {
            res.redirect('/'); 
        }
    })
}); 





 module.exports = router; 