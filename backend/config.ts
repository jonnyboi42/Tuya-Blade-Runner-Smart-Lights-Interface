//config.ts
const dotenv = require('dotenv');

//Load Environment Variables from .env file
dotenv.config();


const config = {
    host: process.env.TUYA_HOST || '',
    accessKey: process.env.TUYA_ACCESS_KEY || '',
    secretKey: process.env.TUYA_SECRET_KEY || ''
}

module.exports = config;