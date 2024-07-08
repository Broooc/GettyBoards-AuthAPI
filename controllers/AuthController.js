const AuthServices = require('../services/Auth')
const { ErrorUtils } = require('../errors/authErrors')


class AuthController {
    
    static async signUp(req, res) {
        
        const { role, UID } = req.body

        const { fingerprint } = req

        try {
        
            const createdUser = await AuthServices.signUp({ fingerprint, role, UID })

            return res.status(200).json({message: 'User signed up succesfully!', user: createdUser})

        } catch (err) {
            return ErrorUtils.catchError(res, err)
        }
    }
    
    static async logOut(req, res) {

        const refreshtoken = req.cookies.refreshToken

        try {
            await AuthServices.logOut(refreshtoken)

            res.clearCookie("refreshToken");

            return res.sendStatus(200);
        } catch (err) {
            return ErrorUtils.catchError(res, err)
        }
    }

    static async signIn(req, res) {

        const UID = req.body.UID

        const token = req.body.token
        
        const { fingerprint } = req

        try {
            const message = await AuthServices.signIn({ UID, fingerprint })

            return res.status(200).json(message)
        } catch (err) {
            return ErrorUtils.catchError(res, err)
        }
    }

    static async deleteProfile(req, res) {

        const { user } = req

        try {
            await AuthServices.deleteProfile({ user })
            return res.status(200).json({message: "User deleted successfully"})
        } catch (err) {
            return ErrorUtils.catchError(res, err)
        }
    }

}

module.exports = AuthController