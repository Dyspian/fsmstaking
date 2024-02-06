import { Box, Heading, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useAddress, useContract, useTokenBalance } from "@thirdweb-dev/react";
import { REWARD_TOKEN_ADDRESSES } from "../../constants/addresses";

export default function RewardToken() {
  const address = useAddress();
  const { contract: rewardTokenContract, isLoading: loadingRewardToken } = useContract(REWARD_TOKEN_ADDRESSES);
  const { data: tokenBalance, isLoading: loadingTokenBalance } = useTokenBalance(rewardTokenContract, address);

  const tokenContainerStyle = {
    alignItems: "center",
    fontFamily: "cursive",
    paddingBottom: "40px",
    background: `url('/images/deco2.png')`,
    color: "#e6e156",
    animation: "textShadowAnimation 5s infinite",
    margin: "10px", // Added margin for spacing
    borderRadius: "10px", // Added border radius
  };
  

  const keyframes = `
    @keyframes textShadowAnimation {
      0% {
        text-shadow: 1px 1px 20px yellow;
      }
      33% {
        text-shadow: 1px 1px 20px lightyellow;
      }
      66% {
        text-shadow: 1px 1px 20px #fff;
      }
      100% {
        text-shadow: 1px 1px 20px yellow;
      }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <Box p={4} boxShadow="md" style={tokenContainerStyle}>
        <Stack spacing={4}>
          <Heading size="md"></Heading>

          <Skeleton height="6" width="100%" isLoaded={!loadingRewardToken && !loadingTokenBalance}>
            <Text fontSize="sm" fontWeight="bold">total: ${tokenBalance?.symbol}</Text>
          </Skeleton>

          <Skeleton height="6" width="100%" isLoaded={!loadingRewardToken && !loadingTokenBalance}>
            <Text fontSize="sm">{tokenBalance?.displayValue}</Text>
          </Skeleton>
        </Stack>
      </Box>
    </>
  );
}
