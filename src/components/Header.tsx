import { Dispatch } from "react";
import ConnectWalletButton from "./ConnectWalletButton";

const Header: React.FC<{
  setHasConnected: Dispatch<boolean>,
  isMobile: boolean
}> = ({ setHasConnected, isMobile }) => {
  return (
    <nav
      className="border-b-2 ml-2 mr-2 flex flex-row justify-between content-baseline items-center"
      style={{ borderColor: "#43676e", borderBottomWidth: "medium" }}
    >
      <a href="/">
        <h1 className="pt-2 text-5xl mb-6 font-bold">Fork Forest 🌳</h1>
      </a>
      <ConnectWalletButton setHasConnected={setHasConnected} isMobile={isMobile} />
    </nav>
  );
}

export default Header;
