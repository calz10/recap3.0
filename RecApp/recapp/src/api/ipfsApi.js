import IPFS from 'ipfs-api'

export const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

export const OperatorIPFS = {
  uploadFile: async (buffer) => {
    try {
      const result = await ipfs.add(buffer)
      return result[0].hash
    } catch (error) {
      return error
    }
  }
}