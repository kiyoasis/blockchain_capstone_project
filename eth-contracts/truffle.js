var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, 'https://rinkeby.infura.io/v3/a2143633373a45b1b2cee31f31b1d8e3'),
      network_id: 4,
      gas: 6700000,
      gasPrice: 10000000000,
    }
  },
  compilers: {
    solc: {
      version: "^0.5.0"
    }
  }
};