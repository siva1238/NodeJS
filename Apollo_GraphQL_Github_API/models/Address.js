const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Address = sequelize.define("address", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  street: Sequelize.STRING,
  city: Sequelize.STRING,
  suite: Sequelize.STRING,
  zipcode: Sequelize.INTEGER,
});
module.exports = Address;
