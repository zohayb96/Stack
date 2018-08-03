'use strict';
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Users, Posts, OriginalPost } = require('../../database/');
const router = require('express').Router();

router.get('/friends/:id', async (req, res, next) => {
  const loggedInUser = req.params.id;
  try {
    const allFriends = await Users.findAll({
      where: {
        id: { [Op.notIn]: [loggedInUser] },
      },
    });
    res.json(allFriends);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
      // include: {
      //   model: Chall,
      // },
    });
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const allUsers = await Users.findAll();
    res.json(allUsers);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    const user = await Users.findOne({
      where: {
        id: req.params.id,
      },
    });
    user.update(req.body);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
