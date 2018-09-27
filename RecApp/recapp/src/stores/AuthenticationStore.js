import {
  observable,
  action,
  // computed
} from 'mobx'
import * as Api from '../api'
import helpers from '../helpers/index'
import crypto from 'crypto-js'
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
      const result = this.authApi.createUser(data)
      this.currentUser = result
      return result
    } catch (error) {
      return error
    }
  }

  @action async setUser(user) {
    this.currentUser = await this.getUserById(user.uid)
    this.isAuthenticated = true;
  }

  @action changeAuth(boolean) {
    if (boolean) {
      this.isAuthenticated = boolean
    } else {
      this.isAuthenticated = !this.isAuthenticated
      this.currentUser = null
    }
  }

  @action async login(authData) {
    const { email, password } = authData
    try {
      const result = await this.authApi.login(email, password)
      if (result) {
        this.currentUser = await this.getUserById(result.user.uid)
        return this.currentUser
      }
    }
    catch (error) {
      return error
    }
  }

  @action async getUserById(id) {
    return await this.authApi.getUserById(id)
  }

  @action async saveWalletMnemonic(auth) {
    const { confirmPassword, password } = auth
    const currentWallet = this.rootStore.clientStore.wallet
    if (confirmPassword !== password) {
      throw new Error('Mismatch password')
    }
    if (currentWallet) {
      // const { wallet } = currentWallet
      const encryptedMnemonic = helpers.encryptToSecure(currentWallet.mnemonic, password).toString()
      try {
        await this.authApi.updateUserData(this.currentUser.id, { encryptedMnemonic, savedMnemonic: true })
        this.currentUser = { ...this.currentUser, savedMnemonic: true }
      } catch (error) {
        return error
      }
      return encryptedMnemonic
    }
  }
}

export default AuthenticationStore