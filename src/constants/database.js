 
module.exports = {
    development: {
        username: process.env.DB_USERNAME || 'postgres',
        password: process.env.DB_PASSWORD || 'Keshav@123',
        database: process.env.DB_NAME || 'Demo',
        host: process.env.DB_HOST || 'localhost',
        dialect: 'postgres',
    }
};