const dotenv = require('dotenv')
dotenv.config();

const envConfig = {
  PORT: process.env.PORT || 3001
}

module.exports = {envConfig}