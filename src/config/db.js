
const Sequelize = require('sequelize');

function dbConnect() {
    const dbConnection = new Sequelize('keyrent', 'postgres', 'admin', {
        host: 'localhost',
        dialect: 'postgres',
        operatorsAliases: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
    });
    return dbConnection
}
module.exports = {dbConnect}