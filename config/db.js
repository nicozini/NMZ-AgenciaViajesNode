import Sequelize from 'sequelize';
import dotenv from 'dotenv/config';

// Option 3: Passing parameters separately (other dialects)
// Sequelize lo llama sequelize pero le puedo poner db y luego exportar db
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST, // 'localhost'  o  '127.0.0.1'
    dialect: 'mysql',
    port: process.env.DB_PORT, // 3306  o  '3306' Lo pone como string
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    operatorAliases: false
});

export default db;