import AuthStore from './AuthenticationStore'

class RootStore {
    constructor() {
        this.authStore = new AuthStore(this)
    }
}
export default RootStore