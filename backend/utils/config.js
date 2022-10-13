require('dotenv').config()

const PORT = process.env.PORT || 3001

const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

const DEPLOYMENT_URL = process.env.DEPLOYMENT_URL

module.exports = {
    PORT,
    MONGODB_URI,
    DEPLOYMENT_URL,
}
