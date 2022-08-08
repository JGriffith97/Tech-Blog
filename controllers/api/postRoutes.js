const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    Post.findAll()
    .then(postData => res.json(postData))
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
})

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, (req, res) => {
  try {
    Post.update({
      postTitle: req.body.postTitle,
      postBody: req.body.postBody
    },
    {
      where: {
        id: req.params.id
      }
    }
    )
    .then(updatePost => {
      if (!updatePost) {
        res.status(404).json({message: 'No post found under this id!'});
        return;
      }
      res.json(updatePost);
    })
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
})

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found under this id!' });
      return;
    }

    res.status(200).json(postData)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;