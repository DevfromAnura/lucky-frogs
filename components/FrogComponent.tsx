import { Center, Heading, Image } from "@chakra-ui/react";
import React from "react";
import { SINGLE_BET } from "../constants";
import { State } from "../interface";

const FrogComponent = ({
  number,
  state,
  setState,
  frogPic,
  playerAlreadyBet,
}: {
  state: State;
  number: number;
  setState: Function;
  frogPic: any;
  playerAlreadyBet: boolean;
}) => {
  return (
    <Center
      w="20%"
      onClick={async () => {
        if (playerAlreadyBet) {
          alert("You already bet!");
          return;
        }
        setState({ ...state, selectedFrog: number });
        await state.contractInstance.methods.bet(number).send({
          from: state?.wallet,
          value: SINGLE_BET,
        });
      }}
      p={10}
      borderRadius={5}
      _hover={{ bg: "gray.100", cursor: "pointer" }}
      gap={5}
      display="inline-flex"
      flexDir="column"
    >
      <Image w="50%" src={frogPic.src} />
      <Heading>{number}</Heading>
    </Center>
  );
};

export default FrogComponent;
