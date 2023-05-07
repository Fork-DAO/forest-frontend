import Image from "next/image";
import { Dispatch } from "react";
import ConnectWalletButtonMobile from "./ConnectWalletButtonMobile";

const HeaderMobile: React.FC<{
  setHasConnected: Dispatch<boolean>
}> = ({ setHasConnected }) => {
  return (
    <div>

      <div
        className="border-b-2 ml-2 mr-2 flex flex-row justify-center content-baseline items-center"
        style={{ borderColor: "#43676e", borderBottomWidth: "medium" }}
      >
        <Image
          src="/logo.png"
          alt=""
          width="200"
          height="80"
          className="m-4"
        />
      </div>
      <div
        className="border-b-2 ml-2 mr-2 flex flex-row justify-between content-baseline items-center"
        style={{ borderColor: "#43676e", borderBottomWidth: "medium" }}
      >
        <ConnectWalletButtonMobile setHasConnected={setHasConnected} />
      </div>
    </div>
  );
}

export default HeaderMobile;
