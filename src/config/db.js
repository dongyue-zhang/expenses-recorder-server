require('dotenv').config();
const mongoose = require('mongoose')

module.exports = connectMongoDB = async () => {
    try {
        await mongoose.connect(
            process.env.mongodburi,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                keepAlive: true,
                keepAliveInitialDelay: 300000
            }
        )
    } catch (error) {
        console.error(error.message)
    }
}

//?