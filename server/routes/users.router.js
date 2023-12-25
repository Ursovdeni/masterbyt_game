const usersRouter = require('express').Router();
const { User } = require('../db/models');

usersRouter.get('/', async (req, res) => {
  const { user } = req.session;
  if (user) {
    const authUser = await User.findOne({ where: { id: user.id } });
    //   console.log('USER FROM GET!!', authUser);
    res.json(authUser);
  } else {
    res.sendStatus(400);
  }
});

usersRouter.post('/registration', async (req, res) => {
//   console.log('USEEEEER REGISTER*****', req.body);
  const { login, email, password } = req.body;
  try {
    // const hashPassword = await bcrypt.hash(password, 7);
    // const userData = await User.create({userName, email, password: hashPassword});
    const userData = await User.create({ login, email, password });
    const user = userData.get({ plain: true });
    req.session.user = {
      id: user.id,
      name: user.login,
      email: user.email,
    };
    res.json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

usersRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.sendStatus(401);
    } else if (user.password === password) {
      req.session.user = {
        id: user.id,
        name: user.login,
        email: user.email,
      };
      res.json(user);
    } else {
      res.sendStatus(401);
    }
    //   const passwordCheck = await bcrypt.compare(password, user.password);
    //   if (passwordCheck) {
    //     req.session.user = {
    //       id: user.id,
    //       name: user.name,
    //       email: user.email,
    //     };
    //     res.json(user);
    //   } else {
    //     const result = false;
    //     res.json(result);
    //   }
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

usersRouter.get('/logout', (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie('mySession');
        res.json({ msg: 'Success' });
      }
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = usersRouter;
