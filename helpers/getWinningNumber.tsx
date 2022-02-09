const getWinningNumber = (state, currentBlock) => {
  state.contractInstance.events
    .WinningNumber({
      fromBlock: currentBlock - 1000,
    })
    .on("data", (event) => {
      console.log(event);
      // setState({
      //   ...state,
      //   numberGenerated: event.returnValues.numberGenerated,
      // });
      // console.log(event.returnValues.numberGenerated);
    });
};
export default getWinningNumber;
