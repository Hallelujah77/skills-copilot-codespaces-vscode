// Create web server

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');
var _ = require('lodash');

// GET /comments
router.get('/', function(req, res, next) {
  Comment.find(function(err, comments) {
    if (err) return next(err);
    res.json(comments);
  });
});

// POST /comments
router.post('/', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.save(function(err, comment) {
    if (err) return next(err);
    Post.findById(comment.post, function(err, post) {
      if (err) return next(err);
      post.comments.push(comment);
      post.save(function(err, post) {
        if (err) return next(err);
        res.json(comment);
      });
    });
  });
});

