

  App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3:  () => {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
  
    }
    else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: async () => {

    var address = '0x92F8786Ca4BC530baA35bea19bfAa8028A84693E';
  
    // $.getJSON("Election.json", (election) => {
    //   // Instantiate a new truffle contract from the artifact
    const election = {
  "contractName": "Election",
  "abi": [
    {
      "constant": true,
      "inputs": [],
      "name": "candidatesCount",
      "outputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x2d35a8a2"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "name": "id",
          "type": "uint256"
        },
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "voteCount",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0x3477ee2e"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "name": "voters",
      "outputs": [
        {
          "name": "",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function",
      "signature": "0xa3ec138d"
    },
    {
      "inputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor",
      "signature": "constructor"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_candidateId",
          "type": "uint256"
        }
      ],
      "name": "vote",
      "outputs": [],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function",
      "signature": "0x0121b93f"
    }
  ],
  "bytecode": "0x608060405234801561001057600080fd5b5061005e6040805190810160405280600b81526020017f43616e64696461746520310000000000000000000000000000000000000000008152506100b0640100000000026401000000009004565b6100ab6040805190810160405280600b81526020017f43616e64696461746520320000000000000000000000000000000000000000008152506100b0640100000000026401000000009004565b6101d2565b6002600081548092919060010191905055506060604051908101604052806002548152602001828152602001600081525060016000600254815260200190815260200160002060008201518160000155602082015181600101908051906020019061011c92919061012d565b506040820151816002015590505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061016e57805160ff191683800117855561019c565b8280016001018555821561019c579182015b8281111561019b578251825591602001919060010190610180565b5b5090506101a991906101ad565b5090565b6101cf91905b808211156101cb5760008160009055506001016101b3565b5090565b90565b610401806101e16000396000f3fe608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630121b93f146100675780632d35a8a2146100a25780633477ee2e146100cd578063a3ec138d1461018f575b600080fd5b34801561007357600080fd5b506100a06004803603602081101561008a57600080fd5b81019080803590602001909291905050506101f8565b005b3480156100ae57600080fd5b506100b76102ed565b6040518082815260200191505060405180910390f35b3480156100d957600080fd5b50610106600480360360208110156100f057600080fd5b81019080803590602001909291905050506102f3565b6040518084815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b83811015610152578082015181840152602081019050610137565b50505050905090810190601f16801561017f5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b34801561019b57600080fd5b506101de600480360360208110156101b257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506103b5565b604051808215151515815260200191505060405180910390f35b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615151561025057600080fd5b60008111801561026257506002548111155b151561026d57600080fd5b60016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600160008281526020019081526020016000206002016000815480929190600101919050555050565b60025481565b6001602052806000526040600020600091509050806000015490806001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103a55780601f1061037a576101008083540402835291602001916103a5565b820191906000526020600020905b81548152906001019060200180831161038857829003601f168201915b5050505050908060020154905083565b60006020528060005260406000206000915054906101000a900460ff168156fea165627a7a7230582008e4cc2b785bfc22be7f529b52dd5366f3d9b7fad97395621dab2f58018edf250029",
  "deployedBytecode": "0x608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630121b93f146100675780632d35a8a2146100a25780633477ee2e146100cd578063a3ec138d1461018f575b600080fd5b34801561007357600080fd5b506100a06004803603602081101561008a57600080fd5b81019080803590602001909291905050506101f8565b005b3480156100ae57600080fd5b506100b76102ed565b6040518082815260200191505060405180910390f35b3480156100d957600080fd5b50610106600480360360208110156100f057600080fd5b81019080803590602001909291905050506102f3565b6040518084815260200180602001838152602001828103825284818151815260200191508051906020019080838360005b83811015610152578082015181840152602081019050610137565b50505050905090810190601f16801561017f5780820380516001836020036101000a031916815260200191505b5094505050505060405180910390f35b34801561019b57600080fd5b506101de600480360360208110156101b257600080fd5b81019080803573ffffffffffffffffffffffffffffffffffffffff1690602001909291905050506103b5565b604051808215151515815260200191505060405180910390f35b6000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff1615151561025057600080fd5b60008111801561026257506002548111155b151561026d57600080fd5b60016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908315150217905550600160008281526020019081526020016000206002016000815480929190600101919050555050565b60025481565b6001602052806000526040600020600091509050806000015490806001018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103a55780601f1061037a576101008083540402835291602001916103a5565b820191906000526020600020905b81548152906001019060200180831161038857829003601f168201915b5050505050908060020154905083565b60006020528060005260406000206000915054906101000a900460ff168156fea165627a7a7230582008e4cc2b785bfc22be7f529b52dd5366f3d9b7fad97395621dab2f58018edf250029",
  "sourceMap": "27:926:0:-;;;368:105;8:9:-1;5:2;;;30:1;27;20:12;5:2;368:105:0;400:27;;;;;;;;;;;;;;;;;;;:12;;;:27;;;:::i;:::-;438;;;;;;;;;;;;;;;;;;;:12;;;:27;;;:::i;:::-;27:926;;487:162;549:15;;:17;;;;;;;;;;;;;607:34;;;;;;;;;617:15;;607:34;;;;633:5;607:34;;;;639:1;607:34;;;577:10;:27;588:15;;577:27;;;;;;;;;;;:64;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;487:162;:::o;27:926::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;:::-;;;;;;;",
  "deployedSourceMap": "27:926:0:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;655:293;;8:9:-1;5:2;;;30:1;27;20:12;5:2;655:293:0;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;655:293:0;;;;;;;;;;;;;;;;;;;;315:27;;8:9:-1;5:2;;;30:1;27;20:12;5:2;315:27:0;;;;;;;;;;;;;;;;;;;;;;;265:43;;8:9:-1;5:2;;;30:1;27;20:12;5:2;265:43:0;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;265:43:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;23:1:-1;8:100;33:3;30:1;27:10;8:100;;;99:1;94:3;90:11;84:18;80:1;75:3;71:11;64:39;52:2;49:1;45:10;40:15;;8:100;;;12:14;265:43:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;221:37;;8:9:-1;5:2;;;30:1;27;20:12;5:2;221:37:0;;;;;;13:2:-1;8:3;5:11;2:2;;;29:1;26;19:12;2:2;221:37:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;655:293;716:6;:18;723:10;716:18;;;;;;;;;;;;;;;;;;;;;;;;;715:19;707:28;;;;;;;;809:1;794:12;:16;:51;;;;;830:15;;814:12;:31;;794:51;786:60;;;;;;;;878:4;857:6;:18;864:10;857:18;;;;;;;;;;;;;;;;:25;;;;;;;;;;;;;;;;;;903:10;:24;914:12;903:24;;;;;;;;;;;:34;;;:36;;;;;;;;;;;;;655:293;:::o;315:27::-;;;;:::o;265:43::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::o;221:37::-;;;;;;;;;;;;;;;;;;;;;;:::o",
  "source": "pragma solidity ^0.5.0;\r\n\r\ncontract Election {\r\n    //Model a Candidate\r\n    struct Candidate {\r\n        uint id;\r\n        string name;\r\n        uint voteCount;\r\n    }\r\n    //Store Candidates \r\n    //Fetch Candidate\r\n    mapping(address =>bool) public voters;\r\n    mapping(uint =>Candidate) public candidates;\r\n    uint public candidatesCount;\r\n    //Constructor\r\n    constructor() public {\r\n        addCandidate(\"Candidate 1\");\r\n        addCandidate(\"Candidate 2\");\r\n    }      \r\n\r\n    function addCandidate(string memory _name) private {\r\n        candidatesCount++;\r\n        candidates[candidatesCount] = Candidate(candidatesCount,_name,0);\r\n    }\r\n    function vote(uint _candidateId) public {\r\n         require(!voters[msg.sender]);\r\n\r\n        // require a valid candidate\r\n        require(_candidateId > 0 && _candidateId <= candidatesCount);\r\n        voters[msg.sender] = true;\r\n        \r\n        candidates[_candidateId].voteCount++; \r\n    }\r\n\r\n}",
  "sourcePath": "C:/Users/DELL PC/Desktop/Consensys/S-Dapp/S-Dapp/contracts/Election.sol",
  "ast": {
    "absolutePath": "/C/Users/DELL PC/Desktop/Consensys/S-Dapp/S-Dapp/contracts/Election.sol",
    "exportedSymbols": {
      "Election": [
        87
      ]
    },
    "id": 88,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1,
        "literals": [
          "solidity",
          "^",
          "0.5",
          ".0"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:0"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 87,
        "linearizedBaseContracts": [
          87
        ],
        "name": "Election",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "Election.Candidate",
            "id": 8,
            "members": [
              {
                "constant": false,
                "id": 3,
                "name": "id",
                "nodeType": "VariableDeclaration",
                "scope": 8,
                "src": "105:7:0",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2,
                  "name": "uint",
                  "nodeType": "ElementaryTypeName",
                  "src": "105:4:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 5,
                "name": "name",
                "nodeType": "VariableDeclaration",
                "scope": 8,
                "src": "123:11:0",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_string_storage_ptr",
                  "typeString": "string"
                },
                "typeName": {
                  "id": 4,
                  "name": "string",
                  "nodeType": "ElementaryTypeName",
                  "src": "123:6:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_storage_ptr",
                    "typeString": "string"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 7,
                "name": "voteCount",
                "nodeType": "VariableDeclaration",
                "scope": 8,
                "src": "145:14:0",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 6,
                  "name": "uint",
                  "nodeType": "ElementaryTypeName",
                  "src": "145:4:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "Candidate",
            "nodeType": "StructDefinition",
            "scope": 87,
            "src": "77:90:0",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 12,
            "name": "voters",
            "nodeType": "VariableDeclaration",
            "scope": 87,
            "src": "221:37:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
              "typeString": "mapping(address => bool)"
            },
            "typeName": {
              "id": 11,
              "keyType": {
                "id": 9,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "229:7:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "221:23:0",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                "typeString": "mapping(address => bool)"
              },
              "valueType": {
                "id": 10,
                "name": "bool",
                "nodeType": "ElementaryTypeName",
                "src": "239:4:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_bool",
                  "typeString": "bool"
                }
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 16,
            "name": "candidates",
            "nodeType": "VariableDeclaration",
            "scope": 87,
            "src": "265:43:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Candidate_$8_storage_$",
              "typeString": "mapping(uint256 => struct Election.Candidate)"
            },
            "typeName": {
              "id": 15,
              "keyType": {
                "id": 13,
                "name": "uint",
                "nodeType": "ElementaryTypeName",
                "src": "273:4:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "nodeType": "Mapping",
              "src": "265:25:0",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Candidate_$8_storage_$",
                "typeString": "mapping(uint256 => struct Election.Candidate)"
              },
              "valueType": {
                "contractScope": null,
                "id": 14,
                "name": "Candidate",
                "nodeType": "UserDefinedTypeName",
                "referencedDeclaration": 8,
                "src": "280:9:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_Candidate_$8_storage_ptr",
                  "typeString": "struct Election.Candidate"
                }
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 18,
            "name": "candidatesCount",
            "nodeType": "VariableDeclaration",
            "scope": 87,
            "src": "315:27:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 17,
              "name": "uint",
              "nodeType": "ElementaryTypeName",
              "src": "315:4:0",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 29,
              "nodeType": "Block",
              "src": "389:84:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "43616e6469646174652031",
                        "id": 22,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "413:13:0",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_41f9dcbd43e9b33194759b5a51b1df9864cdc2b2138ff106f03091eb79861f0c",
                          "typeString": "literal_string \"Candidate 1\""
                        },
                        "value": "Candidate 1"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_stringliteral_41f9dcbd43e9b33194759b5a51b1df9864cdc2b2138ff106f03091eb79861f0c",
                          "typeString": "literal_string \"Candidate 1\""
                        }
                      ],
                      "id": 21,
                      "name": "addCandidate",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 49,
                      "src": "400:12:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (string memory)"
                      }
                    },
                    "id": 23,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "400:27:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 24,
                  "nodeType": "ExpressionStatement",
                  "src": "400:27:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "43616e6469646174652032",
                        "id": 26,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "451:13:0",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_f1f17440f69835dafba5c9fd0e4caa6c780807a80f8d1745ec7af1408d6cca4a",
                          "typeString": "literal_string \"Candidate 2\""
                        },
                        "value": "Candidate 2"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_stringliteral_f1f17440f69835dafba5c9fd0e4caa6c780807a80f8d1745ec7af1408d6cca4a",
                          "typeString": "literal_string \"Candidate 2\""
                        }
                      ],
                      "id": 25,
                      "name": "addCandidate",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 49,
                      "src": "438:12:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (string memory)"
                      }
                    },
                    "id": 27,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "438:27:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 28,
                  "nodeType": "ExpressionStatement",
                  "src": "438:27:0"
                }
              ]
            },
            "documentation": null,
            "id": 30,
            "implemented": true,
            "kind": "constructor",
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 19,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "379:2:0"
            },
            "returnParameters": {
              "id": 20,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "389:0:0"
            },
            "scope": 87,
            "src": "368:105:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 48,
              "nodeType": "Block",
              "src": "538:111:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 36,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "++",
                    "prefix": false,
                    "src": "549:17:0",
                    "subExpression": {
                      "argumentTypes": null,
                      "id": 35,
                      "name": "candidatesCount",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 18,
                      "src": "549:15:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 37,
                  "nodeType": "ExpressionStatement",
                  "src": "549:17:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 46,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 38,
                        "name": "candidates",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 16,
                        "src": "577:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Candidate_$8_storage_$",
                          "typeString": "mapping(uint256 => struct Election.Candidate storage ref)"
                        }
                      },
                      "id": 40,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 39,
                        "name": "candidatesCount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 18,
                        "src": "588:15:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "577:27:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Candidate_$8_storage",
                        "typeString": "struct Election.Candidate storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 42,
                          "name": "candidatesCount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 18,
                          "src": "617:15:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 43,
                          "name": "_name",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 32,
                          "src": "633:5:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 44,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "639:1:0",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string memory"
                          },
                          {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          }
                        ],
                        "id": 41,
                        "name": "Candidate",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8,
                        "src": "607:9:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_struct$_Candidate_$8_storage_ptr_$",
                          "typeString": "type(struct Election.Candidate storage pointer)"
                        }
                      },
                      "id": 45,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "structConstructorCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "607:34:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Candidate_$8_memory",
                        "typeString": "struct Election.Candidate memory"
                      }
                    },
                    "src": "577:64:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Candidate_$8_storage",
                      "typeString": "struct Election.Candidate storage ref"
                    }
                  },
                  "id": 47,
                  "nodeType": "ExpressionStatement",
                  "src": "577:64:0"
                }
              ]
            },
            "documentation": null,
            "id": 49,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "addCandidate",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 33,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 32,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 49,
                  "src": "509:19:0",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 31,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:6:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "508:21:0"
            },
            "returnParameters": {
              "id": 34,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "538:0:0"
            },
            "scope": 87,
            "src": "487:162:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 85,
              "nodeType": "Block",
              "src": "695:253:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 59,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "UnaryOperation",
                        "operator": "!",
                        "prefix": true,
                        "src": "715:19:0",
                        "subExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 55,
                            "name": "voters",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 12,
                            "src": "716:6:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                              "typeString": "mapping(address => bool)"
                            }
                          },
                          "id": 58,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 56,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 159,
                              "src": "723:3:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 57,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "723:10:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address_payable",
                              "typeString": "address payable"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "716:18:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 54,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        162,
                        163
                      ],
                      "referencedDeclaration": 162,
                      "src": "707:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 60,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "707:28:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 61,
                  "nodeType": "ExpressionStatement",
                  "src": "707:28:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "id": 69,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 65,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 63,
                            "name": "_candidateId",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 51,
                            "src": "794:12:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">",
                          "rightExpression": {
                            "argumentTypes": null,
                            "hexValue": "30",
                            "id": 64,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "809:1:0",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "794:16:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "&&",
                        "rightExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 68,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 66,
                            "name": "_candidateId",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 51,
                            "src": "814:12:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "<=",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 67,
                            "name": "candidatesCount",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 18,
                            "src": "830:15:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "814:31:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "src": "794:51:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 62,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        162,
                        163
                      ],
                      "referencedDeclaration": 162,
                      "src": "786:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 70,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "786:60:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 71,
                  "nodeType": "ExpressionStatement",
                  "src": "786:60:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 77,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 72,
                        "name": "voters",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 12,
                        "src": "857:6:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 75,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 73,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 159,
                          "src": "864:3:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 74,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "864:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "857:18:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "74727565",
                      "id": 76,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "878:4:0",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "857:25:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 78,
                  "nodeType": "ExpressionStatement",
                  "src": "857:25:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 83,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "++",
                    "prefix": false,
                    "src": "903:36:0",
                    "subExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 79,
                          "name": "candidates",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 16,
                          "src": "903:10:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Candidate_$8_storage_$",
                            "typeString": "mapping(uint256 => struct Election.Candidate storage ref)"
                          }
                        },
                        "id": 81,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 80,
                          "name": "_candidateId",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 51,
                          "src": "914:12:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "903:24:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Candidate_$8_storage",
                          "typeString": "struct Election.Candidate storage ref"
                        }
                      },
                      "id": 82,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "voteCount",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 7,
                      "src": "903:34:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 84,
                  "nodeType": "ExpressionStatement",
                  "src": "903:36:0"
                }
              ]
            },
            "documentation": null,
            "id": 86,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "vote",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 52,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 51,
                  "name": "_candidateId",
                  "nodeType": "VariableDeclaration",
                  "scope": 86,
                  "src": "669:17:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 50,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "669:4:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "668:19:0"
            },
            "returnParameters": {
              "id": 53,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "695:0:0"
            },
            "scope": 87,
            "src": "655:293:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 88,
        "src": "27:926:0"
      }
    ],
    "src": "0:953:0"
  },
  "legacyAST": {
    "absolutePath": "/C/Users/DELL PC/Desktop/Consensys/S-Dapp/S-Dapp/contracts/Election.sol",
    "exportedSymbols": {
      "Election": [
        87
      ]
    },
    "id": 88,
    "nodeType": "SourceUnit",
    "nodes": [
      {
        "id": 1,
        "literals": [
          "solidity",
          "^",
          "0.5",
          ".0"
        ],
        "nodeType": "PragmaDirective",
        "src": "0:23:0"
      },
      {
        "baseContracts": [],
        "contractDependencies": [],
        "contractKind": "contract",
        "documentation": null,
        "fullyImplemented": true,
        "id": 87,
        "linearizedBaseContracts": [
          87
        ],
        "name": "Election",
        "nodeType": "ContractDefinition",
        "nodes": [
          {
            "canonicalName": "Election.Candidate",
            "id": 8,
            "members": [
              {
                "constant": false,
                "id": 3,
                "name": "id",
                "nodeType": "VariableDeclaration",
                "scope": 8,
                "src": "105:7:0",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 2,
                  "name": "uint",
                  "nodeType": "ElementaryTypeName",
                  "src": "105:4:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 5,
                "name": "name",
                "nodeType": "VariableDeclaration",
                "scope": 8,
                "src": "123:11:0",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_string_storage_ptr",
                  "typeString": "string"
                },
                "typeName": {
                  "id": 4,
                  "name": "string",
                  "nodeType": "ElementaryTypeName",
                  "src": "123:6:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_storage_ptr",
                    "typeString": "string"
                  }
                },
                "value": null,
                "visibility": "internal"
              },
              {
                "constant": false,
                "id": 7,
                "name": "voteCount",
                "nodeType": "VariableDeclaration",
                "scope": 8,
                "src": "145:14:0",
                "stateVariable": false,
                "storageLocation": "default",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                },
                "typeName": {
                  "id": 6,
                  "name": "uint",
                  "nodeType": "ElementaryTypeName",
                  "src": "145:4:0",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  }
                },
                "value": null,
                "visibility": "internal"
              }
            ],
            "name": "Candidate",
            "nodeType": "StructDefinition",
            "scope": 87,
            "src": "77:90:0",
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 12,
            "name": "voters",
            "nodeType": "VariableDeclaration",
            "scope": 87,
            "src": "221:37:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
              "typeString": "mapping(address => bool)"
            },
            "typeName": {
              "id": 11,
              "keyType": {
                "id": 9,
                "name": "address",
                "nodeType": "ElementaryTypeName",
                "src": "229:7:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_address",
                  "typeString": "address"
                }
              },
              "nodeType": "Mapping",
              "src": "221:23:0",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                "typeString": "mapping(address => bool)"
              },
              "valueType": {
                "id": 10,
                "name": "bool",
                "nodeType": "ElementaryTypeName",
                "src": "239:4:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_bool",
                  "typeString": "bool"
                }
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 16,
            "name": "candidates",
            "nodeType": "VariableDeclaration",
            "scope": 87,
            "src": "265:43:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Candidate_$8_storage_$",
              "typeString": "mapping(uint256 => struct Election.Candidate)"
            },
            "typeName": {
              "id": 15,
              "keyType": {
                "id": 13,
                "name": "uint",
                "nodeType": "ElementaryTypeName",
                "src": "273:4:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_uint256",
                  "typeString": "uint256"
                }
              },
              "nodeType": "Mapping",
              "src": "265:25:0",
              "typeDescriptions": {
                "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Candidate_$8_storage_$",
                "typeString": "mapping(uint256 => struct Election.Candidate)"
              },
              "valueType": {
                "contractScope": null,
                "id": 14,
                "name": "Candidate",
                "nodeType": "UserDefinedTypeName",
                "referencedDeclaration": 8,
                "src": "280:9:0",
                "typeDescriptions": {
                  "typeIdentifier": "t_struct$_Candidate_$8_storage_ptr",
                  "typeString": "struct Election.Candidate"
                }
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "constant": false,
            "id": 18,
            "name": "candidatesCount",
            "nodeType": "VariableDeclaration",
            "scope": 87,
            "src": "315:27:0",
            "stateVariable": true,
            "storageLocation": "default",
            "typeDescriptions": {
              "typeIdentifier": "t_uint256",
              "typeString": "uint256"
            },
            "typeName": {
              "id": 17,
              "name": "uint",
              "nodeType": "ElementaryTypeName",
              "src": "315:4:0",
              "typeDescriptions": {
                "typeIdentifier": "t_uint256",
                "typeString": "uint256"
              }
            },
            "value": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 29,
              "nodeType": "Block",
              "src": "389:84:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "43616e6469646174652031",
                        "id": 22,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "413:13:0",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_41f9dcbd43e9b33194759b5a51b1df9864cdc2b2138ff106f03091eb79861f0c",
                          "typeString": "literal_string \"Candidate 1\""
                        },
                        "value": "Candidate 1"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_stringliteral_41f9dcbd43e9b33194759b5a51b1df9864cdc2b2138ff106f03091eb79861f0c",
                          "typeString": "literal_string \"Candidate 1\""
                        }
                      ],
                      "id": 21,
                      "name": "addCandidate",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 49,
                      "src": "400:12:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (string memory)"
                      }
                    },
                    "id": 23,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "400:27:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 24,
                  "nodeType": "ExpressionStatement",
                  "src": "400:27:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "hexValue": "43616e6469646174652032",
                        "id": 26,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": true,
                        "kind": "string",
                        "lValueRequested": false,
                        "nodeType": "Literal",
                        "src": "451:13:0",
                        "subdenomination": null,
                        "typeDescriptions": {
                          "typeIdentifier": "t_stringliteral_f1f17440f69835dafba5c9fd0e4caa6c780807a80f8d1745ec7af1408d6cca4a",
                          "typeString": "literal_string \"Candidate 2\""
                        },
                        "value": "Candidate 2"
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_stringliteral_f1f17440f69835dafba5c9fd0e4caa6c780807a80f8d1745ec7af1408d6cca4a",
                          "typeString": "literal_string \"Candidate 2\""
                        }
                      ],
                      "id": 25,
                      "name": "addCandidate",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 49,
                      "src": "438:12:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_internal_nonpayable$_t_string_memory_ptr_$returns$__$",
                        "typeString": "function (string memory)"
                      }
                    },
                    "id": 27,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "438:27:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 28,
                  "nodeType": "ExpressionStatement",
                  "src": "438:27:0"
                }
              ]
            },
            "documentation": null,
            "id": 30,
            "implemented": true,
            "kind": "constructor",
            "modifiers": [],
            "name": "",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 19,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "379:2:0"
            },
            "returnParameters": {
              "id": 20,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "389:0:0"
            },
            "scope": 87,
            "src": "368:105:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          },
          {
            "body": {
              "id": 48,
              "nodeType": "Block",
              "src": "538:111:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 36,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "++",
                    "prefix": false,
                    "src": "549:17:0",
                    "subExpression": {
                      "argumentTypes": null,
                      "id": 35,
                      "name": "candidatesCount",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [],
                      "referencedDeclaration": 18,
                      "src": "549:15:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 37,
                  "nodeType": "ExpressionStatement",
                  "src": "549:17:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 46,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 38,
                        "name": "candidates",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 16,
                        "src": "577:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Candidate_$8_storage_$",
                          "typeString": "mapping(uint256 => struct Election.Candidate storage ref)"
                        }
                      },
                      "id": 40,
                      "indexExpression": {
                        "argumentTypes": null,
                        "id": 39,
                        "name": "candidatesCount",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 18,
                        "src": "588:15:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_uint256",
                          "typeString": "uint256"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "577:27:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Candidate_$8_storage",
                        "typeString": "struct Election.Candidate storage ref"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "arguments": [
                        {
                          "argumentTypes": null,
                          "id": 42,
                          "name": "candidatesCount",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 18,
                          "src": "617:15:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "id": 43,
                          "name": "_name",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 32,
                          "src": "633:5:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string memory"
                          }
                        },
                        {
                          "argumentTypes": null,
                          "hexValue": "30",
                          "id": 44,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": true,
                          "kind": "number",
                          "lValueRequested": false,
                          "nodeType": "Literal",
                          "src": "639:1:0",
                          "subdenomination": null,
                          "typeDescriptions": {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          },
                          "value": "0"
                        }
                      ],
                      "expression": {
                        "argumentTypes": [
                          {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          {
                            "typeIdentifier": "t_string_memory_ptr",
                            "typeString": "string memory"
                          },
                          {
                            "typeIdentifier": "t_rational_0_by_1",
                            "typeString": "int_const 0"
                          }
                        ],
                        "id": 41,
                        "name": "Candidate",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 8,
                        "src": "607:9:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_type$_t_struct$_Candidate_$8_storage_ptr_$",
                          "typeString": "type(struct Election.Candidate storage pointer)"
                        }
                      },
                      "id": 45,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": false,
                      "kind": "structConstructorCall",
                      "lValueRequested": false,
                      "names": [],
                      "nodeType": "FunctionCall",
                      "src": "607:34:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_struct$_Candidate_$8_memory",
                        "typeString": "struct Election.Candidate memory"
                      }
                    },
                    "src": "577:64:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_struct$_Candidate_$8_storage",
                      "typeString": "struct Election.Candidate storage ref"
                    }
                  },
                  "id": 47,
                  "nodeType": "ExpressionStatement",
                  "src": "577:64:0"
                }
              ]
            },
            "documentation": null,
            "id": 49,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "addCandidate",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 33,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 32,
                  "name": "_name",
                  "nodeType": "VariableDeclaration",
                  "scope": 49,
                  "src": "509:19:0",
                  "stateVariable": false,
                  "storageLocation": "memory",
                  "typeDescriptions": {
                    "typeIdentifier": "t_string_memory_ptr",
                    "typeString": "string"
                  },
                  "typeName": {
                    "id": 31,
                    "name": "string",
                    "nodeType": "ElementaryTypeName",
                    "src": "509:6:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_string_storage_ptr",
                      "typeString": "string"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "508:21:0"
            },
            "returnParameters": {
              "id": 34,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "538:0:0"
            },
            "scope": 87,
            "src": "487:162:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "private"
          },
          {
            "body": {
              "id": 85,
              "nodeType": "Block",
              "src": "695:253:0",
              "statements": [
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "id": 59,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "UnaryOperation",
                        "operator": "!",
                        "prefix": true,
                        "src": "715:19:0",
                        "subExpression": {
                          "argumentTypes": null,
                          "baseExpression": {
                            "argumentTypes": null,
                            "id": 55,
                            "name": "voters",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 12,
                            "src": "716:6:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                              "typeString": "mapping(address => bool)"
                            }
                          },
                          "id": 58,
                          "indexExpression": {
                            "argumentTypes": null,
                            "expression": {
                              "argumentTypes": null,
                              "id": 56,
                              "name": "msg",
                              "nodeType": "Identifier",
                              "overloadedDeclarations": [],
                              "referencedDeclaration": 159,
                              "src": "723:3:0",
                              "typeDescriptions": {
                                "typeIdentifier": "t_magic_message",
                                "typeString": "msg"
                              }
                            },
                            "id": 57,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": false,
                            "lValueRequested": false,
                            "memberName": "sender",
                            "nodeType": "MemberAccess",
                            "referencedDeclaration": null,
                            "src": "723:10:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_address_payable",
                              "typeString": "address payable"
                            }
                          },
                          "isConstant": false,
                          "isLValue": true,
                          "isPure": false,
                          "lValueRequested": false,
                          "nodeType": "IndexAccess",
                          "src": "716:18:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 54,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        162,
                        163
                      ],
                      "referencedDeclaration": 162,
                      "src": "707:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 60,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "707:28:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 61,
                  "nodeType": "ExpressionStatement",
                  "src": "707:28:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "arguments": [
                      {
                        "argumentTypes": null,
                        "commonType": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        },
                        "id": 69,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "leftExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 65,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 63,
                            "name": "_candidateId",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 51,
                            "src": "794:12:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": ">",
                          "rightExpression": {
                            "argumentTypes": null,
                            "hexValue": "30",
                            "id": 64,
                            "isConstant": false,
                            "isLValue": false,
                            "isPure": true,
                            "kind": "number",
                            "lValueRequested": false,
                            "nodeType": "Literal",
                            "src": "809:1:0",
                            "subdenomination": null,
                            "typeDescriptions": {
                              "typeIdentifier": "t_rational_0_by_1",
                              "typeString": "int_const 0"
                            },
                            "value": "0"
                          },
                          "src": "794:16:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "nodeType": "BinaryOperation",
                        "operator": "&&",
                        "rightExpression": {
                          "argumentTypes": null,
                          "commonType": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          },
                          "id": 68,
                          "isConstant": false,
                          "isLValue": false,
                          "isPure": false,
                          "lValueRequested": false,
                          "leftExpression": {
                            "argumentTypes": null,
                            "id": 66,
                            "name": "_candidateId",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 51,
                            "src": "814:12:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "nodeType": "BinaryOperation",
                          "operator": "<=",
                          "rightExpression": {
                            "argumentTypes": null,
                            "id": 67,
                            "name": "candidatesCount",
                            "nodeType": "Identifier",
                            "overloadedDeclarations": [],
                            "referencedDeclaration": 18,
                            "src": "830:15:0",
                            "typeDescriptions": {
                              "typeIdentifier": "t_uint256",
                              "typeString": "uint256"
                            }
                          },
                          "src": "814:31:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_bool",
                            "typeString": "bool"
                          }
                        },
                        "src": "794:51:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      }
                    ],
                    "expression": {
                      "argumentTypes": [
                        {
                          "typeIdentifier": "t_bool",
                          "typeString": "bool"
                        }
                      ],
                      "id": 62,
                      "name": "require",
                      "nodeType": "Identifier",
                      "overloadedDeclarations": [
                        162,
                        163
                      ],
                      "referencedDeclaration": 162,
                      "src": "786:7:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_function_require_pure$_t_bool_$returns$__$",
                        "typeString": "function (bool) pure"
                      }
                    },
                    "id": 70,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "kind": "functionCall",
                    "lValueRequested": false,
                    "names": [],
                    "nodeType": "FunctionCall",
                    "src": "786:60:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_tuple$__$",
                      "typeString": "tuple()"
                    }
                  },
                  "id": 71,
                  "nodeType": "ExpressionStatement",
                  "src": "786:60:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 77,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "leftHandSide": {
                      "argumentTypes": null,
                      "baseExpression": {
                        "argumentTypes": null,
                        "id": 72,
                        "name": "voters",
                        "nodeType": "Identifier",
                        "overloadedDeclarations": [],
                        "referencedDeclaration": 12,
                        "src": "857:6:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_mapping$_t_address_$_t_bool_$",
                          "typeString": "mapping(address => bool)"
                        }
                      },
                      "id": 75,
                      "indexExpression": {
                        "argumentTypes": null,
                        "expression": {
                          "argumentTypes": null,
                          "id": 73,
                          "name": "msg",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 159,
                          "src": "864:3:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_magic_message",
                            "typeString": "msg"
                          }
                        },
                        "id": 74,
                        "isConstant": false,
                        "isLValue": false,
                        "isPure": false,
                        "lValueRequested": false,
                        "memberName": "sender",
                        "nodeType": "MemberAccess",
                        "referencedDeclaration": null,
                        "src": "864:10:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_address_payable",
                          "typeString": "address payable"
                        }
                      },
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "nodeType": "IndexAccess",
                      "src": "857:18:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      }
                    },
                    "nodeType": "Assignment",
                    "operator": "=",
                    "rightHandSide": {
                      "argumentTypes": null,
                      "hexValue": "74727565",
                      "id": 76,
                      "isConstant": false,
                      "isLValue": false,
                      "isPure": true,
                      "kind": "bool",
                      "lValueRequested": false,
                      "nodeType": "Literal",
                      "src": "878:4:0",
                      "subdenomination": null,
                      "typeDescriptions": {
                        "typeIdentifier": "t_bool",
                        "typeString": "bool"
                      },
                      "value": "true"
                    },
                    "src": "857:25:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_bool",
                      "typeString": "bool"
                    }
                  },
                  "id": 78,
                  "nodeType": "ExpressionStatement",
                  "src": "857:25:0"
                },
                {
                  "expression": {
                    "argumentTypes": null,
                    "id": 83,
                    "isConstant": false,
                    "isLValue": false,
                    "isPure": false,
                    "lValueRequested": false,
                    "nodeType": "UnaryOperation",
                    "operator": "++",
                    "prefix": false,
                    "src": "903:36:0",
                    "subExpression": {
                      "argumentTypes": null,
                      "expression": {
                        "argumentTypes": null,
                        "baseExpression": {
                          "argumentTypes": null,
                          "id": 79,
                          "name": "candidates",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 16,
                          "src": "903:10:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_mapping$_t_uint256_$_t_struct$_Candidate_$8_storage_$",
                            "typeString": "mapping(uint256 => struct Election.Candidate storage ref)"
                          }
                        },
                        "id": 81,
                        "indexExpression": {
                          "argumentTypes": null,
                          "id": 80,
                          "name": "_candidateId",
                          "nodeType": "Identifier",
                          "overloadedDeclarations": [],
                          "referencedDeclaration": 51,
                          "src": "914:12:0",
                          "typeDescriptions": {
                            "typeIdentifier": "t_uint256",
                            "typeString": "uint256"
                          }
                        },
                        "isConstant": false,
                        "isLValue": true,
                        "isPure": false,
                        "lValueRequested": false,
                        "nodeType": "IndexAccess",
                        "src": "903:24:0",
                        "typeDescriptions": {
                          "typeIdentifier": "t_struct$_Candidate_$8_storage",
                          "typeString": "struct Election.Candidate storage ref"
                        }
                      },
                      "id": 82,
                      "isConstant": false,
                      "isLValue": true,
                      "isPure": false,
                      "lValueRequested": true,
                      "memberName": "voteCount",
                      "nodeType": "MemberAccess",
                      "referencedDeclaration": 7,
                      "src": "903:34:0",
                      "typeDescriptions": {
                        "typeIdentifier": "t_uint256",
                        "typeString": "uint256"
                      }
                    },
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "id": 84,
                  "nodeType": "ExpressionStatement",
                  "src": "903:36:0"
                }
              ]
            },
            "documentation": null,
            "id": 86,
            "implemented": true,
            "kind": "function",
            "modifiers": [],
            "name": "vote",
            "nodeType": "FunctionDefinition",
            "parameters": {
              "id": 52,
              "nodeType": "ParameterList",
              "parameters": [
                {
                  "constant": false,
                  "id": 51,
                  "name": "_candidateId",
                  "nodeType": "VariableDeclaration",
                  "scope": 86,
                  "src": "669:17:0",
                  "stateVariable": false,
                  "storageLocation": "default",
                  "typeDescriptions": {
                    "typeIdentifier": "t_uint256",
                    "typeString": "uint256"
                  },
                  "typeName": {
                    "id": 50,
                    "name": "uint",
                    "nodeType": "ElementaryTypeName",
                    "src": "669:4:0",
                    "typeDescriptions": {
                      "typeIdentifier": "t_uint256",
                      "typeString": "uint256"
                    }
                  },
                  "value": null,
                  "visibility": "internal"
                }
              ],
              "src": "668:19:0"
            },
            "returnParameters": {
              "id": 53,
              "nodeType": "ParameterList",
              "parameters": [],
              "src": "695:0:0"
            },
            "scope": 87,
            "src": "655:293:0",
            "stateMutability": "nonpayable",
            "superFunction": null,
            "visibility": "public"
          }
        ],
        "scope": 88,
        "src": "27:926:0"
      }
    ],
    "src": "0:953:0"
  },
  "compiler": {
    "name": "solc",
    "version": "0.5.0+commit.1d4f565a.Emscripten.clang"
  },
  "networks": {
    "3": {
      "events": {},
      "links": {},
      "address": "0xD4C581E137A69709728309FB139095F6717C603f",
      "transactionHash": "0x2aab5c4b971908d8a72cb9951461daafdfbb9a690709f44e79d5f0b5d8ef38f2"
    },
    "5777": {
      "events": {},
      "links": {},
      "address": "0x3fAf15f452eA75081957d2F8322cFB482f2CDd11",
      "transactionHash": "0x7e068ed7ed624223f6fe2379b5110efe2c0a431b39d83877415fb4555f7b9886"
    }
  },
  "schemaVersion": "3.0.1",
  "updatedAt": "2019-01-23T18:33:07.120Z",
  "devdoc": {
    "methods": {}
  },
  "userdoc": {
    "methods": {}
  }
}
      const trufflecontract = TruffleContract(election);
    //   // Connect provider to interact with contract
      trufflecontract.setProvider(App.web3Provider);
      App.contracts.Election = await trufflecontract.at(address)

      return App.render();
    // });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase((err, account) =>{
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Election.deployed().then((instance) =>{
      electionInstance = instance;
      return electionInstance.candidatesCount();
    }).then((candidatesCount) =>{
      var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();

      for (var i = 1; i <= candidatesCount; i++) {
        electionInstance.candidates(i).then((candidate) => {
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);
        });
      }

      loader.hide();
      content.show();
    }).catch((error) =>{
      console.warn(error);
    });
  },
castVote : function() {
  
   var candidateId = $('#candidatesSelect').val();
   console.log($('#candidatesSelect').val())
    App.contracts.Election.deployed().then((instance) =>{
       instance.vote(candidateId, { from: App.account });
    }).then((result) =>{
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch((err) =>{
      console.error(err);
    });
  }
}

$(function() {
  $(window).load(function() {
    App.init();
  });
});
