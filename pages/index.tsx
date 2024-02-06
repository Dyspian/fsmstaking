/* eslint-disable react/no-unescaped-entities */
import { NextPage } from "next";
import { useAddress } from "@thirdweb-dev/react";
import StakeToken from "./components/StakeToken";
import RewardToken from "./components/RewardToken";
import Stake from "./components/Stake";

const Home: NextPage = () => {
  const address = useAddress();

  const containerStyle: React.CSSProperties = {
    background: `url('/images/home.png')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
    position: "relative",
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  };

  const headerStyle: React.CSSProperties = {
    fontSize: "36px",
    fontWeight: "bold",
    color: "yellow",
    fontFamily: "cursive",
    position: "absolute",
    top: "2%",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 2,
  };

  const info1Style: React.CSSProperties = {
    fontSize: "20px",
    color: "white",
    position: "absolute",
    top: "30%",
    left: "10%",
    maxWidth: "40%",
    padding: "10px",
    borderLeft: "2px solid yellow",
    fontFamily: "cursive",
    textAlign: "left",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
  };

  const tokensContainerStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    width: "50%",
    padding: "0rem",
    margin: "20px auto",
    justifyContent: "space-between",
  };

  const tokenStyle: React.CSSProperties = {
    width: "45%",
    padding: "5px",
    borderRadius: "15px",
    boxShadow: "10px 0px 12px rgba(128, 4, 128, 5.3)",
    backgroundColor: "#fff",
    transition: "transform 1.2s, box-shadow 1.2s",
  };

  const hoverTokenStyle: React.CSSProperties = {
    ...tokenStyle,
    transform: "scale(0.90)",
    background: `url('/images/deco.png')`,
    boxShadow: "0px 0px 20px rgba(128, 4, 158, 3.3)",
  };

  return (
    <div style={containerStyle}>
      <div style={overlayStyle}></div>
      {address ? (
        <>
          <div style={tokensContainerStyle}>
            <div style={hoverTokenStyle}>
              <StakeToken />
            </div>
            <div style={hoverTokenStyle}>
              <RewardToken />
            </div>
          </div>
          <Stake />
        </>
      ) : (
        <>
          <header style={headerStyle}>Welcome to Flying Spaghetti Monster</header>
          <title>Flying Spaghetti Monster</title>
          <div style={info1Style}>
            <p>
            Dive into the world of decentralized finance with a twist of fun. You're just a click away from starting your staking journey and earning delicious rewards. Simply click on "Connect Wallet" in the navbar to begin.

Enjoy a hearty 75% APR on your staked assets and watch your digital pantry fill up with Saucy Meat Balls (SMB) tokens. We're thrilled to have you onboard this exciting adventure. Happy staking!
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
