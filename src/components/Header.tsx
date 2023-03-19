import { Dispatch } from "react";
import ConnectWalletButton from "./ConnectWalletButton";

const Header: React.FC<{
  setHasConnected: Dispatch<boolean>
}> = ({ setHasConnected }) => {
  return (
    <nav className="border-b-2 ml-2 mr-2 flex flex-row justify-between content-baseline items-center">
      <a href="/">
        <h1 className="pt-2 text-5xl mb-6 font-bold">Fork Forest 🌳</h1>
      </a>
      <ConnectWalletButton setHasConnected={setHasConnected} />
    </nav>
  );
}

export default Header;
