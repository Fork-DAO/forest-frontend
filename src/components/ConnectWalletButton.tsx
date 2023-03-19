import styled from "@emotion/styled";
import { Button, Stack } from "@mui/material";
import { Dispatch, useEffect, useState } from "react";
import { Connector, useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import { CHAIN_ID } from "../constants";
import SwitchNetwork from "./SwitchNetwork";

const ConnectWalletButton: React.FC<{
  setHasConnected: Dispatch<boolean>
}> = ({ setHasConnected }) => {
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
            <div className="grid grid-col-1 place-items-end">
              <div>
                {address || ""}
              </div>
              <div>
                <button
                  onClick={() => disconnect?.()}
                  className="space-x-1 text-sm underline"
                >
                  Desconectar
                </button>
              </div>
            </div>}

        </div>
      </div>
    ) : (
      <Stack className="m-2 text-left align-middle" spacing={1}>
        {connectors.map((connector) => {
          return (
            <Button
              variant="outlined"
              color="success"
              type="button"
              size="small"
              key={connector.id}
              onClick={() => onConnect(connector)}
            >
              {`${connector.name}`}
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
