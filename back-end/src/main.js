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

const authenticated = (req, res, next) => {
    const auth_header = req.headers['authorization']
    const token = auth_header && auth_header.split(' ')[1]
    if (!token) return res.sendStatus(401)
    jwt.verify(token, TOKEN_SECRET, (err, data) => {
        if (err) return res.sendStatus(403)
        req.data = {
            ...req.data,
            userId: data.id
        }
        next()
    })
}

app.get('/api/info', authenticated, async (req, res) => {
    const user = await models.User.findOne({ _id: req.data.userId }).exec()
    res.send({ username: user.username, balance: user.balance })
})

app.post('/api/deposit', authenticated, async (req, res) => {
    const user = await models.User.findOne({ _id: req.data.userId }).exec()
    const amount = req.body.amount
    if (req.data.amount < 0) return res.status(400).send("Invalid amount")
    user.balance += amount
    user.save()
    res.send('ok')
})

app.post('/api/withdraw', authenticated, async (req, res) => {
    const user = await models.user.findone({ _id: req.data.userid }).exec()
    const amount = req.body.amount
    if (req.data.amount < 0) {
        return res.status(400).send("Invalid amount")
    } else if (user.balance < amount) {
        return res.status(403).send("Balance is less than withdraw amount")
    }
    user.balance -= amount
    user.save()
    res.send('ok')
})

app.post('/api/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (!username || !password) return res.sendStatus(400).send("User or Password not provided")

    const sendInvalidUserPassword = () => {
        res.status(403).send('Invalid user or Password')
    }
    // search username in db
    let user = await models.User.findOne({ username: username }).exec()
    if (user == null) return sendInvalidUserPassword()
    user.comparePassword(password, function (err, isMatch) {
        if (err) {
            logger.error(err);
            res.status(500).send()
        }
        // console.log(user, isMatch);
        if (!isMatch) return sendInvalidUserPassword()
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

