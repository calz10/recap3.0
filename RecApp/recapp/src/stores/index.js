import AuthStore from './AuthenticationStore'
import ClientStore from './ClientStore'

class RootStore {
  constructor() {
    this.authStore = new AuthStore(this)
    this.clientStore = new ClientStore(this)
  }
}
export default RootStore