export const ABI = [
  {
    "type": "constructor",
    "name": "",
    "inputs": [],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "event",
    "name": "paymentAdded",
    "inputs": [
      {
        "type": "address",
        "name": "payer",
        "indexed": false,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "recever",
        "indexed": false,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "txnId",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "paymentSettled",
    "inputs": [
      {
        "type": "address",
        "name": "to",
        "indexed": false,
        "internalType": "address"
      },
      {
        "type": "address",
        "name": "from",
        "indexed": false,
        "internalType": "address"
      },
      {
        "type": "uint256",
        "name": "amount",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "state",
    "inputs": [
      {
        "type": "uint256",
        "name": "currentBalance",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "anonymous": false
  },
  {
    "type": "function",
    "name": "addFriend",
    "inputs": [
      {
        "type": "address",
        "name": "_address",
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "_name",
        "internalType": "string"
      },
      {
        "type": "address",
        "name": "_myAddress",
        "internalType": "address"
      },
      {
        "type": "string",
        "name": "_myName",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "addPayment",
    "inputs": [
      {
        "type": "address",
        "name": "payer",
        "internalType": "address"
      },
      {
        "type": "address[]",
        "name": "splitFor",
        "internalType": "address[]"
      },
      {
        "type": "uint256",
        "name": "amount",
        "internalType": "uint256"
      },
      {
        "type": "string",
        "name": "_message",
        "internalType": "string"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "payKeys",
    "inputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "outputs": [
      {
        "type": "uint256",
        "name": "",
        "internalType": "uint256"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "settel",
    "inputs": [
      {
        "type": "uint256",
        "name": "_id",
        "internalType": "uint256"
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "viewFriendship",
    "inputs": [
      {
        "type": "address",
        "name": "_check",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "",
        "components": [
          {
            "type": "address",
            "name": "_address",
            "internalType": "address"
          },
          {
            "type": "string",
            "name": "name",
            "internalType": "string"
          }
        ],
        "internalType": "struct CoinEaseOriginal.Person[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "viewGets",
    "inputs": [
      {
        "type": "address",
        "name": "_address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "uint256[]",
        "name": "",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "viewPayment",
    "inputs": [],
    "outputs": [
      {
        "type": "tuple[]",
        "name": "",
        "components": [
          {
            "type": "uint256",
            "name": "id",
            "internalType": "uint256"
          },
          {
            "type": "address",
            "name": "from",
            "internalType": "address"
          },
          {
            "type": "address",
            "name": "to",
            "internalType": "address"
          },
          {
            "type": "uint256",
            "name": "amount",
            "internalType": "uint256"
          },
          {
            "type": "string",
            "name": "message",
            "internalType": "string"
          },
          {
            "type": "bool",
            "name": "settled",
            "internalType": "bool"
          }
        ],
        "internalType": "struct CoinEaseOriginal.Pay[]"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "viewPays",
    "inputs": [
      {
        "type": "address",
        "name": "_address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "type": "uint256[]",
        "name": "",
        "internalType": "uint256[]"
      }
    ],
    "stateMutability": "view"
  }
];