const Recipes = artifacts.require("./Recipes.sol")

module.exports = function(deployer) {
  deployer.deploy(Recipes)
}
