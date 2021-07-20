// const mysql= require('mysql2');

// const pool = mysql.createConnection({
//     host:'localhost',
//     user:'root',
//     database:'node_complete',
//     password:'admin'
// })

// module.exports = pool.promise();

const Sequelize = require("sequelize");

const sequelize = new Sequelize("graphql", "root", "admin", {
  dialect: "mysql",
  host: "localhost",
  logging: false,
});

module.exports = sequelize;
