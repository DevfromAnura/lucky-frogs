const Casino = artifacts.require("Casino");

module.exports = function (deployer) {
    deployer.deploy(web3.toWei(0.1, 'avax'), 100, {gas: 3000000});
  };
  