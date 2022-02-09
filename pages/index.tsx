import {
  Center,
  Heading,
  Image,
  Box,
  Flex,
  Input,
  Text,
  Button,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Web3 from "web3";
import AnuraDaoLogo from "../attachments/anuradaologo.png";
import frogOne from "../attachments/frog.png";
import FrogComponent from "../components/FrogComponent";
import init from "../helpers/init";
import loadWeb3 from "../helpers/loadWeb3";

import { State } from "../interface";
const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");

const IndexPage = () => {
  const [state, setState] = useState<State>({
    contractInstance:
      // @ts-ignore
      typeof window != "undefined" && window.ethereum ? loadWeb3(web3) : null,
    wallet: null,
    selectedFrog: null,
    numberOfBets: null,
    totalBets: null,
    numberGenerated: null,
    minimumBet: null,
    playerAlreadyBet: null,
  });

  useEffect(() => {
    if (
      typeof window != "undefined" &&
      // @ts-ignore
      window.ethereum &&
      state.contractInstance
    ) {
      init(state, setState, web3);
    }
  }, []);

  (async () => {
    const blockNumber = await web3.eth.getBlockNumber();

    state.contractInstance.events.allEvents(
      { fromBlock: blockNumber - 3000 },
      (err, event) => {
        console.log(event);
        if (!state.numberGenerated) {
          setState({
            ...state,
            numberGenerated: +event.returnValues.numberGenerated,
          });
        }
      }
    );
  })();
  console.log(state);
  return state.wallet ? (
    <>
      <Center
        p={["1rem", "1rem", "1.75rem", "2.25rem", "3rem"]}
        bg="#11261d"
        id="header"
        justifyContent="space-between"
      >
        {/* <Box bg="red"> */}
        <Image
          w={["40px", "60px", "80px", "100px", "120px"]}
          src={AnuraDaoLogo.src}
        />
        {/* </Box> */}
        <Box>
          <Heading
            color="white"
            fontSize={["md", "lg", "2xl", "3xl", "4xl", "6xl"]}
          >
            Welcome to Anura Dao's Lucky Frogs!
          </Heading>
        </Box>
      </Center>

      <Flex flexDir="column" p="2rem">
        <Box>
          <Heading
            textAlign="center"
            m="0 auto"
            fontSize={["2xl", "2xl", "3xl", "3xl", "4xl", "6xl"]}
          >
            Place your bets!
          </Heading>
          <Flex>
            <Box>
              <Text fontWeight="500" fontSize="xl">
                Number of bets:{" "}
                <span style={{ color: "green" }}>{state.numberOfBets}</span>
              </Text>
              <Text fontWeight="500" fontSize="xl">
                Minimum bet:
                <span
                  style={{ color: "green" }}
                >{` ${state.minimumBet} BNB`}</span>
              </Text>
              <Text fontWeight="500" fontSize="xl">
                Total in the pot:
                <span
                  style={{ color: "green" }}
                >{` ${state.totalBets} BNB`}</span>
              </Text>
            </Box>
          </Flex>
        </Box>
        <Box mt={5}>
          <FrogComponent
            playerAlreadyBet={state.playerAlreadyBet}
            number={1}
            state={state}
            setState={setState}
            frogPic={frogOne}
          />
          <FrogComponent
            playerAlreadyBet={state.playerAlreadyBet}
            number={2}
            state={state}
            setState={setState}
            frogPic={frogOne}
          />
          <FrogComponent
            playerAlreadyBet={state.playerAlreadyBet}
            number={3}
            state={state}
            setState={setState}
            frogPic={frogOne}
          />
          <FrogComponent
            playerAlreadyBet={state.playerAlreadyBet}
            number={4}
            state={state}
            setState={setState}
            frogPic={frogOne}
          />
          <FrogComponent
            playerAlreadyBet={state.playerAlreadyBet}
            number={5}
            state={state}
            setState={setState}
            frogPic={frogOne}
          />
          <FrogComponent
            playerAlreadyBet={state.playerAlreadyBet}
            number={6}
            state={state}
            setState={setState}
            frogPic={frogOne}
          />
          <FrogComponent
            playerAlreadyBet={state.playerAlreadyBet}
            number={7}
            state={state}
            setState={setState}
            frogPic={frogOne}
          />
          <FrogComponent
            playerAlreadyBet={state.playerAlreadyBet}
            number={8}
            state={state}
            setState={setState}
            frogPic={frogOne}
          />
          <FrogComponent
            playerAlreadyBet={state.playerAlreadyBet}
            number={9}
            state={state}
            setState={setState}
            frogPic={frogOne}
          />
          <FrogComponent
            playerAlreadyBet={state.playerAlreadyBet}
            number={10}
            state={state}
            setState={setState}
            frogPic={frogOne}
          />
          <Heading textAlign="center" mt={20}>
            You selected: {state.selectedFrog}
            <br />
            Random number generated: {state.numberGenerated}
          </Heading>
        </Box>
      </Flex>
    </>
  ) : (
    <Center h="100vh">
      <Spinner size="xl" />
    </Center>
  );
};
export default IndexPage;
