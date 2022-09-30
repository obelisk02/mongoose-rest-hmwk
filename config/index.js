require('dotenv').config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_HOST = process.env.MONGO_HOST || "";

const config = {
    port: process.env.PORT || 3000,
    db_host: process.env.DB_HOST || 'localhost',
    db_port: process.env.DB_PORT || 27017,
    db_name: process.env.DB_NAME || 'sciocourses',
    secret: process.env.SECRET || 'secret',

    url : `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}`
};


module.exports = config;