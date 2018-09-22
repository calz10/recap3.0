import ethers from 'ethers';

class Wallet {
  constructor(privateKey) {
    if (privateKey) {
      this.wallet = new ethers.Wallet(privateKey)
    } else {
      this.wallet = new ethers.Wallet.createRandom()
    }
  }

  static async decryptWallet(jsonWallet, password) {
    const wallet = await new ethers.Wallet.fromEncryptedWallet(jsonWallet, password)
    return wallet
  }
}

export default Wallet;