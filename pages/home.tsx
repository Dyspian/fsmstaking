import { NextPage } from "next";
import { useAddress } from "@thirdweb-dev/react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "./components/Navbar";
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Button,
  VStack,
  Center,
} from "@chakra-ui/react"; // You can use Chakra UI for styling

const Home: NextPage = () => {
  const address = useAddress();

  return (
    <Box>
      <Head>
        <title>FSM</title>
        {/* Add meta tags, stylesheets, and other head content here */}
      </Head>

      <Box bg="blue.100" p={10}>
        <Center>
          <VStack spacing={5} alignItems="center">
            <Heading as="h1" size="2xl">
              Welcome to Your Dapp!
            </Heading>
            <Text fontSize="xl">
              Your one-stop solution for all your blockchain needs.
            </Text>
            <Image
              src="/images/your-image.jpg"
              alt="Your Dapp Image"
              maxH="300px"
            />
            <Text fontSize="lg">
              Connect your wallet to get started and explore our features.
            </Text>
            {address ? (
              <Link href="/dashboard">
                <Button colorScheme="green" size="lg">
                  Go to Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/connect-wallet">
                <Button colorScheme="blue" size="lg">
                  Connect Wallet
                </Button>
              </Link>
            )}
          </VStack>
        </Center>
      </Box>

      <Box p={10}>
        {/* Add more content, sections, or components here */}
        {/* You can create additional sections with text and images */}
      </Box>
    </Box>
  );
};

export default Home;
