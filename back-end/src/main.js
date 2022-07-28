const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const jwt = require('jsonwebtoken')

const config = require('../config');
const { expressLogger, logger } = require('./logger')
const models = require('./db')

// this secret only use for development use(require('crypto').randomBytes(64).toString('hex'))
const TOKEN_SECRET = config.TOKEN_SECRET
const TOKEN_EXPIRES_IN = '1h'
const app = express()
const port = process.env['SERVER_PORT'] || 5000

app.use(cors())
app.use('/img', express.static('public'))
app.use(expressLogger);
app.use(bodyParser.json())

app.post('/api/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) {
        res.sendStatus(400).send("User or Password not provided")
        return
    }

    const sendInvalidUserPassword = () => {
        res.status(401).send('Invalid user or Password')
    }
    // search username in db
    let user = await models.User.findOne({ username: username }).exec()
    if (user == null) {
        sendInvalidUserPassword()
        return
    }
    user.comparePassword(password, function (err, isMatch) {
        if (err) {
            logger.error(err);
            res.status(500).send()
        }
        // console.log(user, isMatch);
        if (!isMatch) {
            sendInvalidUserPassword()
            return
        }
        logger.info(`user: ${user.id} grant access token`)
        let access_token = jwt.sign({ id: user._id }, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRES_IN })
        res.send({ access_token })
    })
})

// health check
app.get('/api/ping', (req, res) => {
    res.send('pong')
})

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`)
})

