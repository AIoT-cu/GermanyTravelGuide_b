const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/sequelize");
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "Users", {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
  },
});

User.beforeCreate(async (user, options) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;
});

module.exports = User;
