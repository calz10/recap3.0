export const abi =[
	{
		"constant": false,
		"inputs": [
			{
				"name": "hash",
				"type": "string"
			},
			{
				"name": "recipeType",
				"type": "string"
			},
			{
				"name": "origin",
				"type": "string"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "addRecipe",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "recipeIndex",
				"type": "uint256"
			}
		],
		"name": "allowUserToView",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "buySubscription",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "cashOut",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "deleteIndex",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getRecipeCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getRecipeIndexesAt",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "getSpecificIndexRecipe",
		"outputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"name": "recipeType",
				"type": "string"
			},
			{
				"name": "timeCreated",
				"type": "uint256"
			},
			{
				"name": "origin",
				"type": "string"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getUserTransactions",
		"outputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "ipfsHash",
				"type": "string"
			},
			{
				"name": "recipeType",
				"type": "string"
			},
			{
				"name": "timeCreated",
				"type": "uint256"
			},
			{
				"name": "origin",
				"type": "string"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "recipeIndex",
				"type": "uint256"
			}
		],
		"name": "isAllowedToView",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

export const address = '0xc7b4e34e519f9074b131d7cdbfac32a19ead5b93'