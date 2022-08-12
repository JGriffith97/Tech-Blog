const router = require('express').Router();
const {Comment} = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  try {
    Comment.findAll()
    .then(commentData => res.json(commentData));
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.post('/', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.create({
      commentBody: req.body.commentBody,
      post_id: req.body.post_id,
      user_id: req.session.user.id
    })
    res.status(200).json(commentData)
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.put('/:id', withAuth, (req, res) => {
  try {
    Comment.update({
      commentBody: req.body.commentBody
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then(updatePost => {
      if (!updatePost) {
        res.status(404).json({message: 'No comment found under this id!'});
        return;
      }
      res.json(updatePost);
    });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user.id,
      },
    });

    if (!commentData) {
      res.status(404).json({message: 'No comment found under this id!'});
      return;
    }

    res.status(200).json(commentData)
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;