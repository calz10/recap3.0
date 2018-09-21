const Recipes = artifacts.require("./Recipes.sol");

contract("Recipes", async (accounts) => {
    let recipeInstance

    beforeEach('setup contract for each test', async () =>  {
        recipeInstance = await Recipes.deployed()
    })

    it("should have recipe count of contract initially zero", async () => {
        const recipesLength = await recipeInstance.getRecipeCount()|| 0;
        assert.equal(recipesLength, 0 , 'expected length not match');
    });
    
    it("should add item and increase the recipe size contract to one", async () => {
        await recipeInstance.addRecipe('testHash','free', 'Philippines',1, { from: accounts[0] })

        const recipesLength = await recipeInstance.getRecipeCount() || 0;
        assert.equal(recipesLength, 1 , 'The recipe count of contract should be now 1 value');
    });

    it('should have given sample values at index 0', async() => {
        const [owner, ipfsHash, recipeType, timeCreated, origin] = await recipeInstance.getSpecificIndexRecipe(0)
        assert.equal(ipfsHash, 'testHash', 'equal to free')
        assert.equal(owner, accounts[0], 'should have the same owner')
        assert.equal(recipeType, 'free', 'Type should have type of free')
        assert.equal(origin, 'Philippines', 'Type should have origin of Philippines')   
    })

    it('should test the type of recipe', async() => {
        
        await recipeInstance.addRecipe('testHash2','payable', 'Philippines',1,{ from: accounts[0] })
        const [_, _x,recipeType] = await recipeInstance.getSpecificIndexRecipe(1)
        assert.equal(recipeType, 'payable', 'is equal to payable')
    })

    it('should return false that user is not allowed to view full recipe', async() => {
        const allowed = await recipeInstance.isAllowedToView(1, {from: accounts[1]})
        assert.isFalse(allowed, 'test faultness')
    })

    it('should validate that user was allowed to view full payable recipe', async() => {
        await recipeInstance.allowUserToView(1, {from: accounts[1]})
        const allowed = await recipeInstance.isAllowedToView(1,{from: accounts[1]})
        assert.isTrue(allowed, 'test truthness')
    })

    it('should register multiple recipe and get count with current count of 5', async() => {
        await recipeInstance.addRecipe('testHash3','payable', 'Philippines',1, { from: accounts[0] })
        await recipeInstance.addRecipe('testHash4','payable', 'Philippines',1, { from: accounts[0] })
        await recipeInstance.addRecipe('testHash5','payable', 'Philippines',1, { from: accounts[0] })
        const count = await recipeInstance.getRecipeCount()
        assert.equal(count, 5, 'count is not equal with expected count')
    })

    it('should delete specific recipe given the index at 1', async  () => {
        await recipeInstance.deleteIndex(1)
        const count = await recipeInstance.getRecipeCount()
        assert.equal(count, 4, 'count is not equal with expected count')
    })

    it('should replace the deleted index with the last push recipe value', async () => {
        const [owner, ipfsHash, recipeType, timeCreated, origin] = await recipeInstance.getSpecificIndexRecipe(1)
        assert.equal(ipfsHash, 'testHash5', 'hashes did not match');
    })

    it('should allow adding after deleting value at element', async() => {
        await recipeInstance.addRecipe('testHash6','payable', 'Philippines',1, { from: accounts[0] })
        const count = await recipeInstance.getRecipeCount()
        assert.equal(count, 5, 'count is not equal with expected count')
    })
});
