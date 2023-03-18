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
      <div className="space-y-2.5">
        <div>
          {chain?.id !== CHAIN_ID ?
            <SwitchNetwork /> :
            <div>
              {address || ""}
              <button
                onClick={() => disconnect?.()}
                className="flex items-center space-x-1 text-sm underline"
              >
                Desconectar.
              </button>
            </div>}

        </div>
      </div>
    ) : (
      <div className="inline-block transform space-y-3 overflow-hidden text-left align-middle transition-all">
        {connectors.map((connector) => {
          return (
            <button
              type="button"
              key={connector.id}
              onClick={() => onConnect(connector)}
            >
              {`Conectar con ${connector.name}`}
            </button>
          );
        })}
        {error?.message ? (
          <div className="flex items-center space-x-1 text-red-500">
            <div>{error?.message ?? `Failed to connect`}</div>
          </div>
        ) : null}
      </div>
    );
}

export default ConnectWalletButton;
