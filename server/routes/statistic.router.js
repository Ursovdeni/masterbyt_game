const statisticRouter = require("express").Router();
const { Op } = require("sequelize");
const { Statistic, User } = require("../db/models");

statisticRouter.post("/", async (req, res) => {
  try {
    const { id } = req.session.user;
    const { points } = req.body;
    const statistic = await Statistic.create({ userId: id, points });
    res.json(statistic);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

statisticRouter.get("/", async (req, res) => {
  const { user } = req.session;

  const statistics = await Statistic.findAll({
    where: { userId: user.id },
    order: [["createdAt", "DESC"]],
  });

  res.json(statistics);
});

statisticRouter.get("/top", async (req, res) => {
  const statistics = await Statistic.findAll({
    where: {
      createdAt: {
        [Op.gte]: new Date().setHours(0, 0, 0, 0), 
      },
    },
    order: [["points", "DESC"]],
    limit: 5, 
    include: [{ model: User, attributes: ["login"] }],
  });
  res.json(statistics);
});

module.exports = statisticRouter;
