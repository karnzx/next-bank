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

function filterInt(value) {
    if (/^[-+]?(\d+)$/.test(value)) {
        return Number(value)
    } else {
        return NaN
    }
}

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

app.get('/api/transactions', authenticated, async (req, res) => {
    const user = await models.User.findOne({ _id: req.data.userId }).exec()
    // const transaction = await models.Transaction.find({ "$or": [{ from: user._id }, { to: user._id }] })
    const userTransaction = { transfer: [], receive: [], }
    let transactions = await models.Transaction.find({ from: user._id }).populate('to').exec()
    let date = ""
    for (let transaction of transactions) {
        date = `${transaction.createAt.getDate()}/${transaction.createAt.getMonth() + 1}/${transaction.createAt.getFullYear()}`
        userTransaction.transfer.push({
            from: user.username, to: transaction.to.username, remain: transaction.remain.from,
            amount: transaction.amount, action: transaction.action, dateTime: date
        })
    }
    transactions = await models.Transaction.find({ to: user._id }).populate('from').exec()
    for (let transaction of transactions) {
        date = `${transaction.createAt.getDate()}/${transaction.createAt.getMonth() + 1}/${transaction.createAt.getFullYear()}`
        userTransaction.receive.push({
            from: transaction.from.username, to: user.username, remain: transaction.remain.to,
            amount: transaction.amount, action: transaction.action, dateTime: date
        })
    }
    // console.log(transactions)
    res.send({ ...userTransaction })
})

app.post('/api/deposit', authenticated, async (req, res) => {
    const user = await models.User.findOne({ _id: req.data.userId }).exec()
    const amount = filterInt(req.body.amount)
    if (isNaN(amount) || amount <= 0) return res.status(400).send("Invalid amount")
    user.balance += amount
    user.save()
    logger.info(`user ${user._id} deposit ${amount}`)
    res.send('ok')
})

app.post('/api/withdraw', authenticated, async (req, res) => {
    const user = await models.User.findOne({ _id: req.data.userId }).exec()
    const amount = filterInt(req.body.amount)
    if (isNaN(amount) || amount <= 0) {
        return res.status(400).send("Invalid amount")
    } else if (user.balance < amount) {
        return res.status(403).send("Balance is less than withdraw amount")
    }
    user.balance -= amount
    user.save()
    logger.info(`user ${user._id} withdraw ${amount}`)
    res.send('ok')
})


app.post('/api/transfer', authenticated, async (req, res) => {
    const from = await models.User.findOne({ _id: req.data.userId }).exec()
    const to = await models.User.findOne({ username: req.body.to }).exec()
    const amount = filterInt(req.body.amount)
    if (isNaN(amount) || amount <= 0) return res.status(400).send("Invalid amount")
    else if (to == null) return res.status(400).send("Invalid transfer destination account")
    else if (from.username == to.username) return res.status(400).send("Destination account must not same as tranferer")
    else if (from.balance < amount) return res.status(403).send("Balance is less than transfer amount")
    from.balance -= amount
    to.balance += amount
    from.save()
    to.save()

    const transaction = await models.Transaction.create({
        from: from,
        to: to,
        amount: amount,
        action: "transfer",
        remain: {
            from: from.balance,
            to: to.balance,
        }
    })
    logger.info(`user ${from._id} transfer ${amount} to ${to._id} with transaction-id: ${transaction._id}`)
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

