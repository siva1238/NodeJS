const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  name: Sequelize.STRING,
  username: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: Sequelize.STRING,
  phone: Sequelize.INTEGER,
  website: Sequelize.STRING,
});
const Address = sequelize.define("address", {
  street: Sequelize.STRING,
  city: Sequelize.STRING,
  suite: Sequelize.STRING,
  zipcode: Sequelize.INTEGER,
});
const Geo = sequelize.define("geo", {
  lat: Sequelize.STRING,
  lng: Sequelize.INTEGER,
});
const Company = sequelize.define("company", {
  companyName: Sequelize.STRING,
  catchPhrase: Sequelize.STRING,
  bs: Sequelize.STRING,
});
