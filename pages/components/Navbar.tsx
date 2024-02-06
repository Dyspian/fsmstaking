import React from "react";
import { ConnectWallet, darkTheme } from "@thirdweb-dev/react";

const buttonContainerStyle = {
  fontFamily: "cursive",
  color: "#e6e156",
  marginLeft: "10px", // Reduced margin
  marginRight: "10px", // Reduced margin
};

const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1rem",
  backgroundColor: "#000",
  color: "#e6e156",
};

const logoStyle = {
  width: "50px", // Reduced logo size
  height: "50px", // Reduced logo size
};

const titleStyle = {
  fontSize: "18px", // Slightly smaller font size
  fontFamily: "cursive",
  marginLeft: "10px",
};

const menuStyle = {
  display: "flex",
  gap: "20px", // Reduced gap
  fontFamily: "cursive",
  alignItems: "center",
  listStyle: "none",
  margin: "0",
  padding: "0",
};

const menuItemStyle = {
  textDecoration: "none",
  color: "#e6e156",
  fontSize: "16px", // Slightly smaller font size
  transition: "transform 0.2s, color 0.2s",
  "&:hover": {
    transform: "scale(1.05)",
  },
};

const Navbar = () => {
  return (
    <nav style={navbarStyle}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img src="/images/logo.png" alt="Logo" style={logoStyle} />
        <h3 style={titleStyle}>Testnet Staking</h3>
      </div>
      <div style={{ flex: 2, display: "flex", justifyContent: "center" }}>
        <ul style={menuStyle}>
        <li>
            <a
              href="https://fsmtoken.xyz"
              style={menuItemStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="https://discord.gg/2N9dYTh5at"
              style={menuItemStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Discord
            </a>
          </li>
          <li>
            <a
              href="https://twitter.com/FsmToken"
              style={menuItemStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
          </li>
          <li>
            <a
              href="https://www.bnbchain.org/en/testnet-faucet"
              style={menuItemStyle}
              target="_blank"
              rel="noopener noreferrer"
            >
              Claim TBNB
            </a>
          </li>
        </ul>
      </div>
      <div style={buttonContainerStyle}>
        <ConnectWallet
          theme={darkTheme({
            colors: {
              accentText: "#e6e156",
              accentButtonBg: "#e6e156",
              borderColor: "#eeff00",
              primaryText: "#fffee0",
              secondaryText: "#ebf887",
            },
          })}
          btnTitle={"Connect Wallet"}
          modalTitle={"Connect a Wallet"}
          modalSize={"wide"}
          welcomeScreen={{
            title: "It's fun to be Pastafarian.",
            subtitle: "Connect, and let's get started.",
            img: {
              src: "https://i.ibb.co/86f7m2h/logo-fsm.png",
              width: 180,
              height: 180,
            },
          }}
          modalTitleIconUrl={"https://i.ibb.co/86f7m2h/logo-fsm.png"}
        />
      </div>
    </nav>
  );
};

export default Navbar;
