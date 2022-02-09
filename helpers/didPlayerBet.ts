const didPlayerBet = (state, wallet): boolean =>
  wallet &&
  state.contractInstance?.methods
    .checkPlayerExists(wallet)
    .call()
    .then((val) => val)
    .catch((err) => console.error(err.message));

export default didPlayerBet;
