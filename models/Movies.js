const { Model, DataTypes } = require("sequelize");

class Movie extends Model {
  static initModel(sequelize) {
    Movie.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        element_id: {
          type: DataTypes.BIGINT.UNSIGNED,
        },
        media: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "movie",
        timestamps: false,
        tableName: "elements",
      },
    );

    Movie.prototype.toJSON = function () {
      const movie = this.get();
      return movie;
    };
    return Movie;
  }
}

module.exports = Movie;
