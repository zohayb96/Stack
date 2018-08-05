'use strict';
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Users, Posts, OriginalPost } = require('../../database/');
const router = require('express').Router();

router.post('/create', async (req, res, next) => {
  try {
    const createdPost = await Posts.create(req.body);
    if (createdPost) {
      res.status(201).json(createdPost);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

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

// USER PROFILE ROUTES

// Get posts sent to user // accepted is false
// router.get('/pending/:id', async (req, res, next) => {
//   const issuerToId = req.params.id;
//   try {
//     const allPosts = await Posts.findAll({
//       include: [
//         { model: Users, as: 'issuedTo' },
//         { model: OriginalPost, as: 'originalPost' },
//       ],
//       where: {
//         issuedToId: issuerToId,
//         accepted: false,
//         // },
//       },
//     });
//     res.json(allPosts);
//   } catch (err) {
//     next(err);
//   }
// });

// Get posts sent to user // accepted is true
router.get('/accepted/:id', async (req, res, next) => {
  const issuerToId = req.params.id;
  try {
    const allPosts = await Posts.findAll({
      include: [
        { model: Users, as: 'issuedTo' },
        { model: OriginalPost, as: 'originalPost' },
      ],
      where: {
        issuedToId: issuerToId,
        accepted: true,
        responseRating: null,
        // },
      },
    });
    res.json(allPosts);
  } catch (err) {
    next(err);
  }
});

router.get('/completed/:id', async (req, res, next) => {
  const issuerToId = req.params.id;
  try {
    const allPosts = await Posts.findAll({
      include: [
        { model: Users, as: 'issuedTo' },
        {
          model: OriginalPost,
          as: 'originalPost',
          include: [
            {
              model: Users,
              as: 'issuedFrom',
            },
            {
              model: Posts,
              where: {
                accepted: true,
              },
              include: [
                {
                  model: Users,
                  as: 'issuedTo',
                },
              ],
            },
          ],
        },
      ],
      where: {
        issuedToId: issuerToId,
        accepted: true,
        responseRating: {
          $ne: null,
        },
      },
    });
    res.json(allPosts);
  } catch (err) {
    next(err);
  }
});

router.get('/pending/:id', async (req, res, next) => {
  const issuerToId = req.params.id;
  try {
    const allPosts = await Posts.findAll({
      include: [
        { model: Users, as: 'issuedTo' },
        {
          model: OriginalPost,
          as: 'originalPost',
          include: [
            {
              model: Users,
              as: 'issuedFrom',
            },
            {
              model: Posts,
              where: {
                responseRating: {
                  $ne: null,
                },
              },
              required: false,
              include: [
                {
                  model: Users,
                  as: 'issuedTo',
                },
              ],
            },
          ],
        },
      ],
      where: {
        issuedToId: issuerToId,
        accepted: true,
        responseRating: null,
      },
    });
    res.json(allPosts);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
