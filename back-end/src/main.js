const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const multer = require('multer');
const upload = multer();

const config = require('../config');
const { expressLogger, logger } = require('./logger')
const models = require('./db')

// this secret only use for development use(require('crypto').randomBytes(64).toString('hex'))
const TOKEN_SECRET = config.TOKEN_SECRET
const app = express()
const port = process.env['SERVER_PORT'] || 5000

app.use(cors())
app.use('/img', express.static('public'))
app.use(expressLogger);
app.use(bodyParser.json())

// health check
app.get('/api/ping', (req, res) => {
    res.send('pong')
})

app.listen(port, () => {
    logger.info(`Example app listening on port ${port}`)
})

