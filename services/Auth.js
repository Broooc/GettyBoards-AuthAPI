const UserRepository = require('../repositories/User')
const { Conflict, NotFound, Unauthorized, Forbidden, Badrequest } = require('../errors/authErrors')
const { admin } = require('../firebaseConnect')


class AuthServices {
    
    static async signIn({ UID, fingerprint }) {

        const firebaseUserData = await admin.auth().getUser(UID)

        if (!firebaseUserData) {
            throw new NotFound("This user doesn't exists")
        }

        if (firebaseUserData.emailVerified === false) {
            throw new Unauthorized("Email of that account is still not verified")
        }

        const userData = await UserRepository.getUserData(UID)

        if (!userData) {
            await admin.auth().deleteUser(UID)
            throw new NotFound("This user doesn't exists")
        }

        return { msg: "User succesfully logged In!" }
    }

    static async signUp({ fingerprint, role, UID }) {
        
        const firebaseUserData = await admin.auth().getUser(UID);

        if (!firebaseUserData) {
            throw new Forbidden("You can't create this user")
        }

        if (firebaseUserData.emailVerified === false) {
            throw new Unauthorized("Email of that account is still not verified")
        }

        const userData = await UserRepository.getUserData(UID)

        if (!userData) {
            
            const uniqueId = UID;
    
            const createdUser = await UserRepository.createUser({ role, uniqueId });

            return createdUser;

        }
    }

    static async deleteProfile({ user }) {

        if (!user.uid) {
            throw new Badrequest("No user's ID")
        }

        await admin.auth().deleteUser(user.uid)

        await UserRepository.deleteUser({ uniqueId: user.uid })
    }

}

module.exports = AuthServices