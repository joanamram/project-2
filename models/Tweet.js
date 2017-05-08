/*jshint esversion: 6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
  user: String,
  content: String,
  picPath: String,
  favorites: Number,
  retweets: Number
});

tweetSchema.set('timestamps', true);

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
