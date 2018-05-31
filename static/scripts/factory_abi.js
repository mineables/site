/* eslint-disable */
export const FACTORY_ABI = [
    {
      "constant": false,
      "inputs": [
        {
          "name": "_symbol",
          "type": "string"
        },
        {
          "name": "_name",
          "type": "string"
        },
        {
          "name": "_decimals",
          "type": "uint8"
        },
        {
          "name": "_supply",
          "type": "uint256"
        },
        {
          "name": "_reward",
          "type": "uint256"
        },
        {
          "name": "_adjustmentBlockCount",
          "type": "uint256"
        },
        {
          "name": "_initialDifficulty",
          "type": "uint256"
        },
        {
          "name": "_blockTimeInMinutes",
          "type": "uint256"
        }
      ],
      "name": "createMineable",
      "outputs": [
        {
          "name": "mineable",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "boosterAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "mithrilTokenAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "quarryAddress",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_quarryAddress",
          "type": "address"
        },
        {
          "name": "_mithrilTokenAddress",
          "type": "address"
        },
        {
          "name": "_boosterAddress",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "name": "tokenAddress",
          "type": "address"
        },
        {
          "indexed": false,
          "name": "symbol",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "name",
          "type": "string"
        },
        {
          "indexed": false,
          "name": "decimals",
          "type": "uint8"
        },
        {
          "indexed": false,
          "name": "supply",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "reward",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "adjustmentBlockCount",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "_initialDifficulty",
          "type": "uint256"
        },
        {
          "indexed": false,
          "name": "_blockTimeInMinutes",
          "type": "uint256"
        }
      ],
      "name": "MineableTokenCreated",
      "type": "event"
    }
  ];