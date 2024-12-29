const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+07:00',
    logging: false,
    dialectOptions: {
        connectTimeout: 30000
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

// Pastikan menunggu koneksi berhasil (asynchronous)
(async function(){
    try {
        await conn.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}())

db.close();

module.exports = db;