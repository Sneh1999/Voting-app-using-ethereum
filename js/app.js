
const Web3 = require('web3');

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

    var address = '0xD4C581E137A69709728309FB139095F6717C603f';
  
    // $.getJSON("Election.json", (election) => {
    //   // Instantiate a new truffle contract from the artifact
    const trufflecontract   = await  web3.eth.contract(([
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
  ]));
      
    //   // Connect provider to interact with contract
        App.contracts.Election =  trufflecontract.at(address)
        // App.contracts.Election.setProvider(App.web3Provider);
  
      

      return App.render();
    // });
  },

  render: async () => {
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
   

        var candidatesResults = $("#candidatesResults");
      candidatesResults.empty();
      // console.log(JSON.stringify(App.contracts.Election.candidates.call((1),(error,result)=>{console.log((result))})))

      for (var i = 1; i <= 2; i++) {
        var promise = new Promise((resolve,reject) =>{
            App.contracts.Election.candidates.call(i,(error,candidate) =>{
          var id = candidate[0];
          var name = candidate[1];
          var voteCount = candidate[2];

          // Render candidate Result
          var candidateTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatesResults.append(candidateTemplate);  
        }) 
         
        })}
        
      

      loader.hide();
      content.show();
  
      
    
    
  },
castVote : function() {
  
   var candidateId = $('#candidatesSelect').val();
   console.log($('#candidatesSelect').val())
    App.contracts.Election.vote(candidateId, { from: App.account }, () => {}).then((result) =>{
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
