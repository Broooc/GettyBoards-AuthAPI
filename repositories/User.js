const { admin } = require('../firebaseConnect')

class UserRepository {
    static async createUser({ role, uniqueId }) {

        const newUser = await admin.firestore().collection('users').doc(uniqueId).set({ boards_count: 0, max_boards_count: 3, uid: uniqueId })

        return newUser;
    }

    static async deleteUser({ uniqueId }) {

        const deletedUser = await admin.firestore().collection('users').doc(uniqueId).delete()

        return deletedUser;
    }

    static async getUserData(UID) {

        const user = await admin.firestore().collection('users').doc(UID)

        const userData = (await user.get()).data()

        if (!userData) {
            return null
        }

        return userData
    }
}

module.exports = UserRepository