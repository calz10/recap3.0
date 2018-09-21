import AuthStore from './AuthenticationStore'

class RootStore {
    constructor() {
        this.boolean = true
        this.authStore = new AuthStore(this)
    }
}
export default RootStore