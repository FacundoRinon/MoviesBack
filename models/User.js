const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

class User extends Model {
  static initModel(sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.BIGINT.UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            notEmpty: true,
          },
        },
        lastname: {
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
        address: {
          type: DataTypes.STRING,
        },
        phone: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "user",
        hooks: {
          beforeCreate: async (user, options) => {
            if (user.firstname.toLowerCase() === "unknown") {
              options.abort = true;
              throw new Error("No se puede crear un usuario con el nombre 'Unknown'.");
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
