const express = require('express');
//const bodyParser = require('body-parser');

const promoRouter = express.Router();
const mongoose = require('mongoose');
const Promotions = require('../models/promotions');

promoRouter.use(express.json());


promoRouter.route('/')
//see all the promotions
.get((req,res,next) => {
    Promotions.find({})
    .then((promotions)=> {
        res.statusCode = 200;
        res.setHeader('Content-Type','appilication/json');
        res.json(promotions);
    }, (err) => { next(err); })
.catch((err) => { next(err); })
})

// create a promotion
.post((req, res, next) => {
    Promotions.create(req.body)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','appilication/json');
        res.json(promotion);
    }, (err) => { next(err); })
.catch( (err) => { next(err); })
})


.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})


.delete((req, res, next) => {
    Promotions.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','appilication/json');
        res.json(resp);
    }, (err) => { next(err); })
.catch((err) => { next(err); })
});

//for :promoID
promoRouter.route('/:promoId')
//get the particular comment by id
.get((req,res,next) => {
    Promotions.findById(req.params.promoId)
    .then((promotion) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','appilication/json');
        res.json(promotion);
    }, (err) => { next(err); })
.catch((err) => { next(err); })
})

.post((req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not supported on /promo/'+ req.params.promoId);
})

//finding and updating a particular promo
.put((req, res, next) => {
  Promotions.findByIdAndUpdate( req.params.promoId, { $set : req.body} , {new : true} )
  .then((promotion) => {
      res.statusCode = 200;
      res.setHeader('Content-Type','appilication/json');
      res.json(promotion);
  }, (err) => { next(err);  })
.catch((err) => { next(err); })
})

//finding and deleting a particular promo
.delete((req, res, next) => {
    Promotions.findByIdAndRemove(req.params.promoId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','appilication/json');
        res.json(resp);
    }, (err) => { next(err); })
.catch((err) => { next(err); })
});


module.exports = promoRouter;