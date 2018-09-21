import {
    observable, 
    action,
    // computed
} from 'mobx'

export const AuthAPI  = {
    login: async (email, password) => {
        return { auth: true, user: { firstname : 'caldz'} }
    }
}

class AuthenticationStore {
    @observable isAuthenticated = false
    @observable currentUser = {}
    @observable matchPasswords = false

    constructor(root, ) {
        this.rootStore = root
        this.authApi = AuthAPI
    }

    @action async login(authData) {
        const {email, password, repassword} = authData
        if(password !== repassword) {
            throw new Error('Password did not match!')
        }
        const { auth, user}  = await this.authApi.login(email,password)
        this.isAuthenticated = auth
        this.currentUser = user
        return this.currentUser
    }
}

export default AuthenticationStore