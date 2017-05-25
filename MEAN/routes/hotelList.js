var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://ShivangiPatel:Mishu1993@ds151941.mlab.com:51941/hotellist_us',['hotelList']);

router.get('/hotelList', function(req, res, next){
  db.hotelList.find(function(err, hotelList){
    if(err) {
      res.send(err);
    }
    res.json(hotelList);
  });
  //res.render('index.html');
});

//get one hotel
router.get('/hotelList/:id', function(req, res, next){
  db.hotelList.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, hotelList){
    if(err) {
      res.send(err);
    }
    res.json(hotelList);
  });
  //res.render('index.html');
});

// save task
router.post('/hotel', function(req, res, next){
  var hotel = req.body;
  if(!hotel.title ||(hotel.isFilled + '')){
    res.status(400);
    res.json({
      "error": "BAD CHOICE"
    });
  } else {
      db.hotelList.save(hotel, function(err, hotel){
        if(err){
          res.send(error);
        }
        res.json(hotel);
      });
  }
});

//Delete

router.delete('/hotelList/:id', function(req, res, next){
  db.hotelList.remove({_id: mongojs.ObjectId(req.params.id)},function(err, hotelList){
    if(err) {
      res.send(err);
    }
    res.json(hotelList);
  });
  //res.render('index.html');
});

router.put('/hotelList/:id', function(req, res, next){
  var hotel = req.body;
  var updOccupancy = {};

  if(hotel.isFilled){
    updOccupancy.isFilled = hotel.isFilled;
  }

  if(hotel.title){
    updOccupancy.title = hotel.title;
  }

  if(!updOccupancy){
    res.status(400);
    res.json({
      "error": "BAD INFORMATION"
    });
  }
});

module.exports = router;
