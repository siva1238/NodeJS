const Sequelize = require("sequelize");

const sequelize = require("../util/database");
const Geo = sequelize.define("geo", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  lat: Sequelize.STRING,
  lng: Sequelize.INTEGER,
});
module.exports = Geo;
