"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Category, {
        foreignKey: "categoryId"
      });
    }
  }
  Question.init(
    {
      categoryId: DataTypes.INTEGER,
      questionText: DataTypes.TEXT,
      answer: DataTypes.STRING,
      points: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: "Question",
    }
  );
  return Question;
};
