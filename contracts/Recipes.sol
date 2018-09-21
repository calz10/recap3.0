pragma solidity ^0.4.24;

contract Recipes {
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

    mapping (address => uint) balances;
    address private owner;
    mapping ( address => Recipe[]) usersTransactions;
    mapping(uint => Recipe) recipes;
    uint[] recipeIndexes;

    modifier isEqualAmount(uint index) {
        require(recipes[index].etherAmount == msg.value);
        _; 
    }
    
    modifier indexExist(uint _index) {
        require(_index < recipeIndexes.length);
        _;
    }
    
    modifier isRecipeOwner(uint _index) {
        require(recipes[_index].owner == msg.sender || owner == msg.sender);
        _;
    }

    modifier userTransactionIndexExist(uint index) {
        require(index < usersTransactions[msg.sender].length);
        _;
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
   
    function cashOut() public {
        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;
        msg.sender.transfer(amount);
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

    function getBalance() public view returns(uint balance) {
        return balances[msg.sender];
    } 

    function getRecipeCount() public view returns(uint) {
        return recipeIndexes.length;
    }
    
    function getRecipeIndexesAt(uint index) public view returns(uint) {
        return recipeIndexes[index];
    }

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
}