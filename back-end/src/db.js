
const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const config = require('../config');
const { logger } = require('./logger');

const { DB: { host, port, name } } = config;
const connection_uri = `mongodb://${host}:${port}/${name}`;
var db = mongoose.connection;
const connectMongodb = () => {
    mongoose.connect(connection_uri, (error) => {
        if (error) {
            logger.error('Error in MongoDB connection: ' + error);
            mongoose.disconnect();
        }
    })
};
db.on('disconnected', function () {
    logger.error('MongoDB disconnected!');
    connectMongodb()
});
db.on('reconnected', function () {
    logger.info('MongoDB reconnected!');
});
db.on('connected', function () {
    logger.info('MongoDB connected!');
});
db.on('connecting', function () {
    logger.debug('connecting to MongoDB...');
});
connectMongodb()

const User = model("User", Schema({
    id: { type: String, required: true }, // id from oauth
    name: { type: String, required: true },
    pictureUrl: { type: String },
    createdAt: { type: Date, required: true, default: Date.now() },
    balance: {type: Number, default: 0}
}))

module.exports = { User };
