const router = require('express').Router();
const { Users } = require('../../database/');

router.put('/login', async (req, res, next) => {
  try {
    const foundUser = await Users.findOne({
      where: {
        username: req.body.username,
        // password: req.body.password,
      },
    });
    if (foundUser) {
      if (!foundUser.correctPassword(req.body.password)) {
        res.sendStatus(404);
      } else {
        // req.login(foundUser, err => (err ? next(err) : res.json(foundUser)));
        res.json(foundUser);
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
