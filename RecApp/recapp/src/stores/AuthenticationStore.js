import {
  observable,
  action,
  // computed
} from 'mobx'
import * as Api from '../api'

class AuthenticationStore {
  @observable isAuthenticated = false
  @observable currentUser = null
  @observable matchPasswords = false
  @observable authenticating = false

  constructor(root) {
    this.rootStore = root
    this.authApi = Api.authentication
  }

  @action createNewUser(data) {
    try {
      console.log(data)
      const result = this.authApi.createUser(data)
      this.currentUser = result
      console.log(result, 'inside me')
      return result
    } catch (error) {
      return error
    }
  }

  @action setUser(user) {
    this.currentUser = user
  }

  @action async login(authData) {
    const { email, password } = authData
    try {
      const result = await this.authApi.login(email, password)
      if(result) {
        this.currentUser = await this.authApi.getUserById(result.user.uid)
        console.log(this.currentUser.fullname, 'full')
        this.isAuthenticated = true
      }
      return this.currentUser
    }
    catch (error) {
      return error
    }
  }

  @action logout() {
    this.authApi.logout()
  }
}

export default AuthenticationStore