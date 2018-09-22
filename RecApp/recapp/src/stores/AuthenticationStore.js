import {
  observable,
  action,
  // computed
} from 'mobx'
import * as Api from '../api'

class AuthenticationStore {
  @observable isAuthenticated = false
  @observable currentUser = {}
  @observable matchPasswords = false
  @observable authenticating = false

  constructor(root, ) {
    this.rootStore = root
    this.authApi = Api.authentication
  }

  @action async login(authData) {
    const { email, password, repassword } = authData
    try {
      if (password !== repassword) {
        throw new Error('Password did not match!')
        const { auth, user } = await this.authApi.login(email, password)
        this.isAuthenticated = auth
        this.currentUser = user
        return this.currentUser
      }
    } catch (error) {
      return error
    }
    // this.authenticating = true
    // this.authenticating = false
  }
}

export default AuthenticationStore