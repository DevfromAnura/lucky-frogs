const requestForWallet = () => {
  const wallet = ethereum
    ?.request({ method: "eth_requestAccounts" })
    .then((accounts) => accounts[0])
    .catch((err) => {
      console.error(err);
      return null;
    });
  return wallet;
};

export default requestForWallet;
