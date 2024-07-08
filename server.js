const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const authRouter = require('./routes/auth')
const Fingerprint = require('express-fingerprint')

const app = express()

app.use(cors({
    origin: true,
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser());
app.use(Fingerprint({
    parameters:[
        Fingerprint.useragent,
        Fingerprint.acceptHeaders
    ]
}))
app.use("/auth", authRouter)

// app.get('/hello', (req, res) => {
//     res.status(200).send('Hello, world of Firebase!');
// })

// dotenv.config();

// const listen = 5000

// const server = app.listen(listen, () => {
//     console.log(`Server is running on port: ${listen}`)
// })

// require('dns').lookup(require('os').hostname(), function (err, add, fam) {
//     console.log('addr: ' + add);
// })

// process.on('SIGTERM', () => {
//     server.close(() => {
//     })
// });

module.exports = app