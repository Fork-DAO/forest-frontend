import { Dispatch } from "react";
import ConnectWalletButton from "./ConnectWalletButton";

const Header: React.FC<{
  setHasConnected: Dispatch<boolean>
}> = ({ setHasConnected }) => {
  return (
    <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
      <a href="/">
        <h1 className="text-5xl mb-6 font-bold">Fork Forest 🌿</h1>
      </a>
      <ConnectWalletButton setHasConnected={setHasConnected} />
    </nav>
  );
}

export default Header;
