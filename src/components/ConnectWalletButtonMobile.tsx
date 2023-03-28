import { Button, Card, Grid, Stack, Typography } from "@mui/material";
import { Dispatch, useEffect, useState } from "react";
import { Connector, useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import { CHAIN_ID } from "../constants";
import AccountENS from "./AccountENS";
import SwitchNetwork from "./SwitchNetwork";

const ConnectWalletButtonMobile: React.FC<{
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
      <Grid
        container
        className="m-1 text-left justify-center align-middle"
        columnSpacing={2}>
        {chain?.id !== CHAIN_ID ?
          (<Grid item>
            <SwitchNetwork />
          </Grid>) :
          (
            <Stack className="pt-2">
              {address ? <AccountENS address={address} isMobile={true} /> : ""}
              <Button onClick={() => disconnect?.()}>
                <Typography
                  variant="body2"
                  color="#cdd8c4"
                  className="underline"
                  style={{ fontSize: "xx-small" }}>
                  Desconectar
                </Typography>
              </Button>
            </Stack>)
        }
      </Grid>
    ) : (
      <Grid container className="m-1 text-left justify-center align-middle" columnSpacing={2}>
        {connectors.map((connector) => {
          return (
            <Grid item className="m-1">
              <Button
                type="button"
                key={connector.id}
                onClick={() => onConnect(connector)}
                style={{ background: "rgb(67 103 110)" }}
              >
                <Typography color="#cdd8c4" style={{ fontSize: "small" }}>
                  {`${connector.name}`}
                </Typography>
              </Button>
            </Grid>
          );
        })}
        {
          error?.message ? (
            <div className="flex items-center space-x-1 text-red-500">
              <div>{error?.message ?? `Failed to connect`}</div>
            </div>
          ) : null
        }
      </Grid >
    )
}

export default ConnectWalletButtonMobile;
