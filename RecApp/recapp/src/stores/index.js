import AuthStore from './AuthenticationStore'
import ClientStore from './ClientStore'
import RecipeStore from './RecipeStore'
import { observable, action } from 'mobx';
import { ethers, provider } from '../api/ethersApi'

class RootStore {
  @observable transactionItemDone = true
  @observable modalOpen = false
  @observable transactionMessage = ''
  @observable transactionHash = ''
  constructor() {
    this.authStore = new AuthStore(this)
    this.clientStore = new ClientStore(this)
    this.clientStore = new ClientStore(this)
    this.recipeStore = new RecipeStore(this)
  }

  @action async retrieveTransactionStatus(hash, type) {
    try {
      this.transactionItemDone = false
      this.modalOpen = true
      const result = await provider.waitForTransaction(hash)
      this.transactionMessage = type
      this.transactionHash = hash
      if (result) {
        console.log('done')
        this.transactionItemDone = true
      }
      return result
    } catch (error) {
      return error
    }
  }
  @action changeTransactionDone() {
    this.transactionItemDone = true
  }

  @action changeTransactionProgress() {
    this.transactionItemDone = !this.modalOpen
  }

  @action normalize() {
    this.modalOpen = false
    this.transactionItemDone = true
    this.transactionMessage = ''
    this.transactionHash = ''
  }

}
export default RootStore