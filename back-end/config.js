const isProd = !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development')

module.exports = {
    DB: {
        host: isProd ? 'mongodb' : 'localhost',
        port: 27017,
        name: 'nextbankdb'
    },
    imgUrlPrefix: isProd ? '/img' : 'http://localhost:5000/img',
    TOKEN_SECRET: "this-is-my-secret-for-development",
};
