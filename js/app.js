const election = require('./Election.json')

  module.exports = App = {
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

  initContract: async() => {

    var contract_address = '0x92F8786Ca4BC530baA35bea19bfAa8028A84693E';
  
    // $.getJSON("Election.json", (election) => {
    //   // Instantiate a new truffle contract from the artifact
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
