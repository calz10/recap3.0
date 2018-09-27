import {
  observable,
  action,
  // computed
} from 'mobx'
import * as Api from '../api'
import helpers from '../helpers/index'

const Wallet = Api.Wallet
const EtheriumClient = Api.EtheriumClient

class ClientStore {
  @observable wallet = null
  @observable currentWalletBalance = 0
  @observable currentContractRemainingBalance = 0
  @observable type = ''
  @observable selectedRecipe = null

  constructor(root) {
    this.rootStore = root
    this.etheriumClient = EtheriumClient
    this.walletApi = Wallet
  }

  @action setSelectedRecipe(recipe) {
    this.selectedRecipe = recipe
  }
  @action async createRandomWallet(privateKey) {
    try {
      this.wallet = new Wallet(privateKey).wallet
      this.currentWalletBalance = await this.getWalletBalance()
      this.rootStore.recipeStore.setContract()
      // console.log(this)
      return this.wallet
    } catch (error) {
      return error
    }
  }

  @action getWallet(privateKey) {
    return new Wallet(privateKey).wallet
  }

  @action async getWalletBalance() {
    return await new Wallet().getBalance(this.wallet.address)
  }

  @action async loadWalletFromMnemonic(mnemonic) {
    try {
      this.wallet = EtheriumClient.openFromMnemonic(mnemonic)
      this.currentWalletBalance = await this.getWalletBalance(this.wallet.address)
      this.rootStore.recipeStore.setContract()
    } catch (error) {
      return error
    }
  }

  @action async encryptWallet(password, wallet) {
    const walletData =  wallet ? wallet: this.wallet
    if (walletData && password.length > 0) {
      const encryptedWallet = await EtheriumClient.encrypWallet(walletData, password)
      sessionStorage.setItem('jsonWallet', encryptedWallet)
      this.type = 'encrypted'
    } else {
      throw new Error('Problem occur either in your wallet or password!')
    }
  }
  
  @action decryptMnemonic(data, password) {
    return helpers.decryptFromSecure(data, password)
  }

  

  @action async decryptWallet(jsonWallet, password) {
    if(jsonWallet && password) {
      return await EtheriumClient.decryptWallet(jsonWallet, password)
    }
    throw new Error(`Password and wallet didn't match in decryption!`)
  }
}

export default ClientStore