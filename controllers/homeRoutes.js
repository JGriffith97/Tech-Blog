const router = require('express').Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['userName']
        }
      ]
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
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    if (req.session.logged_in) {
      res.render('dashboard', {
        ...user,
        logged_in: true
      });
    } else {
      res.redirect('login')
    }
  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    const post = postData.get({ plain: true });

    if (req.session.logged_in) {
      res.render('post', {
        ...post,
        logged_in: req.session.logged_in
      });
    } else {
      res.redirect('/login')
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
})

module.exports = router;