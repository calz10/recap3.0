pragma solidity ^0.4.24;

contract Recipes {
  /**
    Struct Recipe, object that contains field for
    recipe item and important informations
   */
    struct Recipe {
        mapping ( address => bool) allowedToView;
        uint etherAmount;
        uint index;
        string ipfsHash;
        string recipeType;
        string origin;
        address owner;
        uint timeCreated;
    }
    /**
      balancees mapping, contains the current balance
      of the user in the contract, given the address of user
    */
    mapping (address => uint) balances;
    /** owner of the contract and the one who deployed */
    address private owner;
    /** containers the usersTransactions, which includes its bought recipe given the address */
    mapping ( address => Recipe[]) usersTransactions;
    /** mapping of recipe given the index, it will return specific recipe */
    mapping(uint => Recipe) recipes;
    /** array of uint indexes of the current recipe mapping */
    uint[] recipeIndexes;


    /** 
      modifier that checks if the index exist in recipe array
     */
    modifier indexExist(uint _index) {
        require(_index < recipeIndexes.length);
        _;
    }
    /**
      Is a modifier that will check is the amount given by the user
      equals to the price of the recipe. 
      @params index, will get the recipe and validate the amount
     */
    modifier isEqualAmount(uint index) {
        require(recipes[index].etherAmount == msg.value);
        _; 
    }
    /** checks if the current user if recipe owner of specific index*/
    modifier isRecipeOwner(uint _index) {
        require(recipes[_index].owner == msg.sender || owner == msg.sender);
        _;
    }
    /** check if users transactions at index exist  */
    modifier userTransactionIndexExist(uint index) {
        require(index < usersTransactions[msg.sender].length);
        _;
    }
    /** 
      Add Recipe, functions that will add recipe in the current contract
      this will be use of the user and be the heart of the contract
     */
    function addRecipe(string hash, string recipeType, string origin, uint amount) public {
        Recipe storage recipe = recipes[recipeIndexes.length];
        recipe.owner = msg.sender;
        recipe.ipfsHash = hash;
        recipe.index = recipeIndexes.length;
        recipe.recipeType = recipeType;
        recipe.origin = origin;
        recipe.timeCreated = now;
        recipe.etherAmount = amount;
        recipe.allowedToView[msg.sender] = true;
        recipes[recipeIndexes.length] = recipe;
        recipeIndexes.push(recipeIndexes.length);
    }
    /** this sets the user to allow to view payable functions at specific index recipe */
    function allowUserToView(uint recipeIndex) public {
        recipes[recipeIndex].allowedToView[msg.sender] = true;
        usersTransactions[msg.sender].push(recipes[recipeIndex]);
    }
    
    /** 
      getter function that will return boolean 
      either the user is allowed to view at specific
      index given
     */
    function isAllowedToView(uint recipeIndex)  public view indexExist(recipeIndex) returns (bool) { 
        bytes32 restrictedKey = keccak256("payable");
        bytes32 dataType = keccak256(recipes[recipeIndex].recipeType);
        if (restrictedKey == dataType) {
            return recipes[recipeIndex].allowedToView[msg.sender];
        }
        return true;
    }
    /**
      functions that will allow user to buy the payable recipe,
      and will first check if @params index exist in the recipe and
      the amount is equal to the price.
     */
    function buySubscription(uint _index) public indexExist(_index) isEqualAmount(_index) payable {
        allowUserToView(_index);
        address ownerAddress =  recipes[_index].owner;
        balances[ownerAddress] += msg.value; 
    }
   
    /** allows users to withdraw current balance in the contract */
    function cashOut() public {
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(amount);
    }
    /** delete recipe in specific index and check if owner of recipe and index exist else revert */
    function deleteIndex(uint index) public indexExist(index) isRecipeOwner(index) {
        uint lastIndex = recipeIndexes.length - 1;
        uint currentIndexValue = recipeIndexes[index];
        uint lastIndexValue = recipeIndexes[lastIndex];
        recipeIndexes[index] = lastIndexValue;
        recipeIndexes[lastIndex] = currentIndexValue;
        recipeIndexes.length--;
        recipes[index] = recipes[lastIndex];
        delete recipes[lastIndex];
    }
    /** get balance of the user in the current contract */
    function getBalance() public view returns(uint balance) {
        return balances[msg.sender];
    } 
    /** get current recipe count registered in contract */
    function getRecipeCount() public view returns(uint) {
        return recipeIndexes.length;
    }
    /** get recipe index at indexes */
    function getRecipeIndexesAt(uint index) public view returns(uint) {
        return recipeIndexes[index];
    }
    /** getter of recipe at index and will return the values of recipe */
    function getSpecificIndexRecipe(uint index) public view indexExist(index) 
        returns(
            address owner, 
            string ipfsHash, 
            string recipeType, 
            uint timeCreated, 
            string origin, 
            uint amount
        ) {
            return (
                recipes[index].owner,
                recipes[index].ipfsHash,
                recipes[index].recipeType,
                recipes[index].timeCreated,
                recipes[index].origin,
                recipes[index].etherAmount
            );
    }
    
    /** Should trigger when called and get the user  transaction by index as params */
    function getUserTransactions(uint _index) public view userTransactionIndexExist(_index) 
        returns (address owner, string ipfsHash, string recipeType, uint timeCreated, string origin, uint amount) 
    {
        Recipe memory recipe = usersTransactions[msg.sender][_index];
        return (
            recipe.owner,
            recipe.ipfsHash,
            recipe.recipeType,
            recipe.timeCreated,
            recipe.origin,
            recipe.etherAmount
        );
    }
    /** get user transaction length  */
    function getUserTransactionsLength() public view returns (uint) {
      return usersTransactions[msg.sender].length;
    }
}