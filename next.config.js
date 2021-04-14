const path = require('path')

require('dotenv').config()

module.exports = {

  env: {
    API_URL: process.env.API_URL
  },

  publicRuntimeConfig: {
    API_URL: process.env.API_URL
  },

  webpack: config => {
    config.resolve.alias['components'] = path.join(__dirname, 'components')
    config.resolve.alias['hooks'] = path.join(__dirname, 'hooks')
    config.resolve.alias['lib'] = path.join(__dirname, 'lib')
    config.resolve.alias['public'] = path.join(__dirname,'public')

    return config
  }
}