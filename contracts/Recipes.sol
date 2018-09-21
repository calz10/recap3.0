pragma solidity ^0.4.24;

contract Recipes {
    struct Recipe {
        string ipfsHash;
        address owner;
        uint index;
        uint timeCreated;
        string recipeType;
        string origin;
        uint etherAmount;
        mapping ( address => bool) allowedToView;
    }

    mapping(uint => Recipe) recipes;
    mapping (address => uint) balances;
    mapping ( address => Recipe[]) usersTransactions;
    
    uint[] recipeIndexes;
    address private owner;

    modifier isRecipeOwner(uint _index) {
        require(recipes[_index].owner == msg.sender || owner == msg.sender);
        _;
    }

    modifier indexExist(uint _index) {
        require(_index < recipeIndexes.length);
        _;
    }

    modifier isEqualAmount(uint index) {
        require(recipes[index].etherAmount == msg.value, "Amount is not the same");
        _; 
    }

    function isAllowedToView(uint recipeIndex)  public view indexExist(recipeIndex) returns (bool) { 
        bytes32 restrictedKey = keccak256("payable");
        bytes32 dataType = keccak256(recipes[recipeIndex].recipeType);
        if (restrictedKey == dataType) {
            return recipes[recipeIndex].allowedToView[msg.sender];
        }
        return true;
    }

    function buySubscription(uint _index) public indexExist(_index) isEqualAmount(_index) payable {
        allowUserToView(_index);
        address ownerAddress =  recipes[_index].owner;
        balances[ownerAddress] += msg.value; 
    }

    function getBalance() public view returns(uint balance) {
        return balances[msg.sender];
    } 

    function cashOut() public {
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(amount);
    }

    function addRecipe(string hash, string recipeType, string origin, uint amount) public {
        recipes[recipeIndexes.length].owner = msg.sender;
        recipes[recipeIndexes.length].ipfsHash = hash;
        recipes[recipeIndexes.length].index = recipeIndexes.length;
        recipes[recipeIndexes.length].recipeType = recipeType;
        recipes[recipeIndexes.length].origin = origin;
        recipes[recipeIndexes.length].timeCreated = now;
        recipes[recipeIndexes.length].etherAmount = amount * (10 ** 18);
        recipes[recipeIndexes.length].allowedToView[msg.sender] = true;
        recipeIndexes.push(recipeIndexes.length);
    }

    function allowUserToView(uint recipeIndex) public {
        recipes[recipeIndex].allowedToView[msg.sender] = true;
        usersTransactions[msg.sender].push(recipes[recipeIndex]);
    }

    function getRecipeCount() public view returns(uint) {
        return recipeIndexes.length;
    }

    modifier userTransactionIndexExist(uint index) {
        require(index < usersTransactions[msg.sender].length, "Index doesnt exist");
        _;
    }

    function getUserTransactions(uint _index) public view userTransactionIndexExist(_index) 
        returns (address owner, string ipfsHash, string recipeType, uint timeCreated, string origin, uint amount) 
    {
        Recipe memory recipe = recipes[_index];
        return (
            recipe.owner,
            recipe.ipfsHash,
            recipe.recipeType,
            recipe.timeCreated,
            recipe.origin,
            recipe.etherAmount
        );
    }

    function getSpecificIndexRecipe(uint index) public view indexExist(index) 
    returns(address owner, string ipfsHash, string recipeType, uint timeCreated, string origin, uint amount) 
    {
        return (
            recipes[index].owner,
            recipes[index].ipfsHash,
            recipes[index].recipeType,
            recipes[index].timeCreated,
            recipes[index].origin,
            recipes[index].etherAmount
        );
    }

    function getRecipeIndexesAt(uint index) public view returns(uint) {
        return recipeIndexes[index];
    }

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
}