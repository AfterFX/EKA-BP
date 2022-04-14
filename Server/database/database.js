const Sequelize = require('sequelize');

module.exports = new Sequelize("ekaBp", "root", "password", {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false,
    // SQLite only
    // storage: 'database.sqlite',
});