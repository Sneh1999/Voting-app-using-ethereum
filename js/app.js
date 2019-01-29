const Web3 = require("web3");

App = {
  web3Provider: null,
  contracts: {},
  account: "0x0",

  init: async () => {
    try {
      const accounts = await ethereum.enable();
      // You now have an array of accounts!
      // Currently only ever one:
      // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
    } catch (error) {
      // Handle error. Likely the user rejected the login:
      window.alert("User rejected provider access");
      location.reload();
    }

    return App.initWeb3();
  },

  initWeb3: () => {
    if (typeof web3 !== "undefined") {
      var loader = $("#error");
      var content = $("#content");
      // If a web3 instance is already provided by Meta Mask.
      if (ethereum.networkVersion === "3") {
        App.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
      } else {
         var desiredNetwork = "3"
          setInterval(function () {
            web3.version.getNetwork(checkNetwork)
          }, 1000)
          function checkNetwork (err, currentNetwork) {
            if (err) throw err // Please handle errors responsibly.
            if (currentNetwork !== desiredNetwork) {
              loader.show();
              content.hide();
            } else {
              location.reload()
            }
      }
      }
    } else {
      // Specify default instance if no web3 instance provided
      // App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      // web3 = new Web3(App.web3Provider);
      window.alert(
        "Please log into MetaMask and connect to Ropsten Test Network "
      );
      location.reload();
    }
    return App.initContract();
  },

  initContract: async () => {
    var address = "0xD4C581E137A69709728309FB139095F6717C603f";
    web3.eth.defaultAccount = web3.eth.accounts[0];
    // $.getJSON("Election.json", (election) => {
    //   // Instantiate a new truffle contract from the artifact
    const trufflecontract = await web3.eth.contract([
      {
        constant: true,
        inputs: [],
        name: "candidatesCount",
        outputs: [
          {
            name: "",
            type: "uint256"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0x2d35a8a2"
      },
      {
        constant: true,
        inputs: [
          {
            name: "",
            type: "uint256"
          }
        ],
        name: "candidates",
        outputs: [
          {
            name: "id",
            type: "uint256"
          },
          {
            name: "name",
            type: "string"
          },
          {
            name: "voteCount",
            type: "uint256"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0x3477ee2e"
      },
      {
        constant: true,
        inputs: [
          {
            name: "",
            type: "address"
          }
        ],
        name: "voters",
        outputs: [
          {
            name: "",
            type: "bool"
          }
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
        signature: "0xa3ec138d"
      },
      {
        inputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "constructor",
        signature: "constructor"
      },
      {
        constant: false,
        inputs: [
          {
            name: "_candidateId",
            type: "uint256"
          }
        ],
        name: "vote",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
        signature: "0x0121b93f"
      }
    ]);

    //   // Connect provider to interact with contract
    App.contracts.Election = trufflecontract.at(address);
    // App.contracts.Election.setProvider(web3.currentProvider);

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
    web3.eth.getCoinbase((err, account) => {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data

    var candidatesResults = $("#candidatesResults");
    candidatesResults.empty();

    for (var i = 1; i <= 2; i++) {
      App.contracts.Election.candidates(i, (error, candidate) => {
        var id = candidate[0];
        var name = candidate[1];
        var voteCount = candidate[2];

        // Render candidate Result
        var candidateTemplate =
          "<tr><th>" +
          id +
          "</th><td>" +
          name +
          "</td><td>" +
          voteCount +
          "</td></tr>";
        candidatesResults.append(candidateTemplate);
      });
    }

    loader.hide();
    content.show();
  },
  castVote: async () => {
    var candidateId = $("#candidatesSelect").val();
    console.log($("#candidatesSelect").val());

    $("#content").hide();
    $("#loader").show();

    App.contracts.Election.vote.sendTransaction(
      candidateId,
      {
        gas: 1000000,
        from: App.account
      },
      async (error, txHash) => {
        if(!error)
        waitForTxToBeMined(txHash)
        else
        console.error
    }
    );

   

    async function waitForTxToBeMined (txHash){
      let txReceipt;
     
      
        let promise = new Promise((resolve, reject) => {
          setTimeout(() => {

            resolve("done!")
          }, 30000)
        });
             await promise;
        try {
          txReceipt = await web3.eth.getTransactionReceipt(txHash,(error,txObj) => {
            if(error){
             return error
            }
            else{
              if (txObj.status==="0x0"){
                window.alert("Error was encountered.Please make sure you are not voting from same account you voted from before.")
               location.reload()
              }
              else{
                window.alert("Your vote got added!")
                location.reload();
              }
            }
          
            // return txObj
          })
          // console.log(txReceipt)
        } catch (err) {
             console.log("unsuccess");
            //  console.warn(err);
          // location.reload();
          
        }
      }
      
    }

  

    // Wait for votes to update
  };

 


$(function() {
  $(window).load(function() {
    App.init();
  });
});
