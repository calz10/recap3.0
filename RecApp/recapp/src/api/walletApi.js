import { ethers, provider } from './ethersApi'

export class Wallet {
  constructor(privateKey) {
    if (privateKey) {
      this.wallet = new ethers.Wallet(privateKey)
    } else {
      this.wallet = new ethers.Wallet.createRandom()
    }
    this.provider = provider
  }

  async getBalance(address) {
    if (!address) {
      return this.getFormatedBalance(this.wallet.address)
    }
    return this.getFormatedBalance(address)
  }
  
  async getFormatedBalance(address) {
    const initialValue = await this.provider.getBalance(address);
    return ethers.utils.formatEther(initialValue);
  }
}
