// migrating the appropriate contracts
//var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var Verifier = artifacts.require("./Verifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");

module.exports = function(deployer) {
  deployer.deploy(Verifier)
  //deployer.deploy(SolnSquareVerifier);
    .then(() => {
      return deployer.deploy(SolnSquareVerifier, Verifier.address);
    });
};
