import { ethers, provider } from './ethersApi'
import { abi, address } from '../helpers/config'


export class ContractAPI {

  getSetterContract(wallet) {
    return new ethers.Contract(address, abi, wallet)
  }

  getGetterContract() {
    return new ethers.Contract(address, abi, provider)
  }

  static async getRecipeCount() {
    const contract = new ContractAPI().getGetterContract()
    return contract.getRecipeCount()
  }

  static async getSpecificIndexRecipe(index) {
    const contract = new ContractAPI().getGetterContract()
    return contract.getSpecificIndexRecipe(index)
  }

  // string hash, string recipeType, string origin, uint amount
  static async addRecipe(wallet, data) {
    const contract = new ContractAPI().getSetterContract(wallet)
    const { ipfsHash, type, origin, amount } = data
    return await contract.addRecipe(ipfsHash, type, origin, amount)
  }
}
