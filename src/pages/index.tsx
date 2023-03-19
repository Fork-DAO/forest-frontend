import { Stack } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import Layout from '../components/Layout';
import MintingInfo from '../components/MintingInfo';
import MintNft from '../components/MintNft';
import TreasuryInfo from '../components/TreasuryInfo';

const Index = () => {
  const { address } = useAccount();
  const [hasConnected, setHasConnected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [address]);

  return (
    <Layout setHasConnected={setHasConnected}>
      {(hasConnected || address) && !loading ?
        <Stack
          className="flex justify-self-auto items-center"
          spacing={{ xs: 1, sm: 1, md: 4 }}
        >
          <MintNft />
          <TreasuryInfo />
          <MintingInfo userAddress={address!} />
        </Stack>
        :
        <Stack className="flex justify-self-auto items-center">
          Por favor, conectar billetera..
        </Stack>
      }

    </Layout>)
}

export default Index;