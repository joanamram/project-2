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

client.get('https://api.twitter.com/1.1/search/tweets.json', {q: '#ironhack', 'count': 10}, function(error, tweets, response) {
  mongoose.connection.collections.tweets.drop( function(err) {
    console.log('collection dropped');
  });
   tweets.statuses.forEach(function(elem){
     const tweetPost = {
       user: elem.screen_name,
       content: elem.text,
       favorites: elem.favorite_count,
       retweets: elem.retweet_count
     };
     const tweet = new Tweet(tweetPost);
       tweet.save(function (err) {
         if (err) return handleError(err);
       });

    //  console.log(elem);
    //  console.log('retweets -> ' + elem.retweet_count);
    //  console.log('favorites -> ' + elem.favorite_count);
   });


});

tweetRoutes.get('/tweets', function(req, res, next) {
  Tweet.find((err, tweets) => {
    res.render('tweets', {tweets});
  });
});

module.exports = tweetRoutes;
