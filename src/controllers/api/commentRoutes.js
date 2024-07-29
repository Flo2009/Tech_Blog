const express = require('express');
const router = express.Router();
const { Comment } = require('../../models');
// const withAuth = require('../utils/auth');

// POST create a new comment
router.post('/', async (req, res) => {
  try {
    console.log(req.session.user_id);
    const newComment = await Comment.create({
      text: req.body.content,
      user_id: req.session.user_id, // Assumes session middleware is in place
      post_id: req.body.post_id,
    });
    res.json(newComment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;