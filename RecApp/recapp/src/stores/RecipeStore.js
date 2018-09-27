import {
  observable,
  action,
} from 'mobx'
import * as Api from '../api'
import { ethers, provider } from '../api/ethersApi'
import { abi, address } from '../helpers/config'

const ContractApi = Api.ContractAPI
const Operator = Api.OperatorIPFS

const setterContract = (wallet) => {
  const ethersWallet = new ethers.Wallet(wallet.privateKey, provider)
  const contract = new ethers.Contract(address, abi, ethersWallet)
  return contract
}

class RecipeStore {
  @observable isAuthenticated = false
  @observable currentUser = null
  @observable matchPasswords = false
  @observable authenticating = false

  constructor(root) {
    this.rootStore = root
    if (this.rootStore.clientStore.wallet) {
      this.contractApi = new ContractApi(this.rootStore.clientStore.wallet.wallet)
    }
  }

  @action setContract() {
    this.contractApi = new ContractApi(this.rootStore.clientStore.wallet.wallet)
  }

  @action async getRecipeCount() {
    return ContractApi.getRecipeCount()
  }

  @action async addRecipe(data) {
    // string hash, string recipeType, string origin, uint amount
    const wallet = this.rootStore.clientStore.wallet
    const ethersWallet = new ethers.Wallet(wallet.privateKey, provider)
    // console.log(data, wallet, 'testeste')
    const contract = new ethers.Contract(address, abi, ethersWallet)
    const { ipfsHash, type, origin, amount } = data
    return await contract.addRecipe(ipfsHash, type, origin, amount)
  }

  @action async removeRecipe(index) {
    const contract = await this.getContractSetter()
    return await contract.deleteIndex(index)
  }

  @action async buySubscription(index) {
    const contract = await this.getContractSetter()
    return await contract.buySubscription(index)
  }

  @action async getRecipeAtIndex(index) {
    return await ContractApi.getSpecificIndexRecipe(index)
  }

  @action async buyRecipe(index) {
    // return await ContractApi.getSpecificIndexRecipe(index)
    const contract = await this.getContractSetter()
    var overrideOptions = {
      value: ethers.utils.parseEther('2.0')
    };
    return await contract.buySubscription(index,overrideOptions)
  }

  @action async upload(item) {
    return await Operator.uploadFile(item)
  }

  @action async cat(item) {
    return await Api.ipfs.cat('QmXrczi9fJhcmop4uWhKqXmfzba3MGrFw2TWXWoyQe95kY')
  }

  @action async isAllowedToViewPayableRecipe(index) {
    const contract = await this.getContractSetter()
    const isAllowed = await contract.isAllowedToView(index)
    return isAllowed
  }

  @action async getContractSetter() {
    const wallet = this.rootStore.clientStore.wallet
    const contract = setterContract(wallet)
    return contract
  }
}
// deleteIndex

export default RecipeStore