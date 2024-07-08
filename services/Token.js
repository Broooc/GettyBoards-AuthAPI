const { admin } = require('../firebaseConnect')
const { Unauthorized, Forbidden } = require('../errors/authErrors')


const ACCESS_SECRET='pierogi'

const REFRESH_SECRET='lasagna'

class TokenService {

    static async checkAccess(req, res, next) {
        const authHeader = req.headers.authorization;

        const token = authHeader?.split(" ")?.[1];

        if (!token) {
            return next(new Unauthorized());
        }

        try {
            const verifiedToken = await admin.auth().verifyIdToken(token);
            req.user = verifiedToken
        } catch (err) {
            return res.status(403).json({error: err.errorInfo.code, status: 403})
        }

        next()
    }
}

module.exports = TokenService