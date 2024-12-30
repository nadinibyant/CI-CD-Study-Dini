const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    timezone: '+07:00',
    logging: false,
    dialectOptions: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        connectTimeout: 30000
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

// Hapus IIFE dan db.close()
// Buat fungsi untuk mengelola koneksi
const connectDB = async () => {
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
        return db;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;
    }
};

// Export both db instance and connect function
module.exports = {
    db,
    connectDB
};