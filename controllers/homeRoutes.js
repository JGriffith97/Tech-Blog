const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: {exclude: ['password']}
        }
      ],
    });

    const posts = postData.map((post) => post.get({plain: true}));

    res.render('homepage', {
      posts,
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Post 
        },
        {
          model: Comment,
          attributes: ['id' ,'commentBody', 'date_posted', 'user_id'],
          include: [
            {
              model: User,
              attributes: {exclude: ['password']}
            },
            {
              model: Post,
              attributes: ['id' ,'postTitle']
            }
          ]
        },
      ],
    });

    const user = userData.get({ plain: true });

    if (req.session.logged_in) {
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } else {
      res.redirect('/login')
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err)
  }
});

router.get('/dashboard/user-post/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {exclude: ['password']}
        },
      ],
    });

    const post = postData.get({ plain: true });

    if (req.session.logged_in) {
      res.render('user-post', {
        ...post,
        logged_in: req.session.logged_in,
      });
    } else {
      res.redirect('/login')
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard/comments/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: Post
        },
      ]
    })
  } catch (err) {
    
  }
})

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {exclude: ['password']}
        },
        {
          model: Comment,
          attributes: ['commentBody', 'date_posted'],
          include: [
            {
              model: User,
              attributes: {exclude: ['password']},
            },
          ],
        },
      ],
    });

    const post = postData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }

  res.render('login');
})

module.exports = router;