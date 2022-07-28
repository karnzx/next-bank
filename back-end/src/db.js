
const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const bcrypt = require('bcrypt');
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

// User 
const User = model("User", Schema({
    username: { type: String, required: true, indexed: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 },
    pictureUrl: { type: String },
    createdAt: { type: Date, required: true, default: Date.now() },
}, {
    methods: {
        comparePassword(candidatePassword, cb) {
            bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
                if (err) return cb(err);
                cb(null, isMatch);
            });
        }
    }
}).pre('save', function (next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt 10 is default
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
}))

// Transaction
const Transaction = model("Transaction", Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    to: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    action: { type: String, required: true },
    remain: { // remaining balance each user
        from: { type: Number, required: true },
        to: { type: Number, required: true },
    },
    createAt: { type: Date, default: Date.now() },
}))

module.exports = { User, Transaction };
