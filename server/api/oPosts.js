'use strict';
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Users, Posts, OriginalPost } = require('../../database/');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const allOriginalPosts = await OriginalPost.findAll({
      include: [{ model: Users, as: 'issuedFrom' }],
    });
    res.json(allOriginalPosts);
  } catch (err) {
    next(err);
  }
});

// Get own create original posts
router.get('/:id', async (req, res, next) => {
  const issuerId = req.params.id;
  try {
    const ownPosts = await OriginalPost.findOne({
      include: [{ model: Users, as: 'issuedFrom' }],
      where: {
        issuedFromId: issuerId,
      },
    });
    res.json(ownPosts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
