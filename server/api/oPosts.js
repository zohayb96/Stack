'use strict';
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Users, Posts, OriginalPost } = require('../../database/');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    const allOriginalPosts = await OriginalPost.findAll({
      include: [{ model: Posts }],
    });
    res.json(allOriginalPosts);
  } catch (err) {
    next(err);
  }
});

// Get own create original posts
router.get('/sub/:id', async (req, res, next) => {
  const issuerId = req.params.id;
  try {
    const ownPost = await OriginalPost.findOne({
      where: {
        issuedFromId: issuerId,
      },
    });
    const subPosts = await ownPost.getPosts({
      include: [{ model: Users, as: 'issuedTo' }],
    });
    res.json(subPosts);
  } catch (err) {
    next(err);
  }
});

// Get own create original posts
// router.get('/:id', async (req, res, next) => {
//   const issuerId = req.params.id;
//   try {
//     const ownPosts = await OriginalPost.findAll({
//       include: [{ model: Users, as: 'issuedFrom' }, { model: Posts }],
//       where: {
//         issuedFromId: issuerId,
//       },
//     });
//     res.json(ownPosts);
//   } catch (err) {
//     next(err);
//   }
// });

// Get own created original posts which have been accepted/ declined
router.get('/:id', async (req, res, next) => {
  const issuerId = req.params.id;
  try {
    const ownPosts = await OriginalPost.findAll({
      where: {
        issuedFromId: issuerId,
      },
      include: [
        {
          model: Posts,
          where: { accepted: true },
          required: false,
        },
      ],
    });
    res.json(ownPosts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
