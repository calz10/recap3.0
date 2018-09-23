import {
  observable,
  action,
  // computed
} from 'mobx'
import * as Api from '../api'

const Wallet = Api.Wallet
const EtheriumClient = Api.EtheriumClient

class ClientStore {
  @observable wallet = null
  @observable currentWalletBalance = 0
  @observable currentContractRemainingBalance = 0

  constructor(root) {
    this.rootStore = root
    this.etheriumClient = EtheriumClient
    this.walletApi = Wallet
  }

  @action async createRandomWallet(privateKey) {
    try {
      this.wallet = new Wallet(privateKey)
      this.currentWalletBalance = await this.getWalletBalance()
    } catch (error) {
      return error
    }
  }

  @action async getWalletBalance() {
    return await new Wallet().getBalance(this.wallet.address)
  }

  @action async loadWalletFromMnemonic(mnemonic) {
    try {
      this.wallet = EtheriumClient.openFromMnemonic(mnemonic)
      this.currentWalletBalance = await this.getWalletBalance(this.wallet.address)
    } catch (error) {
      return error
    }
  }

  @action async encryptWallet(password) {
    if (this.wallet && password.length > 0) {
      const encryptedWallet = await EtheriumClient.encrypWallet(this.wallet, password)
      sessionStorage.setItem('jsonWallet', encryptedWallet)
    } else {
      throw new Error('Problem occur either in your wallet or password!')
    }
  }

  @action async decryptWallet(jsonWallet, password) {
    if(jsonWallet && password) {
      return await EtheriumClient.decryptWallet(jsonWallet, password)
    }
    throw new Error(`Password and wallet didn't match in decryption!`)
  }
}

export default ClientStore