const { Model, DataTypes } = require("sequelize");
const Movie = require("./Movies");

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

    Score.belongsTo(Movie, { foreignKey: "element_id" });

    Score.removeAttribute("id");
    Score.prototype.toJSON = function () {
      const score = this.get();
      return score;
    };
  }
}

module.exports = Score;
