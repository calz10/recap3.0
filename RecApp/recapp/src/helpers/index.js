import crypto from 'crypto-js'

const helpers = {
    encryptToSecure: (data, password) => crypto.AES.encrypt(data, password),
    decryptFromSecure: (data, password) => {
        const decrypted = crypto.AES.decrypt(data,password).toString(crypto.enc.Utf8)
        return decrypted
    }
}
export default helpers