import {
  observable,
  action,
} from 'mobx'
import * as Api from '../api'
import { ethers, provider } from '../api/ethersApi'
import { abi, address } from '../helpers/config'
import axios from 'axios'

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
  @observable contractBalance = 0
  @observable hasRetrieved = false
  @observable data = []
  @observable origins = []
  @observable transactionOnProgress = false

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
    console.log(data, wallet, 'testeste')
    const contract = new ethers.Contract(address, abi, ethersWallet)
    const { ipfsHash, type, origin, amount } = data
    const result =  await contract.addRecipe(ipfsHash, type, origin, amount)
    await this.rootStore.retrieveTransactionStatus(result.hash, 'Adding Recipe Success')
  }

  @action async removeRecipe(index) {
    try {
      this.removeData(index)
      const contract = await this.getContractSetter()
      this.rootStore.changeTransactionProgress()
      const result =  await contract.deleteIndex(index)
      await this.rootStore.retrieveTransactionStatus(result.hash, 'Successfuly removed Recipe')
    } catch (error) {
      return error
    }
  }

  @action removeData(index) {
    this.data = this.data.filter((val,i) => i !== index)
  }

  @action async buySubscription(index) {
    const contract = await this.getContractSetter()
    return await contract.buySubscription(index)
  }

  @action async getRecipeAtIndex(index) {
    return await ContractApi.getSpecificIndexRecipe(index)
  }

  @action async buyRecipe(index ,price ) {
    // return await ContractApi.getSpecificIndexRecipe(index)
    const contract = await this.getContractSetter()
    var overrideOptions = {
      value: ethers.utils.parseEther(`${price}`)
    };
    const result = await contract.buySubscription(index, overrideOptions)
    await this.rootStore.retrieveTransactionStatus(result.hash, 'Bought Recipe Successfully')
  }

  @action async upload(item) {
    return await Operator.uploadFile(item)
  }

  @action async viewContractWalletBalance() {
    const contract = await this.getContractSetter()
    const balance = await contract.getBalance()
    const ethAmount = ethers.utils.formatEther(balance)
    this.contractBalance = ethAmount
    console.log(this.contractBalance, 'eth')
    return this.contractBalance
  }

  @action async cashOut() {
    const contract = await this.getContractSetter()
    const balance = await contract.cashOut()
    await this.rootStore.retrieveTransactionStatus(balance.hash, 'Successfully Withdraw')
    await this.viewContractWalletBalance()
    
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

  @action filterOrigin(org) {
    const data = this.data.filter((item) => item.origin === org)
    return data
  }
  @action async getData() {
    try {
      const count = await this.getRecipeCount()
      const number = count.toNumber()
      const data = []
      let origins
      for (let index = 0; index < number; index++) {
        const [owner, ipfsHash, recipeType, timeCreated, origin, amount] = await this.getRecipeAtIndex(index)
        let isAllowed = false
        if (recipeType === 'payable' && this.rootStore.clientStore.wallet) {
          isAllowed = await this.isAllowedToViewPayableRecipe(index)
        }

        if(recipeType === 'free') {
          isAllowed = true
        }
        const ipfsObject = await axios.get(`https://gateway.ipfs.io/ipfs/${ipfsHash}`)
        const ethAmount = ethers.utils.formatEther(amount)
        const value = { owner, ipfsHash, isAllowed, recipeType, timeCreated: timeCreated.toNumber(), ethAmount, origin, ...ipfsObject.data }

        origins = new Set([...origins, origin])
        data.push(value)
      }
      this.hasRetrieved = true
      this.data = data
      this.origins = [...origins]
    } catch (error) {
      return new Error('Error message')
    }
  }
}
// deleteIndex

export default RecipeStore