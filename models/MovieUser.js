const { Model, DataTypes } = require("sequelize");

class MovieUser extends Model {
  static initModel(sequelize) {
    MovieUser.init(
      {
        user_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        element_id: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "movieUser",
        tableName: "user_elements",
        timestamps: false,
        freezeTableName: true,
      },
    );
    MovieUser.removeAttribute("id");
    MovieUser.prototype.toJSON = function () {
      const movieUser = this.get();
      return movieUser;
    };
  }
}

module.exports = MovieUser;
