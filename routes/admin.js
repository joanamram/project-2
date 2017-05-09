/*jshint esversion: 6*/
const express = require('express');
const session = require('express-session');
const multer  = require('multer');
const User = require('../models/User');
const Contest = require('../models/Contest');
const upload = multer({ dest: './public/uploads/' });
const mongoose = require('mongoose');

const adminRoutes = express.Router();

adminRoutes.get('/new-contests', function(req, res, next) {
  res.render('new-contests');
});

adminRoutes.post('/new-contests', upload.single('photo'), (req, res, next) => {
  const nameInput = req.body.name;
  const hashtagInput = req.body.hashtag;
  const dateInput = req.body.finalDate;
  const picInput = `/uploads/${req.file.filename}`;
  const prizeInput = req.body.prize;

  const contestSubmission = {
    name: nameInput,
    hashtag: hashtagInput,
    finalDate: dateInput,
    picPath: picInput,
    prize: prizeInput
  };

    const constest = new Contest(contestSubmission);

    constest.save((err) => {
      if (err) {
        res.render('/', {
          errorMessage: 'Something went wrong. Try again later.'
        });
        return;
      }
      res.redirect('/');
    });
});

module.exports = adminRoutes;
