const { Model, DataTypes } = require("sequelize");

class Score extends Model {
  static initModel(sequelize) {
    Score.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        element_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        score: {
          type: DataTypes.INTEGER,
        },
      },
      {
        sequelize,
        modelName: "score",
        tableName: "scores",
        timestamps: false,
        freezeTableName: true,
      },
    );
    Score.removeAttribute("id");
    Score.prototype.toJSON = function () {
      const score = this.get();
      return score;
    };
  }
}

module.exports = Score;
