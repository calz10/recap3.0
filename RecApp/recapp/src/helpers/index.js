import crypto from 'crypto-js'

const Helpers = {
    encryptToSecure: (data, password) => crypto.AES.encrypt(data, password)
}