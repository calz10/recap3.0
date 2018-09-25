import AuthStore from './AuthenticationStore'
import ClientStore from './ClientStore'
import RecipeStore from './RecipeStore'

class RootStore {
  constructor() {
    this.authStore = new AuthStore(this)
    this.clientStore = new ClientStore(this)
    this.clientStore = new ClientStore(this)
    this.recipeStore = new RecipeStore(this)
  }
}
export default RootStore