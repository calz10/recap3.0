import { firebase, databaseCollection } from '../firebase'

const auth = firebase.auth()

export const authentication = {
  login: async (email, password) => {
    try {
      return await auth.signInAndRetrieveDataWithEmailAndPassword(email, password)
    } catch (error) {
      return error
    }
  },
  createUser: async (data) => {
    try {
      const { email, password, confirmPassword, ...rest } = data
      const result = await auth.createUserWithEmailAndPassword(email, password)
      let values = {
        ...rest,
        savedMnemonic: false,
        encryptedMnemonic: ''
      }
      await databaseCollection('users').doc(result.user.uid).set(values)
    } catch (error) {
      return error
    }
  },
  getUserById: async (id) => {
    try {
      const docRef = await databaseCollection('users').doc(id).get()
      if (docRef.exists) {
        return { id, ...docRef.data() }
      }
      return null
    } catch (error) {
      return error
    }
  },
  updateUserData: async(id, data) => {
    try {
      const result = await databaseCollection('users').doc(id).update(data)
      return result
    } catch (error) {
      return error
    }
  },
  logout: () => auth.signOut()
}

