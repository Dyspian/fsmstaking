import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Flex,
  Heading,
  Input,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  Web3Button,
  useAddress,
  useContract,
  useContractRead,
  useTokenBalance,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { REWARD_TOKEN_ADDRESSES, STAKE_CONTRACT_ADDRESSES, STAKE_TOKEN_ADDRESSES } from "../../constants/addresses";

export default function Stake() {
  const address = useAddress();
  const toast = useToast();

  const { contract: stakeTokenContract } = useContract(STAKE_TOKEN_ADDRESSES, "token");
  const { contract: rewardTokenContract } = useContract(REWARD_TOKEN_ADDRESSES, "token");
  const { contract: stakeContract } = useContract(STAKE_CONTRACT_ADDRESSES, "custom");

  const { data: stakeTokenBalance, isLoading: loadingStakeTokenBalance } = useTokenBalance(
    stakeTokenContract,
    address
  );
  const { data: rewardTokenBalance, isLoading: loadingRewardTokenBalance } = useTokenBalance(
    rewardTokenContract,
    address
  );

  const { data: stakeInfo, refetch: refetchStakeInfo, isLoading: loadingStakeInfo } = useContractRead(
    stakeContract,
    "getStakeInfo",
    [address]
  );

  const tokenCardStyle = {
    alignItems: "center",
    fontFamily: "cursive",
    paddingBottom: "40px",
    background: `url('/images/deco3.png')`,
    animation: "textShadowAnimation 5s infinite",
    margin: "10px", // Added margin for spacing
    borderRadius: "10px", // Added border radius
    color: "#80049E"
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetchStakeInfo();
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [refetchStakeInfo]);

  const [stakeAmount, setStakeAmount] = useState<string>("0");
  const [unstakeAmount, setUnstakeAmount] = useState<string>("0");

  const resetValue = () => {
    setStakeAmount("0");
    setUnstakeAmount("0");
  };

  return (
    <Card p={4} mt={4} boxShadow="md" style={tokenCardStyle} borderRadius="50px">
  <Heading  textAlign="center" mb={5} fontFamily="cursive" textShadow="2px 2px 1px rgba(0, 0, 0, 1.5)">
    Cooking Pot Pool
  </Heading>
      <SimpleGrid columns={2} spacing={4}>
        <Card p={4} mb={4} fontFamily="cursive" borderRadius="30px">
          <Box textAlign="center" mb={2}>
            <Text fontSize="xl" fontWeight="bold">
              Stake Token:
            </Text>
            <Skeleton isLoaded={!loadingStakeInfo && !loadingStakeTokenBalance}>
              {stakeInfo && stakeInfo[0] ? (
                <Text>
                  {ethers.utils.formatEther(stakeInfo[0])} {" $" + stakeTokenBalance?.symbol}
                </Text>
              ) : (
                <Text>0</Text>
              )}
            </Skeleton>
          </Box>
          <SimpleGrid columns={2} spacing={4}>
            <Stack spacing={4}>
              <Input
                type="number"
                max={stakeTokenBalance?.displayValue}
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
              />
              <Web3Button
                contractAddress={STAKE_CONTRACT_ADDRESSES}
                action={async (contract) => {
                  await stakeTokenContract?.setAllowance(STAKE_CONTRACT_ADDRESSES, stakeAmount);

                  await contract.call("stake", [ethers.utils.parseEther(stakeAmount)]);
                  resetValue();
                }}
                onSuccess={() =>
                  toast({
                    title: "Stake Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
                }
              >
                Stake
              </Web3Button>
            </Stack>
            <Stack spacing={4} >
              <Input
                type="number"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
              />
              <Web3Button
                contractAddress={STAKE_CONTRACT_ADDRESSES}
                action={async (contract) => {
                  await contract.call("withdraw", [ethers.utils.parseEther(unstakeAmount)]);
                }}
                onSuccess={() =>
                  toast({
                    title: "Unstake Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
                }
              >
                Unstake
              </Web3Button>
            </Stack>
          </SimpleGrid>
        </Card>
        <Card p={5} m={5} fontFamily="cursive" borderRadius="30px">
          <Flex h="100%" justifyContent="space-between" direction="column" textAlign="center">
            <Text fontSize="xl" fontWeight="bold">
              Your Rewards:
            </Text>
            <Skeleton isLoaded={!loadingStakeInfo && !loadingRewardTokenBalance}>
              {stakeInfo && stakeInfo[0] ? (
                <Box>
                  <Text fontSize="x-large" fontWeight="bold">
                    {ethers.utils.formatEther(stakeInfo[1])}
                  </Text>
                  <Text>{" $" + rewardTokenBalance?.symbol}</Text>
                </Box>
              ) : (
                <Text>0</Text>
              )}
            </Skeleton>
            <Web3Button
              contractAddress={STAKE_CONTRACT_ADDRESSES}
              action={async (contract) => {
                await contract.call("claimRewards");
                resetValue();
              }}
              onSuccess={() =>
                toast({
                  title: "Rewards Claimed",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                })
              }
            >
              Claim Now
            </Web3Button>
          </Flex>
        </Card>
      </SimpleGrid>
    </Card>
  );
}
