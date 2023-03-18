import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Layout from '../components/Layout';
import MintNft from '../components/MintNft';

const Index = () => {
  const { address } = useAccount();
  const [hasConnected, setHasConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [address]);

  return (
    <Layout setHasConnected={setHasConnected}>
      <div className="flex flex-col justify-center items-center">
        {(hasConnected || address) && !loading ?
          <MintNft />
          :
          "Please, connect wallet."}

      </div>;

    </Layout>)
}

export default Index;