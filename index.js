const { onRequest } = require("firebase-functions/v2/https");
const server = require('./server')

exports.app = onRequest({
    memory: '512MiB'
}, server)
