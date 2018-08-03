'use strict';
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Users, Posts, OriginalPost } = require('../../database/');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const responsePosts = await Posts.findAll({
      include: [
        { model: Users, as: 'issuedTo' },
        { model: OriginalPost, as: 'originalPost' },
      ],
    });
    res.json(responsePosts);
  } catch (err) {
    next(err);
  }
});

// Get posts sent to user // accepted is false
router.get('/:id', async (req, res, next) => {
  const issuerToId = req.params.id;
  try {
    const allPosts = await Posts.findAll({
      include: [
        { model: Users, as: 'issuedTo' },
        { model: OriginalPost, as: 'originalPost' },
      ],
      where: {
        issuedToId: issuerToId,
        //   accepted: false,
        // },
      },
    });
    res.json(allPosts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
