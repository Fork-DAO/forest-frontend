import { Button, Card, Stack, Typography } from "@mui/material";
import { Dispatch, useEffect, useState } from "react";
import { Connector, useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import { CHAIN_ID } from "../constants";
import AccountENS from "./AccountENS";
import SwitchNetwork from "./SwitchNetwork";

const ConnectWalletButton: React.FC<{
  setHasConnected: Dispatch<boolean>,
  isMobile: boolean
}> = ({ setHasConnected, isMobile }) => {
  const { chain } = useNetwork();
  const { connectors, error, connectAsync } = useConnect({ chainId: CHAIN_ID })
  const { disconnect } = useDisconnect();
  const { address, connector: activeConnector } = useAccount();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [address]);

  const onConnect = async (connector: Connector) => {
    try {
      const account = await connectAsync({ connector });
      if (account) {
        setHasConnected(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return loading ?
    <div>Loading ...</div> :
    activeConnector?.id ? (
      <div>
        <div>
          {chain?.id !== CHAIN_ID ?
            <SwitchNetwork /> :
            <div className="grid grid-col-1 place-items-end space-x-1 space-y-1 m-4 text-sm">
              {address ? <AccountENS address={address} /> : ""}
              <Card className="p-1" style={{ background: "rgb(67 103 110)" }}>
                <button onClick={() => disconnect?.()}>
                  <Typography variant="body2" color="#cdd8c4" >
                    Desconectar
                  </Typography>
                </button>
              </Card>
            </div>}

        </div>
      </div>
    ) : (
      <Stack className="m-2 text-left align-middle" spacing={1}>
        {connectors.map((connector) => {
          return (
            <Button
              type="button"
              key={connector.id}
              onClick={() => onConnect(connector)}
              style={{ background: "rgb(67 103 110)" }}
            >
              <Typography color="#cdd8c4">
                {`${connector.name}`}
              </Typography>
            </Button>
          );
        })}
        {
          error?.message ? (
            <div className="flex items-center space-x-1 text-red-500">
              <div>{error?.message ?? `Failed to connect`}</div>
            </div>
          ) : null
        }
      </Stack >
    );
}

export default ConnectWalletButton;
