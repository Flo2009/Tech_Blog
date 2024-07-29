const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const commentRoutes = require('./commentRoutes'); // New comment routes

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes); // New comment routes

module.exports = router;

