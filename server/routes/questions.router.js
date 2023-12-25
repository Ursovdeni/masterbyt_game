const questionsRouter = require("express").Router();

const { Question } = require("../db/models");
const { Category } = require("../db/models");

questionsRouter.get("/", async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

questionsRouter.get("/categories", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

questionsRouter.get("/:id", async (req, res) => {
  try {
    const oneQuestion = await Question.findOne({
      where: { id: req.params.id },
    });
    res.json(oneQuestion);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

questionsRouter.put("/all", async (req, res) => {
  try {
    const updatedQuestions = await Question.update(
      { status: false },
      { where: { status: true } }
    );
    res.json(updatedQuestions);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

questionsRouter.patch("/:id", async (req, res) => {
  try {
    const question = await Question.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(question);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

module.exports = questionsRouter;
