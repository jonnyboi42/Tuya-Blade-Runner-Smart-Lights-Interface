//config.ts
const dotenv = require('dotenv');

//Load Environment Variables from .env file
dotenv.config();


const config = {
    device1Key: process.env.TUYA_HOST || ''
}

module.exports = config;