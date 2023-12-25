const router = require("express").Router();

const usersRouter = require("./users.router");
const questionsRouter = require("./questions.router");
const statisticRouter = require('./statistic.router');

router.use("/users", usersRouter);
router.use("/questions", questionsRouter);
router.use("/stat", statisticRouter);

router.get("/", (req, res) => {
  res.send("api works");
});

module.exports = router;
