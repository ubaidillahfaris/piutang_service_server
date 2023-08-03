const Sequelize = require('sequelize');

var database = {}


const sismiop = new Sequelize('PBB', 'PBB', 'Z2184SDNHGF8121RT58', {
    host: '192.120.20.10:1521',
    dialect: 'oracle',
    dialectOptions: {
      connectString: '192.120.20.10:1521/SIMPBB'
    }
  });
  

  database.sismiop = sismiop


  module.exports = database;
  