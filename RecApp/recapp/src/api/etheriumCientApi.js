import { ethers, provider } from './ethersApi'


export class EtheriumClient {
  static async encrypWallet(wallet, password) {
    return await wallet.encrypt(password)
  }

  static async decryptWallet(jsonWallet, password) {
    const decryptedWallet = await new ethers.Wallet.fromEncryptedWallet(jsonWallet, password)
    return decryptedWallet
  }

  static openFromMnemonic(mnemonic) {
    return ethers.Wallet.fromMnemonic(mnemonic)
  }
}
