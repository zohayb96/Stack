const router = require('express').Router();
const { Users } = require('../../database/');
module.exports = router;

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

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});
