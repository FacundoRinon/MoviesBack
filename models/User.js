const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        user_id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          validate: {
            notEmpty: true,
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        avatar: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        sequelize,
        modelName: "user",
        hooks: {
          beforeCreate: async (user, options) => {
            if (user.name.toLowerCase() === "unknown") {
              options.abort = true;
              throw new Error("Can`t create a user with the name 'Unknown'.");
            }
            const hashedPassword = await bcrypt.hash(user.password, 5);
            user.password = hashedPassword;
          },
          beforeUpdate: async (user, options) => {
            if (user.changed("password")) {
              const hashedPassword = await bcrypt.hash(user.password, 5);
              user.password = hashedPassword;
            }
          },
        },
      },
      (User.prototype.comparePassword = async function (passwordToValidate) {
        return await bcrypt.compare(passwordToValidate, this.password);
      }),
    );

    User.prototype.toJSON = function () {
      const user = this.get();
      delete user.password;
      return user;
    };
    return User;
  }
}

module.exports = User;
