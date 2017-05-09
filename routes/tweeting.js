/*jshint esversion: 6*/
const express = require('express');
const session = require('express-session');
const multer  = require('multer');
const User = require('../models/User');
const Tweet = require('../models/Tweet');
const Twitter = require('twitter');
require("dotenv").config();
const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
const TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
const TWITTER_ACCESS_TOKEN_KEY = process.env.TWITTER_ACCESS_TOKEN_KEY;
const TWITTER_ACCESS_TOKEN_SECRET = process.env.TWITTER_ACCESS_TOKEN_SECRET;
const mongoose = require('mongoose');


const tweetRoutes = express.Router();

const client = new Twitter({
  consumer_key: TWITTER_CONSUMER_KEY,
  consumer_secret: TWITTER_CONSUMER_SECRET,
  access_token_key: TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

// client.stream('statuses/filter', {q: 'ironhack'},  function(stream) {
//   stream.on('data', function(tweet) {
//     console.log(tweet.text);
//   });
//
//   stream.on('error', function(error) {
//     console.log(error);
//   });
// });
// client.get('https://api.twitter.com/1.1/search/tweets.json', {q: 'Forbes', result_type: 'popular', count: 1}, function(error, tweets, response) {
  // mongoose.connection.collections.tweets.drop( function(err) {
  //   console.log('collection dropped');
  // });



tweetRoutes.get('/contest/:hashtag', function(req, res, next) {
  let hash = '#'+req.params.hashtag;

  client.get('https://api.twitter.com/1.1/search/tweets.json', {q: hash, result_type: 'mixed', count: 5}, function(error, tweets, response) {
    let sorted = tweets.statuses.sort();
    // .exec(function(err, tweets){
      res.render('interact/tweets', {tweets});
    // });
      console.log(sorted);
  });
});

module.exports = tweetRoutes;
