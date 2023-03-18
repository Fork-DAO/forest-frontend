import { toast } from "react-hot-toast";
import { useSwitchNetwork } from "wagmi";
import { CHAIN_ID } from "../constants";


const SwitchNetwork: React.FC = () => {
  const { switchNetwork } = useSwitchNetwork();

  return (
    <button
      type="button"
      onClick={() => {
        if (switchNetwork) {
          switchNetwork(CHAIN_ID);
        } else {
          toast.error(`Please change your network wallet!`);
        }
      }}
    >
      Switch Network
    </button>
  );
};

export default SwitchNetwork;
