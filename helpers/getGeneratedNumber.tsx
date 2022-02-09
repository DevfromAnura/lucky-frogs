const getGeneratedNumber = async (state, web3) =>
  state.contractInstance.events
    .WinningNumber(
      {
        fromBlock: await web3.eth.getBlockNumber(),
        toBlock: "latest",
      },
      function (error, event) {
        return event;
      }
    )
    .on("data", function (event) {
      // same results as the optional callback above
      //   console.log(event);
      //   if (state.selectedFrog == event.returnValues.numberGenerated) {
      //     alert("Congratz, you won!");
      //   } else {
      //     alert("you suck bitch");
      //   }
      //   setNumberGenerated(event.returnValues.numberGenerated);
      return event;
    })
    .on("changed", function (event) {
      console.log(event);
      return event;
      // remove event from local database
    })
    .on("error", console.error);

export default getGeneratedNumber;
