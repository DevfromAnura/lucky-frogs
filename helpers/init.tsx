import { State } from "../interface";
import didPlayerBet from "./didPlayerBet";
import requestForWallet from "./requestForWallet";

const init = async (state: State, setState, web3) => {
  const wallet = await requestForWallet();

  const currentBets = await state.contractInstance.methods
    .numberOfBets()
    .call();
  const weiToBnb = (price) => price * 10 ** -18;
  // const minimumBet = await state.contractInstance.methods.minimumBet().call();
  // console.log("MIN", weiToBnb(minimumBet));

  //   const totalBets = await state.contractInstance.methods.totalBet().call();
  //   const playerAlreadyBet: boolean = wallet ? await didPlayerBet(state) : null;

  // );

  // state.contractInstance.events.WinningNumber(
  //   {
  //     fromBlock: blockNumber - 1000,
  //   },
  //   (err, event) => {
  //     console.log(err);
  //     console.log(event);
  //   }
  // );

  return Promise.all([
    state.contractInstance.methods.totalBet().call(),
    didPlayerBet(state, wallet),
    weiToBnb(await state.contractInstance.methods.minimumBet().call()),
  ])
    .then((val) => {
      setState({
        ...state,
        wallet,
        totalBets: weiToBnb(val[0]),
        numberOfBets: currentBets,
        playerAlreadyBet: val[1] && val[1],
        minimumBet: val[2],
      });
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};

export default init;
