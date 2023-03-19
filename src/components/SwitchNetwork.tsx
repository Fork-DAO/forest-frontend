import { Button } from "@mui/material";
import { toast } from "react-hot-toast";
import { useSwitchNetwork } from "wagmi";
import { CHAIN_ID, CHAIN_NAME } from "../constants";


const SwitchNetwork: React.FC = () => {
  const { switchNetwork } = useSwitchNetwork();

  return (
    <Button
      variant="outlined"
      color="error"
      type="button"
      onClick={() => {
        if (switchNetwork) {
          switchNetwork(CHAIN_ID);
        } else {
          toast.error(`Por favor, conectarse a la red ${CHAIN_NAME}`);
        }
      }}
    >
      Cambiar red
    </Button>
  );
};

export default SwitchNetwork;
