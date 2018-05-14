/* eslint-disable */
export const QUARRY_ABI = [{
    'constant': true,
    'inputs': [{
      'name': 'name',
      'type': 'string'
    }],
    'name': 'isBoosterEntry',
    'outputs': [{
      'name': 'isIndeed',
      'type': 'bool'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [{
      'name': 'name',
      'type': 'string'
    }],
    'name': 'removeBooster',
    'outputs': [{
      'name': 'success',
      'type': 'bool'
    }],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [{
      'name': 'index',
      'type': 'uint256'
    }],
    'name': 'getBoosterAt',
    'outputs': [{
      'name': 'booster',
      'type': 'address'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [{
      'name': 'index',
      'type': 'uint256'
    }],
    'name': 'getBoosterTuple',
    'outputs': [{
        'name': 'name',
        'type': 'string'
      },
      {
        'name': 'booster',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'boosterSize',
    'outputs': [{
      'name': 'entityCount',
      'type': 'uint256'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [{
        'name': '_targetToken',
        'type': 'address'
      },
      {
        'name': '_mineableToken',
        'type': 'address'
      }
    ],
    'name': 'registerMineable',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [{
        'name': '_name',
        'type': 'string'
      },
      {
        'name': '_boosterAddress',
        'type': 'address'
      }
    ],
    'name': 'registerBooster',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [{
      'name': 'index',
      'type': 'uint256'
    }],
    'name': 'getMineableKeyAt',
    'outputs': [{
      'name': 'token',
      'type': 'address'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [{
      'name': 'name',
      'type': 'string'
    }],
    'name': 'getBooster',
    'outputs': [{
      'name': 'booster',
      'type': 'address'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [{
      'name': 'tokenAddress',
      'type': 'address'
    }],
    'name': 'isMineableEntry',
    'outputs': [{
      'name': 'isIndeed',
      'type': 'bool'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'mineableSize',
    'outputs': [{
      'name': 'entityCount',
      'type': 'uint256'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [{
        'name': 'a',
        'type': 'string'
      },
      {
        'name': 'b',
        'type': 'string'
      }
    ],
    'name': 'stringCompare',
    'outputs': [{
      'name': '',
      'type': 'bool'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [{
        'name': 'tokenAddress',
        'type': 'address'
      },
      {
        'name': 'mineable',
        'type': 'address'
      }
    ],
    'name': 'putMineable',
    'outputs': [{
      'name': 'success',
      'type': 'bool'
    }],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [{
      'name': 'index',
      'type': 'uint256'
    }],
    'name': 'getBoosterKeyAt',
    'outputs': [{
      'name': 'name',
      'type': 'string'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [{
      'name': 'tokenAddress',
      'type': 'address'
    }],
    'name': 'getMineable',
    'outputs': [{
      'name': 'mineable',
      'type': 'address'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [{
      'name': '_address',
      'type': 'address'
    }],
    'name': 'revoke',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [{
        'name': 'name',
        'type': 'string'
      },
      {
        'name': 'booster',
        'type': 'address'
      }
    ],
    'name': 'putBooster',
    'outputs': [{
      'name': 'success',
      'type': 'bool'
    }],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [{
      'name': 'index',
      'type': 'uint256'
    }],
    'name': 'getMineableAt',
    'outputs': [{
      'name': 'mineable',
      'type': 'address'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'DEFAULT_BOOSTER_NAME',
    'outputs': [{
      'name': '',
      'type': 'string'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'owner',
    'outputs': [{
      'name': '',
      'type': 'address'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'APPROVAL_CEILING',
    'outputs': [{
      'name': '',
      'type': 'uint256'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [{
        'name': 'name',
        'type': 'string'
      },
      {
        'name': 'booster',
        'type': 'address'
      }
    ],
    'name': 'updateBooster',
    'outputs': [{
      'name': 'success',
      'type': 'bool'
    }],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [{
        'name': 'tokenAddress',
        'type': 'address'
      },
      {
        'name': 'mineable',
        'type': 'address'
      }
    ],
    'name': 'updateMineable',
    'outputs': [{
      'name': 'success',
      'type': 'bool'
    }],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [{
      'name': 'tokenAddress',
      'type': 'address'
    }],
    'name': 'removeMineable',
    'outputs': [{
      'name': 'success',
      'type': 'bool'
    }],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [],
    'name': 'mithrilTokenAddress',
    'outputs': [{
      'name': '',
      'type': 'address'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [{
      'name': '',
      'type': 'uint256'
    }],
    'name': 'mineableKeyList',
    'outputs': [{
      'name': '',
      'type': 'address'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [{
      'name': '',
      'type': 'address'
    }],
    'name': 'allowed',
    'outputs': [{
      'name': '',
      'type': 'bool'
    }],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [{
        'name': 'tokenAddress',
        'type': 'address'
      },
      {
        'name': 'tokens',
        'type': 'uint256'
      }
    ],
    'name': 'transferAnyERC20Token',
    'outputs': [{
      'name': 'success',
      'type': 'bool'
    }],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [{
      'name': 'index',
      'type': 'uint256'
    }],
    'name': 'getMineableTuple',
    'outputs': [{
        'name': 'token',
        'type': 'address'
      },
      {
        'name': 'mineable',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [{
      'name': '_newOwner',
      'type': 'address'
    }],
    'name': 'transferOwnership',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'constant': true,
    'inputs': [{
      'name': '',
      'type': 'address'
    }],
    'name': 'mineableEntries',
    'outputs': [{
        'name': 'mineable',
        'type': 'address'
      },
      {
        'name': 'listPointer',
        'type': 'uint256'
      }
    ],
    'payable': false,
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'constant': false,
    'inputs': [{
      'name': '_address',
      'type': 'address'
    }],
    'name': 'allow',
    'outputs': [],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'function'
  },
  {
    'inputs': [{
        'name': '_boosterToken',
        'type': 'address'
      },
      {
        'name': '_mithrilTokenAddress',
        'type': 'address'
      }
    ],
    'payable': false,
    'stateMutability': 'nonpayable',
    'type': 'constructor'
  },
  {
    'anonymous': false,
    'inputs': [{
        'indexed': true,
        'name': 'from',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'tokenContract',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'newChallengeNumber',
        'type': 'bytes32'
      }
    ],
    'name': 'Mined',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [{
        'indexed': false,
        'name': 'tokenAddress',
        'type': 'address'
      },
      {
        'indexed': false,
        'name': 'tokenSymbol',
        'type': 'string'
      },
      {
        'indexed': false,
        'name': 'tokenName',
        'type': 'string'
      },
      {
        'indexed': false,
        'name': 'tokenDecimals',
        'type': 'uint8'
      },
      {
        'indexed': false,
        'name': 'initialReward',
        'type': 'uint256'
      }
    ],
    'name': 'TokenRegistered',
    'type': 'event'
  },
  {
    'anonymous': false,
    'inputs': [{
        'indexed': true,
        'name': '_from',
        'type': 'address'
      },
      {
        'indexed': true,
        'name': '_to',
        'type': 'address'
      }
    ],
    'name': 'OwnershipTransferred',
    'type': 'event'
  }
];
