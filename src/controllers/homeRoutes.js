const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ], 
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts);
    // res.json(posts);
    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      // logged_in: req.session.logged_in 
      userId: req.session.user_id
      
    });
    // console.log(req.session.user_id);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findOne({
     
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
      
    });
    if (!postData) {
      res.status(404).json({ message: 'No blog post found with this id' });
      return;
    }
    const posts = postData.get({ plain: true });
    console.log(posts);
    //res.json(post);
  res.render('post', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      // include: [{ model: Post }, { model: Comment }],
      include: [
        {
          model: Post,
          include: [
            {
              model: Comment,
              include: [User],
            },
          ],
        },
        {
          model: Comment,
          include: [Post],
        },
      ],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/new', withAuth, async (req, res) => {
  // console.log("Hello World");
  try{
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }
  res.render('newPost', { logged_in: true });
} catch (err){
    res.status(500).json(err);
}
});

// GET the form to update a blog post
router.get('/:id/edit', async (req, res) => {
  try {
    const postData = await Post.findOne({
     
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ['name'],
            },
          ],
        },
      ],
      
    });
    if (!postData) {
      res.status(404).json({ message: 'No blog post found with this id' });
      return;
    }
    const posts = postData.get({ plain: true });
    console.log(posts);
    //res.json(post);
  res.render('editPost', {
      posts,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
